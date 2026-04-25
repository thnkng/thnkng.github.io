---
name: thnkng-site-builder
description: Implementar e evoluir o site thnkng.in seguindo a spec arquitetural do projeto. Use quando a tarefa envolver migracao ou construcao do site institucional, rotas publicas, catalogo de produtos, paginas legais, formulario de contato, SEO, analytics, acessibilidade, performance ou organizacao do codigo conforme a arquitetura alvo definida para o projeto.
---

# Objetivo

Implementar o `thnkng.in` de forma estrita, incremental e modular, respeitando a spec do projeto e evitando inventar escopo fora do que foi definido.

## Fluxo

1. Ler `references/spec-thnkngin-sdd.md` antes de propor arquitetura ou editar codigo relevante.
2. Identificar em qual area da spec a solicitacao cai:
   - fundacao do projeto
   - conteudo e colecoes
   - UI e componentes
   - rotas e navegacao
   - SEO e analytics
   - contato e validacao
   - testes, acessibilidade e performance
3. Implementar apenas o necessario para a etapa pedida, mas mantendo compatibilidade com a arquitetura alvo.
4. Centralizar conteudo institucional e de produto em arquivos de conteudo, nunca em componentes reutilizaveis.
5. Validar se a entrega preserva os contratos, regras de negocio e criterios de aceite da spec.

## Regras

- Nao expandir escopo alem da spec sem solicitacao explicita.
- Priorizar Astro + TypeScript + Tailwind como stack alvo descrita na spec.
- Tratar produtos, paginas e SEO como dados estruturados.
- Manter componentes pequenos, semanticamente nomeados e reutilizaveis.
- Garantir que novas paginas e placeholders sejam uteis, nao vazios.
- Preservar a identidade editorial minimalista do site.

## Leitura guiada

- Ler `references/spec-thnkngin-sdd.md` para requisitos completos.
- Consultar primeiro:
  - secao 3 para stack
  - secao 4 para rotas
  - secao 5 para dominio de dados
  - secao 8 para modulos funcionais
  - secoes 9 a 12 para SEO, acessibilidade, performance e analytics
  - secoes 15 a 19 para regras de negocio, erros, testes e aceite

## Checklist de execucao

Antes de concluir uma tarefa relevante, confirmar:

- a implementacao segue a spec correspondente;
- nenhum conteudo critico ficou hardcoded em componente indevido;
- rotas, contratos e CTAs estao coerentes;
- acessibilidade e SEO nao regrediram;
- a mudanca deixa o projeto mais proximo da arquitetura alvo.
