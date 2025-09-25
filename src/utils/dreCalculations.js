/**
 * Módulo de cálculos financeiros para o DRE
 */

/**
 * Calcula a Receita Líquida
 * Fórmula: Σ(netRevenue − taxes − discounts) do mês
 * @param {Array} vendas - Array de vendas do período
 * @returns {number} Receita líquida total
 */
export const calcularReceitaLiquida = (vendas = []) => {
    return vendas.reduce((total, venda) => {
        const receitaLiquida = (venda.netRevenue || 0) - (venda.taxes || 0) - (venda.discounts || 0);
        return total + receitaLiquida;
    }, 0);
};

/**
 * Calcula o COGS (Custo dos Produtos Vendidos)
 * Fórmula: Σ(qty × cost) de itens cujas vendas ocorram no mês
 * @param {Array} itensVendidos - Array de itens vendidos no período
 * @returns {number} COGS total
 */
export const calcularCOGS = (itensVendidos = []) => {
    return itensVendidos.reduce((total, item) => {
        const custoItem = (item.qty || 0) * (item.cost || 0);
        return total + custoItem;
    }, 0);
};

/**
 * Calcula o total de despesas
 * Fórmula: Σ(value) de Expenses no mês
 * @param {Array} despesas - Array de despesas do período
 * @returns {number} Total de despesas
 */
export const calcularDespesas = (despesas = []) => {
    return despesas.reduce((total, despesa) => {
        return total + (despesa.value || 0);
    }, 0);
};

/**
 * Calcula o resultado final
 * Fórmula: Receita Líquida − COGS − Despesas
 * @param {number} receitaLiquida - Receita líquida calculada
 * @param {number} cogs - COGS calculado
 * @param {number} despesas - Despesas calculadas
 * @returns {number} Resultado final
 */
export const calcularResultado = (receitaLiquida, cogs, despesas) => {
    return receitaLiquida - cogs - despesas;
};

/**
 * Calcula a porcentagem atingida da meta
 * @param {number} resultadoReal - Resultado real obtido
 * @param {number} meta - Meta estabelecida
 * @returns {number} Porcentagem atingida (0-100+)
 */
export const calcularPercentualMeta = (resultadoReal, meta) => {
    if (!meta || meta === 0) return 0;
    return (resultadoReal / meta) * 100;
};

/**
 * Calcula a margem bruta
 * @param {number} receitaLiquida - Receita líquida
 * @param {number} cogs - Custo dos produtos vendidos
 * @returns {number} Margem bruta em porcentagem
 */
export const calcularMargemBruta = (receitaLiquida, cogs) => {
    if (!receitaLiquida || receitaLiquida === 0) return 0;
    const lucroBruto = receitaLiquida - cogs;
    return (lucroBruto / receitaLiquida) * 100;
};

/**
 * Calcula a margem líquida
 * @param {number} resultadoLiquido - Resultado líquido
 * @param {number} receitaLiquida - Receita líquida
 * @returns {number} Margem líquida em porcentagem
 */
export const calcularMargemLiquida = (resultadoLiquido, receitaLiquida) => {
    if (!receitaLiquida || receitaLiquida === 0) return 0;
    return (resultadoLiquido / receitaLiquida) * 100;
};

/**
 * Formata valores monetários para exibição
 * @param {number} valor - Valor a ser formatado
 * @param {string} moeda - Código da moeda (padrão: BRL)
 * @returns {string} Valor formatado
 */
export const formatarMoeda = (valor, moeda = 'BRL') => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: moeda,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor || 0);
};

/**
 * Formata porcentagens para exibição
 * @param {number} valor - Valor da porcentagem
 * @param {number} decimais - Número de casas decimais (padrão: 2)
 * @returns {string} Porcentagem formatada
 */
export const formatarPercentual = (valor, decimais = 2) => {
    return `${(valor || 0).toFixed(decimais)}%`;
};

/**
 * Gera dados mockados para demonstração
 */
export const gerarDadosMockados = (periodo = '2024-01') => {
    // Simula vendas do período
    const vendas = [
        { netRevenue: 50000, taxes: 5000, discounts: 2000 },
        { netRevenue: 30000, taxes: 3000, discounts: 1000 },
        { netRevenue: 25000, taxes: 2500, discounts: 500 }
    ];

    // Simula itens vendidos
    const itensVendidos = [
        { qty: 100, cost: 150 },
        { qty: 80, cost: 120 },
        { qty: 60, cost: 100 }
    ];

    // Simula despesas
    const despesas = [
        { value: 8000, categoria: 'Administrativas' },
        { value: 5000, categoria: 'Comerciais' },
        { value: 2000, categoria: 'Financeiras' }
    ];

    const receitaLiquida = calcularReceitaLiquida(vendas);
    const cogs = calcularCOGS(itensVendidos);
    const totalDespesas = calcularDespesas(despesas);
    const resultado = calcularResultado(receitaLiquida, cogs, totalDespesas);

    return {
        periodo,
        receitaLiquida,
        cogs,
        despesas: {
            administrativas: 8000,
            comerciais: 5000,
            financeiras: 2000,
            total: totalDespesas
        },
        resultado,
        meta: {
            valor: 50000,
            percentualAtingido: calcularPercentualMeta(resultado, 50000)
        },
        margens: {
            bruta: calcularMargemBruta(receitaLiquida, cogs),
            liquida: calcularMargemLiquida(resultado, receitaLiquida)
        }
    };
};

/**
 * Valida se os dados estão no formato correto
 * @param {Object} dados - Dados a serem validados
 * @returns {Object} Resultado da validação
 */
export const validarDados = (dados) => {
    const erros = [];

    if (!dados) {
        erros.push('Dados não fornecidos');
        return { valido: false, erros };
    }

    if (typeof dados.receitaLiquida !== 'number' || dados.receitaLiquida < 0) {
        erros.push('Receita líquida deve ser um número positivo');
    }

    if (typeof dados.cogs !== 'number' || dados.cogs < 0) {
        erros.push('COGS deve ser um número positivo');
    }

    if (dados.despesas && typeof dados.despesas.total !== 'number') {
        erros.push('Total de despesas deve ser um número');
    }

    return {
        valido: erros.length === 0,
        erros
    };
};
