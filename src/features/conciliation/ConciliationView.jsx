import { useEffect, useMemo, useState } from "react";
import { provider } from "../../data/providers";
import { useFiltersStore } from "../../app/store";
import Filter from "../../components/ui/Filter/Filter";
import ConciliationTable from "../../components/charts/ConciliationTable";
import "./ConciliationView.css";

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const ConciliationView = () => {
  const month = useFiltersStore((s) => s.month);

  const [sales, setSales] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [matches, setMatches] = useState([]);
  const [unmatchedSales, setUnmatchedSales] = useState([]);
  const [unmatchedPayouts, setUnmatchedPayouts] = useState([]);
  const [method, setMethod] = useState("");

  // Carrega somente dados do mês selecionado
  useEffect(() => {
    async function fetchData() {
      const bundle = await provider.loadAll();
      const inMonth = (d) => (d || "").slice(0, 7) === month;

      const salesMonth = (bundle.sales || []).filter((s) => inMonth(s.date));
      const payoutsMonth = (bundle.payouts || []).filter((p) => inMonth(p.date));

      setSales(salesMonth);
      setPayouts(payoutsMonth);
    }
    fetchData();
  }, [month]);

  // Matching simples
  useEffect(() => {
    const remaining = [...payouts];
    const matched = [];
    const unmatchedSalesArr = [];

    const consumeRef = (obj) => {
      const i = remaining.indexOf(obj);
      if (i !== -1) remaining.splice(i, 1);
    };

    for (const sale of sales) {
      const direct = payouts.filter((p) => p.saleId === sale.id);
      if (direct.length > 0) {
        matched.push({ sale, payouts: direct });
        direct.forEach(consumeRef);
      } else {
        unmatchedSalesArr.push(sale);
      }
    }

    setMatches(matched);
    setUnmatchedSales(unmatchedSalesArr);
    setUnmatchedPayouts(remaining);
  }, [sales, payouts]);

  function getStatus(sale, payoutsForSale) {
    if (payoutsForSale.length === 0) return "Sem repasse";
    const total = payoutsForSale.reduce((s, p) => s + (p.netValue || 0), 0);
    const diff = Math.abs(total - Number(sale.netRevenue || 0));
    return diff < 0.005 ? "Conciliado" : "Divergente";
  }

  const filteredMatches = useMemo(
    () => matches.filter(({ payouts }) => (method ? payouts.some((p) => p.method === method) : true)),
    [matches, method]
  );
  const filteredUnmatchedPayouts = useMemo(
    () => unmatchedPayouts.filter((p) => (method ? p.method === method : true)),
    [unmatchedPayouts, method]
  );

  const kpis = useMemo(() => {
    const totalSales = sales.length;
    const totalDivergente = filteredMatches.filter(
      ({ sale, payouts }) => getStatus(sale, payouts) !== "Conciliado"
    ).length;
    const totalConciliado = filteredMatches.length - totalDivergente;
    return {
      percentConciliado: totalSales > 0 ? ((totalConciliado / totalSales) * 100).toFixed(1) : "0",
      totalSemRepasse: unmatchedSales.length,
      totalRepasseSemVenda: filteredUnmatchedPayouts.length,
      totalDivergente,
    };
  }, [filteredMatches, sales.length, unmatchedSales.length, filteredUnmatchedPayouts.length]);

  return (
    <div className="conciliation-view">
      {/* HEADER padronizado*/}
      <div className="cv-header">
        <h1>Reconciliação de Repasses</h1>
        <div className="cv-header-controls">
          <Filter goalsEnabled={false} />
          <div className="field">
            <label htmlFor="method">Método</label>
            <select
              id="method"
              className="select-like-month"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="PIX">PIX</option>
              <option value="CARD">CARD</option>
              <option value="BOLETO">BOLETO</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="conciliation-kpis">
        <div className="kpi-card good">
          <div className="kpi-label">% Conciliado</div>
          <div className="kpi-value">{kpis.percentConciliado}%</div>
        </div>
        <div className="kpi-card warn">
          <div className="kpi-label">Sem repasse</div>
          <div className="kpi-value">{kpis.totalSemRepasse}</div>
        </div>
        <div className="kpi-card warn">
          <div className="kpi-label">Repasse sem venda</div>
          <div className="kpi-value">{kpis.totalRepasseSemVenda}</div>
        </div>
        <div className="kpi-card bad">
          <div className="kpi-label">Divergente</div>
          <div className="kpi-value">{kpis.totalDivergente}</div>
        </div>
      </div>

      {/* Tabela */}
      <ConciliationTable
        filteredMatches={filteredMatches}
        unmatchedSales={unmatchedSales}
        filteredUnmatchedPayouts={filteredUnmatchedPayouts}
        sales={sales}
        payouts={payouts}
        matches={matches}
        money={money}
        getStatus={getStatus}
      />

      {/* Card explicativo dos status */}
      <div className="status-explain">
        <h3>Como ler os status</h3>
        <ul>
          <li><span className="pill pill-ok">Conciliado</span> Há repasse(s) para a venda e a soma bate com o valor da venda.</li>
          <li><span className="pill pill-bad">Divergente</span> Existem repasses, mas o total não confere com o valor da venda.</li>
          <li><span className="pill pill-warn">Sem repasse</span> A venda não possui repasse no período selecionado.</li>
          <li><span className="pill pill-info">Repasse sem venda</span> Existe repasse no período, mas não há venda correspondente.</li>
        </ul>
      </div>
    </div>
  );
};

export default ConciliationView;
