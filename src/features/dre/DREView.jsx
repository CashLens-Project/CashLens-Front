import React, { useState, useEffect } from 'react';
import './DREView.css';

const DREView = () => {
  const [dreData, setDreData] = useState({
    receitas: {
      vendasMercadorias: 0,
      outrasReceitas: 0,
      receitasOperacionais: 0
    },
    custos: {
      custoMercadoriaVendida: 0
    },
    despesas: {
      despesasAdministrativas: 0,
      despesasComerciais: 0,
      despesasFinanceiras: 0
    },
    meta: {
      valor: 0,
      existe: false
    }
  });

  const [periodo, setPeriodo] = useState({
    inicio: new Date().toISOString().slice(0, 7),
    fim: new Date().toISOString().slice(0, 7)
  });

  // Cálculos do DRE
  const calcularReceitaLiquida = () => {
    return dreData.receitas.vendasMercadorias + dreData.receitas.outrasReceitas;
  };

  const calcularLucroBruto = () => {
    return calcularReceitaLiquida() - dreData.custos.custoMercadoriaVendida;
  };

  const calcularTotalDespesas = () => {
    return dreData.despesas.despesasAdministrativas +
      dreData.despesas.despesasComerciais +
      dreData.despesas.despesasFinanceiras;
  };

  const calcularResultadoLiquido = () => {
    return calcularLucroBruto() - calcularTotalDespesas();
  };

  const calcularPercentualMeta = () => {
    if (!dreData.meta.existe || dreData.meta.valor === 0) return 0;
    return (calcularResultadoLiquido() / dreData.meta.valor) * 100;
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarPercentual = (valor) => {
    return `${valor.toFixed(2)}%`;
  };

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
              onChange={(e) => setPeriodo({ ...periodo, inicio: e.target.value })}
            />
            até
            <input
              type="month"
              value={periodo.fim}
              onChange={(e) => setPeriodo({ ...periodo, fim: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div className="dre-content">
        <div className="dre-section receitas">
          <h2>RECEITAS</h2>
          <div className="dre-item">
            <span className="item-label">Vendas de Mercadorias/Produtos/Serviços</span>
            <span className="item-value">{formatarMoeda(dreData.receitas.vendasMercadorias)}</span>
          </div>
          <div className="dre-item">
            <span className="item-label">Outras Receitas</span>
            <span className="item-value">{formatarMoeda(dreData.receitas.outrasReceitas)}</span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Receita Líquida</span>
            <span className="item-value">{formatarMoeda(calcularReceitaLiquida())}</span>
          </div>
        </div>

        <div className="dre-section custos">
          <h2>CUSTOS</h2>
          <div className="dre-item">
            <span className="item-label">(-) Custo da Mercadoria Vendida (CMV)</span>
            <span className="item-value negative">{formatarMoeda(dreData.custos.custoMercadoriaVendida)}</span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Lucro Bruto</span>
            <span className="item-value">{formatarMoeda(calcularLucroBruto())}</span>
            <span className="item-percentage">
              {calcularReceitaLiquida() > 0 ? formatarPercentual((calcularLucroBruto() / calcularReceitaLiquida()) * 100) : '0.00%'}
            </span>
          </div>
        </div>

        <div className="dre-section despesas">
          <h2>DESPESAS OPERACIONAIS</h2>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Administrativas</span>
            <span className="item-value negative">{formatarMoeda(dreData.despesas.despesasAdministrativas)}</span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Comerciais</span>
            <span className="item-value negative">{formatarMoeda(dreData.despesas.despesasComerciais)}</span>
          </div>
          <div className="dre-item">
            <span className="item-label">(-) Despesas Financeiras</span>
            <span className="item-value negative">{formatarMoeda(dreData.despesas.despesasFinanceiras)}</span>
          </div>
          <div className="dre-subtotal">
            <span className="item-label">Total de Despesas Operacionais</span>
            <span className="item-value negative">{formatarMoeda(calcularTotalDespesas())}</span>
          </div>
        </div>

        <div className="dre-section resultado">
          <h2>RESULTADO</h2>
          <div className="dre-total">
            <span className="item-label">Resultado Líquido do Exercício</span>
            <span className={`item-value ${calcularResultadoLiquido() >= 0 ? 'positive' : 'negative'}`}>
              {formatarMoeda(calcularResultadoLiquido())}
            </span>
          </div>
        </div>

        {dreData.meta.existe && (
          <div className="dre-section meta">
            <h2>META vs REAL</h2>
            <div className="meta-comparison">
              <div className="meta-item">
                <span className="meta-label">Meta do Período</span>
                <span className="meta-value">{formatarMoeda(dreData.meta.valor)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Resultado Real</span>
                <span className="meta-value">{formatarMoeda(calcularResultadoLiquido())}</span>
              </div>
              <div className="meta-item achievement">
                <span className="meta-label">% Atingido</span>
                <span className={`meta-percentage ${calcularPercentualMeta() >= 100 ? 'success' : 'warning'}`}>
                  {formatarPercentual(calcularPercentualMeta())}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="dre-actions">
        <button className="btn-primary" onClick={() => window.print()}>
          Imprimir DRE
        </button>
        <button className="btn-secondary" onClick={() => {
          //exportação para Excel
          console.log('Exportar para Excel');
        }}>
          Exportar Excel
        </button>
      </div>
    </div>
  );
};

export default DREView;

