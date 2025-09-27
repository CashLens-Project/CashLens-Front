import { useEffect, useState, useMemo } from 'react';
import { useFiltersStore, useGoalsStore } from '../../app/store.js';
import {
  formatarMoeda,
  formatarPercentual,
  gerarDadosMockados,
  validarDados
} from '../../utils/dreCalculations.js';
import Filter from '../../components/ui/Filter.jsx';
import './DREView.css';

const DREViewEnhanced = () => {
  // Estado global padronizado (mesmo do Filter)
  const month = useFiltersStore((s) => s.month);
  const goals = useGoalsStore((s) => s.goals);

  const [dadosDRE, setDadosDRE] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Meta (global) do mês atual
  const metaDoMes = useMemo(() => {
    const v = goals?.[month];
    return typeof v === 'number' && !Number.isNaN(v) ? v : null;
  }, [goals, month]);

  // Carregar dados com base no month global (padronizado)
  useEffect(() => {
    let ativo = true;

    const carregarDados = async () => {
      setCarregando(true);
      setErro(null);

      try {
        // Simula delay de API
        await new Promise((r) => setTimeout(r, 800));

        // Gera dados mockados com base no mês
        const base = gerarDadosMockados(month);

        // Se existir meta cadastrada para o mês, aplica e recalcula o % atingido
        if (metaDoMes !== null) {
          const resultado = base.resultado ?? 0;
          const percentualAtingido =
            metaDoMes > 0 ? (resultado / metaDoMes) * 100 : 0;

          base.meta = {
            ...(base.meta ?? {}),
            valor: metaDoMes,
            percentualAtingido
          };
        }

        // Valida
        const validacao = validarDados(base);
        if (!validacao.valido) {
          throw new Error(`Dados inválidos: ${validacao.erros.join(', ')}`);
        }

        if (ativo) setDadosDRE(base);
      } catch (e) {
        if (ativo) setErro(e.message);
      } finally {
        if (ativo) setCarregando(false);
      }
    };

    carregarDados();
    return () => {
      ativo = false;
    };
  }, [month, metaDoMes]);

  const exportarExcel = () => {
    if (!dadosDRE) return;

    const dadosExport = {
      periodo: month, // padronizado: usamos o month global
      receitaLiquida: dadosDRE.receitaLiquida,
      cogs: dadosDRE.cogs,
      despesas: dadosDRE.despesas.total,
      resultado: dadosDRE.resultado,
      meta: dadosDRE.meta?.valor ?? null,
      percentualMeta: dadosDRE.meta?.percentualAtingido ?? null
    };

    console.log('Dados para exportação:', dadosExport);
    alert('Exportação será implementada com a integração ao backend.');
  };

  if (carregando) {
    return (
      <div className="dre-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados do DRE...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="dre-container">
        <div className="error-container">
          <h2>Erro ao carregar dados</h2>
          <p>{erro}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!dadosDRE) {
    return (
      <div className="dre-container">
        <div className="no-data-container">
          <h2>Nenhum dado encontrado</h2>
          <p>Não há dados disponíveis para o mês selecionado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dre-container">
      <div className="dre-header">
        <h1>Demonstrativo do Resultado do Exercício (DRE)</h1>

        {/* Cabeçalho padronizado: usa o mesmo componente Filter */}
        <div className="periodo-selector">
          {/* Se não quiser metas aqui, use <Filter goalsEnabled={false} /> */}
          <Filter goalsEnabled={true} />
        </div>
      </div>

      <div className="dre-content">
        <div className="dre-section receitas">
          <h2>RECEITAS OPERACIONAIS</h2>
          <div className="dre-item">
            <span className="item-label">Receita Bruta de Vendas</span>
            <span className="item-value">
              {formatarMoeda((dadosDRE.receitaLiquida ?? 0) + 7500)}
            </span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Impostos sobre Vendas</span>
            <span className="item-value negative">{formatarMoeda(5000)}</span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Descontos Concedidos</span>
            <span className="item-value negative">{formatarMoeda(2500)}</span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Receita Líquida</span>
            <span className="item-value">{formatarMoeda(dadosDRE.receitaLiquida)}</span>
          </div>
        </div>

        <div className="dre-section custos">
          <h2>CUSTOS DOS PRODUTOS VENDIDOS</h2>
          <div className="dre-item">
            <span className="item-label">(-) Custo das Mercadorias Vendidas (CMV)</span>
            <span className="item-value negative">{formatarMoeda(dadosDRE.cogs)}</span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Lucro Bruto</span>
            <span className="item-value">
              {formatarMoeda((dadosDRE.receitaLiquida ?? 0) - (dadosDRE.cogs ?? 0))}
            </span>
            <span className="item-percentage">
              {formatarPercentual(dadosDRE.margens.bruta)}
            </span>
          </div>
        </div>

        <div className="dre-section despesas">
          <h2>DESPESAS OPERACIONAIS</h2>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Administrativas</span>
            <span className="item-value negative">
              {formatarMoeda(dadosDRE.despesas.administrativas)}
            </span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Comerciais</span>
            <span className="item-value negative">
              {formatarMoeda(dadosDRE.despesas.comerciais)}
            </span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Financeiras</span>
            <span className="item-value negative">
              {formatarMoeda(dadosDRE.despesas.financeiras)}
            </span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Total de Despesas Operacionais</span>
            <span className="item-value negative">
              {formatarMoeda(dadosDRE.despesas.total)}
            </span>
          </div>
        </div>

        <div className="dre-section resultado">
          <h2>RESULTADO DO EXERCÍCIO</h2>
          <div className="dre-total">
            <span className="item-label">Resultado Líquido do Exercício</span>
            <span className={`item-value ${dadosDRE.resultado >= 0 ? 'positive' : 'negative'}`}>
              {formatarMoeda(dadosDRE.resultado)}
            </span>
            <span className="item-percentage">
              {formatarPercentual(dadosDRE.margens.liquida)}
            </span>
          </div>
        </div>

        <div className="dre-section meta">
          <h2>META vs REAL</h2>
          <div className="meta-comparison">
            <div className="meta-item">
              <span className="meta-label">Meta do Mês ({month})</span>
              <span className="meta-value">
                {formatarMoeda(dadosDRE.meta?.valor ?? 0)}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Resultado Real</span>
              <span className="meta-value">{formatarMoeda(dadosDRE.resultado)}</span>
            </div>
            <div className="meta-item achievement">
              <span className="meta-label">% Atingido</span>
              <span
                className={`meta-percentage ${(dadosDRE.meta?.percentualAtingido ?? 0) >= 100 ? 'success' : 'warning'
                  }`}
              >
                {formatarPercentual(dadosDRE.meta?.percentualAtingido ?? 0)}
              </span>
            </div>
          </div>

          <div className="meta-analysis">
            <div className="analysis-item">
              <span className="analysis-label">Status da Meta:</span>
              <span
                className={`analysis-value ${(dadosDRE.meta?.percentualAtingido ?? 0) >= 100 ? 'success' : 'warning'
                  }`}
              >
                {(dadosDRE.meta?.percentualAtingido ?? 0) >= 100
                  ? 'Meta Atingida'
                  : 'Meta Não Atingida'}
              </span>
            </div>
            <div className="analysis-item">
              <span className="analysis-label">Diferença:</span>
              <span
                className={`analysis-value ${(dadosDRE.resultado - (dadosDRE.meta?.valor ?? 0)) >= 0
                    ? 'positive'
                    : 'negative'
                  }`}
              >
                {formatarMoeda(
                  Math.abs(dadosDRE.resultado - (dadosDRE.meta?.valor ?? 0))
                )}
                {dadosDRE.resultado >= (dadosDRE.meta?.valor ?? 0) ? ' acima' : ' abaixo'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="dre-actions">
        <button className="btn-primary" onClick={() => window.print()}>
          Imprimir DRE
        </button>
        <button className="btn-secondary" onClick={exportarExcel}>
          Exportar Excel
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            // Atualiza com base no month atual (e reaplica meta global)
            const novo = gerarDadosMockados(month);
            if (metaDoMes !== null) {
              const resultado = novo.resultado ?? 0;
              novo.meta = {
                ...(novo.meta ?? {}),
                valor: metaDoMes,
                percentualAtingido: metaDoMes > 0 ? (resultado / metaDoMes) * 100 : 0
              };
            }
            setDadosDRE(novo);
          }}
        >
          Atualizar Dados
        </button>
      </div>
    </div>
  );
};

export default DREViewEnhanced;
