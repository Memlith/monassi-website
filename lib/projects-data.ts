export interface ProjectSlide {
  src: string;
  caption: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  highlight: string;
  category:
    | 'Cozinhas & Gourmet'
    | 'Salas & Painéis'
    | 'Comercial & Escritórios'
    | 'Dormitórios & Closets'
    | 'Banheiros & Lavabos'
    | 'Lavanderia & Serviço';
  location: 'Indaiatuba, SP' | 'Salto, SP' | 'Itu, SP';
  featuredOnHome: boolean;
  description: string;
  specs: string[];
  slides: ProjectSlide[];
}

export const PROJECT_CATEGORIES = [
  'Todos',
  'Cozinhas & Gourmet',
  'Salas & Painéis',
  'Dormitórios & Closets',
  'Banheiros & Lavabos',
  'Comercial & Escritórios',
  'Lavanderia & Serviço',
] as const;

export const PROJECTS_DATA: ProjectItem[] = [
  // ============================================================================
  // 6 DESTAQUES DA HOME PAGE
  // ============================================================================
  {
    id: 'cozinha-gourmet-coifa-ripada-churrasqueira',
    title: 'Cozinha Gourmet com Coifa Ripada & Churrasqueira',
    highlight: 'Área Gourmet Completa',
    category: 'Cozinhas & Gourmet',
    location: 'Indaiatuba, SP',
    featuredOnHome: true,
    description:
      'Espaço gourmet planejado completo com nicho superior para geladeira, adega/colmeia de garrafas, torre quente e coifa decorativa com painel ripado sobre a churrasqueira.',
    specs: [
      'Torre para refrigerador com nicho superior',
      'Adega colmeia embutida sob medida',
      'Coifa decorativa com painel ripado integrado',
      'Puxadores ocultos em perfil de alumínio',
    ],
    slides: [
      {
        src: '/img/acervo/movel-01/foto-01.webp',
        caption: 'Foto 1/3 — Visão geral da cozinha gourmet com coifa ripada e churrasqueira',
      },
      {
        src: '/img/acervo/movel-01/foto-02.webp',
        caption: 'Foto 2/3 — Detalhe da bancada em L, armários superiores e torre quente',
      },
      {
        src: '/img/acervo/movel-01/foto-03.webp',
        caption: 'Foto 3/3 — Ângulo lateral destacando o painel ripado da coifa e acabamentos',
      },
    ],
  },
  {
    id: 'living-painel-tv-estante',
    title: 'Living & Painel de TV com Estante',
    highlight: 'Painel de TV & Estante',
    category: 'Salas & Painéis',
    location: 'Indaiatuba, SP',
    featuredOnHome: true,
    description:
      'Painel de TV sob medida para sala de estar com estante lateral vertical para livros e decoração, prateleira superior para plantas, detalhe ripado e espelho integrado.',
    specs: [
      'Estante vertical com 5 nichos decorativos',
      'Prateleira superior para plantas e iluminação',
      'Painel com passagem oculta para fios e cabos',
      'Espelho integrado e acabamento ripado fino',
    ],
    slides: [
      {
        src: '/img/living-painel-tv-estante.webp',
        caption: 'Painel de TV sob medida com estante vertical, ripado e espelho integrado',
      },
    ],
  },
  {
    id: 'recepcao-consultorio-odontologico',
    title: 'Recepção de Consultório Odontológico',
    highlight: 'Eccel Odontologia - Recepção',
    category: 'Comercial & Escritórios',
    location: 'Indaiatuba, SP',
    featuredOnHome: true,
    description:
      'Recepção planejada para clínica (Eccel Odontologia) com balcão de atendimento sob medida, painel com logotipo em relevo, parede verde e móvel auxiliar com portas de correr.',
    specs: [
      'Balcão de atendimento ergonômico com tampo duplo',
      'Móvel auxiliar para impressoras e arquivos',
      'Painel de recepção preparado para fixação de TV',
      'Fácil higienização e alta durabilidade comercial',
    ],
    slides: [
      {
        src: '/img/comercial-consultorio-recepcao.webp',
        caption: 'Recepção planejada Eccel Odontologia com balcão e painel sob medida',
      },
    ],
  },
  {
    id: 'suite-master-cabeceira-ilha-guarda-roupa',
    title: 'Suíte Master — Guarda-Roupa Espelhado, Cabeceira & Ilha',
    highlight: 'Dormitório Completo • 6 Fotos',
    category: 'Dormitórios & Closets',
    location: 'Indaiatuba, SP',
    featuredOnHome: true,
    description:
      'Dormitório de casal de alto padrão com guarda-roupa embutido com portas de espelho até o teto, cabeceira estofada em gomos, criados-mudos e ilha central porta-joias com tampo de vidro e estrutura metálica rosé.',
    specs: [
      'Ilha central porta-joias com visor em vidro e base metálica',
      'Guarda-roupa até o teto com portas de correr espelhadas',
      'Cabeceira estofada sob medida com criados-mudos',
      'Painel de TV com nichos integrados ao dormitório',
    ],
    slides: [
      {
        src: '/img/acervo/movel-13/foto-01.webp',
        caption: 'Foto 1/6 — Visão geral da suíte com ilha porta-joias, cabeceira e armário espelhado',
      },
      {
        src: '/img/acervo/movel-13/foto-02.webp',
        caption: 'Foto 2/6 — Detalhe da cabeceira estofada e guarda-roupa com portas de espelho',
      },
      {
        src: '/img/acervo/movel-13/foto-03.webp',
        caption: 'Foto 3/6 — Ilha central com divisórias porta-joias e estrutura metálica rosé',
      },
      {
        src: '/img/acervo/movel-13/foto-04.webp',
        caption: 'Foto 4/6 — Criado-mudo e acabamento das portas espelhadas',
      },
      {
        src: '/img/acervo/movel-13/foto-05.webp',
        caption: 'Foto 5/6 — Painel de TV e bancada planejada no mesmo dormitório',
      },
      {
        src: '/img/acervo/movel-13/foto-06.webp',
        caption: 'Foto 6/6 — Detalhe interno das divisórias e gavetas do dormitório',
      },
    ],
  },
  {
    id: 'painel-amadeirado-porta-mimetizada-led',
    title: 'Painel Amadeirado Inteiriço com Porta Mimetizada & LED',
    highlight: 'Living de Alto Padrão • 5 Fotos',
    category: 'Salas & Painéis',
    location: 'Indaiatuba, SP',
    featuredOnHome: true,
    description:
      'Revestimento de parede inteiriço em padrão amadeirado nobre com porta de passagem oculta (mimetizada) e rasgo com iluminação indireta em fita LED quente.',
    specs: [
      'Porta de passagem invisível mimetizada no painel',
      'Iluminação indireta suave em fita LED quente',
      'Acabamento contínuo do piso ao teto sem emendas aparentes',
      'Dobradiças ocultas reforçadas de alto desempenho',
    ],
    slides: [
      {
        src: '/img/acervo/movel-15/foto-01.webp',
        caption: 'Foto 1/5 — Painel amadeirado com porta mimetizada fechada e perfil de LED aceso',
      },
      {
        src: '/img/acervo/movel-15/foto-02.webp',
        caption: 'Foto 2/5 — Ângulo frontal destacando o alinhamento da porta invisível',
      },
      {
        src: '/img/acervo/movel-15/foto-03.webp',
        caption: 'Foto 3/5 — Detalhe do recorte iluminado em LED no painel amadeirado',
      },
      {
        src: '/img/acervo/movel-15/foto-04.webp',
        caption: 'Foto 4/5 — Porta mimetizada aberta mostrando a integração entre ambientes',
      },
      {
        src: '/img/acervo/movel-15/foto-05.webp',
        caption: 'Foto 5/5 — Acabamento milimétrico dos veios da madeira e puxador discreto',
      },
    ],
  },
  {
    id: 'home-theater-painel-marmore-preto-led',
    title: 'Home Theater & Estante Iluminada com Padrão Mármore Preto',
    highlight: 'Salas & Painéis • 3 Fotos',
    category: 'Salas & Painéis',
    location: 'Indaiatuba, SP',
    featuredOnHome: true,
    description:
      'Estante home theater planejada combinando MDF amadeirado claro, frentes e nicho em padrão mármore preto chanfrado e prateleiras com iluminação em perfil de LED embutido.',
    specs: [
      'Torre lateral com nichos iluminados por perfil de LED',
      'Rack suspenso e frentes em padrão Mármore Preto',
      'Painel superior com iluminação pontual',
      'Design contemporâneo com recortes em 45 graus',
    ],
    slides: [
      {
        src: '/img/acervo/movel-17/foto-01.webp',
        caption: 'Foto 1/3 — Visão frontal do Home Theater amadeirado com detalhe em mármore preto e LED',
      },
      {
        src: '/img/acervo/movel-17/foto-02.webp',
        caption: 'Foto 2/3 — Ângulo lateral destacando os nichos iluminados e rack suspenso',
      },
      {
        src: '/img/acervo/movel-17/foto-03.webp',
        caption: 'Foto 3/3 — Detalhe do acabamento chanfrado no rack e iluminação embutida',
      },
    ],
  },

  // ============================================================================
  // DEMAIS MÓVEIS DOS ZIPS (/home/memlith-arch/Pictures/monassi) + INSTAGRAM
  // ============================================================================
  {
    id: 'dormitorio-ponte-ar-condicionado-painel-tv',
    title: 'Dormitório Completo — Armário Ponte, Bancada & Painel de TV',
    highlight: 'Dormitório Completo • 12 Fotos',
    category: 'Dormitórios & Closets',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Dormitório de casal planejado sob medida em MDF Gianduia/Fendi com armário ponte sobre a cama, nicho técnico integrado para ar-condicionado split, criados-mudos suspensos, bancada de estudos sob a janela com torre gaveteiro e painel de TV marmorizado.',
    specs: [
      'Armário ponte superior com nicho técnico embutido para ar-condicionado',
      'Guarda-roupa de canto até o teto + criados-mudos integrados',
      'Bancada de estudo/home office sob a janela em MDF marmorizado',
      'Painel de TV suspenso em padrão marmorizado com prateleira superior',
    ],
    slides: [
      {
        src: '/img/acervo/movel-19/foto-06.webp',
        caption: 'Foto 1/12 — Visão geral do armário ponte com nicho para ar-condicionado, criados-mudos e bancada',
      },
      {
        src: '/img/acervo/movel-19/foto-01.webp',
        caption: 'Foto 2/12 — Módulo guarda-roupa lateral até o teto e criado-mudo com gavetas',
      },
      {
        src: '/img/acervo/movel-19/foto-09.webp',
        caption: 'Foto 3/12 — Bancada sob a janela integrada à torre com 5 gavetas e armário superior',
      },
      {
        src: '/img/acervo/movel-19/foto-05.webp',
        caption: 'Foto 4/12 — Integração entre a torre gaveteiro e o painel de TV marmorizado',
      },
      {
        src: '/img/acervo/movel-19/foto-03.webp',
        caption: 'Foto 5/12 — Painel de TV suspenso em MDF marmorizado com prateleira superior',
      },
      {
        src: '/img/acervo/movel-19/foto-11.webp',
        caption: 'Foto 6/12 — Perspectiva da bancada de estudos e armários superiores junto à janela',
      },
      {
        src: '/img/acervo/movel-19/foto-12.webp',
        caption: 'Foto 7/12 — Detalhe do nicho sob medida para o ar-condicionado e armários laterais',
      },
      {
        src: '/img/acervo/movel-19/foto-02.webp',
        caption: 'Foto 8/12 — Porta do guarda-roupa aberta exibindo o cabideiro e maleiro interno',
      },
      {
        src: '/img/acervo/movel-19/foto-07.webp',
        caption: 'Foto 9/12 — Alinhamento dos puxadores perfil em alumínio e tomadas integradas no painel',
      },
      {
        src: '/img/acervo/movel-19/foto-08.webp',
        caption: 'Foto 10/12 — Detalhe aproximado do acabamento em torno do ar-condicionado Consul',
      },
      {
        src: '/img/acervo/movel-19/foto-04.webp',
        caption: 'Foto 11/12 — Vista lateral do painel de TV marmorizado com frisos decorativos',
      },
      {
        src: '/img/acervo/movel-19/foto-10.webp',
        caption: 'Foto 12/12 — Perspectiva lateral do dormitório completo instalado',
      },
    ],
  },
  {
    id: 'closet-guarda-roupa-em-l-verde-salvia',
    title: 'Guarda-Roupa em L Verde Sálvia & Amadeirado com Bancada',
    highlight: 'Dormitório Planejado • 9 Fotos',
    category: 'Dormitórios & Closets',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Guarda-roupa de canto em L combinando portas em MDF Verde Sálvia e tamponamento amadeirado, integrado a módulo baixo com nichos abertos e amplo espaço interno com cabideiros e gaveteiros.',
    specs: [
      'Configuração em L aproveitando 100% do canto do quarto',
      'Combinação contemporânea em MDF Verde Sálvia e Amadeirado',
      'Módulo lateral baixo com nichos organizadores',
      'Divisórias internas completas com maleiro, cabideiros e gavetas',
    ],
    slides: [
      {
        src: '/img/acervo/movel-14/foto-01.webp',
        caption: 'Foto 1/9 — Visão geral do guarda-roupa em L com portas Verde Sálvia e bancada lateral',
      },
      {
        src: '/img/acervo/movel-14/foto-02.webp',
        caption: 'Foto 2/9 — Detalhe do módulo de canto e tamponamento amadeirado',
      },
      {
        src: '/img/acervo/movel-14/foto-03.webp',
        caption: 'Foto 3/9 — Portas abertas revelando as divisórias internas e gaveteiro',
      },
      {
        src: '/img/acervo/movel-14/foto-04.webp',
        caption: 'Foto 4/9 — Interior do módulo de canto com amplo espaço para cabides e malas',
      },
      {
        src: '/img/acervo/movel-14/foto-05.webp',
        caption: 'Foto 5/9 — Detalhe das prateleiras internas e acabamento em MDF amadeirado',
      },
      {
        src: '/img/acervo/movel-14/foto-06.webp',
        caption: 'Foto 6/9 — Gavetas abertas com corrediças telescópicas',
      },
      {
        src: '/img/acervo/movel-14/foto-07.webp',
        caption: 'Foto 7/9 — Vista aproximada do encontro das portas e puxadores',
      },
      {
        src: '/img/acervo/movel-14/foto-08.webp',
        caption: 'Foto 8/9 — Bancada lateral com nichos abertos',
      },
      {
        src: '/img/acervo/movel-14/foto-09.webp',
        caption: 'Foto 9/9 — Conjunto finalizado no dormitório',
      },
    ],
  },
  {
    id: 'cozinha-planejada-fendi-adega-bancada-l',
    title: 'Cozinha Planejada em MDF Fendi com Adega & Bancada',
    highlight: 'Cozinha Completa • 11 Fotos',
    category: 'Cozinhas & Gourmet',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Cozinha planejada completa em MDF Fendi com armários aéreos, nicho garrafeiro superior, gabinete sob pia e bancada em granito com gaveteiros e portas com amortecimento.',
    specs: [
      'Acabamento acetinado em MDF Fendi e puxadores perfil',
      'Adega horizontal integrada aos armários superiores',
      'Gabinete sob pia e bancada seca com máximo aproveitamento',
      '11 fotos detalhando o interior e exterior de todos os módulos',
    ],
    slides: [
      {
        src: '/img/acervo/movel-16/foto-01.webp',
        caption: 'Foto 1/11 — Visão frontal dos armários aéreos, adega e gabinete sob a pia',
      },
      {
        src: '/img/acervo/movel-16/foto-02.webp',
        caption: 'Foto 2/11 — Detalhe do gabinete inferior e bancada de granito',
      },
      {
        src: '/img/acervo/movel-16/foto-03.webp',
        caption: 'Foto 3/11 — Armários superiores sobre o espaço da geladeira e fogão',
      },
      {
        src: '/img/acervo/movel-16/foto-04.webp',
        caption: 'Foto 4/11 — Portas e gavetas abertas mostrando o espaço interno',
      },
      {
        src: '/img/acervo/movel-16/foto-05.webp',
        caption: 'Foto 5/11 — Detalhe interno das divisórias sob a pia',
      },
      {
        src: '/img/acervo/movel-16/foto-06.webp',
        caption: 'Foto 6/11 — Armários aéreos abertos com prateleiras internas',
      },
      {
        src: '/img/acervo/movel-16/foto-07.webp',
        caption: 'Foto 7/11 — Vista lateral da cozinha planejada',
      },
      {
        src: '/img/acervo/movel-16/foto-08.webp',
        caption: 'Foto 8/11 — Alinhamento milimétrico dos puxadores perfil em alumínio',
      },
      {
        src: '/img/acervo/movel-16/foto-09.webp',
        caption: 'Foto 9/11 — Detalhe da adega superior e nicho aéreo',
      },
      {
        src: '/img/acervo/movel-16/foto-10.webp',
        caption: 'Foto 10/11 — Acabamento lateral e rodapé sob medida',
      },
      {
        src: '/img/acervo/movel-16/foto-11.webp',
        caption: 'Foto 11/11 — Conjunto completo instalado',
      },
    ],
  },
  {
    id: 'gabinete-gourmet-mdf-grafite-escuro',
    title: 'Gabinete de Cozinha & Gourmet em MDF Grafite Escuro',
    highlight: 'Cozinhas & Gourmet • 3 Fotos',
    category: 'Cozinhas & Gourmet',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Gabinete inferior planejado em MDF Grafite Escuro sob bancada de granito preto, com gaveteiro central de 4 gavetas, portas de giro e puxadores embutidos.',
    specs: [
      'MDF Grafite Escuro em harmonia com bancada de granito preto',
      'Gaveteiro central com 4 gavetas e corrediças telescópicas',
      'Portas amplas com dobradiças slow-motion',
      'Vedação e acabamento perfeito sobre o rodapé de pedra',
    ],
    slides: [
      {
        src: '/img/acervo/movel-10/foto-01.webp',
        caption: 'Foto 1/3 — Gabinete em MDF Grafite instalado sob a bancada de granito',
      },
      {
        src: '/img/acervo/movel-10/foto-02.webp',
        caption: 'Foto 2/3 — Portas e gavetas abertas revelando o interior 100% MDF',
      },
      {
        src: '/img/acervo/movel-10/foto-03.webp',
        caption: 'Foto 3/3 — Detalhe do gaveteiro aberto e divisórias internas',
      },
    ],
  },
  {
    id: 'area-gourmet-externa-churrasqueira-grafite',
    title: 'Gabinete de Churrasqueira & Bancada Gourmet Externa',
    highlight: 'Área Gourmet • 2 Fotos',
    category: 'Cozinhas & Gourmet',
    location: 'Salto, SP',
    featuredOnHome: false,
    description:
      'Módulos inferiores planejados em MDF Grafite com puxadores perfil para bancada de pia e churrasqueira externa.',
    specs: [
      'Fechamento sob medida para pia e churrasqueira gourmet',
      'Gaveteiro quádruplo + portas basculantes e de giro',
      'MDF resistente à umidade para áreas gourmet',
      'Puxadores lineares em alumínio',
    ],
    slides: [
      {
        src: '/img/acervo/movel-18/foto-01.webp',
        caption: 'Foto 1/2 — Bancada gourmet e churrasqueira com gabinetes fechados',
      },
      {
        src: '/img/acervo/movel-18/foto-02.webp',
        caption: 'Foto 2/2 — Portas e gavetas abertas demonstrando o aproveitamento interno',
      },
    ],
  },
  {
    id: 'cozinha-em-l-porta-temperos-aereo',
    title: 'Cozinha em L com Porta-Temperos Deslizante & Aéreo',
    highlight: 'Cozinhas & Gourmet • 5 Fotos',
    category: 'Cozinhas & Gourmet',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Conjunto de cozinha em L combinando gabinete inferior em MDF Fendi, porta-temperos deslizante ao lado do fogão e armário aéreo branco com tampo amadeirado.',
    specs: [
      'Porta-temperos deslizante com corrediças telescópicas',
      'Gabinete em L sob bancada de granito',
      'Armário aéreo com prateleiras internas e detalhe amadeirado',
      'Fotos da pré-montagem na oficina até a instalação final',
    ],
    slides: [
      {
        src: '/img/acervo/movel-05/foto-04.webp',
        caption: 'Foto 1/5 — Cozinha em L e armário aéreo instalados no ambiente',
      },
      {
        src: '/img/acervo/movel-05/foto-05.webp',
        caption: 'Foto 2/5 — Detalhe do porta-temperos deslizante aberto ao lado do fogão',
      },
      {
        src: '/img/acervo/movel-05/foto-01.webp',
        caption: 'Foto 3/5 — Armário aéreo na etapa de pré-montagem e conferência',
      },
      {
        src: '/img/acervo/movel-05/foto-02.webp',
        caption: 'Foto 4/5 — Teste de abertura do módulo deslizante lateral',
      },
      {
        src: '/img/acervo/movel-05/foto-03.webp',
        caption: 'Foto 5/5 — Detalhe das ferragens e corrediças telescópicas',
      },
    ],
  },
  {
    id: 'banheiro-amadeirado-espelheira-branco',
    title: 'Conjunto de Banheiro Amadeirado Nobre & Espelheira',
    highlight: 'Banheiros & Lavabos • 4 Fotos',
    category: 'Banheiros & Lavabos',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Conjunto para banheiro composto por gabinete inferior com frentes em MDF Amadeirado Escuro e estrutura branca, acompanhado de armário espelheira superior com nichos.',
    specs: [
      'Contraste sofisticado entre MDF Branco e Amadeirado Nobre',
      'Armário superior com espelho e nichos decorativos',
      'Gabinete com 3 gavetas e 2 portas sob a cuba',
      'Aproveitamento interno completo contornando o sifão',
    ],
    slides: [
      {
        src: '/img/acervo/movel-06/foto-01.webp',
        caption: 'Foto 1/4 — Conjunto completo de gabinete e espelheira instalados',
      },
      {
        src: '/img/acervo/movel-06/foto-02.webp',
        caption: 'Foto 2/4 — Portas e gavetas abertas revelando as divisórias internas',
      },
      {
        src: '/img/acervo/movel-06/foto-03.webp',
        caption: 'Foto 3/4 — Vista aproximada do gabinete inferior amadeirado',
      },
      {
        src: '/img/acervo/movel-06/foto-04.webp',
        caption: 'Foto 4/4 — Detalhe da espelheira superior aberta',
      },
    ],
  },
  {
    id: 'armario-organizador-banheiro-acima-vaso',
    title: 'Armário Aéreo & Coluna Organizadora para Banheiro',
    highlight: 'Banheiros & Lavabos • 8 Fotos',
    category: 'Banheiros & Lavabos',
    location: 'Itu, SP',
    featuredOnHome: false,
    description:
      'Solução inteligente de marcenaria sob medida para banheiros compactos: armário aéreo com nicho inferior e coluna lateral estreita aproveitando o espaço acima e ao lado do vaso sanitário.',
    specs: [
      'Aproveitamento milimétrico de espaço vertical no banheiro',
      'Armário superior de 2 portas + nicho aberto de apoio',
      'Coluna lateral com porta e prateleiras para toalhas e higiene',
      'MDF Branco resistente à umidade com puxadores discretos',
    ],
    slides: [
      {
        src: '/img/acervo/movel-12/foto-01.webp',
        caption: 'Foto 1/8 — Visão frontal do armário aéreo e coluna lateral instalados',
      },
      {
        src: '/img/acervo/movel-12/foto-02.webp',
        caption: 'Foto 2/8 — Portas abertas mostrando as prateleiras internas',
      },
      {
        src: '/img/acervo/movel-12/foto-03.webp',
        caption: 'Foto 3/8 — Detalhe da coluna lateral aberta ao lado do vaso',
      },
      {
        src: '/img/acervo/movel-12/foto-04.webp',
        caption: 'Foto 4/8 — Encaixe sob medida contornando a caixa acoplada',
      },
      {
        src: '/img/acervo/movel-12/foto-05.webp',
        caption: 'Foto 5/8 — Vista superior das divisórias internas',
      },
      {
        src: '/img/acervo/movel-12/foto-06.webp',
        caption: 'Foto 6/8 — Acabamento lateral e alinhamento das portas',
      },
      {
        src: '/img/acervo/movel-12/foto-07.webp',
        caption: 'Foto 7/8 — Nicho central de rápido acesso',
      },
      {
        src: '/img/acervo/movel-12/foto-08.webp',
        caption: 'Foto 8/8 — Conjunto fechado integrando-se à parede clara',
      },
    ],
  },
  {
    id: 'gabinete-banheiro-suspenso-amadeirado-nichos',
    title: 'Gabinete de Banheiro Suspenso Amadeirado com Nichos',
    highlight: 'Banheiros & Lavabos • 5 Fotos',
    category: 'Banheiros & Lavabos',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Gabinete suspenso em MDF amadeirado claro projetado sob medida para bancada de granito com cuba de apoio, contando com nichos abertos para toalhas, gavetas e porta basculante.',
    specs: [
      'Design suspenso facilitando a limpeza do piso',
      'Nichos abertos para toalhas e cestos organizadores',
      'Gavetas e porta com puxadores perfil em alumínio',
      'Acompanha prateleira superior sobre o vaso sanitário',
    ],
    slides: [
      {
        src: '/img/acervo/movel-04/foto-01.webp',
        caption: 'Foto 1/5 — Gabinete suspenso instalado sob a bancada de granito',
      },
      {
        src: '/img/acervo/movel-04/foto-02.webp',
        caption: 'Foto 2/5 — Vista frontal destacando os nichos e puxadores perfil',
      },
      {
        src: '/img/acervo/movel-04/foto-03.webp',
        caption: 'Foto 3/5 — Gavetas e porta abertas mostrando o espaço interno',
      },
      {
        src: '/img/acervo/movel-04/foto-04.webp',
        caption: 'Foto 4/5 — Detalhe da prateleira superior combinando no mesmo MDF',
      },
      {
        src: '/img/acervo/movel-04/foto-05.webp',
        caption: 'Foto 5/5 — Acabamento lateral e encaixe sob a pedra',
      },
    ],
  },
  {
    id: 'espelheira-gabinete-banheiro-classico',
    title: 'Espelheira com Nichos & Gabinete Sob Coluna de Lavatório',
    highlight: 'Banheiros & Lavabos • 6 Fotos',
    category: 'Banheiros & Lavabos',
    location: 'Salto, SP',
    featuredOnHome: false,
    description:
      'Conjunto sob medida projetado para abraçar lavatório de coluna sem necessidade de quebrar parede ou trocar a louça existente, acompanhado de espelheira superior com armário.',
    specs: [
      'Recorte sob medida contornando lavatório de coluna',
      'Espelheira superior com porta e prateleiras laterais',
      'Rodízios discretos para facilitar higienização',
      'Solução prática e elegante sem reforma civil',
    ],
    slides: [
      {
        src: '/img/acervo/movel-02/foto-01.webp',
        caption: 'Foto 1/6 — Conjunto espelheira e gabinete sob lavatório instalados',
      },
      {
        src: '/img/acervo/movel-02/foto-02.webp',
        caption: 'Foto 2/6 — Detalhe da espelheira superior com nichos laterais',
      },
      {
        src: '/img/acervo/movel-02/foto-03.webp',
        caption: 'Foto 3/6 — Gabinete inferior contornando perfeitamente a coluna da pia',
      },
      {
        src: '/img/acervo/movel-02/foto-04.webp',
        caption: 'Foto 4/6 — Portas do gabinete abertas mostrando as prateleiras internas',
      },
      {
        src: '/img/acervo/movel-02/foto-05.webp',
        caption: 'Foto 5/6 — Porta da espelheira aberta',
      },
      {
        src: '/img/acervo/movel-02/foto-06.webp',
        caption: 'Foto 6/6 — Vista lateral do conjunto no banheiro',
      },
    ],
  },
  {
    id: 'gabinete-pia-curva-marcenaria-2-0',
    title: 'Gabinete Sob Medida para Pia Curva — Do 3D à Montagem',
    highlight: 'Banheiros & Lavabos • 6 Fotos',
    category: 'Banheiros & Lavabos',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Acompanhe todas as etapas da Marcenaria 2.0 neste gabinete projetado para acompanhar o recorte exato de uma bancada curva em granito: modelagem 3D em CAD, pré-montagem e instalação final.',
    specs: [
      'Recorte escalonado sob medida para pia curva',
      '4 gavetas com corrediças telescópicas',
      'Prateleiras internas reguláveis',
      'Do projeto 3D SolidWorks à instalação no cliente',
    ],
    slides: [
      {
        src: '/img/acervo/movel-09/foto-06.webp',
        caption: 'Foto 1/6 — Móvel instalado sob a bancada curva de granito com porta aberta',
      },
      {
        src: '/img/acervo/movel-09/foto-05.webp',
        caption: 'Foto 2/6 — Vista superior mostrando o encaixe sob a saia de granito',
      },
      {
        src: '/img/acervo/movel-09/foto-02.webp',
        caption: 'Foto 3/6 — Pré-montagem na oficina após retirada das chapas (CorteCloud)',
      },
      {
        src: '/img/acervo/movel-09/foto-03.webp',
        caption: 'Foto 4/6 — Teste de abertura das 4 gavetas e portas',
      },
      {
        src: '/img/acervo/movel-09/foto-04.webp',
        caption: 'Foto 5/6 — Detalhe lateral do recorte anatômico',
      },
      {
        src: '/img/acervo/movel-09/foto-01.webp',
        caption: 'Foto 6/6 — Projeto técnico 3D em CAD que gerou o plano de corte',
      },
    ],
  },
  {
    id: 'balcao-buffet-aparador-amadeirado',
    title: 'Balcão Buffet & Aparador Amadeirado com Puxador Perfil',
    highlight: 'Salas & Escritórios • 4 Fotos',
    category: 'Salas & Painéis',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Balcão aparador e buffet multiuso com tampo amadeirado mais escuro, portas em padrão amadeirado claro, puxadores perfil em alumínio e rodízios embutidos.',
    specs: [
      'Combinação bicolor de padrões amadeirados Duratex',
      'Puxadores lineares em perfil de alumínio',
      'Prateleira interna inteiriça de alta resistência',
      'Rodízios para fácil movimentação no ambiente',
    ],
    slides: [
      {
        src: '/img/acervo/movel-11/foto-01.webp',
        caption: 'Foto 1/4 — Vista frontal do balcão buffet amadeirado',
      },
      {
        src: '/img/acervo/movel-11/foto-02.webp',
        caption: 'Foto 2/4 — Portas abertas exibindo o amplo espaço interno',
      },
      {
        src: '/img/acervo/movel-11/foto-03.webp',
        caption: 'Foto 3/4 — Detalhe do tampo amadeirado e puxador perfil',
      },
      {
        src: '/img/acervo/movel-11/foto-04.webp',
        caption: 'Foto 4/4 — Perspectiva lateral do móvel entregue',
      },
    ],
  },
  {
    id: 'bancada-comercial-atendimento-l-granito',
    title: 'Bancada Comercial & Caixa em L sob Balcão de Granito',
    highlight: 'Comercial & Escritórios • 6 Fotos',
    category: 'Comercial & Escritórios',
    location: 'Salto, SP',
    featuredOnHome: false,
    description:
      'Estrutura interna e bancada de trabalho em L em MDF Fendi projetada sob medida para área de caixa e atendimento comercial, com gaveta porta-cédulas chaveada e múltiplos nichos.',
    specs: [
      'Gaveta com divisórias porta-cédulas/moedas e fechadura',
      'Múltiplos nichos inferiores para embalagens e estoque',
      'Tampo de trabalho em L integrado ao balcão de granito',
      'Passagem técnica para computadores e impressoras fiscais',
    ],
    slides: [
      {
        src: '/img/acervo/movel-08/foto-03.webp',
        caption: 'Foto 1/6 — Visão interna dos nichos organizadores sob o balcão em L',
      },
      {
        src: '/img/acervo/movel-08/foto-01.webp',
        caption: 'Foto 2/6 — Estação de atendimento e gaveteiro com chave',
      },
      {
        src: '/img/acervo/movel-08/foto-06.webp',
        caption: 'Foto 3/6 — Gaveta aberta com organizador porta-cédulas e moedas',
      },
      {
        src: '/img/acervo/movel-08/foto-02.webp',
        caption: 'Foto 4/6 — Bancada para computador e prateleiras inferiores',
      },
      {
        src: '/img/acervo/movel-08/foto-04.webp',
        caption: 'Foto 5/6 — Vista superior do tampo em L encaixado sob o granito',
      },
      {
        src: '/img/acervo/movel-08/foto-05.webp',
        caption: 'Foto 6/6 — Acabamento lateral do módulo de atendimento',
      },
    ],
  },
  {
    id: 'movel-expositor-gabinete-aquario',
    title: 'Gabinete Estrutural Sob Medida para Aquário & Expositor',
    highlight: 'Comercial & Especial • 3 Fotos',
    category: 'Comercial & Escritórios',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Gabinete estrutural reforçado em MDF Branco com detalhes pretos, projetado especificamente para suportar o peso elevado de aquário com compartimento interno para filtros e insumos.',
    specs: [
      'Estrutura dimensionada para suportar alta carga estática',
      'Porta frontal com prateleira interna para bombas e filtros',
      'Acabamento resistente a respingos',
      'Base elevada com pés niveladores reforçados',
    ],
    slides: [
      {
        src: '/img/acervo/movel-03/foto-01.webp',
        caption: 'Foto 1/3 — Gabinete estrutural sob medida instalado com o aquário',
      },
      {
        src: '/img/acervo/movel-03/foto-02.webp',
        caption: 'Foto 2/3 — Porta aberta mostrando o compartimento técnico interno',
      },
      {
        src: '/img/acervo/movel-03/foto-03.webp',
        caption: 'Foto 3/3 — Vista lateral do móvel expositor',
      },
    ],
  },
  {
    id: 'armario-vassoureiro-multiuso-fendi',
    title: 'Armário Multiuso & Vassoureiro Alto em MDF Fendi',
    highlight: 'Lavanderia & Serviço • 6 Fotos',
    category: 'Lavanderia & Serviço',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Armário alto duas portas em MDF Fendi com divisão interna inteligente: metade prateleiras para produtos de limpeza e metade coluna vassoureiro com suporte suspenso.',
    specs: [
      'Divisão interna dupla: prateleiras + vão livre para vassouras',
      'Suporte organizador suspenso para vassouras e rodos',
      'Acabamento elegante em MDF Fendi',
      'Aproveitamento vertical máximo em área compacta',
    ],
    slides: [
      {
        src: '/img/acervo/movel-07/foto-04.webp',
        caption: 'Foto 1/6 — Armário alto em MDF Fendi fechado no ambiente',
      },
      {
        src: '/img/acervo/movel-07/foto-01.webp',
        caption: 'Foto 2/6 — Portas abertas mostrando o suporte de vassouras e prateleiras',
      },
      {
        src: '/img/acervo/movel-07/foto-02.webp',
        caption: 'Foto 3/6 — Detalhe interno das divisórias organizadoras',
      },
      {
        src: '/img/acervo/movel-07/foto-03.webp',
        caption: 'Foto 4/6 — Vista frontal do interior 100% MDF',
      },
      {
        src: '/img/acervo/movel-07/foto-05.webp',
        caption: 'Foto 5/6 — Alinhamento das portas até o teto',
      },
      {
        src: '/img/acervo/movel-07/foto-06.webp',
        caption: 'Foto 6/6 — Detalhe de acabamento lateral',
      },
    ],
  },

  // ============================================================================
  // CARROSSÉIS DO INSTAGRAM @monassiplanejados
  // ============================================================================
  {
    id: 'ig-cozinha-apartamento-slim-prata',
    title: 'Cozinha de Apartamento em MDF Branco Slim Prata',
    highlight: 'Apartamento Planejado • Instagram',
    category: 'Cozinhas & Gourmet',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Cozinha planejada em MDF Branco com puxadores Slim Prata, nicho aéreo para micro-ondas e aproveitamento total de bancada para forno e lava-louças.',
    specs: [
      'Puxadores lineares Slim Prata em alumínio',
      'Armários aéreos com nicho técnico para micro-ondas',
      'Gaveteiro sob bancada de granito com corrediças telescópicas',
      'Aproveitamento inteligente para cozinha de apartamento',
    ],
    slides: [
      {
        src: '/img/instagram/DF8-8kJM6VW-1.webp',
        caption: 'Foto 1/4 — Armários superiores e bancada com forno embutido (@monassiplanejados)',
      },
      {
        src: '/img/instagram/DF8-8kJM6VW-2.webp',
        caption: 'Foto 2/4 — Vista lateral do gabinete inferior e puxadores Slim Prata',
      },
      {
        src: '/img/instagram/DF8-8kJM6VW-3.webp',
        caption: 'Foto 3/4 — Alinhamento das portas e gavetas sob a pia',
      },
      {
        src: '/img/instagram/DF8-8kJM6VW-4.webp',
        caption: 'Foto 4/4 — Detalhe dos armários aéreos e nicho para micro-ondas',
      },
    ],
  },
  {
    id: 'ig-cozinha-torre-quente-porta-temperos',
    title: 'Cozinha Completa com Torre Quente & Porta-Temperos',
    highlight: 'Torre Quente Sob Medida • Instagram',
    category: 'Cozinhas & Gourmet',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Cozinha sob medida em MDF Branco com torre quente para forno e micro-ondas, nicho sobre refrigerador, armários superiores até o teto e porta-temperos integrado.',
    specs: [
      'Torre quente com ventilação técnica para forno e micro-ondas',
      'Porta-temperos deslizante integrado ao módulo inferior',
      'Armários superiores até o teto para máximo armazenamento',
      'Nicho sob medida sobre a geladeira com adega superior',
    ],
    slides: [
      {
        src: '/img/instagram/DFsmz2YRywJ-1.webp',
        caption: 'Foto 1/3 — Visão geral da cozinha com torre quente e nicho para geladeira (@monassiplanejados)',
      },
      {
        src: '/img/instagram/DFsmz2YRywJ-2.webp',
        caption: 'Foto 2/3 — Detalhe da bancada, gaveteiro e armários aéreos',
      },
      {
        src: '/img/instagram/DFsmz2YRywJ-3.webp',
        caption: 'Foto 3/3 — Acabamento interno e alinhamento das portas e puxadores',
      },
    ],
  },
  {
    id: 'ig-dormitorio-sapateira-penteadeira-santa-clara',
    title: 'Sapateira & Penteadeira Touch (Jd. Santa Clara)',
    highlight: 'Jd. Santa Clara - Indaiatuba • Instagram',
    category: 'Dormitórios & Closets',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Móveis em MDF Cafelatte e Branco com sapateira grande de portas de correr e penteadeira com visor em vidro para gaveta principal de joias e abertura Touch.',
    specs: [
      'Combinação sofisticada em MDF Cafelatte e Branco',
      'Penteadeira com tampo visor em vidro para porta-joias',
      'Todas as gavetas com sistema de abertura Touch (fecho toque)',
      'Sapateira ampla com portas de correr otimizando a circulação',
    ],
    slides: [
      {
        src: '/img/instagram/DLSxYw1RBKM-1.webp',
        caption: 'Foto 1/6 — Conjunto sapateira e penteadeira entregue no Jd. Santa Clara (@monassiplanejados)',
      },
      {
        src: '/img/instagram/DLSxYw1RBKM-2.webp',
        caption: 'Foto 2/6 — Detalhe da penteadeira com visor de vidro e gavetas Touch',
      },
      {
        src: '/img/instagram/DLSxYw1RBKM-3.webp',
        caption: 'Foto 3/6 — Sapateira com portas de correr aberta mostrando as prateleiras internas',
      },
      {
        src: '/img/instagram/DLSxYw1RBKM-4.webp',
        caption: 'Foto 4/6 — Gaveta porta-joias aberta com divisórias sob o tampo de vidro',
      },
      {
        src: '/img/instagram/DLSxYw1RBKM-5.webp',
        caption: 'Foto 5/6 — Vista interna completa das prateleiras e nichos da sapateira',
      },
      {
        src: '/img/instagram/DLSxYw1RBKM-6.webp',
        caption: 'Foto 6/6 — Acabamento lateral e integração perfeita no dormitório',
      },
    ],
  },
  {
    id: 'ig-escritorio-podologa-led-mesa-organica',
    title: 'Consultório de Podologia com Mesa Orgânica & LED',
    highlight: 'Comercial & Clínicas • Instagram',
    category: 'Comercial & Escritórios',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Escritório e consultório de podologia aconchegante com armários em MDF, módulo superior com fita de LED embutida e mesa de atendimento orgânica com pés de eucalipto.',
    specs: [
      'Mesa de atendimento em desenho orgânico curvo',
      'Armário aéreo com iluminação indireta em fita de LED',
      'Gaveteiro e bancada técnica de apoio para esterilização',
      'Design acolhedor projetado sob medida para clínica',
    ],
    slides: [
      {
        src: '/img/instagram/DJR67BUROVK-1.webp',
        caption: 'Foto 1/7 — Mesa orgânica e armário superior iluminado com LED (@monassiplanejados)',
      },
      {
        src: '/img/instagram/DJR67BUROVK-2.webp',
        caption: 'Foto 2/7 — Bancada técnica lateral com armários aéreos e inferiores',
      },
      {
        src: '/img/instagram/DJR67BUROVK-3.webp',
        caption: 'Foto 3/7 — Detalhe da curva orgânica do tampo amadeirado',
      },
      {
        src: '/img/instagram/DJR67BUROVK-4.webp',
        caption: 'Foto 4/7 — Armários técnicos fechados com puxadores clean',
      },
      {
        src: '/img/instagram/DJR67BUROVK-5.webp',
        caption: 'Foto 5/7 — Vista do atendimento integrando mesa e iluminação quente',
      },
      {
        src: '/img/instagram/DJR67BUROVK-6.webp',
        caption: 'Foto 6/7 — Detalhe interno e organização do espaço clínico',
      },
      {
        src: '/img/instagram/DJR67BUROVK-7.webp',
        caption: 'Foto 7/7 — Visão geral do consultório finalizado',
      },
    ],
  },
  {
    id: 'ig-area-servico-mdf-branco-texturizado',
    title: 'Área de Serviço em MDF Branco Texturizado 15mm',
    highlight: 'Lavanderia Planejada • Instagram',
    category: 'Lavanderia & Serviço',
    location: 'Indaiatuba, SP',
    featuredOnHome: false,
    description:
      'Área de serviço planejada em MDF Branco Texturizado 15mm garantindo máximo aproveitamento de espaço, organização e praticidade no dia a dia.',
    specs: [
      'MDF Branco Texturizado 15mm de alta resistência',
      'Armário aéreo sobre máquina e tanque',
      'Gabinete inferior sob medida contornando hidráulica',
      'Divisórias pensadas para produtos de limpeza e utensílios',
    ],
    slides: [
      {
        src: '/img/instagram/DPoreXMEfOS-1.webp',
        caption: 'Foto 1/5 — Armário aéreo e gabinete de lavanderia instalados (@monassiplanejados)',
      },
      {
        src: '/img/instagram/DPoreXMEfOS-2.webp',
        caption: 'Foto 2/5 — Portas abertas mostrando as prateleiras internas',
      },
      {
        src: '/img/instagram/DPoreXMEfOS-3.webp',
        caption: 'Foto 3/5 — Detalhe do gabinete inferior sob o tanque',
      },
      {
        src: '/img/instagram/DPoreXMEfOS-4.webp',
        caption: 'Foto 4/5 — Acabamento lateral e alinhamento das portas',
      },
      {
        src: '/img/instagram/DPoreXMEfOS-5.webp',
        caption: 'Foto 5/5 — Visão completa da área de serviço planejada',
      },
    ],
  },
];
