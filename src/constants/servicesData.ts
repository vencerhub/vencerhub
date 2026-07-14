import { 
  Mic2, 
  Video, 
  Camera, 
  Palette, 
  Radio,
  Plane, 
  Layout, 
  Settings, 
  GraduationCap 
} from 'lucide-react';
import { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: "podcast",
    title: "Estúdio de Podcast",
    shortDescription: "Estrutura premium com cortes estratégicos para máxima autoridade.",
    icon: Mic2,
    tag: "Scale",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Nosso estúdio de podcast foi projetado para oferecer a melhor experiência acústica e visual. Não entregamos apenas o áudio bruto; focamos na criação de cortes virais que alimentam suas redes sociais e aumentam sua autoridade digital.",
    benefits: [
      "Gravação Multicâmera Full HD",
      "Tratamento Acústico Profissional",
      "Edição com Foco em Cortes (Reels/TikTok)"
    ],
    portfolio: [
      {
        title: "Estúdio Vencer Hub (Fotos)",
        url: "https://vencerhub.pixieset.com/vencerhub/",
        image: "/images/centro/studio.jpeg",
        description: "Confira a estrutura física, iluminação e cenografia do nosso estúdio premium."
      },
      {
        title: "PodeVencer Podcast",
        url: "https://www.youtube.com/@PodeVencer",
        image: "/images/podcast/podevencer.png",
        description: "O podcast oficial da casa focado em empreendedorismo, mentalidade e alta performance."
      },
      {
        title: "Advocast Delas",
        url: "https://www.youtube.com/@advocastdelas",
        image: "/images/podcast/Advocast.jpg",
        description: "Podcast focado em advocacia feminina, empreendedorismo jurídico e carreira."
      },
      {
        title: "Sou Old Cast",
        url: "https://www.youtube.com/@SOUOLDCAST",
        image: "/images/podcast/LOGO OLDCAST.jpg",
        description: "Podcast com conversas e insights marcantes de veteranos do mercado."
      },
      {
        title: "Entregando o Jogo",
        url: "https://www.youtube.com/@EntregandooJogo",
        image: "/images/podcast/ENTREGANDO-O-JOGOlogo.png",
        description: "Estratégias reais e bastidores de negócios revelados sem filtros."
      },
      {
        title: "Poderosas do Digital",
        url: "https://www.youtube.com/@poderosasdodigital",
        image: "/images/podcast/Poderosas do digital.jpg",
        description: "Protagonismo feminino, liderança, autoconfiança e marketing digital para mulheres."
      }
    ]
  },
  {
    id: "cursos",
    title: "Cursos Online",
    shortDescription: "Produção de infoprodutos do roteiro à entrega final.",
    icon: GraduationCap,
    tag: "Profit",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Transformamos seu conhecimento em um produto escalável. Acompanhamos você desde a estruturação pedagógica do roteiro até a gravação e edição final das aulas, garantindo uma estética de alto padrão que valoriza seu ticket médio.",
    benefits: [
      "Roteirização e Estruturação de Aulas",
      "Cenografia Personalizada",
      "Edição com Material de Apoio Visual",
      "Assessoria para Plataformas de Hospedagem",
      "Qualidade de Cinema para sua Mentoria"
    ]
  },
  {
    id: "video",
    title: "Vídeos & Edição",
    shortDescription: "Audiovisual criativo focado em retenção e conversão.",
    icon: Video,
    tag: "Impact",
    image: "https://images.unsplash.com/photo-1492691523567-30730029d4ad?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Vídeos que vendem. Seja para lançamentos, anúncios ou conteúdo orgânico, nossa edição foca em retenção e psicologia de vendas. Utilizamos técnicas modernas de narrativa para manter seu público engajado do início ao fim.",
    benefits: [
      "Vídeos de Vendas (VSL)",
      "Anúncios Narrativos (UGC)",
      "Documentários Institucionais",
      "Motion Graphics e Legendagem Dinâmica",
      "Color Grading Profissional"
    ]
  },
  {
    id: "fotografia",
    title: "Fotografia",
    shortDescription: "Ensaios corporativos que elevam o posicionamento de marca.",
    icon: Camera,
    tag: "Branding",
    image: "https://images.unsplash.com/photo-1542038787-86df27a55ec7?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Sua imagem é seu primeiro cartão de visitas. Realizamos ensaios fotográficos lifestyle e corporativos que transmitem confiança, seriedade e sucesso, alinhados com o posicionamento que você deseja ocupar no mercado.",
    benefits: [
      "Retratos Corporativos",
      "Fotos Lifestyle para Social Media",
      "Fotografia de Produtos e Ambientes",
      "Direção de Pose de Alta Performance",
      "Edição de Pele e Luz Naturalista"
    ],
    portfolio: [
      {
        title: "Formatura Ana & Corporativo",
        url: "https://vencerhub.pixieset.com/formaturaana/",
        image: "https://images.pixieset.com/11999469/e6c5efb84c7ec0957b9e311eaad09a1c-large.jpg",
        description: "Registros de eventos acadêmicos, formaturas e momentos marcantes de celebração."
      },
      {
        title: "Davi Aniversário 1 Ano",
        url: "https://vencerhub4.pixieset.com/danianiversario1ano/",
        image: "https://images.pixieset.com/762895201/0f337e888a1ef225c4db92d65983dcc3-large.jpeg",
        description: "Fotografia afetiva de aniversários infantis e festas de 1 ano, capturando cada momento."
      },
      {
        title: "Assembleia Banricoop & Retratos",
        url: "https://vencerhub3.pixieset.com/assembleiabanricoop/",
        image: "https://images.pixieset.com/722326311/53dcb8bf4a429d3436b896b2ce6ad456-large.jpg",
        description: "Imagens institucionais de assembleias formais, cooperativismo e lideranças corporativas."
      },
      {
        title: "Esportes",
        url: "https://vencerhub3.pixieset.com/esportes/",
        image: "https://images.pixieset.com/309946801/d99d2206301bb67ba5953c3ca9a3aa2b-large.JPG",
        description: "Fotografia esportiva de alta dinâmica, registrando ação, velocidade e a emoção dos atletas."
      },
      {
        title: "Casamento Giuliane & Lukas",
        url: "https://vencerhub.pixieset.com/giulianeandlukas/",
        image: "https://images.pixieset.com/54750709/473f42c507eae302fb776a97c993d6c9-cover.jpg",
        description: "Cobertura fotográfica completa de casamentos com sensibilidade artística e sofisticação."
      },
      {
        title: "Malta Talks no Heliponto",
        url: "https://vencerhub5.pixieset.com/maltatalksnoheliponto/",
        image: "https://images.pixieset.com/088472411/2f51075837967023aae7cc8fae78a953-large.jpg",
        description: "Coberturas de alto padrão em locações premium, talk shows e networking de ponta."
      }
    ]
  },
  {
    id: "web-design",
    title: "Sites",
    shortDescription: "Criação de sites, Landing Pages e sistemas focados em conversão.",
    icon: Layout,
    tag: "Growth",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Não criamos apenas sites 'bonitos'. Desenvolvemos ferramentas de venda. Desde Landing Pages de alta conversão para lançamentos até sistemas internos que otimizam o fluxo do seu negócio digital.",
    benefits: [
      "LPs de Alta Conversão",
      "Sites Institucionais Modernos",
      "Sistemas de Gestão Personalizados",
      "SEO e Velocidade de Carregamento",
      "Design UX/UI Exclusivo"
    ]
  },
  {
    id: "identity",
    title: "Design",
    shortDescription: "Design moderno para marcas que buscam o próximo nível.",
    icon: Palette,
    tag: "Design",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Uma marca forte precisa de uma identidade coerente. Criamos identidades visuais completas, desde a logo até os materiais para redes sociais e comunicação impressa, garantindo que sua marca seja reconhecida e respeitada em qualquer lugar.",
    benefits: [
      "Identidade Visual (Logo)",
      "Cards para Redes Sociais",
      "Arte para Impressos",
      "Manual da Marca (Moodboard)",
      "Aplicações em Papelaria e Brindes"
    ]
  },
  {
    id: "drone",
    title: "Drone",
    shortDescription: "Imagens aéreas cinematográficas para projetos de impacto.",
    icon: Plane,
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Adicione uma perspectiva épica aos seus projetos. Nossas captações de drone trazem o valor de produção cinematográfica para seu institucional, curso ou evento, destacando sua estrutura e magnitude.",
    benefits: [
      "Filmagem 4K 60fps",
      "Fotos Aéreas de Alta Resolução",
      "Cobertura de Grandes Eventos",
      "Mapeamento e Inspeção (Opcional)",
      "Pilotos Certificados e Equipamento Premium"
    ]
  },
  {
    id: "live-stream",
    title: "Transmissão ao Vivo",
    shortDescription: "Transmissão profissional externa para eventos e lives estratégicas.",
    icon: Radio,
    tag: "Live",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1200&q=80",
    fullDescription: "Leve a qualidade de estúdio para qualquer lugar. Realizamos a transmissão ao vivo do seu evento, palestra ou lançamento com multi-câmeras, corte em tempo real e estabilidade total de sinal para as principais plataformas.",
    benefits: [
      "Transmissão Multi-câmera 4K",
      "Switching e Corte em Tempo Real",
      "Link de Internet Redundante",
      "Interação com Chat e Redes Sociais",
      "Gravação Master para Pós-Produção"
    ]
  }
];
