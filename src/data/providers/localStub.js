import { computeDRE, computeTimeline } from "../compute";

const bundle = {
  sales: [
    { id: "S-1001", date: "2025-09-01", channel: "ecommerce", netRevenue: 1500, taxes: 150, discounts: 50 },
    { id: "S-1002", date: "2025-09-01", channel: "loja1",    netRevenue:  800, taxes:  80, discounts:  0 },
    { id: "S-1003", date: "2025-09-02", channel: "loja1",    netRevenue: 1200, taxes: 120, discounts: 60 },
  ],
  items: [
    { saleId: "S-1001", sku: "SKU-RED-42", qty: 2, price: 800,  cost: 500 },
    { saleId: "S-1002", sku: "SKU-BLK-39", qty: 1, price: 800,  cost: 450 },
    { saleId: "S-1003", sku: "SKU-RED-42", qty: 1, price: 1200, cost: 700 },
  ],
  expenses: [
    { id: "E-9001", date: "2025-09-01", vendor: "Logística XYZ", value:  200, category: "Frete",    type: "VARIAVEL" },
    { id: "E-9002", date: "2025-09-02", vendor: "Anúncios Meta", value:  300, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9003", date: "2025-09-02", vendor: "Aluguel",       value: 1500, category: "Aluguel",  type: "FIXA" },
  ],
  payouts: [
    { id: "P-7001", date: "2025-09-02", method: "CARD", netValue: 1450, fee: 50, saleId: "S-1001" },
    { id: "P-7002", date: "2025-09-03", method: "PIX",  netValue:  800, fee:  0, saleId: "S-1002" },
    { id: "P-7003", date: "2025-09-04", method: "CARD", netValue: 1140, fee: 60, saleId: "S-1003" },
  ],
};

export const LocalProvider = {
  async loadAll() { return bundle; },
  async getDRE(month) { return computeDRE(bundle, month); },
  async getTimeline(month) { return computeTimeline(bundle, month); },
};
