// All copy and facts below come from the 4D-Scale Ltd company profile (2025).
const img = (name) => `/assets/img/${name}.jpg`;

export const company = {
  name: '4D-Scale Limited',
  short: '4D-Scale',
  rc: '1702477',
  incorporated: '26 August 2020',
  roles: ['Architects', 'Project Managers', 'Contractors'],
  email: '4d.scaleltd@gmail.com',
  phones: [
    { display: '+234 806 794 7558', tel: '+2348067947558' },
    { display: '+234 802 407 6124', tel: '+2348024076124' },
  ],
  offices: [
    { area: 'Karu', address: '9, Sina Balogun Close, Karu Site, FCT' },
    { area: 'Nyanya', address: 'No 2, Cascurim Road, Federal Housing, Nyanya, FCT' },
    { area: 'Mbora', address: '27, G2 Street, Citec, Mbora, FCT' },
  ],
};

export const chapters = [
  { id: 'about', num: 'I', label: 'About' },
  { id: 'works', num: 'II', label: 'Our works' },
  { id: 'record', num: 'III', label: 'Track record' },
  { id: 'people', num: 'IV', label: 'People' },
  { id: 'contact', num: 'V', label: 'Contact' },
];

export const images = {
  hero: img('hero'),
  logo: img('logo-dark'),
  logoFull: img('logo-dark-full'),
  coverAbout: img('cover-about'),
  about: img('about'),
  coverWorks: img('cover-works'),
  coverRecord: img('cover-record'),
  coverPeople: img('cover-people'),
  coverContact: img('cover-contact'),
  quote: img('work-veritas-site'),
  capability: img('build-progress'),
  contact: img('build-paving'),
  samuel: img('samuel-gayya'),
  team1: img('team-site-1'),
  team2: img('team-site-2'),
};

export const about = {
  paragraphs: [
    '4D-Scale Limited is an indigenous Nigerian company, incorporated as a limited liability company on 26 August 2020 to undertake building, civil, electrical and mechanical works.',
    'We were formed in answer to the demand for qualitative, speedy and functional architectural, engineering and civil works — meeting client requirements as the construction industry grows in volume and complexity.',
    'Our highly qualified management staff, competent technical personnel and equipment let us meet tight budgets without compromising on top-quality workmanship. Working arrangements with fellow practices and specialised bodies across the country keep our skills, data and equipment current.',
  ],
  clients: ['Individuals', 'Communities', 'Institutions', 'Organisations', 'Corporate bodies', 'Government'],
};

// From the 2025 projects catalogue.
export const services = [
  'Designs',
  'Project management',
  'Contracting',
  'Landscaping',
  'Interior design',
  'Farm management',
  'Building maintenance',
  'Procurement',
];

export const mottos = {
  mind: 'If it can cross your mind, it can happen to your life.',
  measure: 'Measuring beyond your expectation.',
};

// Firms the company's directors have worked and partnered with.
export const partners = [
  'Giyont Kuba Ltd',
  'JIMAC Consult',
  'Cachez Turnkey Projects',
  'Vidro Nigeria Ltd',
  'Land Designs Ltd',
  'Associated Design Consultants',
  'YS Associates Ltd',
  'Warji Nig Ltd',
  'Brixman Construction',
  'K S Trust Associates',
  'Afribased Projects Ltd',
];

const YELWA = {
  project: '3-bedroom & 2-bedroom bungalows',
  location: 'Yelwa Shandam, Plateau State',
  year: '2020',
};
const VERITAS = {
  project: 'Veritas University auditorium — acoustic control, mineral-fibre ceiling & wall cladding',
  location: 'Bwari, FCT',
  year: '2024',
};
const UKE = {
  project: 'Farm construction & management',
  location: 'Uke, Nasarawa State',
  year: '2024',
};

// Projects delivered by 4D-Scale Ltd (Design & Build). `text` adds an interleaved headline.
export const works = [
  { src: img('work-yelwa-1'), ...YELWA, span: 'a' },
  { src: img('work-veritas-built'), ...VERITAS, span: 'b' },
  { src: img('work-yelwa-interior'), ...YELWA, span: 'c', text: ['Built', 'to the', 'brief'] },
  { src: img('work-veritas-render'), ...VERITAS, note: 'Proposed design', span: 'd' },
  { src: img('work-uke-1'), ...UKE, span: 'e' },
  { src: img('work-yelwa-2'), ...YELWA, span: 'f', text: ['Lean', 'on', 'budget'] },
  { src: img('work-yelwa-interior-2'), ...YELWA, span: 'g' },
  { src: img('work-yelwa-3'), ...YELWA, span: 'h' },
  { src: img('work-uke-2'), ...UKE, span: 'i', text: ['Rich', 'in', 'finish'] },
];

