import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { routes, notFound } from './routes.js';
export { headTags, structuredData } from './seo.js';
export const render = (path) => renderToString(<App path={path} />);
