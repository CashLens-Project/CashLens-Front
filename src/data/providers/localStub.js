import { computeDRE, computeTimeline } from "../compute";

const bundle = {
  sales: [
    { id: "S-1001", date: "2025-05-01", channel: "ecommerce", netRevenue: 3000, taxes: 300, discounts: 100 },
    { id: "S-1002", date: "2025-05-01", channel: "loja1", netRevenue: 1500, taxes: 150, discounts: 50 },
    { id: "S-1003", date: "2025-06-01", channel: "loja1", netRevenue: 2200, taxes: 220, discounts: 120 },
    { id: "S-1004", date: "2025-06-02", channel: "ecommerce", netRevenue: 2500, taxes: 250, discounts: 150 },
    { id: "S-1005", date: "2025-07-01", channel: "loja2", netRevenue: 1700, taxes: 170, discounts: 80 },
    { id: "S-1006", date: "2025-07-02", channel: "loja2", netRevenue: 2200, taxes: 220, discounts: 120 },
    { id: "S-1007", date: "2025-08-01", channel: "ecommerce", netRevenue: 2800, taxes: 280, discounts: 140 },
    { id: "S-1008", date: "2025-08-02", channel: "loja1", netRevenue: 1600, taxes: 160, discounts: 90 },
    { id: "S-1009", date: "2025-09-01", channel: "ecommerce", netRevenue: 3200, taxes: 320, discounts: 150 },
    { id: "S-1010", date: "2025-09-02", channel: "loja2", netRevenue: 2000, taxes: 200, discounts: 100 },
  ],
  items: [
    { saleId: "S-1001", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 },
    { saleId: "S-1002", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 },
    { saleId: "S-1003", sku: "SKU-GRN-30", qty: 2, price: 550, cost: 350 },
    { saleId: "S-1004", sku: "SKU-YEL-40", qty: 1, price: 900, cost: 500 },
    { saleId: "S-1005", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 },
    { saleId: "S-1006", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 },
    { saleId: "S-1007", sku: "SKU-GRN-30", qty: 1, price: 550, cost: 350 },
    { saleId: "S-1008", sku: "SKU-YEL-40", qty: 3, price: 900, cost: 500 },
    { saleId: "S-1009", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 },
    { saleId: "S-1010", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 },
  ],
  expenses: [
    { id: "E-9001", date: "2025-01-01", vendor: "Logística XYZ", value: 300, category: "Frete", type: "VARIAVEL" },
    { id: "E-9002", date: "2025-01-02", vendor: "Anúncios Meta", value: 500, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9003", date: "2025-02-01", vendor: "Aluguel", value: 1200, category: "Aluguel", type: "FIXA" },
    { id: "E-9004", date: "2025-02-02", vendor: "Fornecimento de energia", value: 150, category: "Utilidades", type: "FIXA" },
    { id: "E-9005", date: "2025-03-01", vendor: "Serviços contábeis", value: 600, category: "Serviços", type: "FIXA" },
    { id: "E-9006", date: "2025-03-02", vendor: "Anúncios Google", value: 450, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9007", date: "2025-04-01", vendor: "Aluguel", value: 1200, category: "Aluguel", type: "FIXA" },
    { id: "E-9008", date: "2025-04-02", vendor: "Anúncios Meta", value: 400, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9009", date: "2025-05-01", vendor: "Manutenção Predial", value: 500, category: "Manutenção", type: "FIXA" },
    { id: "E-9010", date: "2025-05-02", vendor: "Serviços de TI", value: 700, category: "Tecnologia", type: "FIXA" },
  ],
  payouts: [
    { id: "P-7001", date: "2025-05-02", method: "CARD", netValue: 3000, fee: 50, saleId: "S-1001" },
    { id: "P-7002", date: "2025-05-03", method: "PIX", netValue: 1500, fee: 0, saleId: "S-1002" },
    { id: "P-7003", date: "2025-06-03", method: "CARD", netValue: 2200, fee: 60, saleId: "S-1003" },
    { id: "P-7004", date: "2025-06-04", method: "PIX", netValue: 2500, fee: 0, saleId: "S-1004" },
    { id: "P-7005", date: "2025-07-04", method: "CARD", netValue: 1700, fee: 50, saleId: "S-1005" },
    { id: "P-7006", date: "2025-07-05", method: "PIX", netValue: 2200, fee: 0, saleId: "S-1006" },
    { id: "P-7007", date: "2025-08-06", method: "CARD", netValue: 2800, fee: 70, saleId: "S-1007" },
    { id: "P-7008", date: "2025-08-07", method: "PIX", netValue: 1600, fee: 0, saleId: "S-1008" },
    { id: "P-7009", date: "2025-09-08", method: "CARD", netValue: 3200, fee: 80, saleId: "S-1009" },
    { id: "P-7010", date: "2025-09-09", method: "PIX", netValue: 2000, fee: 0, saleId: "S-1010" },
  ],
};

export const LocalProvider = {
  async loadAll() { return bundle; },
  async getDRE(month) { return computeDRE(bundle, month); },
  async getTimeline(month) { return computeTimeline(bundle, month); },
};