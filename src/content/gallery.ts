export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryRoom = {
  id: string;
  title: string;
  images: GalleryImage[];
};

export type GalleryChapter = {
  id: string;
  block: string;
  title: string;
  subtitle: string;
  rooms: GalleryRoom[];
};

type RoomImageInput = string | { path: string; caption: string };

const room = (
  id: string,
  title: string,
  inputs: RoomImageInput[],
  imageCaption?: string,
): GalleryRoom => ({
  id,
  title,
  images: inputs.map((input) => {
    const path = typeof input === "string" ? input : input.path;
    const caption =
      typeof input === "string" ? (imageCaption ?? title) : input.caption;
    return {
      src: `/gallery/${path}`,
      caption,
      alt: caption,
    };
  }),
});

export const chapters: GalleryChapter[] = [
  {
    id: "lagarta",
    block: "Bloco 1 · Lagarta",
    title: "Bloco Lagarta",
    subtitle: "Recepção e área de convivência\nO acolhimento no primeiro contato.",
    rooms: [
      room("recepcao-e-area-de-convivencia", "Recepção", [
        "bloco-lagarta/recepcao-e-area-de-convivencia/recepcao-e-area-de-convivencia-01.png",
        {
          path: "bloco-lagarta/recepcao-e-area-de-convivencia/recepcao-e-area-de-convivencia-02.png",
          caption: "Hall de espera",
        },
        {
          path: "bloco-lagarta/recepcao-e-area-de-convivencia/recepcao-e-area-de-convivencia-03.png",
          caption: "Hall de espera",
        },
        {
          path: "bloco-lagarta/recepcao-e-area-de-convivencia/recepcao-e-area-de-convivencia-04.png",
          caption: "Espaço de convivência",
        },
        {
          path: "bloco-lagarta/recepcao-e-area-de-convivencia/recepcao-e-area-de-convivencia-05.png",
          caption: "Espaço de convivência",
        },
      ]),
    ],
  },
  {
    id: "crisalida",
    block: "Bloco 2 · Crisálida",
    title: "Bloco Crisálida",
    subtitle:
      "Oficinas, cozinha terapêutica e terapia em\u00A0grupo\nO recolhimento e a transformação por meio da criação e da partilha.",
    rooms: [
      room("cozinha-terapeutica", "Cozinha terapêutica", [
        "bloco-crisalida/cozinha-terapeutica/cozinha-terapeutica-01.png",
        "bloco-crisalida/cozinha-terapeutica/cozinha-terapeutica-02.png",
        "bloco-crisalida/cozinha-terapeutica/cozinha-terapeutica-03.png",
      ]),
      room(
        "oficina-de-artes-manuais-01",
        "Oficina de artes manuais 01",
        [
          "bloco-crisalida/oficina-de-artes-manuais-01/oficina-de-artes-manuais-01-01.png",
          "bloco-crisalida/oficina-de-artes-manuais-01/oficina-de-artes-manuais-01-02.png",
          "bloco-crisalida/oficina-de-artes-manuais-01/oficina-de-artes-manuais-01-03.png",
        ],
        "Oficina de artes manuais",
      ),
      room(
        "oficina-de-artes-manuais-02",
        "Oficina de artes manuais 02",
        ["bloco-crisalida/oficina-de-artes-manuais-02/oficina-de-artes-manuais-02-01.png"],
        "Oficina de artes manuais",
      ),
      room("oficina-de-criacao-e-ressignificacao", "Oficina de criação e ressignificação", [
        "bloco-crisalida/oficina-de-criacao-e-ressignificacao/oficina-de-criacao-e-ressignificacao-01.png",
        "bloco-crisalida/oficina-de-criacao-e-ressignificacao/oficina-de-criacao-e-ressignificacao-02.png",
      ]),
      room(
        "oficina-de-expressoes-artisticas-01",
        "Oficina de expressões artísticas 01",
        [
          "bloco-crisalida/oficina-de-expressoes-artisticas-01/oficina-de-expressoes-artisticas-01-01.png",
          "bloco-crisalida/oficina-de-expressoes-artisticas-01/oficina-de-expressoes-artisticas-01-02.png",
          "bloco-crisalida/oficina-de-expressoes-artisticas-01/oficina-de-expressoes-artisticas-01-03.png",
        ],
        "Oficina de expressões artísticas",
      ),
      room(
        "oficina-de-expressoes-artisticas-02",
        "Oficina de expressões artísticas 02",
        [
          "bloco-crisalida/oficina-de-expressoes-artisticas-02/oficina-de-expressoes-artisticas-02-01.png",
          "bloco-crisalida/oficina-de-expressoes-artisticas-02/oficina-de-expressoes-artisticas-02-02.png",
        ],
        "Oficina de expressões artísticas",
      ),
      room("oficina-de-modelagem", "Oficina de modelagem", [
        "bloco-crisalida/oficina-de-modelagem/oficina-de-modelagem-01.png",
        "bloco-crisalida/oficina-de-modelagem/oficina-de-modelagem-02.png",
        "bloco-crisalida/oficina-de-modelagem/oficina-de-modelagem-03.png",
      ]),
      room("sala-de-terapia-em-grupo", "Sala de terapia em grupo", [
        "bloco-crisalida/sala-de-terapia-em-grupo/sala-de-terapia-em-grupo-01.png",
        "bloco-crisalida/sala-de-terapia-em-grupo/sala-de-terapia-em-grupo-02.png",
      ]),
    ],
  },
  {
    id: "borboleta",
    block: "Bloco 3 · Borboleta",
    title: "Bloco Borboleta",
    subtitle:
      "Galeria de arte e loja de artesanato\nA retomada da autonomia e do convívio ao compartilhar o que foi criado.",
    rooms: [
      room("galeria", "Galeria de arte", [
        "bloco-borboleta/galeria/galeria-01.png",
        "bloco-borboleta/galeria/galeria-02.png",
        "bloco-borboleta/galeria/galeria-03.png",
        "bloco-borboleta/galeria/galeria-04.png",
      ]),
      room("loja-de-artesanato", "Loja de artesanato", [
        "bloco-borboleta/loja-de-artesanato/loja-de-artesanato-01.png",
        "bloco-borboleta/loja-de-artesanato/loja-de-artesanato-02.png",
      ]),
    ],
  },
  {
    id: "jardim",
    block: "Jardim",
    title: "Jardim terapêutico e sensorial",
    subtitle: "O contato com a natureza convida à pausa e desperta os sentidos.",
    rooms: [
      room("jardim-terapeutico-e-sensorial", "Jardim terapêutico e sensorial", [
        "jardim-terapeutico-e-sensorial/jardim-terapeutico-e-sensorial-01.png",
        "jardim-terapeutico-e-sensorial/jardim-terapeutico-e-sensorial-02.png",
        "jardim-terapeutico-e-sensorial/jardim-terapeutico-e-sensorial-03.png",
        "jardim-terapeutico-e-sensorial/jardim-terapeutico-e-sensorial-04.png",
        "jardim-terapeutico-e-sensorial/jardim-terapeutico-e-sensorial-05.png",
        "jardim-terapeutico-e-sensorial/jardim-terapeutico-e-sensorial-06.png",
      ]),
    ],
  },
  {
    id: "externo",
    block: "Área externa",
    title: "Área externa",
    subtitle: "Fachadas, estacionamento, áreas abertas e pomar",
    rooms: [
      room("area-externa", "Área externa", [
        { path: "externo/area-externa/area-externa-01.png", caption: "Fachada" },
        { path: "externo/area-externa/area-externa-02.png", caption: "Fachada" },
        {
          path: "externo/area-externa/area-externa-03.png",
          caption: "Fachada - Bloco Crisálida",
        },
        {
          path: "externo/area-externa/area-externa-04.png",
          caption: "Fachada - Bloco Crisálida",
        },
        {
          path: "externo/area-externa/area-externa-05.png",
          caption: "Lateral - Bloco Crisálida",
        },
        {
          path: "externo/area-externa/area-externa-06.png",
          caption: "Laje jardim - Bloco Crisálida",
        },
        "externo/area-externa/area-externa-07.png",
        {
          path: "externo/area-externa/area-externa-08.png",
          caption: "Circulação vertical",
        },
        { path: "externo/area-externa/estacionamento-01.png", caption: "Estacionamento" },
        { path: "externo/area-externa/estacionamento-02.png", caption: "Estacionamento" },
      ]),
    ],
  },
];

export const totalImages = chapters.reduce(
  (n, c) => n + c.rooms.reduce((m, r) => m + r.images.length, 0),
  0,
);

export const HERO_IMAGE = "/gallery/externo/area-externa/area-externa-01.png";
