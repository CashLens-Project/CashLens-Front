import { computeDRE, computeTimeline } from "../compute";

const bundle = {
  sales: [
    // Jan/2025
    { id: "S-0901", date: "2025-01-05", channel: "loja1",     netRevenue: 1800, taxes: 180, discounts: 90 },
    { id: "S-0902", date: "2025-01-12", channel: "ecommerce", netRevenue: 2400, taxes: 240, discounts: 120 },
    { id: "S-0903", date: "2025-01-20", channel: "marketplace", netRevenue: 3200, taxes: 320, discounts: 160 },

    // Feb/2025
    { id: "S-0904", date: "2025-02-03", channel: "whatsapp",  netRevenue: 950,  taxes: 95,  discounts: 0 },
    { id: "S-0905", date: "2025-02-14", channel: "loja2",     netRevenue: 2100, taxes: 210, discounts: 50 },
    { id: "S-0906", date: "2025-02-27", channel: "b2b",       netRevenue: 7200, taxes: 720, discounts: 400 }, // venda corporativa

    // Mar/2025
    { id: "S-0907", date: "2025-03-02", channel: "instagram", netRevenue: 1100, taxes: 110, discounts: 30 },
    { id: "S-0908", date: "2025-03-15", channel: "kiosk",     netRevenue: 1300, taxes: 130, discounts: 20 },
    { id: "S-0909", date: "2025-03-29", channel: "marketplace", netRevenue: 2600, taxes: 260, discounts: 100 },

    // Apr/2025
    { id: "S-0910", date: "2025-04-05", channel: "loja1",     netRevenue: 1950, taxes: 195, discounts: 80 },
    { id: "S-0911", date: "2025-04-18", channel: "ecommerce", netRevenue: 3400, taxes: 340, discounts: 200 },
    { id: "S-0912", date: "2025-04-25", channel: "feira",     netRevenue: 1550, taxes: 155, discounts: 0 },

    // May–Sep/2025 (inclui seus originais + extras)
    { id: "S-1001", date: "2025-05-01", channel: "ecommerce", netRevenue: 3000, taxes: 300, discounts: 100 },
    { id: "S-1002", date: "2025-05-01", channel: "loja1",     netRevenue: 1500, taxes: 150, discounts: 50 },
    { id: "S-1011", date: "2025-05-10", channel: "marketplace", netRevenue: 2100, taxes: 210, discounts: 70 },

    { id: "S-1003", date: "2025-06-01", channel: "loja1",     netRevenue: 2200, taxes: 220, discounts: 120 },
    { id: "S-1004", date: "2025-06-02", channel: "ecommerce", netRevenue: 2500, taxes: 250, discounts: 150 },
    { id: "S-1012", date: "2025-06-15", channel: "b2b",       netRevenue: 5400, taxes: 540, discounts: 300 },

    { id: "S-1005", date: "2025-07-01", channel: "loja2",     netRevenue: 1700, taxes: 170, discounts: 80 },
    { id: "S-1006", date: "2025-07-02", channel: "loja2",     netRevenue: 2200, taxes: 220, discounts: 120 },
    { id: "S-1013", date: "2025-07-20", channel: "instagram", netRevenue: 950,  taxes: 95,  discounts: 10 },

    { id: "S-1007", date: "2025-08-01", channel: "ecommerce", netRevenue: 2800, taxes: 280, discounts: 140 },
    { id: "S-1008", date: "2025-08-02", channel: "loja1",     netRevenue: 1600, taxes: 160, discounts: 90 },
    { id: "S-1014", date: "2025-08-15", channel: "marketplace", netRevenue: 2950, taxes: 295, discounts: 110 },

    { id: "S-1009", date: "2025-09-01", channel: "ecommerce", netRevenue: 3200, taxes: 320, discounts: 150 },
    { id: "S-1010", date: "2025-09-02", channel: "loja2",     netRevenue: 2000, taxes: 200, discounts: 100 },

    // Eventos especiais/negativos
    { id: "S-CHB1", date: "2025-06-20", channel: "chargeback", netRevenue: -800, taxes: 0, discounts: 0 }, // estorno
    { id: "S-REF1", date: "2025-08-22", channel: "refund",     netRevenue: -550, taxes: 0, discounts: 0 }, // devolução
  ],

  items: [
    // Jan
    { saleId: "S-0901", sku: "SKU-RED-42", qty: 1, price: 900, cost: 560 },
    { saleId: "S-0901", sku: "SKU-BLK-39", qty: 1, price: 900, cost: 520 },
    { saleId: "S-0902", sku: "SKU-GRN-30", qty: 2, price: 700, cost: 420 },
    { saleId: "S-0903", sku: "SKU-YEL-40", qty: 3, price: 1100, cost: 650 },

    // Feb
    { saleId: "S-0904", sku: "SKU-ACC-CAP", qty: 2, price: 200, cost: 70 },
    { saleId: "S-0905", sku: "SKU-RED-42",  qty: 2, price: 900, cost: 560 },
    { saleId: "S-0906", sku: "SKU-PCK-B2B-01", qty: 12, price: 600, cost: 380 }, // pack B2B

    // Mar
    { saleId: "S-0907", sku: "SKU-BLK-39", qty: 1, price: 1100, cost: 620 },
    { saleId: "S-0908", sku: "SKU-GRN-30", qty: 2, price: 650, cost: 410 },
    { saleId: "S-0909", sku: "SKU-YEL-40", qty: 2, price: 1300, cost: 740 },

    // Apr
    { saleId: "S-0910", sku: "SKU-RED-42", qty: 1, price: 1000, cost: 560 },
    { saleId: "S-0910", sku: "SKU-ACC-CAP", qty: 1, price: 150, cost: 60 },
    { saleId: "S-0911", sku: "SKU-BLK-39", qty: 2, price: 1100, cost: 620 },
    { saleId: "S-0911", sku: "SKU-ACC-SOCK", qty: 3, price: 80, cost: 20 },
    { saleId: "S-0912", sku: "SKU-GRN-30", qty: 2, price: 775, cost: 430 },

    // May (inclui seus originais + extra)
    { saleId: "S-1001", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 },
    { saleId: "S-1002", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 },
    { saleId: "S-1011", sku: "SKU-YEL-40", qty: 2, price: 1200, cost: 700 },

    // Jun
    { saleId: "S-1003", sku: "SKU-GRN-30", qty: 2, price: 550, cost: 350 },
    { saleId: "S-1004", sku: "SKU-YEL-40", qty: 1, price: 900, cost: 500 },
    { saleId: "S-1012", sku: "SKU-PCK-B2B-02", qty: 10, price: 700, cost: 480 },

    // Jul
    { saleId: "S-1005", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 },
    { saleId: "S-1006", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 },
    { saleId: "S-1013", sku: "SKU-ACC-SOCK", qty: 5, price: 40, cost: 12 },

    // Aug
    { saleId: "S-1007", sku: "SKU-GRN-30", qty: 1, price: 550, cost: 350 },
    { saleId: "S-1008", sku: "SKU-YEL-40", qty: 3, price: 900, cost: 500 },
    { saleId: "S-1014", sku: "SKU-RED-42", qty: 2, price: 1000, cost: 600 },

    // Sep
    { saleId: "S-1009", sku: "SKU-RED-42", qty: 2, price: 800, cost: 500 },
    { saleId: "S-1010", sku: "SKU-BLK-39", qty: 1, price: 800, cost: 450 },

    // Negativos
    { saleId: "S-CHB1", sku: "SKU-GRN-30", qty: -1, price: 800, cost: 450 }, // chargeback
    { saleId: "S-REF1", sku: "SKU-ACC-CAP", qty: -2, price: 275, cost: 90 }, // devolução
  ],

  expenses: [
    // Fixas recorrentes
    { id: "E-9003", date: "2025-02-01", vendor: "Aluguel", value: 1200, category: "Aluguel", type: "FIXA" },
    { id: "E-9007", date: "2025-04-01", vendor: "Aluguel", value: 1200, category: "Aluguel", type: "FIXA" },
    { id: "E-9011", date: "2025-05-01", vendor: "Folha de Pagamento", value: 9500, category: "Pessoal", type: "FIXA" },
    { id: "E-9012", date: "2025-06-01", vendor: "Folha de Pagamento", value: 9600, category: "Pessoal", type: "FIXA" },
    { id: "E-9013", date: "2025-07-01", vendor: "Folha de Pagamento", value: 9700, category: "Pessoal", type: "FIXA" },
    { id: "E-9014", date: "2025-08-01", vendor: "Folha de Pagamento", value: 9800, category: "Pessoal", type: "FIXA" },
    { id: "E-9015", date: "2025-09-01", vendor: "Folha de Pagamento", value: 9900, category: "Pessoal", type: "FIXA" },

    // Utilidades/SaaS/TI
    { id: "E-9004", date: "2025-02-02", vendor: "Fornecimento de energia", value: 150, category: "Utilidades", type: "FIXA" },
    { id: "E-9016", date: "2025-03-02", vendor: "Internet Provedor", value: 220, category: "Utilidades", type: "FIXA" },
    { id: "E-9017", date: "2025-03-05", vendor: "ERP Cloud", value: 450, category: "Tecnologia", type: "FIXA" },
    { id: "E-9018", date: "2025-06-10", vendor: "Licenças SaaS", value: 300, category: "Tecnologia", type: "FIXA" },

    // Marketing & Vendas
    { id: "E-9002", date: "2025-01-02", vendor: "Anúncios Meta", value: 500, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9006", date: "2025-03-02", vendor: "Anúncios Google", value: 450, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9008", date: "2025-04-02", vendor: "Anúncios Meta", value: 400, category: "Marketing", type: "VARIAVEL" },
    { id: "E-9019", date: "2025-05-12", vendor: "Afiliados Marketplace", value: 380, category: "Comissões", type: "VARIAVEL" },

    // Logística/Operação
    { id: "E-9001", date: "2025-01-01", vendor: "Logística XYZ", value: 300, category: "Frete", type: "VARIAVEL" },
    { id: "E-9020", date: "2025-06-18", vendor: "Transportadora ABC", value: 520, category: "Frete", type: "VARIAVEL" },
    { id: "E-9009", date: "2025-05-01", vendor: "Manutenção Predial", value: 500, category: "Manutenção", type: "FIXA" },

    // Serviços/Profissionais
    { id: "E-9005", date: "2025-03-01", vendor: "Serviços contábeis", value: 600, category: "Serviços", type: "FIXA" },
    { id: "E-9010", date: "2025-05-02", vendor: "Serviços de TI", value: 700, category: "Tecnologia", type: "FIXA" },

    // Financeiro/Impostos/Capex
    { id: "E-9021", date: "2025-06-22", vendor: "Tarifas Bancárias", value: 190, category: "Financeiro", type: "VARIAVEL" },
    { id: "E-9022", date: "2025-07-03", vendor: "Impostos (DAS)", value: 2100, category: "Tributos", type: "FIXA" },
    { id: "E-9023", date: "2025-07-15", vendor: "Equipamentos (CAPEX)", value: 4500, category: "Investimento", type: "FIXA" },
    { id: "E-9024", date: "2025-08-05", vendor: "Seguro Operacional", value: 380, category: "Seguros", type: "FIXA" },
  ],

  payouts: [
    // Jan
    { id: "P-6801", date: "2025-01-06", method: "CARD", netValue: 1760, fee: 40, saleId: "S-0901" },
    { id: "P-6802", date: "2025-01-13", method: "PIX",  netValue: 2400, fee: 0,  saleId: "S-0902" },
    { id: "P-6803", date: "2025-01-21", method: "CARD", netValue: 3150, fee: 50, saleId: "S-0903" },

    // Feb
    { id: "P-6804", date: "2025-02-04", method: "PIX",  netValue: 950,  fee: 0,  saleId: "S-0904" },
    { id: "P-6805", date: "2025-02-15", method: "CARD", netValue: 2060, fee: 40, saleId: "S-0905" },
    { id: "P-6806", date: "2025-02-28", method: "CARD", netValue: 7100, fee: 100, saleId: "S-0906" },

    // Mar
    { id: "P-6807", date: "2025-03-03", method: "PIX",  netValue: 1100, fee: 0,  saleId: "S-0907" },
    { id: "P-6808", date: "2025-03-16", method: "CARD", netValue: 1270, fee: 30, saleId: "S-0908" },
    { id: "P-6809", date: "2025-03-30", method: "CARD", netValue: 2550, fee: 50, saleId: "S-0909" },

    // Apr
    { id: "P-6810", date: "2025-04-06", method: "CARD", netValue: 1910, fee: 40, saleId: "S-0910" },
    { id: "P-6811", date: "2025-04-19", method: "CARD", netValue: 3320, fee: 80, saleId: "S-0911" },
    { id: "P-6812", date: "2025-04-26", method: "PIX",  netValue: 1550, fee: 0,  saleId: "S-0912" },

    // May
    { id: "P-7001", date: "2025-05-02", method: "CARD", netValue: 2950, fee: 50, saleId: "S-1001" },
    { id: "P-7002", date: "2025-05-03", method: "PIX",  netValue: 1500, fee: 0,  saleId: "S-1002" },
    { id: "P-7011", date: "2025-05-11", method: "CARD", netValue: 2060, fee: 40, saleId: "S-1011" },

    // Jun
    { id: "P-7003", date: "2025-06-03", method: "CARD", netValue: 2140, fee: 60, saleId: "S-1003" },
    { id: "P-7004", date: "2025-06-04", method: "PIX",  netValue: 2500, fee: 0,  saleId: "S-1004" },
    { id: "P-7012", date: "2025-06-16", method: "CARD", netValue: 5330, fee: 70, saleId: "S-1012" },

    // Jul
    { id: "P-7005", date: "2025-07-04", method: "CARD", netValue: 1650, fee: 50, saleId: "S-1005" },
    { id: "P-7006", date: "2025-07-05", method: "PIX",  netValue: 2200, fee: 0,  saleId: "S-1006" },
    { id: "P-7013", date: "2025-07-21", method: "PIX",  netValue: 950,  fee: 0,  saleId: "S-1013" },

    // Aug
    { id: "P-7007", date: "2025-08-06", method: "CARD", netValue: 2730, fee: 70, saleId: "S-1007" },
    { id: "P-7008", date: "2025-08-07", method: "PIX",  netValue: 1600, fee: 0,  saleId: "S-1008" },
    { id: "P-7014", date: "2025-08-16", method: "CARD", netValue: 2880, fee: 70, saleId: "S-1014" },

    // Sep
    { id: "P-7009", date: "2025-09-08", method: "CARD", netValue: 3120, fee: 80, saleId: "S-1009" },
    { id: "P-7010", date: "2025-09-09", method: "PIX",  netValue: 2000, fee: 0,  saleId: "S-1010" },

    // Ajustes negativos (chargeback/refund)
    { id: "P-CHB1", date: "2025-06-21", method: "CARD", netValue: -800, fee: 0,   saleId: "S-CHB1" },
    { id: "P-REF1", date: "2025-08-23", method: "PIX",  netValue: -550, fee: 0,   saleId: "S-REF1" },
  ],
};

export const LocalProvider = {
  async loadAll() { return bundle; },
  async getDRE(month) { return computeDRE(bundle, month); },
  async getTimeline(month) { return computeTimeline(bundle, month); },
};