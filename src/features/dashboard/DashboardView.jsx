import { useEffect, useState } from 'react';
import { provider } from '../../data/providers/index.js';
import { useFiltersStore, useGoalsStore } from '../../app/store.js';
import Filter from '../../components/ui/Filter.jsx';
import Card from '../../components/ui/Card.jsx';
import LineChart from '../../components/charts/LineChart.jsx';
import { fmtBRL } from '../../utils/format.js';
import './DashboardView.css';

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

  const progress = (goal > 0 && dre.resultado > 0)
    ? Math.min(1, dre.resultado / goal)
    : 0;
  const percentageText = `${(progress * 100).toFixed(0)}%`;
  const isGoalLabelOnBar = progress > 0.25;
  const isPercentageLabelOnBar = progress >= 1;

  const insights = [];
  const { resultado, receitaLiquida, despesas, cogs } = dre;

  // Insight 1: Análise do Resultado vs. Meta
  if (goal > 0) {
    if (resultado >= goal) {
      insights.push({
        type: 'positive',
        icon: '📈',
        text: (
          <>
            <strong>Meta Atingida!</strong> O resultado de{' '}
            <strong>{fmtBRL(resultado)}</strong> superou a meta de {fmtBRL(goal)}.
          </>
        ),
      });
    } else if (resultado > 0) {
      insights.push({
        type: 'info',
        icon: '💡',
        text: (
          <>
            O resultado de <strong>{fmtBRL(resultado)}</strong> está a{' '}
            <strong>{fmtBRL(goal - resultado)}</strong> de atingir a meta.
          </>
        ),
      });
    } else {
      insights.push({
        type: 'negative',
        icon: '📉',
        text: (
          <>
            O resultado foi <strong>negativo</strong> em{' '}
            <strong>{fmtBRL(resultado)}</strong>, ficando longe da meta de{' '}
            {fmtBRL(goal)}.
          </>
        ),
      });
    }
  }

  // Insight 2: Análise das Despesas
  if (despesas > receitaLiquida && resultado < 0) {
    insights.push({
      type: 'negative',
      icon: '📉',
      text: (
        <>
          As <strong>despesas</strong> de <strong>{fmtBRL(despesas)}</strong>{' '}
          foram o principal fator para o resultado negativo.
        </>
      ),
    });
  }

  // Insight 3: Análise da Margem de Contribuição
  const margem = receitaLiquida - cogs;
  if (receitaLiquida > 0 && margem < receitaLiquida * 0.4) {
    insights.push({
      type: 'info',
      icon: '💡',
      text: (
        <>
          A <strong>margem de contribuição</strong> está em{' '}
          <strong>{fmtBRL(margem)}</strong>. Analise se os custos (COGS) estão
          adequados.
        </>
      ),
    });
  }
  
  // Mensagem padrão se nenhum insight for gerado
  if (insights.length === 0 && dre.receitaLiquida > 0) {
    insights.push({
      type: 'info',
      icon: '💡',
      text: 'Nenhuma observação automática gerada para este período.',
    });
  }

  return (
    <div className="stack">
      <div className="filter-container">
        <Filter />
      </div>

      <div className="grid kpis">
        <Card title="Receita Líquida" value={fmtBRL(dre.receitaLiquida)} />
        <Card title="COGS" value={fmtBRL(dre.cogs)} />
        <Card title="Despesas" value={fmtBRL(dre.despesas)} />

        <Card title="Resultado" value={fmtBRL(dre.resultado)}>
          {goal > 0 && (
            <div className="card-body-goal">
              <div className="progress">
                <div className="bar" style={{ width: `${progress * 100}%` }} />
                
                <span className={`progress-label ${isGoalLabelOnBar ? 'on-bar' : ''}`}>
                  {fmtBRL(goal)}
                </span>
                
                <span className={`progress-percentage ${isPercentageLabelOnBar ? 'on-bar' : ''}`}>
                  {percentageText}
                </span>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="panel">
        <h3>Timeline de Caixa ({month})</h3>
        <LineChart data={timeline.map((p) => ({ date: p.date, value: p.value }))} />
      </div>

      <div className="panel">
        <h3>Insights</h3>
        {insights.length > 0 ? (
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <div key={index} className={`insight-card ${insight.type}`}>
                <p>{insight.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">
            Aguardando dados para gerar insights...
          </p>
        )}
      </div>
    </div>
  );
}