import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description?: string;
}

const BASE_TITLE = 'Arthur Cuvillon — Portfolio';
const BASE_DESCRIPTION =
  "Portfolio d'Arthur Cuvillon — Développeur créatif, IMAC ESIEE Paris. Projets web, mobile, WebGL, court-métrages et communication.";

export function usePageMeta({ title, description }: PageMetaOptions): void {
  useEffect(() => {
    const fullTitle = title === BASE_TITLE ? title : `${title} — ${BASE_TITLE}`;
    document.title = fullTitle;

    const desc = description ?? BASE_DESCRIPTION;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);

    return () => {
      document.title = BASE_TITLE;
      setMeta('meta[name="description"]', BASE_DESCRIPTION);
      setMeta('meta[property="og:title"]', BASE_TITLE);
      setMeta('meta[property="og:description"]', BASE_DESCRIPTION);
      setMeta('meta[name="twitter:title"]', BASE_TITLE);
      setMeta('meta[name="twitter:description"]', BASE_DESCRIPTION);
    };
  }, [title, description]);
}
