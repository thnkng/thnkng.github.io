# SPEC — Evolução do site thnkng.in
Versão: 1.0  
Data: 2026-04-22  
Autor: ChatGPT (O Arquiteto SDD)

## 0. Escopo desta spec

Esta especificação foi produzida a partir da análise externa do site público `https://thnkng.in/` e da sua estrutura observável no HTML renderizado. **Não tive acesso ao repositório nem ao código-fonte interno**, então decisões de framework, build pipeline, organização de pastas e serviços atuais devem ser tratadas como **hipóteses de substituição/evolução**, não como descrição garantida do stack existente.

Objetivo: fornecer uma **fonte única da verdade** para o Codex evoluir o site de uma landing page institucional para uma plataforma web de marketing mais modular, preparada para múltiplas páginas, catálogo de produtos, captura de leads, SEO, analytics e crescimento incremental.

---

## 1. Avaliação do estado atual

### 1.1 O que o site comunica bem hoje
O site possui uma proposta de valor clara no topo (“Tudo que seu time de tech precisa. Em um só lugar.”), com foco em ferramentas integradas para FinOps, DevOps e insights. Ele organiza a mensagem em blocos nítidos: pilares (“Design”, “Código”, “Propósito”), catálogo inicial de produtos, manifesto, oferta de projetos sob medida e CTAs de contato. Isso indica uma boa base de posicionamento e narrativa.  
Fonte observável: hero, pilares, catálogo, manifesto e CTAs do site público.

### 1.2 Limitações observáveis
1. A experiência pública aparenta estar concentrada em uma única página longa, o que limita expansão de SEO, detalhamento por produto e experimentação de funis.
2. O catálogo de produtos existe como conteúdo, mas não como entidade estruturada com slug, status, tags, CTA e página própria.
3. O rodapé já sinaliza áreas futuras (“Changelog”, “Documentação”, “Status”, “Termos”, “Privacidade”, “SLA”), porém ainda estão marcadas como “em breve”, o que mostra backlog de conteúdo obrigatório para maturidade comercial.
4. O CTA principal é majoritariamente conversa/email (“Falar conosco”, “hello@thnkng.in”), sem fluxo público explícito de captura estruturada, qualificação e acompanhamento.
5. Não há, no conteúdo público observado, prova social, estudos de caso, pricing, FAQ, métricas de uso, changelog ou documentação mínima para produtos.
6. Não foi possível confirmar pelo HTML renderizado o framework atual, o padrão de componentes, o nível de SSR/SSG, o sistema de analytics, nem a estratégia de acessibilidade e testes automatizados.

### 1.3 Diagnóstico arquitetural
O site já funciona como manifesto + vitrine inicial. A próxima evolução natural é migrar para uma arquitetura de **marketing site componível**, onde:
- conteúdo editorial e institucional é separado de layout;
- produtos são tratados como dados;
- páginas novas podem ser lançadas sem retrabalho estrutural;
- SEO, analytics e captação de demanda passam a ser de primeira classe;
- o design system reduz divergência visual entre landing pages futuras.

---

## 2. Objetivo do produto

Transformar `thnkng.in` em um **site institucional modular, performático e orientado a crescimento**, com estas capacidades:

1. Manter a landing principal atual, mas com estrutura de componentes reutilizáveis.
2. Criar páginas individuais para cada produto.
3. Criar páginas institucionais obrigatórias.
4. Criar um fluxo de contato com formulário e tracking.
5. Preparar o projeto para blog/changelog/documentação/status no futuro sem refatoração estrutural.
6. Garantir excelência em performance, SEO técnico, acessibilidade e governança de conteúdo.

---

## 3. Tech stack proposto

### 3.1 Stack obrigatório
- Runtime: **Node.js 22 LTS**
- Linguagem: **TypeScript 5.x**
- Framework web: **Astro 6.x**
- Estilização: **Tailwind CSS 4.x**
- Componentes interativos: **React 19 somente quando necessário**
- Qualidade: **ESLint + Prettier**
- Testes E2E: **Playwright**
- UI workshop/documentação interna: **Storybook 10.x**
- Deploy: **Vercel** ou **Cloudflare** (adapter definido em variável de ambiente; default: Vercel)
- Analytics: **PostHog** ou **Plausible**, via camada de adapter
- Form backend: endpoint server-side no próprio projeto, com envio para e-mail e/ou CRM via webhook
- Conteúdo: arquivos locais em Markdown/MDX + coleção tipada para produtos, páginas e posts
- Observabilidade básica: logs estruturados no servidor + health checks

