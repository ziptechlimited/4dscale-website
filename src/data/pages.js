// Content for the standalone service and project pages.
// Facts come from the company profile and the 2025 projects catalogue (see content.js).
import { cases, equipment, hse, images, services, works } from './content.js';

const img = (name) => `/assets/img/${name}.jpg`;
const caseBy = (id) => cases.find((c) => c.id === id);
const worksFor = (slug) => works.filter((w) => w.slug === slug).map((w) => w.src);

/* ---------------- Services ---------------- */

export const servicePages = [
  {
    slug: 'architecture',
    name: 'Architectural design',
    h1: ['Architectural', 'design in'],
    h1Shine: 'Abuja',
    title: 'Architects in Abuja | Architectural Design — 4D-Scale Limited',
    description:
      'Registered architects in Abuja for homes, institutions and commercial buildings: briefs, concept design, 3D visuals, construction drawings, interiors and landscape.',
    image: img('work-veritas-render'),
    imageAlt: 'Proposed design render of the Veritas University auditorium interior',
    intro:
      'Our architects take a building from the first conversation to construction drawings. Because 4D-Scale also manages and builds, the people who draw your building stay accountable for how it is built, what it costs and when it is handed over.',
    scope: [
      ['Brief & site', 'Understanding how you will use the building, your budget and the site before a line is drawn.'],
      ['Concept design', 'Layouts, massing and 3D visuals so you can see the building before it is built.'],
      ['Construction drawings', 'Detailed architectural drawings and specifications for pricing and building.'],
      ['Renovation & remodelling', 'Re-planning and upgrading existing buildings, from offices to institutional buildings.'],
      ['Interior design', 'Ceilings, lighting, joinery and finishes, including acoustic interiors.'],
      ['Landscape design', 'Paving, planting, drainage levels and the spaces around the building.'],
    ],
    team: ['Arc. Samuel Gayya', 'Arc. Samaila C. Shawulu', 'Arc. Dennis Deh'],
    projects: ['veritas-university-auditorium', 'private-residence-design-and-build', 'yelwa-shandam-bungalows'],
  },
  {
    slug: 'project-management',
    name: 'Project management',
    h1: ['Construction', 'project'],
    h1Shine: 'management',
    title: 'Construction Project Management in Abuja & Nigeria — 4D-Scale Limited',
    description:
      'Construction project management across Nigeria: planning, cost control, site coordination, quality and HSE, led by certified project managers based in Abuja.',
    image: img('nnpc-forecourt-3'),
    imageAlt: 'Forecourt works during the upgrade of an NNPC service station in Potiskum',
    intro:
      'We manage building projects on the client’s behalf — scope, schedule, cost, quality and safety — from mobilisation to handover, so you have one accountable team reporting on progress.',
    scope: [
      ['Planning & scheduling', 'Work programmes, sequencing and milestones agreed before mobilisation.'],
      ['Cost control', 'Budgets and valuations with a quantity surveyor on staff.'],
      ['Site coordination', 'Managing trades, suppliers and specialist contractors on site.'],
      ['Quality supervision', 'Inspection of materials and workmanship at every stage.'],
      ['Health, safety & environment', hse.slice(0, 3).join('; ') + '.'],
      ['Procurement', 'Sourcing materials, equipment and specialist suppliers for the job.'],
    ],
    team: ['Arc. Samaila C. Shawulu', 'Bld. Bin Tom Musa', 'QS Wasiu Igbalaye'],
    projects: ['nnpc-service-station-potiskum', 'veritas-university-auditorium', 'private-residence-design-and-build'],
  },
  {
    slug: 'design-and-build',
    name: 'Design & build',
    h1: ['Design &', 'build'],
    h1Shine: 'contractors',
    title: 'Building Contractors in Abuja | Design & Build — 4D-Scale Limited',
    description:
      'Design and build contractors in Abuja: one team for design, cost and construction — building, civil, electrical and mechanical works across Nigeria.',
    image: img('build-progress'),
    imageAlt: 'Masons finishing the porch of a 4D-Scale bungalow',
    intro:
      'One contract, one team. We design the building, price it and build it — building, civil, electrical and mechanical works — so there is a single point of responsibility from foundations to handover.',
    scope: [
      ['Building works', 'Foundations, blockwork, frames and roofs, from bungalows to multi-storey buildings.'],
      ['Civil works', 'Site levels, drainage, paving and external works.'],
      ['Electrical works', 'Power, lighting, standby generators and solar supply.'],
      ['Mechanical works', 'Plumbing, pipework and mechanical installations.'],
      ['Finishing', 'Ceilings, cladding, joinery, tiling and paintwork.'],
      ['Equipment', `Owned: ${equipment.owned.join(', ').toLowerCase()}. Leased as needed: ${equipment.leased.slice(1, 4).join(', ').toLowerCase()}.`],
    ],
    team: ['Arc. Samuel Gayya', 'Bld. Bin Tom Musa', 'Engr. Broderic'],
    projects: ['private-residence-design-and-build', 'yelwa-shandam-bungalows', 'uke-farm-nasarawa'],
  },
];

