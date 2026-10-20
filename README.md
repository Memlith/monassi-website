# 🪵 Monassi Móveis Planejados — Website, Galeria & Catálogo MDF 2026

Plataforma web moderna, responsiva e de alta conversão desenvolvida para a **Monassi Móveis Planejados**, referência em **Marcenaria 2.0** de alto padrão com atendimento exclusivo em **Indaiatuba, Salto e Itu – SP**.

---

## ✨ Destaques do Projeto

- **Marcenaria 2.0 de Precisão Industrial**: Fluxo completo unindo projeto 3D personalizado, envio do plano de corte via **CorteCloud** (para fornecedores industriais como *CrieCorte, Gasômetro e Leo Madeiras*), retirada das chapas usinadas e montagem especializada própria.
- **Galeria de Móveis com Carrosséis Multi-Fotos (`/galeria`)**: **24 projetos reais** (134 fotos em formato `.webp` de alta definição) incluindo obras do acervo oficial e carrosséis do Instagram (`@monassiplanejados`), filtros por ambiente, visualização ampla/compacta, lightbox com navegação por teclado e compartilhamento direto por link (`/galeria?projeto=id`).
- **Catálogo Interativo de Madeiras & MDF Duratex 2026 (`/catalogo`)**: Portfólio digital completo com os **80 padrões oficiais Duratex 2026**, alternância entre *Textura da Chapa* e *Ambiente Decorado em 3D*, filtros por linha (*Madeiras Nobres, Contemporâneas, Naturais, Unicolores, Alto Brilho Cristallo, Super Matte Acetinatta, Pedras & Metalizados e Ultra Resistente à Umidade*) e envio direto do padrão escolhido para o simulador de orçamento (`/?mdf=...#orcamento`).
- **Simulador de Orçamento Integrado ao WhatsApp & Cloud Firestore**: Captura estruturada do ambiente, cidade atendida (*Indaiatuba, Salto ou Itu*), prazo e padrão de MDF, abrindo o WhatsApp sem bloqueio de pop-up no iOS/Safari e gravando o lead no **Firebase Cloud Firestore**.
- **Firebase Analytics (GA4) + Painel Administrativo (`/admin`)**: Rastreamento automático de `page_view` e eventos de conversão (`whatsapp_click`, `cta_click`, `lead_submit`, `gallery_project_open`, `catalog_pattern_open`, `catalog_select_for_quote`) no Google Analytics e em tempo real no painel `/admin` protegido por **Firebase Authentication (Google)** e **Firestore Security Rules** (`firestore.rules`).
- **Pipeline Automático WebP + Testes + CI/CD**: Script com `sharp` que converte e comprime todas as 369 imagens de `public/img/` para `.webp` (**redução de 58,3% no peso das imagens**), suíte de testes automatizada (`npm test`), hook de `pre-commit` local e workflow **GitHub Actions** (`.github/workflows/ci.yml`).

---

## 🚀 Tecnologias Utilizadas