### 3.2 Justificativa do stack
- Astro é otimizado para sites orientados a conteúdo e performance, com rendering server-first e suporte a coleções de conteúdo, o que combina com a natureza institucional do site.
- Tailwind CSS 4.x oferece velocidade de composição visual e padronização de tokens.
- Playwright cobre fluxos críticos cross-browser.
- Storybook permite documentar componentes e estados de UI isoladamente.

### 3.3 Restrições
- Não usar CMS headless na v1.
- Não usar banco de dados na v1 para conteúdo público.
- Não usar animações pesadas dependentes de canvas/WebGL na home.
- Qualquer JavaScript no cliente deve ser explícito e justificado por funcionalidade real.

---

## 4. Arquitetura de informação alvo

## 4.1 Rotas públicas obrigatórias

### Rotas de primeira entrega
- `/`
- `/produtos`
- `/produtos/[slug]`
- `/manifesto`
- `/como-ajudamos`
- `/o-que-fazemos`
- `/contato`
- `/privacidade`
- `/termos`
- `/sla`

### Rotas preparadas, mas podendo iniciar como placeholder funcional
- `/changelog`
- `/docs`
- `/status`
- `/blog`
- `/cases`
- `/faq`

## 4.2 Mapa de navegação
- Header
  - O que fazemos
  - Produtos
  - Como ajudamos
  - Manifesto
  - Contato
  - CTA primário
- Footer
  - Produtos
  - Empresa
  - Recursos
  - Legal
  - Contato direto
  - Status de disponibilidade de resposta

## 4.3 Regra de navegação
- Em desktop, menu horizontal fixo.
- Em mobile, drawer menu acessível.
- O CTA primário do header deve sempre levar para `/contato`.
- Anchors internas na home podem permanecer, mas a navegação canônica deve ser baseada em rotas reais.

---

## 5. Domínio de dados

## 5.1 Entidade: Product

```ts
type ProductStatus = "alpha" | "beta" | "private-preview" | "ga" | "paused" | "archived";

type ProductCategory =
  | "finops"
  | "devops"
  | "analytics"
  | "support"
  | "management"
  | "platform"
  | "communication"
  | "observability"
  | "productivity";

interface Product {
  id: string;
  slug: string;
  name: string;
  status: ProductStatus;
  category: ProductCategory[];
  headline: string;
  summary: string;
  body: string;
  tags: string[];
  featured: boolean;
  ctaLabel: string;
  ctaHref: string;
  seoTitle: string;
  seoDescription: string;
  heroVariant?: "default" | "minimal" | "dark";
  order: number;
  updatedAt: string;
}
```

## 5.2 Entidade: SitePage

```ts
interface SitePage {
  slug: string;
  title: string;
  description: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  updatedAt: string;
}
```

## 5.3 Entidade: ContactLead

```ts
type LeadIntent =
  | "demo"
  | "produto"
  | "projeto-sob-medida"
  | "parceria"
  | "duvida-geral";

type LeadSource =
  | "header-cta"
  | "hero-cta"
  | "product-page"
  | "footer"
  | "contact-page"
  | "custom";

interface ContactLead {
  name: string;
  email: string;
  company?: string;
  role?: string;
  intent: LeadIntent;
  productSlug?: string;
  teamSize?: "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";
  message: string;
  source: LeadSource;
  consent: boolean;
  submittedAt: string;
}
```

## 5.4 Entidade: SEOEntry

```ts
interface SEOEntry {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  noindex?: boolean;
}
```

---

## 6. Estrutura de diretórios obrigatória

```txt
/src
  /components
    /layout
    /sections
    /ui
    /forms
    /seo
  /content
    /products
    /pages
    /blog
    /changelog
  /layouts
  /lib
    analytics/
    content/
    forms/
    seo/
    validation/
  /pages
    index.astro
    produtos/
      index.astro
      [slug].astro
    manifesto.astro
    como-ajudamos.astro
    o-que-fazemos.astro
    contato.astro
    privacidade.astro
    termos.astro
    sla.astro
    changelog.astro
    docs.astro
    status.astro
  /styles
  /types
/public
/tests
  /e2e
/.storybook
```

