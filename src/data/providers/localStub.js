import { computeDRE, computeTimeline, computeWaterfall } from "../compute";

const bundle = {
  sales: [
    // MAIO 2025
    { id: "S-1001", date: "2025-05-02", channel: "ecommerce", netRevenue: 1800, taxes: 180, discounts: 50 },
    { id: "S-1002", date: "2025-05-10", channel: "loja1", netRevenue: 2500, taxes: 250, discounts: 100 },
    { id: "S-1003", date: "2025-05-25", channel: "loja2", netRevenue: 1200, taxes: 120, discounts: 40 },
    // JUNHO 2025
    { id: "S-1004", date: "2025-06-05", channel: "loja1", netRevenue: 3200, taxes: 320, discounts: 150 },
    { id: "S-1005", date: "2025-06-15", channel: "ecommerce", netRevenue: 4500, taxes: 450, discounts: 200 },
    { id: "S-1006", date: "2025-06-28", channel: "loja1", netRevenue: 1500, taxes: 150, discounts: 50 },
    // JULHO 2025
    { id: "S-1007", date: "2025-07-03", channel: "loja2", netRevenue: 3800, taxes: 380, discounts: 120 },
    { id: "S-1008", date: "2025-07-19", channel: "ecommerce", netRevenue: 5200, taxes: 520, discounts: 250 },
    { id: "S-1009", date: "2025-07-25", channel: "loja2", netRevenue: 2100, taxes: 210, discounts: 90 },
    // AGOSTO 2025
    { id: "S-1010", date: "2025-08-08", channel: "ecommerce", netRevenue: 6800, taxes: 680, discounts: 300 },
    { id: "S-1011", date: "2025-08-21", channel: "loja1", netRevenue: 3100, taxes: 310, discounts: 150 },
    { id: "S-1012", date: "2025-08-29", channel: "ecommerce", netRevenue: 2500, taxes: 250, discounts: 100 },
    // SETEMBRO 2025
    { id: "S-1013", date: "2025-09-06", channel: "ecommerce", netRevenue: 7200, taxes: 720, discounts: 350 },
    { id: "S-1014", date: "2025-09-18", channel: "loja2", netRevenue: 3500, taxes: 350, discounts: 150 },
    { id: "S-1015", date: "2025-09-28", channel: "loja1", netRevenue: 4000, taxes: 400, discounts: 200 },
    // OUTUBRO 2025 - Novas vendas
    { id: "S-1016", date: "2025-10-05", channel: "ecommerce", netRevenue: 15000, taxes: 1500, discounts: 500 },
    { id: "S-1017", date: "2025-10-15", channel: "loja1", netRevenue: 8000, taxes: 800, discounts: 300 },
    { id: "S-1018", date: "2025-10-20", channel: "loja2", netRevenue: 3000, taxes: 300, discounts: 100 },
  ],
  items: [
    { saleId: "S-1001", sku: "SKU-PREMIUM-A", qty: 1, price: 1000, cost: 400 },
    { saleId: "S-1001", sku: "SKU-BASIC-C", qty: 4, price: 200, cost: 150 },
    { saleId: "S-1002", sku: "SKU-STANDARD-B", qty: 5, price: 500, cost: 250 },
    { saleId: "S-1003", sku: "SKU-OUTLET-D", qty: 10, price: 120, cost: 90 },
    { saleId: "S-1004", sku: "SKU-PREMIUM-A", qty: 2, price: 1000, cost: 400 },
    { saleId: "S-1004", sku: "SKU-STANDARD-B", qty: 2, price: 600, cost: 300 },
    { saleId: "S-1005", sku: "SKU-BASIC-C", qty: 10, price: 250, cost: 180 },
    { saleId: "S-1005", sku: "SKU-PREMIUM-A", qty: 2, price: 1000, cost: 400 },
    { saleId: "S-1006", sku: "SKU-OUTLET-D", qty: 10, price: 150, cost: 110 },
    { saleId: "S-1007", sku: "SKU-STANDARD-B", qty: 7, price: 500, cost: 250 },
    { saleId: "S-1007", sku: "SKU-BASIC-C", qty: 3, price: 100, cost: 70 },
    { saleId: "S-1008", sku: "SKU-PREMIUM-A", qty: 4, price: 1000, cost: 400 },
    { saleId: "S-1008", sku: "SKU-OUTLET-D", qty: 10, price: 120, cost: 90 },
    { saleId: "S-1009", sku: "SKU-STANDARD-B", qty: 3, price: 700, cost: 350 },
    { saleId: "S-1010", sku: "SKU-PREMIUM-A", qty: 5, price: 1100, cost: 450 },
    { saleId: "S-1010", sku: "SKU-BASIC-C", qty: 10, price: 130, cost: 90 },
    { saleId: "S-1011", sku: "SKU-STANDARD-B", qty: 4, price: 775, cost: 400 },
    { saleId: "S-1012", sku: "SKU-OUTLET-D", qty: 20, price: 125, cost: 100 },
    { saleId: "S-1013", sku: "SKU-PREMIUM-A", qty: 6, price: 1200, cost: 350 },
    { saleId: "S-1014", sku: "SKU-STANDARD-B", qty: 5, price: 700, cost: 250 },
    { saleId: "S-1015", sku: "SKU-BASIC-C", qty: 10, price: 400, cost: 200 },
    // OUTUBRO 2025 - Itens vendidos
    { saleId: "S-1016", sku: "SKU-PREMIUM-A", qty: 10, price: 1500, cost: 600 },
    { saleId: "S-1016", sku: "SKU-BASIC-C", qty: 5, price: 100, cost: 50 },
    { saleId: "S-1017", sku: "SKU-STANDARD-B", qty: 8, price: 1000, cost: 400 },
    { saleId: "S-1018", sku: "SKU-OUTLET-D", qty: 30, price: 100, cost: 70 },
  ],
  expenses: [
    // MAIO 2025 (Resultado Negativo)
    { id: "E-9001", date: "2025-05-01", vendor: "Aluguel Hub", value: 6000, category: "Aluguel", type: "FIXA" },
    { id: "E-9002", date: "2025-05-10", vendor: "Campanha Dia das Mães", value: 3500, category: "Marketing", type: "VARIAVEL" },

    // JUNHO 2025 (Resultado Positivo)
    { id: "E-9004", date: "2025-06-01", vendor: "Aluguel Hub", value: 1500, category: "Aluguel", type: "FIXA" },
    { id: "E-9005", date: "2025-06-15", vendor: "Anúncios Performance", value: 800, category: "Marketing", type: "VARIAVEL" },

    // JULHO 2025 (Resultado Positivo)
    { id: "E-9006", date: "2025-07-01", vendor: "Aluguel Hub", value: 1500, category: "Aluguel", type: "FIXA" },
    { id: "E-9007", date: "2025-07-10", vendor: "Contabilidade Digital", value: 500, category: "Serviços", type: "FIXA" },
    { id: "E-9008", date: "2025-07-20", vendor: "Anúncios Performance", value: 1000, category: "Marketing", type: "VARIAVEL" },

    // AGOSTO 2025 (Resultado Positivo)
    { id: "E-9009", date: "2025-08-01", vendor: "Aluguel Hub", value: 1800, category: "Aluguel", type: "FIXA" },
    { id: "E-9010", date: "2025-08-15", vendor: "SaaS de Gestão", value: 500, category: "Tecnologia", type: "FIXA" },
    { id: "E-9011", date: "2025-08-25", vendor: "Anúncios Performance", value: 1200, category: "Marketing", type: "VARIAVEL" },

    // SETEMBRO 2025 (Resultado Positivo)
    { id: "E-9012", date: "2025-09-01", vendor: "Aluguel Hub", value: 1500, category: "Aluguel", type: "FIXA" },
    { id: "E-9013", date: "2025-09-10", vendor: "Folha de Pagamento", value: 2000, category: "Pessoal", type: "FIXA" },
    { id: "E-9014", date: "2025-09-20", vendor: "Anúncios Performance", value: 500, category: "Marketing", type: "VARIAVEL" },
    // OUTUBRO 2025 - Novas despesas
    { id: "E-9015", date: "2025-10-01", vendor: "Aluguel Hub", value: 1500, category: "Aluguel", type: "FIXA" },
    { id: "E-9016", date: "2025-10-10", vendor: "Campanha de Outubro", value: 1000, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9017", date: "2025-10-25", vendor: "Serviços de TI", value: 700, category: "Tecnologia", type: "FIXA" },
  ],
  payouts: [
    { id: "P-7001", date: "2025-05-02", method: "CARD", netValue: 3000, fee: 50, saleId: "S-1001" },
    { id: "P-7002", date: "2025-05-16", method: "PIX", netValue: 1500, fee: 0, saleId: "S-1002" },
    { id: "P-7003", date: "2025-06-06", method: "CARD", netValue: 2200, fee: 60, saleId: "S-1003" },
    { id: "P-7004", date: "2025-06-21", method: "PIX", netValue: 3500, fee: 0, saleId: "S-1004" },
    { id: "P-7005", date: "2025-07-02", method: "CARD", netValue: 2700, fee: 50, saleId: "S-1005" },
    { id: "P-7006", date: "2025-07-19", method: "PIX", netValue: 4200, fee: 0, saleId: "S-1006" },
    { id: "P-7007", date: "2025-08-11", method: "CARD", netValue: 4800, fee: 70, saleId: "S-1007" },
    { id: "P-7008", date: "2025-08-26", method: "PIX", netValue: 2600, fee: 0, saleId: "S-1008" },
    { id: "P-7009", date: "2025-09-06", method: "CARD", netValue: 5200, fee: 80, saleId: "S-1009" },
    { id: "P-7010", date: "2025-09-23", method: "PIX", netValue: 3000, fee: 0, saleId: "S-1010" },
    { id: "P-7010", date: "2025-09-24", method: "PIX", netValue: 3000, fee: 0, saleId: "S-1010" },
    { id: "P-7010", date: "2025-09-25", method: "PIX", netValue: 3000, fee: 0, saleId: "S-1010" },
    // OUTUBRO 2025 - Pagamentos
    { id: "P-7011", date: "2025-10-06", method: "CARD", netValue: 14000, fee: 200, saleId: "S-1016" },
    { id: "P-7012", date: "2025-10-16", method: "PIX", netValue: 7700, fee: 0, saleId: "S-1017" },
    { id: "P-7013", date: "2025-10-21", method: "CARD", netValue: 2900, fee: 50, saleId: "S-1018" },
  ],
};

export const LocalProvider = {
  async loadAll() { return bundle; },
  async getDRE(month) { return computeDRE(bundle, month); },
  async getTimeline(month) { return computeTimeline(bundle, month); },
  async getWaterfall(month) { return computeWaterfall(bundle, month); },
};
