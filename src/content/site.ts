/**
 * All copy and data for Gratia Sourcing lives here.
 *
 * PLACEHOLDER WARNING: no real facts were supplied. Every name, figure, lead
 * time, address, phone number, certification status, sample order and hub
 * below is invented or generic and must be replaced before launch.
 * Turn the draft strip off with `draftNotice: false`.
 */

export const site = {
  name: 'Gratia Sourcing',
  short: 'Gratia',
  meaning: 'Latin gratia: grace, thanks, goodwill.',
  email: 'hello@gratiasourcing.example',
  phone: '+91 00000 00000',
  address: ['[Office address]', '[City], India'],
  hours: 'Mon to Sat, 09:30 to 18:30 IST (placeholder)',
  year: 2026,
  draftNotice: true,
  draftText: 'Draft site: every name, figure, order and address is placeholder content.',
} as const;

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'How we work', href: '/how-we-work/' },
  { label: 'Products', href: '/products/' },
  { label: 'Compliance', href: '/sustainability/' },
  { label: 'About', href: '/about/' },
] as const;

/** The gates every order passes. Offsets are days before ex-factory and are planning placeholders. */
export type Gate = {
  id: string;
  code: string;
  name: string;
  short: string;
  offset: number;
  signer: string;
  text: string;
  unlocks: string;
};

export const gates: readonly Gate[] = [
  {
    id: 'brief',
    code: 'G1',
    name: 'Brief and target',
    short: 'BRIEF',
    offset: 110,
    signer: 'You and your merchandiser',
    text: 'You send a spec, drawing or reference and a target price and volume. We tell you what is feasible, what is not, and what we would change.',
    unlocks: 'Supplier search',
  },
  {
    id: 'shortlist',
    code: 'G2',
    name: 'Shortlist and audit check',
    short: 'SHORTLIST',
    offset: 100,
    signer: 'Gratia sourcing lead',
    text: 'Three to five suppliers matched to the product. We check their compliance certificates and audit status before you hear a name.',
    unlocks: 'Development samples',
  },
  {
    id: 'sample',
    code: 'G3',
    name: 'Development sample',
    short: 'DEV SAMPLE',
    offset: 88,
    signer: 'You',
    text: 'First physical samples, couriered with a measured comment sheet. You approve, correct or reject. Nothing moves until you do.',
    unlocks: 'Costing',
  },
  {
    id: 'material',
    code: 'G4',
    name: 'Material and colour approval',
    short: 'LAB DIP',
    offset: 70,
    signer: 'You and Gratia QC',
    text: 'Lab dips, strike-offs and material tests approved. This is the gate that most often slips, so we build float here.',
    unlocks: 'Bulk material purchase',
  },
  {
    id: 'pp',
    code: 'G5',
    name: 'Pre-production sample',
    short: 'PP SAMPLE',
    offset: 50,
    signer: 'You and Gratia QC',
    text: 'The sample made on the production line with production material. Approved against the spec, then sealed as the reference.',
    unlocks: 'Bulk cutting and making',
  },
  {
    id: 'inline',
    code: 'G6',
    name: 'In-line inspection',
    short: 'IN-LINE',
    offset: 25,
    signer: 'Gratia QC',
    text: 'We are on the line while it runs, with photos and a written report, so a problem is a fix this week rather than a claim next quarter.',
    unlocks: 'Finishing and packing',
  },
  {
    id: 'final',
    code: 'G7',
    name: 'Final inspection',
    short: 'FINAL',
    offset: 5,
    signer: 'Gratia QC, or your third party',
    text: 'Random sampling to the acceptance level you set, against the sealed sample. A fail stops the shipment, not the report.',
    unlocks: 'Release to ship',
  },
  {
    id: 'exfactory',
    code: 'G8',
    name: 'Ex-factory and documents',
    short: 'EX-FACTORY',
    offset: 0,
    signer: 'Gratia logistics',
    text: 'Goods leave the factory with the invoice, packing list and test reports checked against each other. Freight is booked and tracked to hand-over.',
    unlocks: 'Freight and delivery',
  },
] as const;

export type Status = 'ON TIME' | 'WATCH' | 'HOLD';

export type Order = {
  po: string;
  goods: string;
  swatch: SwatchKind;
  hub: string;
  gate: number; // index into gates (current gate)
  due: string;
  status: Status;
};

/** Sample orders for the board. Illustrative only; the board labels them as such. */
export const orders: readonly Order[] = [
  { po: '0412', goods: 'Linen duvet set', swatch: 'linen', hub: 'Panipat', gate: 3, due: '14 DEC', status: 'ON TIME' },
  { po: '0418', goods: 'Rattan pendant', swatch: 'rattan', hub: 'Saharanpur', gate: 4, due: '21 DEC', status: 'ON TIME' },
  { po: '0431', goods: 'Block-print throw', swatch: 'blockprint', hub: 'Jaipur', gate: 5, due: '09 JAN', status: 'WATCH' },
  { po: '0440', goods: 'Brass tray set', swatch: 'brass', hub: 'Moradabad', gate: 6, due: '16 JAN', status: 'ON TIME' },
  { po: '0447', goods: 'Dhurrie rug', swatch: 'dhurrie', hub: 'Bhadohi', gate: 2, due: '30 JAN', status: 'HOLD' },
  { po: '0452', goods: 'Stoneware vase', swatch: 'glaze', hub: 'Khurja', gate: 1, due: '12 FEB', status: 'ON TIME' },
];