---

## 7. Design system

## 7.1 Princípios obrigatórios
- Minimalismo editorial.
- Alto contraste.
- Poucos acentos visuais.
- Layout respirado.
- Texto como elemento principal.
- CTA claro, sem competição excessiva.
- Consistência entre páginas institucionais e páginas de produto.

## 7.2 Tokens mínimos
- Cores semânticas:
  - `bg.canvas`
  - `bg.surface`
  - `fg.default`
  - `fg.muted`
  - `border.default`
  - `accent.primary`
  - `accent.secondary`
  - `state.success`
  - `state.warning`
  - `state.error`
- Espaçamento:
  - escala 4, 8, 12, 16, 24, 32, 48, 64, 96
- Radius:
  - `sm`, `md`, `lg`, `xl`
- Tipografia:
  - `display`
  - `heading`
  - `body`
  - `mono`
- Breakpoints:
  - `sm`, `md`, `lg`, `xl`, `2xl`

## 7.3 Componentes obrigatórios
- `SiteHeader`
- `MobileNavDrawer`
- `SiteFooter`
- `HeroSection`
- `SectionHeading`
- `FeatureGrid`
- `ProductCard`
- `ProductGrid`
- `ContentSection`
- `CTAInline`
- `CTABand`
- `ContactForm`
- `InputField`
- `TextAreaField`
- `SelectField`
- `ConsentCheckbox`
- `ToastFeedback`
- `SeoHead`
- `ProseContent`
- `EmptyState`
- `Badge`
- `TagList`

## 7.4 Regras de componentes
- Nenhum componente pode conter cópia hardcoded se o conteúdo puder vir de coleção.
- Todo componente visual deve ter Storybook stories:
  - estado padrão
  - estado vazio
  - estado loading, se aplicável
  - estado erro, se aplicável
  - estado mobile e desktop via viewport docs

---

## 8. Módulos funcionais

## 8.1 Módulo A — Home (`/`)

### Objetivo
Converter a landing atual em uma página orientada a conversão e escalável, preservando a narrativa existente.

### Seções obrigatórias
1. Hero
2. Pilares (“Design, Código, Propósito”)
3. Catálogo resumido de produtos
4. Como ajudamos
5. Manifesto resumido
6. Projeto sob medida
7. Três formas de começar
8. CTA final
9. Footer

### Regras
- O hero deve exibir 2 CTAs:
  - primário: `/contato?source=hero-cta`
  - secundário: `/produtos`
- A seção de produtos deve mostrar no máximo 6 cards em destaque na home.
- Se houver mais de 6 produtos `featured=true`, ordenar por `order` e mostrar os 6 primeiros.
- O manifesto na home deve ser teaser; o texto completo fica em `/manifesto`.
- Cada card de produto deve apontar para `/produtos/[slug]`.

## 8.2 Módulo B — Catálogo de produtos (`/produtos`)

### Objetivo
Listar todos os produtos de forma filtrável e coerente.

### Funcionalidades
- grid de cards
- filtro por status
- filtro por categoria
- busca textual local por `name`, `headline`, `tags`

### Regras
- Produtos `archived` não aparecem por padrão.
- Busca e filtros devem refletir no querystring.
- Query params suportados:
  - `status`
  - `category`
  - `q`

## 8.3 Módulo C — Página de produto (`/produtos/[slug]`)

### Objetivo
Dar contexto, posicionamento e CTA específico para cada produto.

### Estrutura obrigatória
1. Hero do produto
2. Problema que resolve
3. Como funciona
4. Para quem é
5. Status do produto
6. CTA primário
7. CTA secundário para contato geral

### Regras
- Se `status=alpha`, exibir badge “Alpha”.
- Se `status=private-preview`, exibir badge “Private Preview”.
- Se `status=paused` ou `archived`, a página existe, mas CTA principal deve mudar para lista de espera ou contato.
- Cada página deve ter SEO próprio e Open Graph.

## 8.4 Módulo D — Contato (`/contato`)

