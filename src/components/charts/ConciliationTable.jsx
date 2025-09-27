export default function ConciliationTable({
  filteredMatches,
  unmatchedSales,
  filteredUnmatchedPayouts,
  sales,
  payouts,
  matches,
  money,
  getStatus,
}) {
  return (
    <div className="conciliation-table">
      <div className="cv-table-wrap">
        <table className="cv-table">
          <thead>
            <tr>
              <th>Venda</th>
              <th>Data</th>
              <th>Valor líquido</th>
              <th>Repasse(s)</th>
              <th>Total repassado</th>
              <th>Δ Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMatches.map(({ sale, payouts }) => {
              const totalPayout = payouts.reduce((sum, p) => sum + p.netValue, 0);
              const delta = totalPayout - sale.netRevenue;
              const status = getStatus(sale, payouts);
              return (
                <tr key={sale.id} className={status === "Conciliado" ? "row-ok" : "row-bad"}>
                  <td className="mono" data-label="Venda">{sale.id}</td>
                  <td data-label="Data">{sale.date}</td>
                  <td data-label="Valor líquido">{money.format(sale.netRevenue)}</td>
                  <td className="wrap" data-label="Repasse(s)">
                    {payouts.map((p) => `${p.id} (${p.method})`).join(", ")}
                  </td>
                  <td data-label="Total repassado">{money.format(totalPayout)}</td>
                  <td
                    data-label="Δ Valor"
                    className={delta === 0 ? "delta-ok" : delta > 0 ? "delta-pos" : "delta-neg"}
                  >
                    {money.format(delta)}
                  </td>
                  <td data-label="Status">
                    <span className={status === "Conciliado" ? "pill pill-ok" : "pill pill-bad"}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {unmatchedSales.map((sale) => (
              <tr key={sale.id} className="row-warn">
                <td className="mono" data-label="Venda">{sale.id}</td>
                <td data-label="Data">{sale.date}</td>
                <td data-label="Valor líquido">{money.format(sale.netRevenue)}</td>
                <td data-label="Repasse(s)">—</td>
                <td data-label="Total repassado">—</td>
                <td data-label="Δ Valor">—</td>
                <td data-label="Status"><span className="pill pill-warn">Sem repasse</span></td>
              </tr>
            ))}

            {filteredUnmatchedPayouts.map((payout) => (
              <tr key={payout.id} className="row-info">
                <td data-label="Venda">—</td>
                <td data-label="Data">{payout.date}</td>
                <td data-label="Valor líquido">—</td>
                <td data-label="Repasse(s)">{payout.id} ({payout.method})</td>
                <td data-label="Total repassado">{money.format(payout.netValue)}</td>
                <td data-label="Δ Valor">—</td>
                <td data-label="Status"><span className="pill pill-info">Repasse sem venda</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cv-foot">
        <div><strong>Vendas carregadas:</strong> {sales.length}</div>
        <div><strong>Repasses carregados:</strong> {payouts.length}</div>
        <div><strong>Vendas casadas:</strong> {matches.length}</div>
        <div><strong>Vendas sem repasse:</strong> {unmatchedSales.length}</div>
        <div><strong>Repasses sem venda:</strong> {filteredUnmatchedPayouts.length}</div>
      </div>
    </div>
  );
}