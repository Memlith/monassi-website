# 🪵 Monassi Móveis Planejados — Website & Galeria de Alta Conversão

Landing page moderna, responsiva e de alta performance desenvolvida para a **Monassi Móveis Planejados**, marcenaria de alto padrão localizada em Indaiatuba – SP.

O projeto é um **rework completo** planejado do zero com foco em conversão de leads para WhatsApp, valorização estética dos ambientes planejados e experiência do usuário refinada (estilo editorial).

---

## 🤖 Desenvolvimento Assistido por Inteligência Artificial (Google Gemini)

Este projeto foi concebido e estruturado com o auxílio do ecossistema de **Inteligência Artificial Google Gemini**, que atuou no desenvolvimento de ponta a ponta:
- **Planejamento Arquitetural**: Definição do framework de 11 elementos essenciais de conversão e elaboração do design system (tipografia, espaçamento e paleta de cores nobre).
- **Geração de Componentes e Código**: Escrita de componentes modulares em React / Next.js 14+, TypeScript e Tailwind CSS.
- **Otimização de SEO e Acessibilidade**: Semântica HTML5, metadados OpenGraph para compartilhamento social e padronização de imagens em *kebab-case semântico*.
- **Criação da Galeria Interativa**: Interface inspirada no design dos apps Fotos do iPhone e Google Photos com navegação fluida por teclado e modais imersivos.

---

## 🚀 Tecnologias e Ferramentas

- **[Next.js 14+](https://nextjs.org/)** (App Router) — Renderização estática ultrarrápida (SSG) e roteamento moderno.
- **[TypeScript](https://www.typescriptlang.org/)** — Tipagem estática e segurança de código.
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilização utilitária com tokens personalizados.
- **[Lucide React](https://lucide.dev/)** — Conjunto de ícones leves e elegantes.
- **[Google Fonts](https://fonts.google.com/)**:
  - `Fraunces`: Tipografia serifada de alto impacto para títulos (estética artesanal/editorial).
  - `Plus Jakarta Sans`: Sans-serif limpa para corpo de texto e legibilidade em qualquer dispositivo.

---

## 📐 Estrutura do Projeto & Páginas

### 1. Página Inicial (`/`)
Projetada com base no framework de **11 Elementos Essenciais de Conversão**:
1. **Header Fixo**: Logo em alta definição com efeito de desfoque (*backdrop-blur*) e menu responsivo.
2. **Hero Section**: Headline marcante, selos de confiança, métricas (+10 anos de experiência) e CTA principal.
3. **Diferenciais da Marcenaria**: Grid com 6 pilares (100% MDF, ferragens com amortecimento, projeto 3D, fabricação própria, pontualidade e garantia).
4. **Destaques do Portfólio**: 3 projetos em destaque com card de ação direta para a galeria completa.
5. **Antes & Depois Interativo**: Comparador deslizante em tempo real demonstrando a transformação de ambientes.
6. **Passo a Passo (Como Funciona)**: 4 etapas claras desde o primeiro contato até a entrega e montagem.
7. **Simulador de Orçamento (Lead Form)**: Formulário visual onde o cliente seleciona o cômodo e o prazo, gerando uma mensagem personalizada pronta para o WhatsApp.
8. **Depoimentos de Clientes**: Avaliações 5 estrelas de clientes reais da região de Indaiatuba.
9. **Perguntas Frequentes (FAQ)**: Acordeão interativo para sanar dúvidas sobre prazos, custos e regiões atendidas.
10. **CTA Final**: Chamada de alto impacto para solicitação de orçamento.
11. **Rodapé & Floating WhatsApp**: Informações completas de contato, horários, mapa e botão flutuante de atendimento rápido.

### 2. Galeria Completa (`/galeria`)
Página dedicada inspirada nos aplicativos **Apple Photos** e **Google Photos**:
- Alternador de visualização (**Grid Compacto** vs. **Grid Amplo**).
- Filtros por ambiente (*Todas as Fotos*, *Cozinhas & Gourmet*, *Salas & Painéis*, *Comercial & Clínicas*, *Antes & Depois*).
- Visualizador em tela cheia (*Lightbox*) com navegação por toque e pelas **setas do teclado** (`←` e `→`).
- Ficha técnica de cada foto com materiais, ferragens e botão direto de orçamento para o projeto visualizado.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+ ou 20+ (recomendado Node 20+)
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone git@github.com:Memlith/monassi-website.git
cd monassi-website
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
- **Site Principal**: [http://localhost:3000](http://localhost:3000)
- **Galeria de Fotos**: [http://localhost:3000/galeria](http://localhost:3000/galeria)

### Build de Produção

Para validar a compilação e gerar o bundle de produção estático:
```bash
npm run build
```

---

## 📁 Organização de Pastas

```text
monassi-website/
├── app/
│   ├── galeria/
│   │   └── page.tsx         # Página dedicada da galeria interativa
│   ├── favicon.ico
│   ├── globals.css          # Estilos globais e tokens de cores
│   ├── layout.tsx           # Layout raiz com fontes e SEO
│   └── page.tsx             # Página inicial (Landing Page)
├── components/
│   ├── BeforeAfter.tsx      # Comparador antes e depois
│   ├── FAQ.tsx              # Acordeão de perguntas frequentes
│   ├── Features.tsx         # Diferenciais da marcenaria
│   ├── FinalCTA.tsx         # Seção de conversão final
│   ├── FloatingWhatsApp.tsx # Botão flutuante de WhatsApp
│   ├── Footer.tsx           # Rodapé institucional
│   ├── Gallery.tsx          # Seção de projetos da home
│   ├── Header.tsx           # Cabeçalho e navegação
│   ├── Hero.tsx             # Seção principal de apresentação
│   ├── LeadForm.tsx         # Simulador de orçamento para WhatsApp
│   ├── Process.tsx          # Passo a passo do atendimento
│   └── Testimonials.tsx     # Avaliações de clientes
├── public/
│   └── img/                 # Imagens em kebab-case descritivo
├── package.json
└── README.md
```

---

## 📍 Sobre a Empresa

- **Nome**: Monassi Móveis Planejados
- **Localização**: Indaiatuba, São Paulo – Brasil
- **WhatsApp**: [(19) 99443-2077](https://wa.me/5519994432077)
- **Instagram**: [@monassiplanejados](https://www.instagram.com/monassiplanejados/)

---

Desenvolvido com excelência técnica e design refinado sob medida.
