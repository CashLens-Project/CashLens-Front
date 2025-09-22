export const DataProvider = {

  loadAll: async () => {
    return { sales: [], items: [], expenses: [], payouts: [] };
  },

  getDRE: async (month) => {
    return { month, receitaLiquida: 0, cogs: 0, despesas: 0, resultado: 0 };
  },

  getTimeline: async (from, to) => {
    return [];
  },
};