- **[Next.js 16.3](https://nextjs.org/)** (App Router + Turbopack) — Renderização estática (SSG), metadados por rota, `sitemap.xml` e `robots.txt` nativos.
- **[React 19](https://react.dev/) & [TypeScript 5](https://www.typescriptlang.org/)** — Tipagem estática rigorosa de ponta a ponta.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Design system editorial (`#1C1917` Espresso, `#FAF8F5` Off-White e `#C28839` Bronze/Ouro).
- **[Firebase Web SDK v13](https://firebase.google.com/)** — Cloud Firestore (`leads` e `analytics_events`), Firebase Authentication e Google Analytics 4.
- **[Sharp](https://sharp.pixelplumbing.com/)** — Conversão e compressão automatizada de imagens para `.webp`.
- **[Lucide React](https://lucide.dev/)** & **Google Fonts** (`Fraunces` + `Plus Jakarta Sans`).

---

## 📐 Rotas e Páginas da Aplicação

| Rota | Descrição |
| :--- | :--- |
| **`/`** | Landing Page completa (Hero, Diferenciais Marcenaria 2.0, 6 Destaques do Portfólio com carrossel, Prévia do Catálogo MDF com 8 abas, Antes & Depois interativo, Passo a Passo, Simulador de Orçamento, Depoimentos, FAQ com Schema JSON-LD e CTA Final). |
| **`/galeria`** | Galeria completa com 24 projetos entregues e 134 fotos em carrossel, filtros por categoria, busca visual e link compartilhável por móvel (`?projeto=id`). |
| **`/catalogo`** | Catálogo interativo com os 80 padrões de MDF Duratex 2026, busca instantânea, filtros *Lançamentos 2026* e *Ultra (Resistente à Umidade)*, visualização de chapa vs. ambiente 3D e sugestões de combinação. |
| **`/admin`** | Dashboard em tempo real conectado ao projeto Firebase `monassi-planejados-web` para gestão de leads (`novo`, `em_atendimento`, `concluido`) e auditoria de cliques. |
| **`/sitemap.xml` & `/robots.txt`** | Gerados automaticamente via App Router (`app/sitemap.ts` e `app/robots.ts`), indexando as páginas públicas e ocultando `/admin`. |

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- **Node.js 24+**
- **npm 10+**

### Instalação e Execução

1. Clone o repositório:
```bash
git clone git@github.com:Memlith/monassi-website.git
cd monassi-website
```

2. Instale as dependências e ative o hook de pre-commit:
```bash
npm install
git config core.hooksPath .githooks
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
- **Página Inicial**: [http://localhost:3000](http://localhost:3000)
- **Galeria de Móveis**: [http://localhost:3000/galeria](http://localhost:3000/galeria)
- **Catálogo de Madeiras MDF**: [http://localhost:3000/catalogo](http://localhost:3000/catalogo)
- **Painel Admin / Analytics**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🧪 Scripts, Otimizador WebP, Pre-Commit & CI/CD

| Comando | O que faz |
| :--- | :--- |
| `npm run dev` | Inicia o servidor Next.js em modo de desenvolvimento. |
| `npm run optimize:images` | Converte qualquer imagem `.jpg`/`.jpeg`/`.png` em `public/img/` para `.webp` otimizado e atualiza automaticamente as referências no código. |
| `npm test` | Executa a suíte de verificação (`scripts/test-suite.mjs`): ESLint, TypeScript, formato `.webp` das 369 imagens, integridade dos 80 padrões do catálogo, 134 fotos da galeria e regras do Firestore. |
| `npm run build` | Gera o build otimizado de produção do Next.js. |
| `npm run precommit` | Executa em sequência `npm run optimize:images && npm test && npm run build` (rodado automaticamente pelo Git antes de cada commit via `.githooks/pre-commit`). |

No GitHub, o workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa as mesmas validações em cada `push` ou `pull_request` na branch `main`.

---

## 📁 Estrutura de Pastas

```text
monassi-website/
├── .github/workflows/
│   └── ci.yml                       # Pipeline CI/CD no GitHub Actions (Node 24)
├── .githooks/
│   └── pre-commit                   # Hook pre-commit (WebP + Test + Build)
├── app/
│   ├── admin/page.tsx               # Painel de Leads e Eventos (Firebase Firestore)
│   ├── catalogo/
│   │   ├── layout.tsx               # Metadata SEO do Catálogo MDF
│   │   └── page.tsx                 # Catálogo interativo Duratex 2026 (80 padrões)
│   ├── galeria/
│   │   ├── layout.tsx               # Metadata SEO da Galeria
│   │   └── page.tsx                 # Galeria completa de projetos e carrosséis
│   ├── favicon.ico & icon.png       # Ícones da marca Monassi
│   ├── globals.css                  # Tokens Tailwind CSS v4 e utilitários
│   ├── layout.tsx                   # RootLayout + Schema LocalBusiness + Analytics
│   ├── not-found.tsx                # Página 404 personalizada
│   ├── page.tsx                     # Home Page (13 seções)
│   ├── robots.ts                    # Geração de /robots.txt
│   └── sitemap.ts                   # Geração de /sitemap.xml
├── components/
│   ├── BeforeAfter.tsx              # Slider interativo Antes & Depois
│   ├── FAQ.tsx                      # Perguntas frequentes + Schema FAQPage
│   ├── Features.tsx                 # Diferenciais da Marcenaria 2.0
│   ├── FinalCTA.tsx                 # Chamada de conversão final
│   ├── FirebaseAnalyticsInit.tsx    # Inicialização GA4 e rastreamento de rotas
│   ├── FloatingWhatsApp.tsx         # Botão flutuante de WhatsApp
│   ├── Footer.tsx                   # Rodapé institucional
│   ├── Gallery.tsx                  # 6 projetos em destaque na Home
│   ├── Header.tsx                   # Navegação principal fixa
│   ├── Hero.tsx                     # Hero section com proposta de valor
│   ├── LeadForm.tsx                 # Simulador de orçamento + gravação Firestore
│   ├── Process.tsx                  # As 4 etapas da Marcenaria 2.0
│   ├── Testimonials.tsx             # Seção de depoimentos
│   └── WoodCatalogPreview.tsx       # Amostra do catálogo MDF na Home (8 categorias)
├── lib/
│   ├── analytics.ts                 # Funções trackClick() e saveLead()
│   ├── catalog-data.json            # Base de dados dos 80 padrões Duratex 2026
│   ├── catalog-data.ts              # Tipagens e filtros do catálogo MDF
│   ├── firebase.ts                  # Configuração Firebase App, Auth, Firestore e Analytics
│   └── projects-data.ts             # Base de dados dos 24 projetos (134 fotos)
├── public/img/                      # 369 imagens otimizadas em .webp (acervo, instagram, catálogo, logos)
├── scripts/
│   ├── optimize-images.mjs          # Conversor e compressor automático para WebP
│   └── test-suite.mjs               # Suíte de testes de integridade e qualidade
├── firebase.json                    # Configuração do projeto Firebase
├── firestore.indexes.json           # Índices do Cloud Firestore
└── firestore.rules                  # Regras de segurança do Cloud Firestore
```

---

## 📍 Sobre a Monassi Móveis Planejados

- **Atendimento Exclusivo**: Indaiatuba, Salto e Itu – SP
- **WhatsApp**: [(19) 99443-2077](https://wa.me/5519994432077)
- **Instagram**: [@monassiplanejados](https://www.instagram.com/monassiplanejados/)
