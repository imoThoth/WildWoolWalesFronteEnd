
const placeholder = (bg, text, label) =>
  `https://placehold.co/800x1000/${bg}/${text}?text=${encodeURIComponent(
    label
  )}&font=playfair`;


export const PRODUCTS = [
  {
    id: 1,
    name: 'Heirloom Aran Sweater',
    price: 245,
    yarn: 'Undyed Donegal wool',
    maker: 'Eilis, County Mayo',
    days: 14,
    description:
      'A traditional cabled jumper worked in 100% Donegal wool, with the honeycomb stitch said to bring a fisherman luck. Knit on size 4 needles over fourteen evenings.',
    image: placeholder('F5EDDC', '1C1915', 'Aran Sweater'),
  },
  {
    id: 2,
    name: 'Autumn Wool Pullover',
    price: 198,
    yarn: 'Hand-spun caramel wool',
    maker: 'Saoirse, Galway',
    days: 9,
    description:
      'A relaxed pullover in soft caramel wool, finished with a rolled hem and dropped shoulders. The colour comes from the fleece itself, never dyed.',
    image: placeholder('8B6F4E', 'F5EDDC', 'Autumn Pullover'),
  },
  {
    id: 3,
    name: 'Donegal Wool Beanie',
    price: 64,
    yarn: 'Worsted Donegal tweed',
    maker: 'Mara, Edinburgh',
    days: 2,
    description:
      'A close-fitting hat in a flecked Donegal tweed, with a deep ribbed brim that folds back. Warm enough for a December walk along the coast.',
    image: placeholder('3D352B', 'F5EDDC', 'Wool Beanie'),
  },
  {
    id: 4,
    name: 'Featherweight Cardigan',
    price: 215,
    yarn: 'Brushed kid mohair',
    maker: 'Bríd, Connemara',
    days: 7,
    description:
      'An open cardigan in brushed kid mohair, light enough to belt over a summer dress and warm enough for a wet evening. Mother-of-pearl buttons.',
    image: placeholder('D9C68A', '1C1915', 'Mohair Cardigan'),
  },
  {
    id: 5,
    name: 'Heritage Wool Throw',
    price: 320,
    yarn: 'Merino & alpaca, hand-spun',
    maker: 'Iona, Lerwick',
    days: 6,
    description:
      'A generous throw in unspun merino with strands of alpaca, soft as a sleeping cat and heavy enough to keep one in your lap.',
    image: placeholder('3A4A3D', 'F5EDDC', 'Wool Throw'),
  },
  {
    id: 6,
    name: 'Atlantic Stripe Jumper',
    price: 232,
    yarn: 'Plant-dyed lambswool',
    maker: 'Eilis, County Mayo',
    days: 11,
    description:
      'A relaxed crew-neck jumper in narrow stripes, the colours drawn from a winter shoreline — sea-spray cream, indigo, lichen, oxblood.',
    image: placeholder('9C3F2D', 'F5EDDC', 'Stripe Jumper'),
  },
  // {
  //   id: 7,
  //   name: 'Cobweb Lace Shawl',
  //   price: 175,
  //   yarn: 'Single-ply Shetland lace',
  //   maker: 'Eilis, County Mayo',
  //   days: 9,
  //   description:
  //     'A triangular shawl in cobweb-weight Shetland lace, with a centre panel of Shetland fern and an edging of old-shale waves.',
  //   image: placeholder('E8DFCC', '1C1915', 'Lace Shawl'),
  // },
  // {
  //   id: 8,
  //   name: 'Fair Isle Mittens',
  //   price: 96,
  //   yarn: 'Shetland 2-ply',
  //   maker: 'Iona, Lerwick',
  //   days: 5,
  //   description:
  //     'Stranded colourwork mittens in a four-colour Fair Isle pattern, lined with raw wool for warmth that holds up against North Sea wind.',
  //   image: placeholder('7A2E2E', 'F5EDDC', 'Fair Isle Mittens'),
  // },
  // {
  //   id: 9,
  //   name: 'Hand-knit Wool Socks',
  //   price: 48,
  //   yarn: 'Bluefaced Leicester 4-ply',
  //   maker: 'Mara, Edinburgh',
  //   days: 3,
  //   description:
  //     'A pair of mid-calf socks in a hardy 4-ply, with a reinforced heel and a soft ribbed cuff that stays up without elastic.',
  //   image: placeholder('C9BBA0', '1C1915', 'Wool Socks'),
  // },
  // {
  //   id: 10,
  //   name: 'Cabled Wool Vest',
  //   price: 168,
  //   yarn: 'Worsted Highland wool',
  //   maker: 'Saoirse, Galway',
  //   days: 8,
  //   description:
  //     'A close-fitting vest with a deep V-neck and twin cables running its length. Layers neatly under a coat or over a linen shirt.',
  //   image: placeholder('4A4036', 'F5EDDC', 'Wool Vest'),
  // },
  // {
  //   id: 11,
  //   name: 'Mohair Snood',
  //   price: 78,
  //   yarn: 'Brushed kid mohair',
  //   maker: 'Bríd, Connemara',
  //   days: 3,
  //   description:
  //     'A loose tube of brushed mohair, soft enough to wear against the cheek, large enough to pull up over the head when the wind turns.',
  //   image: placeholder('B88A85', 'F5EDDC', 'Mohair Snood'),
  // },
  // {
  //   id: 12,
  //   name: "Children's Wool Pullover",
  //   price: 124,
  //   yarn: 'Soft merino lambswool',
  //   maker: 'Saoirse, Galway',
  //   days: 5,
  //   description:
  //     'A small jumper in soft merino, with a rolled neck that sits comfortably under a chin. Sized for a child of three to five years.',
  //   image: placeholder('C9A14C', '1C1915', "Children's Pullover"),
  // },
];

const PAGE_SIZE = 6;