### Objetivo
Capturar leads estruturados.

### Campos obrigatórios
- nome
- email
- empresa
- cargo
- intenção
- produto de interesse (condicional)
- tamanho do time
- mensagem
- consentimento LGPD

### Regras de validação
- `name`: mínimo 2 caracteres
- `email`: formato válido
- `message`: 20 a 2000 caracteres
- `consent`: obrigatório
- `productSlug`: obrigatório quando `intent=produto`
- rate limit por IP simples
- honeypot invisível
- submissão deve retornar feedback inline de sucesso/erro

### Saídas
- enviar payload para webhook configurado em env
- enviar e-mail transacional opcional
- registrar evento de analytics `lead_submitted`

## 8.5 Módulo E — Páginas institucionais

### Páginas
- `/manifesto`
- `/como-ajudamos`
- `/o-que-fazemos`

### Regras
- conteúdo em MDX
- título, descrição e atualização visíveis
- componente `ProseContent` com tipografia editorial
- CTA contextual no fim de cada página

## 8.6 Módulo F — Legal

### Páginas
- `/privacidade`
- `/termos`
- `/sla`

### Regras
- versão do documento visível
- data de vigência visível
- âncoras internas por seção
- links entre documentos relacionados
- `noindex=false`

## 8.7 Módulo G — Recursos futuros

### Páginas
- `/docs`
- `/status`
- `/changelog`
- `/blog`

### Regras
- Mesmo que iniciem com conteúdo mínimo, devem existir como páginas reais.
- Não usar “em breve” como texto único.
- Cada página deve oferecer:
  - contexto do que será encontrado ali
  - CTA útil
  - forma de contato ou retorno para página relevante

---

## 9. SEO técnico

## 9.1 Requisitos obrigatórios
- sitemap.xml gerado automaticamente
- robots.txt
- canonical por página
- meta title e description por rota
- Open Graph e Twitter cards
- schema.org:
  - `Organization`
  - `WebSite`
  - `SoftwareApplication` nas páginas de produto quando aplicável
- headings hierárquicos corretos
- links internos explícitos
- páginas legais indexáveis
- slugs canônicos em português

## 9.2 Regras de conteúdo
- Título SEO até 60 caracteres alvo
- Description até 160 caracteres alvo
- Um único `h1` por página
- Nenhuma página pública importante sem introdução textual acima da dobra

---

## 10. Acessibilidade

### Requisitos AA
- navegação total por teclado
- foco visível
- contraste AA
- labels explícitos em formulários
- aria-current em navegação ativa
- drawer mobile com trap de foco
- toast acessível com `aria-live`
- ordem semântica correta de headings
- skip link no topo

### Regras
- não usar placeholder como label
- não depender de cor como único feedback
- todo ícone decorativo com `aria-hidden=true`

---

## 11. Performance

### Metas
- LCP < 2.0s em homepage em rede 4G simulada
- CLS < 0.05
- JS enviado ao cliente na home < 90 KB gzip alvo
- score Lighthouse >= 95 em Performance, SEO e Best Practices
- score Lighthouse >= 90 em Accessibility

### Regras
- imagens otimizadas
- fontes self-hosted
- critical content SSR/SSG
- zero dependências client-side não essenciais
- lazy loading abaixo da dobra
- prefetch somente em links prioritários

---

## 12. Analytics e eventos

## 12.1 Eventos obrigatórios
```ts
type AnalyticsEvent =
  | "cta_clicked"
  | "nav_clicked"
  | "product_card_clicked"
  | "product_filter_changed"
  | "contact_form_started"
  | "contact_form_submitted"
  | "contact_form_failed";
```

## 12.2 Payload base
```ts
interface AnalyticsPayload {
  event: AnalyticsEvent;
  path: string;
  source?: string;
  productSlug?: string;
  intent?: string;
  timestamp: string;
}
```

### Regras
- eventos devem passar por wrapper único `track()`
- analytics deve poder ser desligado por env
- nenhuma informação pessoal sensível deve ser enviada para analytics

---

## 13. Configuração e ambiente

