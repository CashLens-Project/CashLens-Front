# CashLens — MVP de Gestão Financeira

> Entenda e projete **vendas, lucros e despesas** em um só lugar. DRE simplificada, timeline de caixa, waterfall de lucro, reconciliação automática e insights.

## Integrantes

Preencha com os quatro membros do grupo:

| Integrante                     | Função no projeto   |
| ------------------------------ | ------------------- |
| *João Marcos Azevedo Cruz*     | Líder / Coordenação |
| *Marcos André Barros Meneses*  | Líder / Coordenação |
| *João Pedro Tavares Teixeira*  | Dev                 |
| *João Victor Martins Albernaz* | Dev                 |

## Visão Geral

O **CashLens** é um MVP web focado em PMEs para **análises financeiras rápidas** e acionáveis. O projeto demonstra controle de versão com Git/GitHub, desenvolvimento colaborativo e aplicação prática de **qualidade de software (ISO/IEC 25010)**.

Principais objetivos:

* Consolidar **DRE** com margens e meta do mês.
* Exibir **timeline de caixa** por período.
* Explicar o lucro via **gráfico waterfall**.
* Fazer **reconciliação** de vendas x repasses (PIX, cartão, boleto).
* Gerar **insights** sobre performance, custos e margens.

## Funcionalidades (MVP)

* **Dashboard / Timeline de Caixa**

  * KPIs: Receita líquida, COGS, Despesas e Resultado.
  * Barra de progresso contra **meta mensal**.
  * Timeline diária de caixa e **insights automáticos**.

* **DRE Simplificada**

  * Cálculo de margens **bruta** e **líquida**.
  * Quebra de despesas: administrativas, comerciais e **financeiras (fees)**.
  * Meta do mês e percentual de atingimento.

* **Waterfall (Análise de Lucro)**

  * Visualização em cascata dos componentes do resultado no mês selecionado.

* **Reconciliação de Repasses**

  * Matching venda ↔ repasse (por `saleId`), divergências e pendências.
  * Filtro por **método de pagamento** (PIX, CARD, BOLETO).
  * KPIs: % conciliado, sem repasse, repasse sem venda, divergente.

> **Filtro global de período (mês)** disponível nas páginas principais.

## Arquitetura & Tecnologias

* **Front-end:** React 18 + Vite + React Router
* **Estado:** Zustand
* **Visualização:** ECharts (Line / Waterfall)
* **Utilitários:** Day.js, Intl API, Xlsx/PapaParse (base para import/export)
* **Estilo:** CSS modular (arquivos por view/componente)

Estrutura (resumo):

```
src/
  app/              # router e store (Zustand)
  assets/           # imagens
  components/
    charts/         # LineChart, WaterfallChart, ConciliationTable
    ui/             # Card, Filter, NavBar, Footer
  data/
    providers/      # provider local (stub) e índices
  features/
    dashboard/      # DashboardView
    dre/            # DREViewEnhanced
    waterfall/      # WaterfallView
    conciliation/   # ConciliationView
    home/           # Home/Landing
  utils/            # formatadores e cálculos
```

## Como Executar

Pré-requisitos: **Node 18+** e **npm**.

```bash
# instalar dependências
npm install

# executar em modo dev
npm run dev
```

> Os dados são carregados via **provider local (stub)** em `src/data/providers/`. Será alterado para backend quando disponível.

### Qualidade de Software (ISO/IEC 25010)

* **Funcionalidade:** Cálculos de DRE, timeline e reconciliação **coerentes com o mês filtrado**, mantendo consistência entre KPIs, tabelas e gráficos.
* **Confiabilidade:** **Estados de carregamento/erro** padronizados, mensagens de fallback quando não há dados e lógica defensiva para campos nulos/indefinidos.
* **Usabilidade & Responsividade:** Layout **limpo e responsivo (mobile-first)**, navegação clara, nomenclatura orientada ao domínio e componentes reutilizáveis com **UX consistente**.
* **Eficiência & Performance:** Renderização **enxuta** com memorização seletiva (memo/useMemo/useCallback), carregamento focado no **período ativo** e gráficos otimizados.
* **Manutenibilidade:** **Arquitetura modular** (features/components/utils), **princípios de código limpo** (coerência semântica, funções puras, SRP) e **provider** isolado para trocar a fonte de dados **sem impactar a UI**.
* **Portabilidade:** App web com **Vite**, facilmente servível em diversos ambientes, independente de plataforma de hospedagem.
* **Acessibilidade (a11y) em evolução:** Estrutura semântica, rótulos em formulários e contraste adequado nas superfícies principais.

### Changelog na raiz do projeto

* O **`CHANGELOG.md`** na **raiz do repositório**, mantido de acordo com as **tags** criadas no Git:

  * **Tags**: `vX.Y.Z` (ex.: `v1.0.0`, `v1.1.0`, `v1.1.1`).

## Versionamento & Colaboração (Git/GitHub)

1. **Branch por feature**: `feature/<nome-curto>`.
2. Commits frequentes e descritivos (`feat: ...`, `fix: ...`, `refactor: ...`).
3. **Pull Request** para `develop` (revisão por pares).
4. Merge de `develop` → `main` para releases.
5. Issues para tarefas/bugs; changelog por release.

Exemplo:

```bash
git checkout -b feature/dre-meta
# ...codar, testar...
git add .
git commit -m "feat(dre): adiciona meta mensal e % de atingimento"
git push -u origin feature/dre-meta
# abrir PR para develop
```

## Testes (MVP)

* **Manuais/Exploratórios:**

  * Alterar mês e validar variações nos KPIs e gráficos.
  * Reconciliação: conferir estados *Conciliado*, *Divergente*, *Sem repasse*, *Repasse sem venda*.
  * DRE: validar margens e total de despesas (admin/comercial/financeira).
* **Automatização (próximos passos):**

  * Testes de unidade para utilitários (cálculo de margens, formatação).
  * Testes de integração para `provider` e views principais.

## (Próximas Entregas)

* Importação de dados (CSV/XLSX) pela UI.
* Exportação (CSV/Excel) de DRE/Timeline/Reconciliação.
* Integração com backend (autenticação e fontes de dados reais).
* Simulações “**E se**” e **insights de IA** aprimorados.
* RBAC básico e logs de auditoria.

---

**Observações finais**

* Este README consolida o **MVP** atual e está pronto para expandir conforme novas telas/integrações.
* Os dados de demonstração residem no `provider` local e podem ser substituídos por APIs reais quando o backend estiver disponível.
