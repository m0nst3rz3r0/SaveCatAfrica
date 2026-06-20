import { useEffect } from "react";
import { useSiteSettings } from "../hooks/useSiteData";

export function SeoHead() {
  const settings = useSiteSettings();

  useEffect(() => {
    const orgName = settings?.orgName ?? "SaveCat Africa";
    const tagline = settings?.tagline ?? "Protecting domestic cats across Africa";
    const description =
      settings?.siteDescription ?? tagline;

    document.title = `${orgName} | ${tagline}`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    const analyticsId = settings?.analyticsId;
    if (analyticsId && !document.getElementById("ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(script);

      const inline = document.createElement("script");
      inline.id = "ga-inline";
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analyticsId}');`;
      document.head.appendChild(inline);
    }
  }, [settings]);

  return null;
}