// Phase-by-phase project stories from the 2025 projects catalogue.
export const cases = [
  {
    id: 'residence',
    project: 'Private residential development',
    location: 'Nigeria',
    scope: 'Design & Build',
    summary:
      'A family home taken from foundations in waterlogged ground to a furnished, landscaped handover — every stage under one team.',
    phases: [
      {
        title: 'Foundations & levels',
        text: 'Foundation works in waterlogged terrain. A damp-proof membrane (DPM) and damp-proof course (DPC) stop dampness and capillary rise; levels were taken to carry storm water out of the compound.',
        images: [img('res-foundation-1'), img('res-foundation-2'), img('res-levels')],
      },
      {
        title: 'Superstructure',
        text: 'Blockwork, columns and roof structure rising from slab to a two-storey frame with a covered porch.',
        images: [img('res-super-1'), img('res-super-2'), img('res-super-3'), img('res-super-4')],
      },
      {
        title: 'Exterior finishing & landscaping',
        text: 'Stone-clad columns, interlocking paving, a carport, security gates and planted beds.',
        images: [img('res-ext-2'), img('res-ext-3'), img('res-ext-4'), img('res-ext-5')],
      },
      {
        title: 'Interior finishing & furnishing',
        text: 'POP ceilings and lighting, a glass-balustrade stair, fitted wardrobes and furnished living and dining rooms.',
        images: [img('res-int-1'), img('res-int-2'), img('res-int-3'), img('res-int-4')],
      },
    ],
  },
  {
    id: 'veritas',
    inWorksGrid: true, // already counted in the works grid
    project: 'Sound-proofing & acoustic control, Veritas University hall',
    location: 'Bwari, Abuja (FCT)',
    scope: 'Acoustic & interior works',
    summary:
      'It is possible to perfectly combine functionality and aesthetics when professionalism is involved.',
    phases: [
      {
        title: 'The shell',
        text: 'The hall under construction: a structural shell under scaffold, with a raw stage wall and exposed roof trusses.',
        images: [img('ver-shell-2'), img('ver-shell-1'), img('ver-shell-3'), img('ver-site')],
      },
      {
        title: 'Installation',
        text: 'Setting out and fixing the wall-cladding framework, then the acoustic panels, across the raked seating bowl.',
        images: [img('ver-install-1'), img('ver-install-2'), img('ver-install-3')],
      },
      {
        title: 'Finished hall',
        text: 'Mineral-fibre ceiling and timber-finish acoustic wall cladding, bringing the stage and auditorium together.',
        images: [img('ver-done'), img('work-veritas-built')],
      },
    ],
  },
  {
    id: 'nnpc',
    project: 'Upgrade of an NNPC service station',
    location: 'Potiskum, Yobe State',
    scope: 'Project management',
    summary:
      'Project management for a full station upgrade — forecourt, mechanical and electrical works, finishes and brand rollout.',
    phases: [
      {
        title: 'Forecourt works',
        text: 'Forecourt works, fabrication and installation: excavation, pipe runs, a new concrete forecourt and perimeter fencing.',
        images: [img('nnpc-forecourt-1'), img('nnpc-forecourt-2'), img('nnpc-forecourt-3'), img('nnpc-forecourt-4')],
      },
      {
        title: 'Mechanical & electrical',
        text: 'Flexible piping and calibration of tanks and pumps, a standby generator and a clean-energy (solar) supply.',
        images: [img('nnpc-me-1'), img('nnpc-me-2'), img('nnpc-me-3'), img('nnpc-me-4')],
      },
      {
        title: 'Finishings & branding',
        text: 'A new forecourt canopy, a refurbished station building and NNPC branding throughout.',
        images: [img('nnpc-finish-1'), img('nnpc-finish-2'), img('nnpc-finish-3'), img('nnpc-finish-4')],
      },
    ],
  },
];

