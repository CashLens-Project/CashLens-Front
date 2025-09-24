import React, { useState, useEffect } from 'react';
import {
  calcularReceitaLiquida,
  calcularCOGS,
  calcularDespesas,
  calcularResultado,
  calcularPercentualMeta,
  calcularMargemBruta,
  calcularMargemLiquida,
  formatarMoeda,
  formatarPercentual,
  gerarDadosMockados,
  validarDados
} from '../../utils/dreCalculations.js';
import './DREView.css';

const DREViewEnhanced = () => {
  const [periodo, setPeriodo] = useState({
    inicio: new Date().toISOString().slice(0, 7),
    fim: new Date().toISOString().slice(0, 7)
  });

  const [dadosDRE, setDadosDRE] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Simula carregamento de dados
  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      setErro(null);

      try {
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Gera dados mockados baseados no período
        const dados = gerarDadosMockados(periodo.inicio);

        // Valida os dados
        const validacao = validarDados(dados);
        if (!validacao.valido) {
          throw new Error(`Dados inválidos: ${validacao.erros.join(', ')}`);
        }

        setDadosDRE(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [periodo]);

  const handlePeriodoChange = (campo, valor) => {
    setPeriodo(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const exportarExcel = () => {
    if (!dadosDRE) return;

    // exportação para Excel
    // Por enquanto, apenas simula a ação
    const dadosExport = {
      periodo: `${periodo.inicio} a ${periodo.fim}`,
      receitaLiquida: dadosDRE.receitaLiquida,
      cogs: dadosDRE.cogs,
      despesas: dadosDRE.despesas.total,
      resultado: dadosDRE.resultado,
      meta: dadosDRE.meta.valor,
      percentualMeta: dadosDRE.meta.percentualAtingido
    };

    console.log('Dados para exportação:', dadosExport);
    alert('Funcionalidade de exportação será implementada com integração ao backend');
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
          <p>Não há dados disponíveis para o período selecionado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dre-container">
      <div className="dre-header">
        <h1>Demonstrativo do Resultado do Exercício (DRE)</h1>
        <div className="periodo-selector">
          <label>
            Período:
            <input
              type="month"
              value={periodo.inicio}
              onChange={(e) => handlePeriodoChange('inicio', e.target.value)}
            />
            até
            <input
              type="month"
              value={periodo.fim}
              onChange={(e) => handlePeriodoChange('fim', e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="dre-content">
        <div className="dre-section receitas">
          <h2>RECEITAS OPERACIONAIS</h2>
          <div className="dre-item">
            <span className="item-label">Receita Bruta de Vendas</span>
            <span className="item-value">{formatarMoeda(dadosDRE.receitaLiquida + 7500)}</span>
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
            <span className="item-value">{formatarMoeda(dadosDRE.receitaLiquida - dadosDRE.cogs)}</span>
            <span className="item-percentage">
              {formatarPercentual(dadosDRE.margens.bruta)}
            </span>
          </div>
        </div>

        <div className="dre-section despesas">
          <h2>DESPESAS OPERACIONAIS</h2>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Administrativas</span>
            <span className="item-value negative">{formatarMoeda(dadosDRE.despesas.administrativas)}</span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Comerciais</span>
            <span className="item-value negative">{formatarMoeda(dadosDRE.despesas.comerciais)}</span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Financeiras</span>
            <span className="item-value negative">{formatarMoeda(dadosDRE.despesas.financeiras)}</span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Total de Despesas Operacionais</span>
            <span className="item-value negative">{formatarMoeda(dadosDRE.despesas.total)}</span>
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
              <span className="meta-label">Meta do Período</span>
              <span className="meta-value">{formatarMoeda(dadosDRE.meta.valor)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Resultado Real</span>
              <span className="meta-value">{formatarMoeda(dadosDRE.resultado)}</span>
            </div>
            <div className="meta-item achievement">
              <span className="meta-label">% Atingido</span>
              <span className={`meta-percentage ${dadosDRE.meta.percentualAtingido >= 100 ? 'success' : 'warning'}`}>
                {formatarPercentual(dadosDRE.meta.percentualAtingido)}
              </span>
            </div>
          </div>

          <div className="meta-analysis">
            <div className="analysis-item">
              <span className="analysis-label">Status da Meta:</span>
              <span className={`analysis-value ${dadosDRE.meta.percentualAtingido >= 100 ? 'success' : 'warning'}`}>
                {dadosDRE.meta.percentualAtingido >= 100 ? 'Meta Atingida' : 'Meta Não Atingida'}
              </span>
            </div>
            <div className="analysis-item">
              <span className="analysis-label">Diferença:</span>
              <span className={`analysis-value ${dadosDRE.resultado - dadosDRE.meta.valor >= 0 ? 'positive' : 'negative'}`}>
                {formatarMoeda(Math.abs(dadosDRE.resultado - dadosDRE.meta.valor))}
                {dadosDRE.resultado >= dadosDRE.meta.valor ? ' acima' : ' abaixo'}
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
        <button className="btn-secondary" onClick={() => {
          const dados = gerarDadosMockados(periodo.inicio);
          setDadosDRE(dados);
        }}>
          Atualizar Dados
        </button>
      </div>
    </div>
  );
};

export default DREViewEnhanced;

