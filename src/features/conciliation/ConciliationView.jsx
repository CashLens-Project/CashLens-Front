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

  return (
    <div className="conciliation-view">
      <h1>Conciliação</h1>
      <div className="conciliation-controls">
        {/* Controles de filtro: mês/ano, método, tolerância, etc. */}
      </div>
      <div className="conciliation-table">
        {/* Tabela de conciliação será renderizada aqui */}
        <div>
          <strong>Vendas carregadas:</strong> {sales.length}
          <br />
          <strong>Repasses carregados:</strong> {payouts.length}
          <br />
          <strong>Vendas casadas:</strong> {matches.length}
          <br />
          <strong>Vendas sem repasse:</strong> {unmatchedSales.length}
          <br />
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
