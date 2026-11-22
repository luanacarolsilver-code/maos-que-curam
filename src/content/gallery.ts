export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryChapter = {
  id: string;
  block: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
};

const img = (file: string, caption: string, alt?: string): GalleryImage => ({
  src: `/gallery/${file}`,
  caption,
  alt: alt ?? caption,
});

export const chapters: GalleryChapter[] = [
  {
    id: "chegada",
    block: "Implantação",
    title: "Fachada e entorno",
    subtitle: "A chegada ao Centro — presença urbana, acessos e relação com a rua.",
    images: [
      img("fachada-2.png", "Fachada principal", "Fachada com letreiro Mãos que Curam"),
      img("fachada-3.png", "Fachada — ângulo complementar"),
      img("externo-1.png", "Vista externa 01"),
      img("externo-2.png", "Vista externa 02"),
      img("externo-3.png", "Vista externa 03"),
      img("externo-4.png", "Vista externa 04"),
      img("estacionamento-1.png", "Estacionamento 01"),
      img("estacionamento-2.png", "Estacionamento 02"),
    ],
  },
  {
    id: "lagarta",
    block: "Bloco 1 · Lagarta",
    title: "Acolhimento",
    subtitle: "Recepção, administração e espaços de cuidado no primeiro contato.",
    images: [
      img("recepcao-1.png", "Recepção 01", "Balcão de recepção com identidade visual"),
      img("recepcao-2.png", "Recepção 02"),
      img("recepcao-3.png", "Recepção 03"),
      img("recepcao-4.png", "Recepção 04"),
      img("recepcao-5.png", "Recepção 05"),
      img("cozinha-1.png", "Cozinha 01"),
      img("cozinha-2.png", "Cozinha 02"),
      img("cozinha-3.png", "Cozinha 03"),
    ],
  },
  {
    id: "crisalida",
    block: "Bloco 2 · Crisálida",
    title: "Criação",
    subtitle: "Ateliês, modelagem, expressões artísticas e terapia em grupo.",
    images: [
      img("bloco-crisalida-1.png", "Bloco Crisálida — exterior"),
      img("bloco-crisalida-2.png", "Bloco Crisálida — perspectiva"),
      img("artes-manuais-1-1.png", "Artes manuais 01"),
      img("artes-manuais-1-2.png", "Artes manuais 02"),
      img("artes-manuais-1-3.png", "Artes manuais 03"),
      img("artes-manuais-2-1.png", "Artes manuais 04"),
      img("expressoes-artisticas-1-1.png", "Expressões artísticas 01"),
      img("expressoes-artisticas-1-2.png", "Expressões artísticas 02"),
      img("expressoes-artisticas-1-3.png", "Expressões artísticas 03"),
      img("expressoes-artisticas-2-1.png", "Expressões artísticas 04"),
      img("expressoes-artisticas-2-2.png", "Expressões artísticas 05"),
      img("modelagem-1.png", "Modelagem 01"),
      img("modelagem-2.png", "Modelagem 02"),
      img("modelagem-3.png", "Modelagem 03"),
      img("criacao-ressignificacao-1.png", "Criação e ressignificação 01"),
      img("criacao-ressignificacao-2.png", "Criação e ressignificação 02"),
      img("terapia-grupo-1.png", "Terapia em grupo 01"),
      img("terapia-grupo-2.png", "Terapia em grupo 02"),
    ],
  },
  {
    id: "borboleta",
    block: "Bloco 3 · Borboleta",
    title: "Compartilhar",
    subtitle: "Galeria de exposição e loja de artesanato — o encontro com a cidade.",
    images: [
      img("galeria-1.png", "Galeria 01"),
      img("galeria-2.png", "Galeria 02"),
      img("galeria-3.png", "Galeria 03"),
      img("galeria-4.png", "Galeria 04"),
      img("loja-1.png", "Loja de artesanato"),
      img("loja-2.png", "Vitrine"),
    ],
  },
  {
    id: "jardins",
    block: "Paisagem",
    title: "Jardins terapêuticos",
    subtitle: "Espaços abertos de contemplação, pomar e laje — a natureza como cuidado.",
    images: [
      img("jardim-1.png", "Jardim 01"),
      img("jardim-2.png", "Jardim 02"),
      img("jardim-3.png", "Jardim 03"),
      img("jardim-4.png", "Jardim 04"),
      img("jardim-5.png", "Jardim 05"),
      img("jardim-6.png", "Jardim 06"),
      img("pomar-1.png", "Pomar"),
      img("laje-1.png", "Laje"),
    ],
  },
];

export const totalImages = chapters.reduce((n, c) => n + c.images.length, 0);
