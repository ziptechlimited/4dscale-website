// Every page on the site. Used by the app (to pick a page) and by the
// prerender script (to write one HTML file per page, plus the sitemap).
import { projectPages, servicePages } from './data/pages.js';

const home = {
  path: '/',
  kind: 'home',
  title: '4D-Scale Limited | Architects & Building Contractors in Abuja',
  description:
    'Abuja architects, project managers and building contractors. Design and build for homes, universities, fuel stations and institutions across Nigeria since 2020.',
  image: '/og-image.jpg',
  imageAlt: '4D-Scale Limited: architects, project managers and contractors, Abuja',
  crumbs: [],
};

const servicesIndex = {
  path: '/services',
  kind: 'services',
  title: 'Services — Architecture, Project Management & Construction | 4D-Scale',
  description:
    'Architectural design, project management, design & build contracting, interiors, landscaping, building maintenance, procurement and farm management in Abuja and across Nigeria.',
  image: '/assets/img/build-progress.jpg',
  imageAlt: 'Masons finishing the porch of a 4D-Scale bungalow',
  crumbs: [{ name: 'Services', path: '/services' }],
};

const projectsIndex = {
  path: '/projects',
  kind: 'projects',
  title: 'Projects — Homes, Institutions & Fuel Stations | 4D-Scale Limited',
  description:
    'Projects by 4D-Scale Limited: Veritas University auditorium, an NNPC station upgrade in Potiskum, private residences and bungalows, plus our directors’ institutional work.',
  image: '/assets/img/work-veritas-built.jpg',
  imageAlt: 'Veritas University auditorium with acoustic wall cladding installed',
  crumbs: [{ name: 'Projects', path: '/projects' }],
};

export const routes = [
  home,
  servicesIndex,
  ...servicePages.map((s) => ({
    path: `/services/${s.slug}`,
    kind: 'service',
    slug: s.slug,
    title: s.title,
    description: s.description,
    image: s.image,
    imageAlt: s.imageAlt,
    crumbs: [...servicesIndex.crumbs, { name: s.name, path: `/services/${s.slug}` }],
  })),
  projectsIndex,
  ...projectPages.map((p) => ({
    path: `/projects/${p.slug}`,
    kind: 'project',
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
    imageAlt: p.imageAlt,
    crumbs: [...projectsIndex.crumbs, { name: p.name, path: `/projects/${p.slug}` }],
  })),
];

export const notFound = {
  path: '/404',
  kind: 'notfound',
  title: 'Page not found | 4D-Scale Limited',
  description: 'This page does not exist. Find our services, projects and contact details instead.',
  image: '/og-image.jpg',
  imageAlt: home.imageAlt,
  crumbs: [],
  noindex: true,
};

const byPath = Object.fromEntries(routes.map((r) => [r.path, r]));
export const normalise = (path = '/') => (path.length > 1 ? path.replace(/\/+$/, '').replace(/\.html$/, '') : '/');
export const findRoute = (path) => byPath[normalise(path)] ?? notFound;
