import { useFiltersStore, useGoalsStore } from '../../app/store.js';

export default function Filter() {
  const month = useFiltersStore((s) => s.month);
  const setMonth = useFiltersStore((s) => s.setMonth);
  const goals = useGoalsStore((s) => s.goals);
  const setGoal = useGoalsStore((s) => s.setGoal);

  const goalValue = goals[month] ?? '';

  const handleGoalChange = (e) => {
    const value = e.target.value;
    setGoal(month, parseFloat(value) || 0);
  };

  return (
    <div className="filter-controls">
      <div className="control-group">
        <label htmlFor="month-picker">Mês</label>
        <input
          type="month"
          id="month-picker"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </div>

      <div className="control-group">
        <label htmlFor="goal-input">Meta ({month})</label>
        <div className="input-with-prefix">
          <span>R$</span>
          <input
            type="text"
            inputMode="numeric"
            id="goal-input"
            placeholder="0.00"
            value={goalValue}
            onChange={handleGoalChange}
          />
        </div>
      </div>
    </div>
  );
}
