import React, { useEffect, useState } from "react";
import { provider } from "../../data/providers";
import { useFiltersStore } from "../../app/store";
import Filter from "../../components/ui/Filter";
import "./ConciliationView.css";

const ConciliationView = () => {
  const month = useFiltersStore((s) => s.month);
  const [sales, setSales] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [matches, setMatches] = useState([]);
  const [unmatchedSales, setUnmatchedSales] = useState([]);
  const [unmatchedPayouts, setUnmatchedPayouts] = useState([]);
  const [method, setMethod] = useState("");
  const [valueTolerance, setValueTolerance] = useState(50);
  const [daysWindow, setDaysWindow] = useState(2);
  const [manualLinks, setManualLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const bundle = await provider.loadAll();
      setSales(bundle.sales);
      setPayouts(bundle.payouts);
    }
    fetchData();
  }, [month]);

  useEffect(() => {
    function matchSalesAndPayouts(sales, payouts) {
      const matched = [];
      const unmatchedSalesArr = [];
      const unmatchedPayoutsArr = [...payouts];

      sales.forEach((sale) => {
        // Casamento direto por saleId
        const relatedPayouts = payouts.filter((p) => p.saleId === sale.id);
        if (relatedPayouts.length > 0) {
          matched.push({ sale, payouts: relatedPayouts });
          // Remove payouts casados
          relatedPayouts.forEach((rp) => {
            const idx = unmatchedPayoutsArr.findIndex((up) => up.id === rp.id);
            if (idx !== -1) unmatchedPayoutsArr.splice(idx, 1);
          });
        } else {
          unmatchedSalesArr.push(sale);
        }
      });

      return { matched, unmatchedSalesArr, unmatchedPayoutsArr };
    }

    const { matched, unmatchedSalesArr, unmatchedPayoutsArr } = matchSalesAndPayouts(sales, payouts);
    setMatches(matched);
    setUnmatchedSales(unmatchedSalesArr);
    setUnmatchedPayouts(unmatchedPayoutsArr);
  }, [sales, payouts]);

  function getStatus(sale, payouts) {
    if (payouts.length === 0) return "Sem repasse";
    const totalPayout = payouts.reduce((sum, p) => sum + p.netValue, 0);
    const deltaValue = totalPayout - sale.netRevenue;
    const saleDate = new Date(sale.date);
    const payoutDates = payouts.map((p) => new Date(p.date));
    const dateOk = payoutDates.every((pd) => Math.abs((pd - saleDate) / (1000*60*60*24)) <= daysWindow);
    if (Math.abs(deltaValue) <= valueTolerance && dateOk) return "Conciliado";
    if (!dateOk) return "Divergente";
    return "Divergente";
  }

  const filteredMatches = matches.filter(({sale, payouts}) => {
    if (method && !payouts.some(p => p.method === method)) return false;
    return true;
  });
  const filteredUnmatchedPayouts = unmatchedPayouts.filter(p => !method || p.method === method);

  const getKPIs = () => {
    const totalSales = sales.length;
    const totalMatched = matches.length;
    const totalUnmatchedSales = unmatchedSales.length;
    const totalUnmatchedPayouts = unmatchedPayouts.length;
    const totalDivergente = filteredMatches.filter(({sale, payouts}) => getStatus(sale, payouts) === "Divergente").length;
    return {
      percentConciliado: totalSales > 0 ? ((totalMatched - totalDivergente) / totalSales * 100).toFixed(1) : "0",
      totalSemRepasse: totalUnmatchedSales,
      totalRepasseSemVenda: totalUnmatchedPayouts,
      totalDivergente,
    };
  };
  const kpis = getKPIs();

  function handleLink(saleId, payoutId) {
    setManualLinks((prev) => [...prev, { saleId, payoutId }]);
  }
  function handleUnlink(saleId, payoutId) {
    setManualLinks((prev) => prev.filter((l) => !(l.saleId === saleId && l.payoutId === payoutId)));
  }
  function getManualPayouts(sale) {
    return manualLinks.filter(l => l.saleId === sale.id).map(l => payouts.find(p => p.id === l.payoutId)).filter(Boolean);
  }

  return (
    <div className="conciliation-view">
      <h1>Conciliação</h1>
      <div className="conciliation-controls">
        <Filter goalsEnabled={false} />
        <label style={{marginLeft: '1rem'}}>Método:
          <select value={method} onChange={e => setMethod(e.target.value)}>
            <option value="">Todos</option>
            <option value="PIX">PIX</option>
            <option value="CARD">CARD</option>
            <option value="BOLETO">BOLETO</option>
          </select>
        </label>
        <label style={{marginLeft: '1rem'}}>Tolerância valor (R$):
          <input type="number" value={valueTolerance} onChange={e => setValueTolerance(Number(e.target.value))} style={{width: 60}} />
        </label>
        <label style={{marginLeft: '1rem'}}>Janela dias (±):
          <input type="number" value={daysWindow} onChange={e => setDaysWindow(Number(e.target.value))} style={{width: 40}} />
        </label>
      </div>
      <div className="conciliation-table">
        {/* Tabela de conciliação será renderizada aqui */}
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr>
              <th>Venda</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Payout(s)</th>
              <th>Total Payout</th>
              <th>Δ Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map(({sale, payouts}) => {
              const manualPayouts = getManualPayouts(sale);
              const allPayouts = [...payouts, ...manualPayouts];
              return (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.date}</td>
                  <td>R$ {sale.netRevenue.toFixed(2)}</td>
                  <td>{allPayouts.map(p => `${p.id} (${p.method})`).join(", ")}</td>
                  <td>R$ {allPayouts.reduce((sum, p) => sum + p.netValue, 0).toFixed(2)}</td>
                  <td>R$ {(allPayouts.reduce((sum, p) => sum + p.netValue, 0) - sale.netRevenue).toFixed(2)}</td>
                  <td>{getStatus(sale, allPayouts)}</td>
                  <td>
                    {unmatchedPayouts.map(p => (
                      <button key={p.id} onClick={() => handleLink(sale.id, p.id)} style={{marginRight: 4}}>Vincular {p.id}</button>
                    ))}
                    {manualPayouts.map(p => (
                      <button key={p.id} onClick={() => handleUnlink(sale.id, p.id)} style={{marginRight: 4}}>Desvincular {p.id}</button>
                    ))}
                  </td>
                </tr>
              );
            })}
            {unmatchedSales.map(sale => {
              const manualPayouts = getManualPayouts(sale);
              const allPayouts = manualPayouts;
              return (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.date}</td>
                  <td>R$ {sale.netRevenue.toFixed(2)}</td>
                  <td>{allPayouts.length > 0 ? allPayouts.map(p => `${p.id} (${p.method})`).join(", ") : '-'}</td>
                  <td>{allPayouts.length > 0 ? `R$ ${allPayouts.reduce((sum, p) => sum + p.netValue, 0).toFixed(2)}` : '-'}</td>
                  <td>{allPayouts.length > 0 ? `R$ ${(allPayouts.reduce((sum, p) => sum + p.netValue, 0) - sale.netRevenue).toFixed(2)}` : '-'}</td>
                  <td>{allPayouts.length > 0 ? getStatus(sale, allPayouts) : 'Sem repasse'}</td>
                  <td>
                    {unmatchedPayouts.map(p => (
                      <button key={p.id} onClick={() => handleLink(sale.id, p.id)} style={{marginRight: 4}}>Vincular {p.id}</button>
                    ))}
                    {manualPayouts.map(p => (
                      <button key={p.id} onClick={() => handleUnlink(sale.id, p.id)} style={{marginRight: 4}}>Desvincular {p.id}</button>
                    ))}
                  </td>
                </tr>
              );
            })}
            {filteredUnmatchedPayouts.map(payout => (
              <tr key={payout.id}>
                <td>-</td>
                <td>{payout.date}</td>
                <td>-</td>
                <td>{payout.id} ({payout.method})</td>
                <td>R$ {payout.netValue.toFixed(2)}</td>
                <td>-</td>
                <td>Repasse sem venda</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop: '1rem'}}>
          <strong>Vendas carregadas:</strong> {sales.length}<br />
          <strong>Repasses carregados:</strong> {payouts.length}<br />
          <strong>Vendas casadas:</strong> {matches.length}<br />
          <strong>Vendas sem repasse:</strong> {unmatchedSales.length}<br />
          <strong>Repasses sem venda:</strong> {unmatchedPayouts.length}
        </div>
      </div>
      <div className="conciliation-kpis">
        <div>
          <strong>% Conciliado:</strong> {kpis.percentConciliado}%
        </div>
        <div>
          <strong>Total sem repasse:</strong> {kpis.totalSemRepasse}
        </div>
        <div>
          <strong>Repasse sem venda:</strong> {kpis.totalRepasseSemVenda}
        </div>
        <div>
          <strong>Divergente:</strong> {kpis.totalDivergente}
        </div>
      </div>
    </div>
  );
};

export default ConciliationView;
