export function computeDRE(bundle, month) {
  const inMonth = (date) => (date || '').slice(0, 7) === month;

  const receitaLiquida = (bundle.sales || [])
    .filter((s) => inMonth(s.date))
    .reduce(
      (sum, s) => sum + (s.netRevenue || 0) - (s.taxes || 0) - (s.discounts || 0),
      0,
    );

  const cogs = (bundle.items || [])
    .filter((i) => {
      const sale = (bundle.sales || []).find((s) => s.id === i.saleId);
      return sale && inMonth(sale.date);
    })
    .reduce((sum, i) => sum + (Number(i.qty || 0) * Number(i.cost || 0)), 0);

  const despesas = (bundle.expenses || [])
    .filter((e) => inMonth(e.date))
    .reduce((sum, e) => sum + (e.value || 0), 0);

  return {
    month,
    receitaLiquida,
    cogs,
    despesas,
    resultado: receitaLiquida - cogs - despesas,
  };
}

export function computeTimeline(bundle, month) {

  const dailyChanges = {};
  const inMonth = (date) => (date || '').slice(0, 7) === month;

  (bundle.payouts || []).forEach((p) => {
    if (inMonth(p.date)) {
      dailyChanges[p.date] = (dailyChanges[p.date] || 0) + (p.netValue || 0);
    }
  });
  (bundle.expenses || []).forEach((e) => {
    if (inMonth(e.date)) {
      dailyChanges[e.date] = (dailyChanges[e.date] || 0) - (e.value || 0);
    }
  });

  const dates = Object.keys(dailyChanges).sort();
  let saldo = 0;
  return dates.map((d) => {
    saldo += dailyChanges[d];
    return { date: d, value: saldo };
  });
}


export function computeWaterfall(bundle, month) {
  const inMonth = (date) => (date || "").slice(0, 7) === month;

  // 1. Receita Bruta
  const receitaBruta = (bundle.sales || [])
    .filter((s) => inMonth(s.date))
    .reduce((sum, s) => sum + (s.netRevenue || 0) + (s.taxes || 0) + (s.discounts || 0), 0);

  // 2. Deduções (Impostos e Descontos)
  const deducoes = (bundle.sales || [])
    .filter((s) => inMonth(s.date))
    .reduce((sum, s) => sum + (s.taxes || 0) + (s.discounts || 0), 0);

  // 3. Receita Líquida
  const receitaLiquida = receitaBruta - deducoes;

  // 4. COGS (Custo das Mercadorias Vendidas)
  const cogs = (bundle.items || [])
    .filter((i) => {
      const sale = (bundle.sales || []).find((s) => s.id === i.saleId);
      return sale && inMonth(sale.date);
    })
    .reduce((sum, i) => sum + (Number(i.qty || 0) * Number(i.cost || 0)), 0);

  // 5. Margem Bruta
  const margemBruta = receitaLiquida - cogs;

  // 6. Despesas Operacionais
  const despesasOperacionais = (bundle.expenses || [])
    .filter((e) => inMonth(e.date))
    .reduce((sum, e) => sum + (e.value || 0), 0);

  // 7. Resultado (Lucro Operacional Final)
  const resultado = margemBruta - despesasOperacionais;

  const data = [
    { name: "Receita Bruta", value: receitaBruta },
    { name: "Deduções", value: -deducoes },
    { name: "Receita Líquida", value: receitaLiquida },
    { name: "COGS", value: -cogs },
    { name: "Margem Bruta", value: margemBruta },
    { name: "Despesas Operacionais", value: -despesasOperacionais },
    { name: "Resultado", value: resultado },
  ];

  let currentBase = 0;
  const waterfallChartData = [];

  data.forEach((item, index) => {
    if (item.name === "Receita Bruta") {
      waterfallChartData.push({ name: item.name, value: item.value, base: 0 });
      currentBase = item.value;
    } else if (item.name === "Receita Líquida" || item.name === "Margem Bruta" || item.name === "Resultado") {
      waterfallChartData.push({ name: item.name, value: item.value, base: 0 });
      currentBase = item.value;
    } else {
      waterfallChartData.push({ name: item.name, value: item.value, base: currentBase });
      currentBase += item.value;
    }
  });

  return waterfallChartData;
}

