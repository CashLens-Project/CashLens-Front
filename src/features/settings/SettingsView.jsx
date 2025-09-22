import { useFiltersStore, useGoalsStore } from '../../app/store.js';

export default function SettingsView() {
  const month = useFiltersStore((s) => s.month);
  const setMonth = useFiltersStore((s) => s.setMonth);
  const goals = useGoalsStore((s) => s.goals);
  const setGoal = useGoalsStore((s) => s.setGoal);

  return (
    <div className="panel">
      <h3>Configurações</h3>
      <div className="row">
        <label>
          Mês:
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
      </div>
      <div className="row">
        <label>
          Meta ({month}):
          <input
            type="number"
            placeholder="0,00"
            value={goals[month] ?? ''}
            onChange={(e) => setGoal(month, e.target.value)}
          />
        </label>
      </div>
      <p style={{ opacity: 0.7, marginTop: 16 }}>
        Upload de Excel/CSV e configurações de API serão adicionados
        posteriormente.
      </p>
    </div>
  );
}