// Projects led by the Executive Director before and alongside 4D-Scale.
export const record = [
  {
    project: 'Renovation & remodelling of the ASUU National Secretariat',
    location: 'Giri, FCT',
    consultant: 'Afribased Projects Ltd',
    role: 'Resident Architect',
    year: '2021',
    images: [img('rec-asuu')],
  },
  {
    project: 'Renovation & remodelling of the old CBN Enugu Branch',
    location: 'Enugu State',
    consultant: 'Giyont Kuba Ltd',
    role: 'Project Architect',
    year: '2015',
    images: [img('rec-cbn'), img('rec-cbn-existing')],
  },
  {
    project: 'Entrepreneurship Centre & Mini Stadium, Federal University Lokoja',
    location: 'FUL, Lokoja, Kogi State',
    consultant: 'Land Designs Ltd',
    role: 'Project Architect',
    year: null,
    images: [img('rec-ful'), img('rec-ful-2')],
  },
  {
    project: 'Private residence',
    location: 'FCT, Abuja',
    consultant: 'GKL',
    role: 'Project Architect',
    year: '2019',
    images: [img('rec-residence'), img('rec-residence-2')],
  },
];

export const leaders = [
  {
    name: 'Arc. Samuel Gayya',
    title: 'Executive Director & CEO',
    photo: img('samuel-gayya'),
    bio: 'Has delivered design, construction, project management and consultancy work across Nigeria with organisations of renowned standard. B.Tech Architecture (Second Class Upper), Abubakar Tafawa Balewa University, 2008; M.Tech in view. NYSC with JIMAC Consult, Ondo State.',
    creds: ['B.Tech (Hons) Architecture — ATBU', 'UGREEN Green Building School — Sustainable Architecture, 2021', 'NYSC, 2008–2009'],
  },
  {
    name: 'Arc. Samaila C. Shawulu',
    title: 'Director / Partner · Project Consultant',
    photo: null,
    initials: 'SS',
    bio: 'A seasoned, fully registered architect with design, construction, project management and consultancy work nationwide. B.Tech and M.Tech Architecture, Abubakar Tafawa Balewa University. Principal/CEO of Land Designs Ltd.',
    creds: [
      'Registered Architect — ARCON, Reg. No. F/4308',
      'Certified International Project Manager (CIPM) & Master Project Manager (MPM), AAPM',
      'Harvard T.H. Chan School of Public Health — building design for airborne infection control (2012) and laboratory design (2015)',
    ],
  },
  {
    name: 'Bld. Bin Tom Musa',
    title: 'Project Manager',
    photo: null,
    initials: 'BM',
    bio: 'Over ten years leading residential, commercial, institutional and renovation projects from concept to completion — scheduling, construction strategy, health & safety and site coordination. An advocate of sustainable, eco-friendly buildings.',
    creds: [
      'B.Tech (Hons) Building — ATBU, 2007',
      'HSE Competence (Level 3) — Nigerian Institute of Safety Professionals',
      'NIOB — Effective Management & Supervision Skills; BIM practice',
    ],
  },
];

export const staff = {
  executive: [
    ['Samuel Gayya', 'C.E.O'],
    ['Shizah I. Kure', 'General Manager'],
    ['Arc. Samaila C. Shawulu', 'Project Consultant'],
    ['QS Wasiu Igbalaye', 'Quantity Surveyor'],
  ],
  technical: [
    ['Engr. Isioma Asaibhoni', 'Electrical Engineer'],
    ['Arc. Dennis Deh', 'Architect'],
    ['Bin Musa', 'Builder'],
    ['Daniel Bisong', 'Building Engineer'],
    ['Engr. Broderic', 'Civil Engineer'],
    ['Amaka Chukwu', 'Accounts'],
    ['Gideon Sunday', 'Foreman'],
  ],
};

export const stats = [
  { value: 2020, label: ['Incorporated', 'RC 1702477'] },
  { value: 11, label: ['Key', 'professionals', 'on staff'] },
  { value: 9, label: ['Featured', 'projects', 'delivered'] },
  { value: 6, label: ['Regions', 'FCT & five', 'states'] },
];

export const equipment = {
  owned: ['Concrete mixer', 'Scaffolds', '6 kVA / 10 kVA generating sets', 'Power tools'],
  leased: ['Concrete mixers', 'Plate compactor', '20-tonne bucket tipper', 'D8 bulldozer', 'Jackhammer & compressor'],
};

export const hse = [
  'Contractor health & safety policy',
  'Risk & safety declarations',
  'Risk management checklist',
  'Monthly HSE statistics returns',
  'Incident reporting within 24 hours',
  'Cradle-to-grave waste management',
];

export const compliance = [
  { body: 'Corporate Affairs Commission', item: 'Certificate of Incorporation · RC 1702477' },
  { body: 'Nigeria Social Insurance Trust Fund', item: 'ECS Clearance Certificate' },
  { body: 'EFCC — SCUML', item: 'Certificate of Registration, 2023' },
];
