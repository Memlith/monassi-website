import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/galeria", "/catalogo"],
        disallow: ["/admin"],
      },
    ],
    sitemap: "https://monassi.com.br/sitemap.xml",
  };
}
