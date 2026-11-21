import Connect from '../components/Connect.jsx';
import { PageHero } from './parts.jsx';

export default function NotFound({ route, onContact }) {
  return (
    <>
      <PageHero crumbs={[]} kicker="404" image="/assets/img/cover-works.jpg" imageAlt="" intro="The page you were looking for isn’t here. Try our services, projects or the home page.">
        <span className="thin">Page not </span>
        <span className="shine shine--play book">found</span>
      </PageHero>
      <div className="page-body">
        <nav className="also" aria-label="Pages">
          <ul>
            <li><a className="h2 thin also__link" href="/">Home ↗</a></li>
            <li><a className="h2 thin also__link" href="/services">Services ↗</a></li>
            <li><a className="h2 thin also__link" href="/projects">Projects ↗</a></li>
          </ul>
        </nav>
        <Connect onContact={onContact} />
      </div>
    </>
  );
}