export const hero = {
  headline: 'From brief to container, every gate signed.',
  lede: 'Gratia Sourcing finds, develops and inspects home textiles and home hard goods in India for brands and retailers in the USA, Europe and the UK. You see every gate your order passes, and who signed it.',
  primary: 'Send a sourcing brief',
  secondary: 'See how the gates work',
} as const;

export type SwatchKind =
  | 'linen' | 'twill' | 'ikat' | 'blockprint' | 'kantha' | 'dhurrie'
  | 'jute' | 'rattan' | 'brass' | 'glaze' | 'oak' | 'mirror';

export type Category = {
  id: string;
  name: string;
  group: 'textiles' | 'hardgoods';
  swatch: SwatchKind;
  materials: string;
  hubs: string;
  items: string;
  moq: string;
  lead: string;
};

/** MOQs, lead times and hubs are generic placeholders: confirm every one. */
export const categories: readonly Category[] = [
  { id: 'bedding', name: 'Bedding', group: 'textiles', swatch: 'linen', materials: 'Cotton, linen, washed viscose', hubs: 'Panipat, Karur, Ahmedabad', items: 'Duvet sets, sheets, quilts, pillowcases', moq: '500 sets', lead: '75 to 95 days' },
  { id: 'cushions', name: 'Cushions and covers', group: 'textiles', swatch: 'ikat', materials: 'Cotton, wool blends, jacquard', hubs: 'Jaipur, Panipat', items: 'Cushion covers, inserts, floor cushions', moq: '300 pcs', lead: '60 to 80 days' },
  { id: 'throws', name: 'Throws and blankets', group: 'textiles', swatch: 'kantha', materials: 'Cotton, recycled yarn, wool', hubs: 'Panipat, Ludhiana', items: 'Woven throws, kantha quilts, knitted blankets', moq: '300 pcs', lead: '70 to 90 days' },
  { id: 'rugs', name: 'Rugs and dhurries', group: 'textiles', swatch: 'dhurrie', materials: 'Cotton, wool, jute, recycled PET', hubs: 'Bhadohi, Jaipur, Panipat', items: 'Flatweaves, tufted, hand-knotted, outdoor', moq: '100 pcs', lead: '90 to 120 days' },
  { id: 'bath', name: 'Bath textiles', group: 'textiles', swatch: 'twill', materials: 'Cotton terry, waffle', hubs: 'Karur, Panipat', items: 'Towels, bath mats, robes', moq: '1,000 pcs', lead: '75 to 95 days' },
  { id: 'baby', name: 'Baby and pets', group: 'textiles', swatch: 'blockprint', materials: 'Organic cotton, muslin', hubs: 'Tiruppur, Jaipur', items: 'Swaddles, playmats, pet beds', moq: '500 pcs', lead: '60 to 80 days' },
  { id: 'furniture', name: 'Furniture', group: 'hardgoods', swatch: 'oak', materials: 'Mango, sheesham, iron, rattan', hubs: 'Jodhpur, Saharanpur', items: 'Chairs, tables, cabinets, benches', moq: '100 pcs', lead: '90 to 120 days' },
  { id: 'lighting', name: 'Lighting', group: 'hardgoods', swatch: 'rattan', materials: 'Rattan, brass, glass, paper', hubs: 'Saharanpur, Moradabad', items: 'Pendants, table lamps, wall lights', moq: '200 pcs', lead: '75 to 100 days' },
  { id: 'decor', name: 'Home décor', group: 'hardgoods', swatch: 'glaze', materials: 'Stoneware, brass, wood', hubs: 'Khurja, Moradabad', items: 'Vases, trays, candle holders, bowls', moq: '300 pcs', lead: '60 to 90 days' },
  { id: 'mirrors', name: 'Wall décor and mirrors', group: 'hardgoods', swatch: 'mirror', materials: 'Iron, brass, mango wood', hubs: 'Moradabad, Jodhpur', items: 'Mirrors, wall shelves, wall art', moq: '200 pcs', lead: '75 to 100 days' },
  { id: 'storage', name: 'Storage and baskets', group: 'hardgoods', swatch: 'jute', materials: 'Jute, seagrass, cotton rope, metal', hubs: 'Kolkata, Saharanpur', items: 'Baskets, bins, laundry, shelving', moq: '300 pcs', lead: '60 to 80 days' },
  { id: 'outdoor', name: 'Outdoor', group: 'hardgoods', swatch: 'twill', materials: 'Powder-coated iron, teak, solution-dyed fabric', hubs: 'Jodhpur, Panipat', items: 'Seating, planters, cushions, rugs', moq: '100 pcs', lead: '90 to 120 days' },
];

