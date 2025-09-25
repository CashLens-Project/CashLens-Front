import { useFiltersStore, useGoalsStore } from '../../app/store.js';

export default function Filter() {
  const month = useFiltersStore((s) => s.month);
  const setMonth = useFiltersStore((s) => s.setMonth);
  const goals = useGoalsStore((s) => s.goals);
  const setGoal = useGoalsStore((s) => s.setGoal);

  const goalValue = goals[month] ?? '';

  return (
    <div className="controls">
      <label>
        Mês:
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>
      <label>
        Meta ({month}):
        <input
          type="number"
          placeholder="0,00"
          value={goalValue}
          onChange={(e) => setGoal(month, e.target.value)}
          style={{ width: 120 }}
        />
      </label>
    </div>
  );
}