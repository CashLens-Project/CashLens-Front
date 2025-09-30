# Changelog

Todas as mudanças notáveis deste repositório serão documentadas aqui.  
O formato segue o padrão **Keep a Changelog**.

Cada seção abaixo corresponde a uma **tag** (`vX.Y.Z`) no Git.

---

## [v1.2.1]
### Added
- `README.md` com documentação do projeto.

### Changed
- Melhorias finais na **Home**.
- Ajustes de **responsividade** no **Footer** e no componente de **Filtros** (metas, seleção de mês e medidas).

---

## [v1.2.0]
### Added
- **Tela de Reconciliação** (matching de vendas x repasses, filtros por método, KPIs).
- Base de estilos padronizada para todas as páginas.

### Changed
- Código mais **modular** e **limpo** (refinos em `features/`, `components/` e `utils/`).
- **Responsividade** e **estilo** aprimorados em todas as páginas.
- **DRE** ajustada para consumir a **mesma base de dados local** do provider.
- **Footer** e **Navbar** **completamente refatorados** (estilo e responsividade melhores).

---

## [v1.1.1]
### Fixed
- **Dependência ausente** adicionada: `react-icons` no `package.json`.

---

## [v1.1.0]
### Added
- **Tela Waterfall** (análise de lucro em cascata).
- **Footer** global como componente reutilizável.

### Changed
- Migração do tema **escuro → claro**.
- **Limpeza de código**: CSS dedicado por **view/componente**.
- **Home** completamente **refatorada**.
- Melhorias significativas na **Timeline de Lucro** (UI/UX e gráficos).

---

## [v1.0.0]
### Added
- Primeira versão **estruturada** para organização do time.
- Separação de módulos: `utils/`, `components/`, `features/`, `app/`, `providerLocal/`.
- **Organização de rotas**.
- **Tela Home**.
- **Timeline de Lucro (base)**.
- **Tela de DRE (base)**.
- **Menu (base)**.

---

## [v0.1.0-alpha.0]
### Added
- **Scaffold inicial** do projeto.
- Configuração de **React + Vite** e dependências básicas.

---

## Manutenção do CHANGELOG por Tags

- O arquivo **`CHANGELOG.md`** será atualizado a cada **tag** criada:
  - **Tags**: `vX.Y.Z` (ex.: `v1.0.0`, `v1.1.0`, `v1.1.1`).
  - **Seções** por versão: `Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`, `Security` (quando aplicável).

---