// One line per discipline for the services overview. `page` links to a full service page.
export const serviceLines = {
  Designs: { page: 'architecture', text: 'Architectural, interior and landscape design, from brief to construction drawings.' },
  'Project management': { page: 'project-management', text: 'Planning, cost, quality and safety managed on the client’s behalf.' },
  Contracting: { page: 'design-and-build', text: 'Building, civil, electrical and mechanical works, alone or as design & build.' },
  Landscaping: { text: 'Paving, planting, drainage levels and external works around the buildings we deliver.' },
  'Interior design': { text: 'Ceilings, lighting, joinery and finishes, including acoustic interiors.' },
  'Farm management': { text: 'Farm construction and management, as at our farm project in Uke, Nasarawa State.' },
  'Building maintenance': { text: 'Upkeep and repair of existing buildings, from finishes to services.' },
  Procurement: { text: 'Sourcing materials, equipment and specialist suppliers for the job.' },
};
export const serviceList = services.map((name) => ({ name, ...serviceLines[name] }));

/* ---------------- Projects ---------------- */

const veritas = caseBy('veritas');
const residence = caseBy('residence');
const nnpc = caseBy('nnpc');

export const projectPages = [
  {
    slug: 'veritas-university-auditorium',
    name: 'Veritas University auditorium',
    title: 'Veritas University Auditorium Acoustic Works, Bwari — 4D-Scale Limited',
    description:
      'Sound-proofing and acoustic control for the Veritas University auditorium in Bwari, Abuja: mineral-fibre ceiling and timber-finish acoustic wall cladding, 2024.',
    image: img('work-veritas-built'),
    imageAlt: 'The finished Veritas University auditorium with mineral-fibre ceiling and acoustic wall cladding',
    location: 'Bwari, Abuja (FCT)',
    year: '2024',
    client: 'University',
    service: 'architecture',
    scope: 'Acoustic & interior works',
    summary: veritas.summary,
    intro:
      'Sound-proofing and acoustic control for a university hall: a mineral-fibre ceiling and timber-finish acoustic wall cladding, taken from a raw structural shell to a finished auditorium.',
    story: veritas,
    gallery: [img('work-veritas-render'), img('work-veritas-site')],
  },
  {
    slug: 'nnpc-service-station-potiskum',
    name: 'NNPC service station upgrade',
    title: 'NNPC Service Station Upgrade, Potiskum — Project Management | 4D-Scale',
    description:
      'Project management for the upgrade of an NNPC service station in Potiskum, Yobe State: forecourt, tanks and pumps, generator and solar supply, canopy and branding.',
    image: img('nnpc-finish-1'),
    imageAlt: 'New forecourt canopy at the NNPC service station in Potiskum, Yobe State',
    location: 'Potiskum, Yobe State',
    year: null,
    client: 'Corporate',
    service: 'project-management',
    scope: nnpc.scope,
    summary: nnpc.summary,
    intro: nnpc.summary,
    story: nnpc,
    gallery: [],
  },
  {
    slug: 'private-residence-design-and-build',
    name: 'Private residential development',
    title: 'Private Residence Design & Build, Nigeria — 4D-Scale Limited',
    description:
      'A family home designed and built by 4D-Scale: foundations on waterlogged ground, a two-storey frame, stone-clad exterior, landscaping and a furnished interior.',
    image: img('res-ext-1'),
    imageAlt: 'Exterior of a private residence designed and built by 4D-Scale',
    location: residence.location,
    year: null,
    client: 'Private client',
    service: 'design-and-build',
    scope: residence.scope,
    summary: residence.summary,
    intro: residence.summary,
    story: residence,
    gallery: [],
  },
  {
    slug: 'yelwa-shandam-bungalows',
    name: 'Bungalows in Yelwa Shandam',
    title: '3-Bedroom & 2-Bedroom Bungalows, Yelwa Shandam, Plateau — 4D-Scale',
    description:
      'Three-bedroom and two-bedroom bungalows designed and built by 4D-Scale in Yelwa Shandam, Plateau State (2020): built to the brief and lean on budget.',
    image: img('work-yelwa-1'),
    imageAlt: 'A completed 4D-Scale bungalow with landscaped forecourt in Yelwa Shandam',
    location: 'Yelwa Shandam, Plateau State',
    year: '2020',
    client: 'Private client',
    service: 'design-and-build',
    scope: 'Design & Build',
    summary: 'Built to the brief, lean on budget.',
    intro:
      'A pair of bungalows — three-bedroom and two-bedroom — designed and built by 4D-Scale in Yelwa Shandam, Plateau State, finished inside and out with a paved, landscaped forecourt.',
    story: null,
    gallery: worksFor('yelwa-shandam-bungalows'),
  },
  {
    slug: 'uke-farm-nasarawa',
    name: 'Farm construction & management, Uke',
    title: 'Farm Construction & Management, Uke, Nasarawa State — 4D-Scale',
    description:
      'Farm construction and management by 4D-Scale Limited in Uke, Nasarawa State (2024).',
    image: img('work-uke-1'),
    imageAlt: 'Groundworks and blockwork for farm buildings in Uke, Nasarawa State',
    location: 'Uke, Nasarawa State',
    year: '2024',
    client: 'Private client',
    service: 'design-and-build',
    scope: 'Construction & farm management',
    summary: 'Groundworks, blockwork and roof structures for a working farm.',
    intro: 'Farm construction and management in Uke, Nasarawa State: setting out and groundworks, blockwork walls and timber roof structures for the farm buildings.',
    story: null,
    gallery: worksFor('uke-farm-nasarawa'),
  },
];

export const projectBySlug = Object.fromEntries(projectPages.map((p) => [p.slug, p]));
export const serviceBySlug = Object.fromEntries(servicePages.map((s) => [s.slug, s]));
