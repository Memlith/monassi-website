import rawPatterns from './catalog-data.json';

export interface MDFPattern {
  id: string;
  page: number;
  name: string;
  category: string;
  categoryLabel: string;
  line: string;
  tagline: string;
  description: string;
  combinations: string[];
  isLaunch2026: boolean;
  isUltraPremium: boolean;
  swatchUrl: string;
  ambientUrl: string;
  hexColor: string;
}

export interface CatalogCategory {
  id: string;
  label: string;
  description: string;
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: 'todos',
    label: 'Todos os Padrões',
    description: 'Portfólio completo Duratex 2026 com 80 padrões disponíveis na Marcenaria 2.0 Monassi.',
  },
  {
    id: 'madeiras-nobres',
    label: 'Madeiras Nobres',
    description: 'Nogueiras, Freijós e Carvalhos encorpados com acabamento aveludado para projetos de alto padrão.',
  },
  {
    id: 'madeiras-contemporaneas',
    label: 'Madeiras Contemporâneas',
    description: 'Desenhos lineares e modernos para cozinhas gourmet, painéis ripados e escritórios.',
  },
  {
    id: 'madeiras-classicas',
    label: 'Madeiras Clássicas',
    description: 'Padrões consagrados com excelente custo-benefício e versatilidade para qualquer ambiente.',
  },
  {
    id: 'madeiras-naturais',
    label: 'Madeiras Naturais & Absoluto',
    description: 'Veios orgânicos e poros sincronizados (Linha Thera, Prisma e Essência) que trazem o aconchego da madeira bruta.',
  },
  {
    id: 'unicolores',
    label: 'Unicolores & Cores',
    description: 'Paleta de verdes, azuis, terrosos, cinzas e off-whites com textura Trama ou Matt.',
  },
  {
    id: 'alto-brilho',
    label: 'Alto Brilho (Cristallo)',
    description: 'Espelhamento superior e profundidade de cor para portas, frentes e painéis sofisticados.',
  },
  {
    id: 'super-matte',
    label: 'Super Matte (Acetinatta)',
    description: 'Toque acetinado ultramacio com tecnologia anti-impressão digital e zero reflexo.',
  },
  {
    id: 'pedras-metalizados',
    label: 'Pedras, Mármores & Metalizados',
    description: 'Mármores, cimentos queimados e metalizados que substituem revestimentos pesados.',
  },
  {
    id: 'colecao-internos',
    label: 'Coleção Internos & Tecidos',
    description: 'Padrões internos diferenciados (linhos, tramas e couro) para o interior de closets e armários.',
  },
  {
    id: 'ultra-premium',
    label: 'Resistente à Umidade (Ultra)',
    description: 'MDF de alta densidade com tripla proteção contra umidade e cupins — essencial para cozinhas, banheiros e lavanderias.',
  },
];

export const MDF_PATTERNS: MDFPattern[] = (rawPatterns as MDFPattern[]).map((p) => ({
  ...p,
  combinations: p.combinations.filter(
    (c) =>
      c &&
      !c.includes('M ADE I RAS') &&
      !c.includes('U N I C O LO R') &&
      !c.includes('P E D RAS') &&
      !c.includes('AC E T I N AT TA') &&
      !c.includes('C R I STA L LO') &&
      c.length >= 3 &&
      c.length <= 32
  ),
}));

export function filterPatternsByCategory(patterns: MDFPattern[], categoryId: string): MDFPattern[] {
  if (categoryId === 'todos') return patterns;
  if (categoryId === 'ultra-premium') return patterns.filter((p) => p.isUltraPremium);
  if (categoryId === 'madeiras-naturais') {
    return patterns.filter(
      (p) => p.category === 'madeiras-naturais' || p.category === 'colecao-absoluto'
    );
  }
  if (categoryId === 'pedras-metalizados') {
    return patterns.filter(
      (p) => p.category === 'pedras-metalizados' || p.category === 'pedras-ultra'
    );
  }
  return patterns.filter((p) => p.category === categoryId);
}
