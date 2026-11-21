import { useCallback, useEffect, useState } from 'react';
import { ContactModal, Header, Menu } from './components/Chrome.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Works from './components/Works.jsx';
import Record from './components/Record.jsx';
import People from './components/People.jsx';
import Contact from './components/Contact.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ServicePage from './pages/ServicePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { findRoute } from './routes.js';

const pages = {
  services: ServicesPage,
  service: ServicePage,
  projects: ProjectsPage,
  project: ProjectPage,
  notfound: NotFound,
};

function Home({ onContact }) {
  return (
    <>
      <Hero />
      <About />
      <Works onContact={onContact} />
      <Record />
      <People />
      <Contact onContact={onContact} />
    </>
  );
}

export default function App({ path = '/' }) {
  const route = findRoute(path);
  const home = route.kind === 'home';
  const Page = pages[route.kind];

  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const openForm = useCallback(() => { setMenuOpen(false); setFormOpen(true); }, []);

  // Production pages ship with their own <head>; this keeps the title right in dev.
  useEffect(() => { document.title = route.title; }, [route]);

  return (
    <>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} onContact={openForm} home={home} />
      <Menu open={menuOpen} onClose={closeMenu} home={home} />
      <ContactModal open={formOpen} onClose={closeForm} />
      <main className={home ? '' : 'page'}>
        {home ? <Home onContact={openForm} /> : <Page route={route} onContact={openForm} />}
      </main>
    </>
  );
}
