export function fmtBRL(value = 0) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value || 0);
}

export function pct(value) {
  const num = typeof value === 'number' ? value : Number(value) || 0;
  return `${(num * 100).toFixed(1)}%`;
}