export const services = [
  {
    id: 'sourcing',
    name: 'Sourcing and merchandising',
    gives: 'A brief: spec, drawing or reference, a target and a volume.',
    gets: 'A shortlist of vetted suppliers with costs, capacity and the audit status of each.',
    gates: 'G1, G2',
  },
  {
    id: 'development',
    name: 'Product development and sampling',
    gives: 'Your design, or a direction we develop into one.',
    gets: 'Samples iterated with measured comments until you sign, then a sealed reference.',
    gates: 'G3, G4, G5',
  },
  {
    id: 'costing',
    name: 'Costing and negotiation',
    gives: 'A target price and your terms.',
    gets: 'A transparent cost breakdown and a negotiated price, with the reasoning shown.',
    gates: 'G3, G5',
  },
  {
    id: 'quality',
    name: 'Quality control and audits',
    gives: 'Your quality standard and acceptance level.',
    gets: 'In-line and final inspection reports with photos, plus factory audit support.',
    gates: 'G6, G7',
  },
  {
    id: 'logistics',
    name: 'Logistics and documentation',
    gives: 'Your shipping terms and delivery window.',
    gets: 'Documents checked against each other, freight booked, shipment tracked to hand-over.',
    gates: 'G8',
  },
  {
    id: 'visits',
    name: 'Buyer visits',
    gives: 'Dates and the suppliers you want to see.',
    gets: 'A planned itinerary across hubs, an interpreter, and your questions answered on the floor.',
    gates: 'Any',
  },
] as const;

export const standards = [
  { name: 'Social compliance audit (amfori BSCI, Sedex SMETA or equal)', covers: 'Working conditions at the factory', check: 'Certificate and date checked at G2' },
  { name: 'Material certification (OEKO-TEX, GOTS, GRS, FSC as relevant)', covers: 'What the product is made of', check: 'Certificate matched to the lot at G4' },
  { name: 'Restricted-substance testing at an accredited lab', covers: 'Chemicals and safety limits for your market', check: 'Report reviewed at G4 and G7' },
  { name: 'Quality management system (ISO 9001 or equal)', covers: 'How the factory controls its own process', check: 'Seen on audit, not just on paper' },
  { name: 'Inspection to an agreed acceptance level (AQL)', covers: 'Whether this shipment matches the sealed sample', check: 'Run at G6 and G7' },
] as const;

export const commitments = [
  { name: 'Supplier code of conduct', text: 'Every supplier signs it before a first order. It covers child and forced labour, pay, hours, safety and the right to speak up.' },
  { name: 'Chemicals and materials', text: 'Restricted-substance lists follow the destination market. Test reports travel with the shipment documents.' },
  { name: 'Traceability', text: 'We record which supplier, and which sub-contractor, made each lot, so a question from your compliance team has an answer.' },
  { name: 'Packaging', text: 'Less plastic, more recycled board, and carton sizes planned to fill the container rather than ship air.' },
] as const;

export const about = {
  story: [
    'A sourcing agent is a stranger who stands between you and a factory you will probably never see. We have to earn that position.',
    'Gratia Sourcing was set up to be the buyer’s representative on the factory floor: someone who has seen the sample, the loom and the packing line, and who signs a gate only when the work has passed it.',
    'We take the name from the Latin gratia: grace, thanks, goodwill. In this trade it means doing what we said we would, and saying so plainly when we cannot.',
  ],
  roles: [
    { role: 'Sourcing and merchandising', text: 'Own the brief, the shortlist and your day-to-day contact.' },
    { role: 'Product development', text: 'Turn a reference into a spec a factory can build.' },
    { role: 'Quality control', text: 'Inspectors on the line, trained to your standard.' },
    { role: 'Compliance', text: 'Audits, certificates and test reports, kept current.' },
    { role: 'Logistics and documents', text: 'Booking, paperwork and tracking to hand-over.' },
  ],
  markets: ['USA', 'Europe', 'United Kingdom'],
} as const;

export const faqs = [
  { q: 'What do you need to start?', a: 'A spec, drawing or reference photo, a target price and an approximate volume. If you only have a reference, we will develop the spec with you.' },
  { q: 'How fast do you reply?', a: 'Within one working day with whether we can help and what we need. A shortlist follows in roughly two weeks (placeholder).' },
  { q: 'What are your minimum order quantities?', a: 'They depend on the category and the factory. Typical ranges are on the products page, and we ask suppliers to quote to your volume.' },
  { q: 'Who pays for samples?', a: 'Development samples are usually charged at cost, and credited against the order where the supplier agrees (placeholder).' },
  { q: 'Can I visit the factories?', a: 'Yes. We plan the itinerary, travel with you and translate. Visits are best placed at G3 or G5.' },
] as const;
