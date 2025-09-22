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