## 13.1 Variáveis de ambiente
```bash
PUBLIC_SITE_URL=
PUBLIC_ANALYTICS_PROVIDER=
PUBLIC_ANALYTICS_ENABLED=
CONTACT_WEBHOOK_URL=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
RATE_LIMIT_MAX=
RATE_LIMIT_WINDOW_SECONDS=
DEPLOY_TARGET=
```

## 13.2 Regras
- qualquer env faltante crítica deve falhar no build com mensagem clara
- env pública e privada separadas por naming
- validação de env centralizada

---

## 14. Assinaturas de funções e contratos

## 14.1 Content layer

```ts
function getAllProducts(): Promise<Product[]>;
function getFeaturedProducts(limit?: number): Promise<Product[]>;
function getProductBySlug(slug: string): Promise<Product | null>;
function searchProducts(input: {
  q?: string;
  status?: ProductStatus[];
  category?: ProductCategory[];
}): Promise<Product[]>;
function getPageBySlug(slug: string): Promise<SitePage | null>;
```

## 14.2 SEO

```ts
interface BuildSeoInput {
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

function buildSeo(input: BuildSeoInput): SEOEntry;
```

## 14.3 Analytics

```ts
function track(event: AnalyticsEvent, payload?: Record<string, string | number | boolean | undefined>): void;
```

## 14.4 Contact

```ts
interface ContactSubmissionResult {
  ok: boolean;
  status: 200 | 400 | 429 | 500;
  message: string;
  fieldErrors?: Record<string, string>;
}

function validateContactLead(input: unknown): {
  ok: boolean;
  data?: ContactLead;
  errors?: Record<string, string>;
};

async function submitContactLead(input: ContactLead): Promise<ContactSubmissionResult>;
```

---

## 15. Regras de negócio

1. Produto sem `slug`, `name`, `headline` ou `summary` não pode entrar em build.
2. Produto `featured=true` sem `order` deve falhar em validação de conteúdo.
3. Toda página pública deve possuir `seoTitle` e `seoDescription`.
4. CTA com `source` ausente deve cair em `custom`.
5. Se webhook de contato falhar, o usuário recebe erro genérico amigável e o servidor registra log estruturado.
6. Se analytics estiver desabilitado, o site continua funcionando sem warnings no console.
7. Página de produto inexistente retorna 404 estático com CTA para `/produtos`.
8. Páginas placeholder de recursos futuros devem ser úteis, nunca vazias.
9. Documentos legais devem expor data de vigência e versão.
10. Qualquer texto institucional crítico deve morar em conteúdo, não em componente.

---

## 16. Tratamento de erros

## 16.1 Erros de build
- `CONTENT_VALIDATION_ERROR`
- `MISSING_REQUIRED_ENV`
- `INVALID_ROUTE_METADATA`

## 16.2 Erros de runtime
- `PRODUCT_NOT_FOUND`
- `CONTACT_VALIDATION_FAILED`
- `CONTACT_RATE_LIMITED`
- `CONTACT_DELIVERY_FAILED`
- `UNEXPECTED_SERVER_ERROR`

## 16.3 Contrato de erro HTTP para form
```ts
interface ApiErrorResponse {
  ok: false;
  code:
    | "CONTACT_VALIDATION_FAILED"
    | "CONTACT_RATE_LIMITED"
    | "CONTACT_DELIVERY_FAILED"
    | "UNEXPECTED_SERVER_ERROR";
  message: string;
  fieldErrors?: Record<string, string>;
}
```

---

## 17. Estratégia de migração

## Fase 1 — Refoundation
- criar novo projeto Astro+TS+Tailwind
- reproduzir visual atual da home com componentes
- mover cópia atual para arquivos de conteúdo
- configurar SEO base, analytics wrapper e deploy

## Fase 2 — Estruturação de domínio
- transformar produtos em coleção tipada
- publicar `/produtos` e `/produtos/[slug]`
- criar páginas institucionais dedicadas
- ativar formulário de contato

## Fase 3 — Maturidade comercial
- publicar legal pages
- publicar changelog/docs/status em versão inicial funcional
- adicionar FAQ/cases/blog se houver conteúdo
- endurecer testes e budgets de performance

---

## 18. Casos de teste (spec de teste)

## 18.1 Home
1. Dado acesso à `/`, quando a página carregar, então o hero, pilares, produtos e CTA final devem existir.
2. Dado clique no CTA primário do hero, então navegar para `/contato?source=hero-cta`.

