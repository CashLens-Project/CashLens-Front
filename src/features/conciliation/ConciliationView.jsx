import React, { useEffect, useState } from "react";
import { provider } from "../../data/providers";
import { useFiltersStore } from "../../app/store";
import "./ConciliationView.css";

const ConciliationView = () => {
  const month = useFiltersStore((s) => s.month);
  const [sales, setSales] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [matches, setMatches] = useState([]);
  const [unmatchedSales, setUnmatchedSales] = useState([]);
  const [unmatchedPayouts, setUnmatchedPayouts] = useState([]);

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
    // Tolerância fixa para exemplo
    const valueTolerance = 50; // R$
    const daysTolerance = 2; // dias
    const saleDate = new Date(sale.date);
    const payoutDates = payouts.map((p) => new Date(p.date));
    const dateOk = payoutDates.every((pd) => Math.abs((pd - saleDate) / (1000*60*60*24)) <= daysTolerance);
    if (Math.abs(deltaValue) <= valueTolerance && dateOk) return "Conciliado";
    if (!dateOk) return "Divergente";
    return "Divergente";
  }

  return (
    <div className="conciliation-view">
      <h1>Conciliação</h1>
      <div className="conciliation-controls">
        {/* Controles de filtro: mês/ano, método, tolerância, etc. */}
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
            </tr>
          </thead>
          <tbody>
            {matches.map(({sale, payouts}) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>R$ {sale.netRevenue.toFixed(2)}</td>
                <td>{payouts.map(p => `${p.id} (${p.method})`).join(", ")}</td>
                <td>R$ {payouts.reduce((sum, p) => sum + p.netValue, 0).toFixed(2)}</td>
                <td>R$ {(payouts.reduce((sum, p) => sum + p.netValue, 0) - sale.netRevenue).toFixed(2)}</td>
                <td>{getStatus(sale, payouts)}</td>
              </tr>
            ))}
            {unmatchedSales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>R$ {sale.netRevenue.toFixed(2)}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>Sem repasse</td>
              </tr>
            ))}
            {unmatchedPayouts.map(payout => (
              <tr key={payout.id}>
                <td>-</td>
                <td>{payout.date}</td>
                <td>-</td>
                <td>{payout.id} ({payout.method})</td>
                <td>R$ {payout.netValue.toFixed(2)}</td>
                <td>-</td>
                <td>Repasse sem venda</td>
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
        {/* KPIs serão exibidos aqui */}
      </div>
    </div>
  );
};

export default ConciliationView;
