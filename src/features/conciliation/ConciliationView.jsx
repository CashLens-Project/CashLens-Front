import React, { useEffect, useState } from "react";
import { provider } from "../../data/providers";
import { useFiltersStore } from "../../app/store";
import "./ConciliationView.css";

const ConciliationView = () => {
  const month = useFiltersStore((s) => s.month);
  const [sales, setSales] = useState([]);
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const bundle = await provider.loadAll();
      setSales(bundle.sales);
      setPayouts(bundle.payouts);
    }
    fetchData();
  }, [month]);

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
        </div>
      </div>
      <div className="conciliation-kpis">
        {/* KPIs serão exibidos aqui */}
      </div>
    </div>
  );
};

export default ConciliationView;
