# .copilot-instruction — Thinkng (thnkng.in) — Single Page (1 arquivo) + Vanilla + Tailwind via `<link>`

Você é um **Product Designer + Frontend Engineer**. Crie um site **de uma única página** para a empresa **Thinkng**, domínio **thnkng.in**.

Restrições técnicas (obrigatórias):

- **Um único arquivo:** `index.html`.
- **Sem Node**, **sem bundler**, **sem React/Vue**, **sem TypeScript**.
- **CSS e JS vanilla**, embutidos no próprio `index.html` (tags `<style>` e `<script>`).
- Tailwind deve ser carregado **via `<link>`** para um arquivo CSS pronto (ex.: CDN). Não use `tailwindcss.com` via `<script>`.
- Nada além disso (sem libs externas de UI).

## 1) Objetivo

Landing institucional minimalista, rápida e elegante, clara em 10 segundos:

- Quem somos
- O que fazemos
- Como ajudamos
- Open Source
- Software sob medida (quando necessário)
- Contato

A Thinkng não é “software house”. É clareza. Às vezes isso vira software.

Frase-guia (usar no site):
**“Open source quando possível. Software sob medida quando necessário.”**

## 2) Direção de design (obrigatória)

### Tokens (CSS variables)

Defina em `:root`:

- `--bg: #FFFFFF`
- `--fg: #111111`
- `--muted: #B6B6B6`
- `--surface: #EDEDED`
- `--accent: #007AFF` (usar pouco)
- `--warn: #FF7A00` (quase nunca)

Regra: 80% preto/branco/cinzas. Azul/laranja apenas como foco. Contraste WCAG AA.

### Tipografia

- Fonte: **Inter** via Google Fonts `<link>`.
- Hierarquia:
  - H1: 56px / 300
  - H2: 40px / 400
  - H3: 28px / 500
  - Body: 18px / 400
  - Caption: 14px / 400
- Line-height ~1.6

### Layout

- Grid 12 colunas no desktop (pode ser com Tailwind utilities)
- Margens: 64px desktop, 32px mobile
- Spacing em múltiplos de 8px
- Muito espaço em branco. Sem ruído.

### Componentes

- Botões: altura ≥ 44px, raio 8px, padding lateral 24px
- Cards: fundo `--surface`, raio 12px, sombra sutil, padding 32px
- Ícones (se usar): lineares, discretos, nunca decorativos

### Motion

- 200–250ms, ease-out, deslocamento leve (8px)
- Nada chamativo

## 3) Tom de voz e copy (usar exatamente)

Curto, direto, humano. Sem corporativês.

## 4) Seções obrigatórias (âncoras)

- `#top` Header
- `#manifesto` Manifesto
- `#o-que-fazemos` O que fazemos
- `#como-ajudamos` Como ajudamos
- `#open-source` Open Source
- `#sob-medida` Software sob medida
- `#contato` Contato
- Footer

## 5) Conteúdo (copiar e usar)

### Header

- Logo tipográfico: **thinkng**
- Links: Manifesto · O que fazemos · Como ajudamos · Open Source · Sob medida · Contato
- CTA pequeno: **Falar com a Thinkng**

### Hero

H1: **Tornamos a tecnologia invisível.**  
Sub: **Design, código e propósito. Do briefing ao deploy. Sem ruído.**  
CTA primário: **Falar com a Thinkng**  
CTA secundário: **Ver Open Source**  
Microcopy opcional: **Menos ferramenta. Mais significado.**

### Manifesto

Não estamos aqui para construir mais um sistema.  
Estamos aqui para reduzir atrito.

A boa tecnologia não se exibe.  
Ela desaparece.

O que é complexo demais para usar, falhou.  
O que é bonito mas não funciona, também.

Nós perseguimos o óbvio.  
Até ele parecer inevitável.

### O que fazemos

Título: **Três pilares. Um padrão.**

Card 1 — **Design**

- Interfaces silenciosas.
- Produto que se entende sem manual.
- Decisões visuais que viram confiança.

Card 2 — **Código**

- Engenharia limpa, legível, escalável.
- DX que acelera times.
- Performance como requisito, não como ajuste.

Card 3 — **Propósito**

- Estratégia antes de features.
- Clareza do que importa.
- Produto alinhado com impacto real.

### Como ajudamos

Título: **Menos caos. Mais entrega.**

- Alinhamos visão, escopo e narrativa do produto.
- Transformamos fluxos confusos em experiências claras.
- Padronizamos UI/UX e design system para escalar.
- Refatoramos arquitetura sem quebrar o ritmo do time.
- Entregamos um caminho simples para evoluir.

Linha opcional:
**Trabalhamos rápido. Com padrão alto. E sem desculpas.**

### Open Source

Título: **Open source, do jeito certo.**
Construímos em público. Compartilhamos o que acreditamos.  
Ferramentas, templates e padrões para tornar o trabalho mais simples.

CTAs (placeholder):

- **GitHub da Thinkng**
- **Ver projetos**

Linha curta opcional:
**Comunidade é produto.**

### Software sob medida

Título: **Sob medida, sem virar “software house”.**
Fazemos open source quando possível.  
Quando não dá, construímos sob medida — com o mesmo padrão.

Regras:

- Não vendemos horas. Assumimos problemas.
- Projetos curados: poucos, estratégicos, com impacto.
- Se a solução puder virar referência reutilizável, melhor.

Frase final:
**Open source quando possível. Software sob medida quando necessário.**

### Contato

Título: **Vamos construir algo inevitável.**
Se você quer simplicidade, qualidade e velocidade com consistência, fale com a gente.

Form (sem backend):

- Nome
- Email
- Mensagem
  Botão: **Enviar**

Alternativa:
Email: **contato@thnkng.in** (placeholder)

### Footer

- **Thinkng. Design, código e propósito.**
- **© 2026 Thinkng. Todos os direitos reservados.**

## 6) Entregável (o que você deve gerar)

Gerar **apenas** o arquivo `index.html` completo contendo:

- `<head>` com:
  - `<meta charset>` + viewport
  - `<title>` adequado
  - `<link>` para Google Fonts (Inter)
  - `<link>` para Tailwind CSS (arquivo pronto via CDN)
  - `<style>` com tokens e ajustes mínimos (foco, suavidade, etc.)
- `<body>` com as seções e âncoras definidas
- `<script>` com JS vanilla mínimo:
  - Scroll suave (respeitando `prefers-reduced-motion`)
  - Header sticky com mudança sutil ao rolar
  - Menu mobile (abre/fecha)
  - Link ativo por seção (IntersectionObserver)
  - A11y: ESC fecha menu, `aria-expanded`, foco gerenciado

## 7) Acessibilidade (obrigatório)

- Navegação por teclado completa
- Foco visível (outline usando `--accent`)
- Semântica correta (`header`, `main`, `section`, `footer`)
- `aria-label` onde necessário (menu, CTAs)
- Respeitar `prefers-reduced-motion`

## 8) Restrições

- Sem carrossel, parallax, vídeo pesado, gradientes chamativos
- Sem “tech stock photos”
- Nada decorativo sem função
- Sem páginas extras, sem build step, sem assets obrigatórios

## 9) Critério de sucesso

O resultado precisa parecer:

- inevitável
- silencioso
- premium sem chamar atenção
- claro em 10 segundos

```

```
