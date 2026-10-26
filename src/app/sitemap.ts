import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { cases } from "@/components/CaseLayout";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...cases.map((c) => ({ url: `${siteUrl}/work/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
