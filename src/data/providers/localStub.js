import { computeDRE, computeTimeline } from "../compute";

const bundle = {
  sales: [
    { id: "S-1001", date: "2025-05-01", channel: "ecommerce", netRevenue: 3000, taxes: 300, discounts: 100 }, 
    { id: "S-1002", date: "2025-05-15", channel: "loja1", netRevenue: 1500, taxes: 150, discounts: 50 },

    { id: "S-1003", date: "2025-06-05", channel: "loja1", netRevenue: 2200, taxes: 220, discounts: 120 },
    { id: "S-1004", date: "2025-06-20", channel: "ecommerce", netRevenue: 3500, taxes: 350, discounts: 150 },

    { id: "S-1005", date: "2025-07-01", channel: "loja2", netRevenue: 2700, taxes: 270, discounts: 80 },  
    { id: "S-1006", date: "2025-07-18", channel: "ecommerce", netRevenue: 4200, taxes: 420, discounts: 220 },

    { id: "S-1007", date: "2025-08-10", channel: "ecommerce", netRevenue: 4800, taxes: 480, discounts: 240 },
    { id: "S-1008", date: "2025-08-25", channel: "loja1", netRevenue: 2600, taxes: 260, discounts: 90 },  

    { id: "S-1009", date: "2025-09-05", channel: "ecommerce", netRevenue: 5200, taxes: 520, discounts: 250 },
    { id: "S-1010", date: "2025-09-22", channel: "loja2", netRevenue: 3000, taxes: 300, discounts: 100 },
  ],
  items: [
    { saleId: "S-1001", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 }, // Custo: 1000
    { saleId: "S-1002", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 }, // Custo: 450

    { saleId: "S-1003", sku: "SKU-GRN-30", qty: 2, price: 550, cost: 350 }, // Custo: 700
    { saleId: "S-1004", sku: "SKU-YEL-40", qty: 2, price: 900, cost: 500 }, // Custo: 1000

    { saleId: "S-1005", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 }, // Custo: 1000
    { saleId: "S-1006", sku: "SKU-BLK-39", qty: 3, price: 800, cost: 450 }, // Custo: 1350

    { saleId: "S-1007", sku: "SKU-GRN-30", qty: 4, price: 550, cost: 350 }, // Custo: 1400
    { saleId: "S-1008", sku: "SKU-YEL-40", qty: 1, price: 900, cost: 500 }, // Custo: 500

    { saleId: "S-1009", sku: "SKU-RED-42", qty: 3, price: 800, cost: 500 }, // Custo: 1500
    { saleId: "S-1010", sku: "SKU-BLK-39", qty: 2, price: 800, cost: 450 }, // Custo: 900
  ],
  expenses: [
    { id: "E-9001", date: "2025-05-01", vendor: "Aluguel Loja", value: 4000, category: "Aluguel", type: "FIXA" },
    { id: "E-9002", date: "2025-05-10", vendor: "Anúncios Meta", value: 1500, category: "Marketing", type: "VARIAVEL" },

    { id: "E-9004", date: "2025-06-01", vendor: "Aluguel Loja", value: 1500, category: "Aluguel", type: "FIXA" },
    { id: "E-9005", date: "2025-06-15", vendor: "Anúncios Google", value: 500, category: "Marketing", type: "VARIAVEL" },

    { id: "E-9006", date: "2025-07-01", vendor: "Aluguel Loja", value: 2000, category: "Aluguel", type: "FIXA" },
    { id: "E-9007", date: "2025-07-10", vendor: "Serviços Contábeis", value: 600, category: "Serviços", type: "FIXA" },
    { id: "E-9008", date: "2025-07-20", vendor: "Anúncios Meta", value: 800, category: "Marketing", type: "VARIAVEL" },

    { id: "E-9009", date: "2025-08-01", vendor: "Aluguel Loja", value: 2200, category: "Aluguel", type: "FIXA" },
    { id: "E-9010", date: "2025-08-15", vendor: "Fornecedores de TI", value: 500, category: "Tecnologia", type: "FIXA" },
    { id: "E-9011", date: "2025-08-25", vendor: "Anúncios Google", value: 1000, category: "Marketing", type: "VARIAVEL" },

    { id: "E-9012", date: "2025-09-01", vendor: "Aluguel Loja", value: 2000, category: "Aluguel", type: "FIXA" },
    { id: "E-9013", date: "2025-09-10", vendor: "Salários", value: 1500, category: "Pessoal", type: "FIXA" },
    { id: "E-9014", date: "2025-09-20", vendor: "Anúncios Meta", value: 800, category: "Marketing", type: "VARIAVEL" },

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
  ],
};

export const LocalProvider = {
  async loadAll() { return bundle; },
  async getDRE(month) { return computeDRE(bundle, month); },
  async getTimeline(month) { return computeTimeline(bundle, month); },
};