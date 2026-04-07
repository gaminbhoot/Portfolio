import { useEffect } from "react";

const SITE_URL = "https://jayjoshi.online";

function toAbsoluteUrl(pathOrUrl = "/") {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith("/")) return `${SITE_URL}${pathOrUrl}`;
  return `${SITE_URL}/${pathOrUrl}`;
}

function upsertMeta(attr, key, content) {
  if (typeof document === "undefined") return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (typeof document === "undefined") return;
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export function usePageMeta({
  title,
  description,
  path,
  image = "/jay1.webp",
  noindex = false,
}) {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(path || window.location.pathname);
    const imageUrl = toAbsoluteUrl(image);

    if (title) document.title = title;
    if (description) upsertMeta("name", "description", description);

    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    upsertLink("canonical", canonicalUrl);

    if (title) {
      upsertMeta("property", "og:title", title);
      upsertMeta("name", "twitter:title", title);
    }

    if (description) {
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
  }, [title, description, path, image, noindex]);
}
