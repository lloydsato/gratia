/**
 * Shared content for all four Gratia design samples.
 *
 * Gratia is a FICTIONAL PLACEHOLDER brand. Every name, number, price, address,
 * hour and origin detail below is invented so the four design directions can be
 * compared on identical copy. Replace all of it before anything ships.
 *
 * Differences between the samples must come from design, never from content,
 * so every sample reads from this one module.
 */

export const brand = {
  name: 'Gratia',
  full: 'Gratia Coffee Roasters',
  tagline: 'Coffee, with thanks.',
  meaning: 'Latin for thanks, grace, goodwill',
  email: 'hello@gratia.example',
  year: 2026,
  placeholderNote:
    'Sample page. Every name, price, address and number here is invented placeholder content.',
} as const;

export const nav = [
  { label: 'Coffee', href: '#coffee' },
  { label: 'Roastery', href: '#roastery' },
  { label: 'Cafés', href: '#cafes' },
  { label: 'Order', href: '#order' },
] as const;

export const hero = {
  headline: 'Coffee, with thanks.',
  lede: 'Small-batch roasters. Nine origins, roasted weekly in twelve-kilo batches and on its way to you within forty-eight hours.',
  primaryCta: 'Start a subscription',
  secondaryCta: 'Browse the coffees',
  meta: 'Roasted this week · Ships in 48 h',
} as const;

/** The brand's one recurring device: a thank-you in many languages. */
export const thanks = [
  'Thank you',
  'Gracias',
  'Grazie',
  'Merci',
  'Danke',
  'Obrigado',
  'Gràcies',
  'Tak',
] as const;

export const statement = {
  text: 'We roast twelve kilos at a time, ship within two days, and say thank you to everyone who grew, carried, roasted and brewed the coffee in your cup.',
} as const;

export const stats = [
  { value: 12, suffix: ' kg', label: 'Per roasting batch' },
  { value: 48, suffix: ' h', label: 'Roast to doorstep' },
  { value: 9, suffix: '', label: 'Single origins this year' },
  { value: 3, suffix: '', label: 'Cafés to visit' },
] as const;

export type Coffee = {
  id: string;
  name: string;
  origin: string;
  process: string;
  altitude: string;
  /** 1 (light) – 5 (dark) */
  roast: 1 | 2 | 3 | 4 | 5;
  roastLabel: string;
  notes: readonly string[];
  price: string;
  size: string;
  blurb: string;
};

export const coffees: readonly Coffee[] = [
  {
    id: 'huila',
    name: 'Huila No. 04',
    origin: 'Colombia',
    process: 'Washed',
    altitude: '1,750 m',
    roast: 3,
    roastLabel: 'Medium',
    notes: ['Red apple', 'Panela', 'Cocoa nib'],
    price: '€14',
    size: '250 g',
    blurb: 'Sweet and clean. The one we pour first thing in the morning.',
  },
  {
    id: 'guji',
    name: 'Guji Natural',
    origin: 'Ethiopia',
    process: 'Natural',
    altitude: '2,000 m',
    roast: 2,
    roastLabel: 'Light',
    notes: ['Blueberry', 'Jasmine', 'Honey'],
    price: '€16',
    size: '250 g',
    blurb: 'Bright, floral and a little wild. Best as filter.',
  },
  {
    id: 'cerrado',
    name: 'Cerrado Dulce',
    origin: 'Brazil',
    process: 'Pulped natural',
    altitude: '1,100 m',
    roast: 4,
    roastLabel: 'Medium-dark',
    notes: ['Hazelnut', 'Caramel', 'Milk chocolate'],
    price: '€13',
    size: '250 g',
    blurb: 'Round and easy. Forgiving in any brewer, lovely with milk.',
  },
  {
    id: 'gracias',
    name: 'Gracias Blend',
    origin: 'Colombia + Brazil',
    process: 'House espresso',
    altitude: 'Blend',
    roast: 4,
    roastLabel: 'Medium-dark',
    notes: ['Dark chocolate', 'Toasted almond', 'Orange peel'],
    price: '€14',
    size: '250 g',
    blurb: 'Our house espresso. Built for the machine, tasty in a moka pot too.',
  },
];

export const process = [
  {
    title: 'Buy slowly',
    text: 'We visit, taste and buy small lots from the same farms year after year.',
  },
  {
    title: 'Roast small',
    text: 'Twelve kilos at a time, profiled by ear, eye and thermometer, then rested for four days.',
  },
  {
    title: 'Send fresh',
    text: 'Packed the morning after resting and posted the same day, in compostable bags.',
  },
] as const;

/** An illustrative roast profile: bean temperature (°C) by minute. Placeholder data. */
export const roastCurve = {
  title: 'Gracias Blend, batch profile',
  unit: '°C',
  points: [
    [0, 200],
    [1, 98],
    [2, 90],
    [4, 120],
    [6, 145],
    [8, 164],
    [10, 181],
    [11.5, 196],
    [13, 208],
    [14, 212],
  ] as const,
  events: [
    { at: 8, label: 'Dry end' },
    { at: 11.5, label: 'First crack' },
    { at: 14, label: 'Drop' },
  ] as const,
} as const;

export type Cafe = {
  id: string;
  name: string;
  address: string;
  hours: string;
  note: string;
};

export const cafes: readonly Cafe[] = [
  {
    id: 'harbour',
    name: 'Harbour Café',
    address: '12 Quay Street',
    hours: 'Mon–Sun · 8:00–18:00',
    note: 'Espresso bar, pastries, a table by the water.',
  },
  {
    id: 'roastery',
    name: 'The Roastery Bar',
    address: 'Unit 4, Mill Lane',
    hours: 'Wed–Sun · 9:00–16:00',
    note: 'Watch a batch roast. Fresh bags straight from the cooling tray.',
  },
  {
    id: 'hatch',
    name: 'Station Hatch',
    address: 'Platform 2, Central Station',
    hours: 'Mon–Fri · 7:00–14:00',
    note: 'A window, a grinder and a very fast flat white.',
  },
];

export const order = {
  title: 'Beans at your door in 48 hours.',
  text: 'Pick how you brew and how often. Pause, skip or cancel any time.',
  emailLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  brewLabel: 'How do you brew?',
  brewOptions: ['Filter', 'Espresso', 'A bit of both'],
  submit: 'Start my subscription',
  success: 'Thank you. This is a sample form, so nothing was sent.',
  invalid: 'Enter an email address, for example you@example.com.',
} as const;

export const wholesale = {
  title: 'Cafés, offices, restaurants',
  text: 'Pouring our coffee at your place? Ask about wholesale.',
  cta: 'Email the roastery',
} as const;
