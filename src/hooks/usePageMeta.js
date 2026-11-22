import { useEffect } from "react";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../data";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets the document title, description and canonical/OG URL for the current page.
 * Pass `title` without the site suffix; omit it for the home page.
 */
export function usePageMeta({ title, description = SITE_DESCRIPTION, path = "/" } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Kevin Joseph` : SITE_TITLE;
    const url = SITE_URL + path;
    document.title = fullTitle;
    setMeta("property", "og:title", fullTitle);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("property", "og:url", url);
    setMeta("name", "description", description);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:description", description);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }, [title, description, path]);
}
