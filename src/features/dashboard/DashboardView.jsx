import { useEffect, useState } from 'react';
import { provider } from '../../data/providers/index.js';
import { useFiltersStore, useGoalsStore } from '../../app/store.js';
import Filter from '../../components/ui/Filter.jsx';
import Card from '../../components/ui/Card.jsx';
import LineChart from '../../components/charts/LineChart.jsx';
import { fmtBRL } from '../../utils/format.js';

export default function DashboardView() {
  const month = useFiltersStore((s) => s.month);
  const goal = useGoalsStore((s) => s.goals[month] || 0);
  const [dre, setDre] = useState({
    receitaLiquida: 0,
    cogs: 0,
    despesas: 0,
    resultado: 0,
  });
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const d = await provider.getDRE(month);
      const tl = await provider.getTimeline(month);
      setDre(d);
      setTimeline(tl);
    }
    fetchData();
  }, [month]);

  const progress = goal ? Math.min(1, (dre.resultado || 0) / goal) : 0;

  return (
    <div className="stack">
      <div className="card" style={{ marginBottom: '1rem' }}>
        <Filter />
      </div>

      <div className="grid kpis">
        <Card title="Receita Líquida" value={fmtBRL(dre.receitaLiquida)} />
        <Card title="COGS" value={fmtBRL(dre.cogs)} />
        <Card title="Despesas" value={fmtBRL(dre.despesas)} />
        <Card title="Resultado" value={fmtBRL(dre.resultado)}>
          <div className="progress">
            <div className="bar" style={{ width: `${progress * 100}%` }} />
            <span>Meta: {fmtBRL(goal)}</span>
          </div>
        </Card>
      </div>

      <div className="panel">
        <h3>Timeline de Caixa ({month})</h3>
        <LineChart data={timeline.map((p) => ({ date: p.date, value: p.value }))} />
      </div>

      <div className="panel">
        <h3>Insights (em breve)</h3>
        <p className="muted">
          Placeholder para explicações. Por exemplo: “Descontos acima da média
          reduziram a margem”.
        </p>
      </div>
    </div>
  );
}