## 18.2 Catálogo
1. Dado acesso a `/produtos`, quando não houver filtros, então listar todos os produtos exceto `archived`.
2. Dado filtro `status=alpha`, então exibir apenas produtos alpha.
3. Dado busca `q=finops`, então retornar produtos compatíveis por nome/headline/tags.

## 18.3 Produto
1. Dado acesso a `/produtos/coins`, então exibir nome, summary, status e CTA.
2. Dado acesso a slug inexistente, então retornar 404 com link para `/produtos`.

## 18.4 Contato
1. Dado formulário vazio, ao submeter, então retornar erros por campo obrigatório.
2. Dado `intent=produto` sem `productSlug`, então bloquear envio.
3. Dado payload válido, então retornar sucesso e disparar evento `contact_form_submitted`.
4. Dado excesso de submissões, então retornar 429.

## 18.5 SEO
1. Toda página pública deve renderizar title, meta description e canonical.
2. Página de produto deve conter Open Graph próprio.

## 18.6 A11y
1. Navegação de header deve ser utilizável via teclado.
2. Drawer mobile deve abrir, receber foco e fechar via `Esc`.
3. Form deve anunciar erro e sucesso para leitores de tela.

---

## 19. Critérios de aceite

- Home atual preservada conceitualmente, porém modularizada.
- Catálogo de produtos navegável por rota própria.
- Cada produto com página própria.
- Contato com formulário funcional e tracking.
- Páginas legais publicadas.
- Lighthouse e a11y dentro das metas.
- Conteúdo desacoplado de apresentação.
- Projeto preparado para docs/changelog/blog/status.

---

## 20. Backlog pós-v1

- Cases com prova social
- Blog técnico/editorial
- Changelog público automatizado
- Status page integrada
- Captação com CRM
- i18n pt-BR/en
- busca federada em docs/blog/produtos
- feature flags para experimentos de copy/CTA
- dashboards de conversão

---

## 21. Prompt de implementação para o Codex

```txt
Você vai implementar a evolução do site thnkng.in seguindo estritamente esta spec.

Objetivo:
- reconstruir o site como um projeto Astro 6 + TypeScript + Tailwind CSS 4
- preservar a identidade textual e minimalista atual
- transformar o site em uma arquitetura modular, escalável e preparada para SEO, analytics e growth

Regras mandatórias:
1. Não invente escopo fora da spec.
2. Não use CMS externo.
3. Não use banco de dados para conteúdo público.
4. Todo conteúdo institucional e de produto deve sair de coleções tipadas.
5. Todo componente visual reutilizável deve ficar em `/src/components`.
6. Implemente páginas:
   - /
   - /produtos
   - /produtos/[slug]
   - /manifesto
   - /como-ajudamos
   - /o-que-fazemos
   - /contato
   - /privacidade
   - /termos
   - /sla
   - /changelog
   - /docs
   - /status
7. Implemente formulário de contato com validação server-side, honeypot, rate limit e webhook.
8. Implemente wrapper de analytics com os eventos definidos.
9. Implemente SEO por página com canonical, OG e sitemap.
10. Adicione testes E2E em Playwright para os fluxos críticos definidos.

Entregáveis:
- código completo do projeto
- arquivos de conteúdo de exemplo para produtos e páginas
- README com setup, envs e comandos
- testes E2E mínimos
- stories dos componentes principais
- configuração de lint/format

Critérios de qualidade:
- TypeScript sem any implícito
- componentes pequenos e nomeados semanticamente
- sem duplicação de markup entre páginas
- acessibilidade AA
- performance alta
- código legível, modular e pronto para manutenção
```

---

## 22. Observações finais para evolução segura

1. Antes de migrar qualquer visual, congelar a cópia atual como baseline.
2. Mapear quais produtos realmente precisam existir já na v1 pública.
3. Publicar legal pages cedo para reduzir risco comercial.
4. Decidir logo no início se `/docs`, `/status` e `/changelog` serão internos, externos ou híbridos.
5. Se o repositório atual já usar outro framework, esta spec continua válida como referência de arquitetura-alvo; o Codex pode executar migração incremental em vez de rewrite total.
