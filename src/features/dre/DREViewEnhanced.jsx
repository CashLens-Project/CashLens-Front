import { useEffect, useMemo, useState } from 'react';
import { useFiltersStore, useGoalsStore } from '../../app/store.js';
import { provider } from '../../data/providers'; // usa o LocalProvider via index.js
import Filter from '../../components/ui/Filter'; // ajuste o caminho se necessário
import { formatarMoeda, formatarPercentual } from '../../utils/dreCalculations.js';
import './DREView.css';

function somar(arr) {
  return (arr || []).reduce((s, v) => s + (Number(v) || 0), 0);
}

export default function DREViewEnhanced() {
  const month = useFiltersStore((s) => s.month);
  const goals = useGoalsStore((s) => s.goals);

  const [dadosDRE, setDadosDRE] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const metaDoMes = useMemo(() => {
    const v = goals?.[month];
    return typeof v === 'number' && !Number.isNaN(v) ? v : null;
  }, [goals, month]);

  useEffect(() => {
    let vivo = true;

    async function carregar() {
      try {
        setCarregando(true);
        setErro(null);

        // LocalStub (computeDRE)
        const dre = await provider.getDRE(month); // { month, receitaLiquida, cogs, despesas, resultado }

        // Carrega bundle para montar breakdown de despesas e fees financeiros
        const bundle = await provider.loadAll();

        const inMonth = (date) => (date || '').slice(0, 7) === month;

        // despesas por categoria:
        const despesasMes = (bundle.expenses || []).filter((e) => inMonth(e.date));

        const adminCats = new Set(['Aluguel', 'Serviços', 'Tecnologia', 'Pessoal']);
        const comerciaisCats = new Set(['Marketing']);

        const despesasAdministrativas = somar(
          despesasMes.filter((e) => adminCats.has(e.category)).map((e) => e.value)
        );

        const despesasComerciais = somar(
          despesasMes.filter((e) => comerciaisCats.has(e.category)).map((e) => e.value)
        );

        // financeiras via fee dos payouts
        const despesasFinanceiras = somar(
          (bundle.payouts || [])
            .filter((p) => inMonth(p.date))
            .map((p) => p.fee || 0)
        );

        const despesasTotal =
          despesasAdministrativas + despesasComerciais + despesasFinanceiras;

        // Garante que o total usado é coerente: prioriza o que veio de computeDRE,
        // mas se quiser “forçar” a soma das categorias, troque para despesasTotal.
        const despesasConsolidadas =
          typeof dre.despesas === 'number' ? dre.despesas : despesasTotal;

        // 3) Margens
        const receitaLiquida = Number(dre.receitaLiquida || 0);
        const cogs = Number(dre.cogs || 0);
        const resultado = Number(dre.resultado ?? receitaLiquida - cogs - despesasConsolidadas);

        const margemBrutaPct =
          receitaLiquida > 0 ? ((receitaLiquida - cogs) / receitaLiquida) * 100 : 0;
        const margemLiquidaPct =
          receitaLiquida > 0 ? (resultado / receitaLiquida) * 100 : 0;

        // 4) Meta (se houver no store)
        let meta = { valor: 0, percentualAtingido: 0 };
        if (metaDoMes !== null) {
          meta = {
            valor: metaDoMes,
            percentualAtingido: metaDoMes > 0 ? (resultado / metaDoMes) * 100 : 0,
          };
        }

        const model = {
          month,
          receitaLiquida,
          cogs,
          despesas: {
            administrativas: despesasAdministrativas,
            comerciais: despesasComerciais,
            financeiras: despesasFinanceiras,
            total: despesasConsolidadas,
          },
          resultado,
          margens: {
            bruta: margemBrutaPct,
            liquida: margemLiquidaPct,
          },
          meta,
        };

        if (vivo) setDadosDRE(model);
      } catch (e) {
        if (vivo) setErro(e.message || String(e));
      } finally {
        if (vivo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      vivo = false;
    };
  }, [month, metaDoMes]);

  const exportarExcel = () => {
    if (!dadosDRE) return;
    const dadosExport = {
      periodo: month,
      receitaLiquida: dadosDRE.receitaLiquida,
      cogs: dadosDRE.cogs,
      despesas: dadosDRE.despesas.total,
      resultado: dadosDRE.resultado,
      meta: dadosDRE.meta?.valor ?? null,
      percentualMeta: dadosDRE.meta?.percentualAtingido ?? null,
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
        <div className="periodo-selector">
          <Filter goalsEnabled={true} />
        </div>
      </div>

      <div className="dre-content">
        <div className="dre-section receitas">
          <h2>RECEITAS OPERACIONAIS</h2>
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
              {formatarMoeda(dadosDRE.receitaLiquida - dadosDRE.cogs)}
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
            <span className="item-label">(-) Despesas Financeiras (fees)</span>
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
              <span className="meta-value">{formatarMoeda(dadosDRE.meta.valor)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Resultado Real</span>
              <span className="meta-value">{formatarMoeda(dadosDRE.resultado)}</span>
            </div>
            <div className="meta-item achievement">
              <span className="meta-label">% Atingido</span>
              <span
                className={`meta-percentage ${dadosDRE.meta.percentualAtingido >= 100 ? 'success' : 'warning'
                  }`}
              >
                {formatarPercentual(dadosDRE.meta.percentualAtingido)}
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
            // Recarrega com base no mês atual
            setCarregando(true);
            setTimeout(() => setCarregando(false), 300);
          }}
        >
          Atualizar Dados
        </button>
      </div>
    </div>
  );
}
