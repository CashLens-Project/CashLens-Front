import { useEffect, useState } from 'react';
import { provider } from '../../data/providers/index.js';
import { useFiltersStore, useGoalsStore } from '../../app/store.js';
import Filter from '../../components/ui/Filter/Filter.jsx';
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

  const margemBruta = receitaLiquida - cogs;
  const margemBrutaPercentual = receitaLiquida > 0 ? (margemBruta / receitaLiquida) * 100 : 0;
  const despesasOperacionaisPercentual = receitaLiquida > 0 ? (despesas / receitaLiquida) * 100 : 0;

  // Insight 1: Análise de Performance Financeira Geral
  if (goal > 0 && resultado >= goal) {
    insights.push({ type: 'positive', text: <><strong>Performance Excepcional.</strong> A meta de {fmtBRL(goal)} foi superada, alcançando um resultado de <strong>{fmtBRL(resultado)}</strong>. A estratégia atual demonstra alta eficácia e alinhamento com os objetivos.</> });
  } else if (resultado < 0) {
    insights.push({ type: 'negative', text: <><strong>Alerta de Rentabilidade.</strong> O mês encerrou com um prejuízo de <strong>{fmtBRL(resultado)}</strong>. É crucial realizar uma análise aprofundada da estrutura de custos e despesas para reverter este cenário e restaurar a lucratividade.</> });
  } else if (goal > 0 && resultado > 0) {
    insights.push({ type: 'info', text: <><strong>Operação Rentável, Meta Pendente.</strong> O lucro de <strong>{fmtBRL(resultado)}</strong> indica uma operação saudável. No entanto, o resultado está <strong>{((1 - resultado / goal) * 100).toFixed(0)}%</strong> abaixo da meta de {fmtBRL(goal)}, sugerindo a necessidade de otimizar a receita ou as despesas.</> });
  }

  // Insight 2: Análise da Estrutura de Custos e Despesas
  if (despesasOperacionaisPercentual > 65 && resultado < 0) {
    insights.push({ type: 'negative', text: <><strong>Ponto Crítico: Despesas Operacionais.</strong> As despesas consumiram <strong>{despesasOperacionaisPercentual.toFixed(0)}%</strong> da receita líquida, sendo o principal vetor do resultado negativo. Recomenda-se uma auditoria de gastos fixos e variáveis.</> });
  }

  // Insight 3: Análise da Margem Bruta
  if (margemBrutaPercentual < 40 && receitaLiquida > 0) {
    insights.push({ type: 'info', text: <><strong>Margem Bruta Sob Pressão.</strong> Sua margem de lucro bruto está em <strong>{margemBrutaPercentual.toFixed(0)}%</strong>. Este é um indicador de que a precificação pode não estar cobrindo adequadamente os custos diretos (COGS). Avalie a estratégia de preços e negocie com fornecedores.</> });
  } else if (margemBrutaPercentual > 60 && receitaLiquida > 0) {
    insights.push({ type: 'positive', text: <><strong>Excelente Eficiência de Custo.</strong> Com uma margem bruta de <strong>{margemBrutaPercentual.toFixed(0)}%</strong>, a relação entre o custo dos produtos e a receita está bem otimizada, criando uma base sólida para o lucro líquido.</> });
  }

  // Mensagem padrão se nenhum insight crítico for gerado
  if (insights.length === 0 && dre.receitaLiquida > 0) {
    insights.push({ type: 'info', text: <><strong>Operação Estável.</strong> Os indicadores financeiros do período estão dentro dos parâmetros esperados, sem alertas críticos ou picos de performance notáveis. A saúde financeira parece consistente.</> });
  }

  return (
    <div className='page-container'>
      <div className="stack">
      <div className="page-header">
        <h1>Fluxo de Caixa</h1>
        <div className="page-header-controls">
          <Filter />
        </div>
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
    </div>
  );
}