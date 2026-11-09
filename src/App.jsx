import { useCallback, useState } from 'react';
import { ContactModal, Header, Menu } from './components/Chrome.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Works from './components/Works.jsx';
import Record from './components/Record.jsx';
import People from './components/People.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeForm = useCallback(() => setFormOpen(false), []);
  const openForm = useCallback(() => { setMenuOpen(false); setFormOpen(true); }, []);

  return (
    <>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} onContact={openForm} />
      <Menu open={menuOpen} onClose={closeMenu} />
      <ContactModal open={formOpen} onClose={closeForm} />
      <main>
        <Hero />
        <About />
        <Works onContact={openForm} />
        <Record />
        <People />
        <Contact onContact={openForm} />
      </main>
    </>
  );
}
