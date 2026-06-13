import { sanityClient } from "./sanity";

const SITE_QUERY = `{
  "settings": *[_id == "siteSettings"][0],
  "hero": *[_id == "siteHero"][0],
  "about": *[_id == "siteAbout"][0],
  "testimonials": *[_id == "siteTestimonials"][0],
  "faq": *[_id == "siteFAQ"][0],
  "pageText": *[_id == "sitePageText"][0]
}`;

export const TRACKING_QUERY = `*[_id == "siteSettings"][0].tracking`;

type SanityData = {
  settings?: Record<string, unknown>;
  hero?: Record<string, Record<string, string>>;
  about?: Record<string, Record<string, string>>;
  testimonials?: {
    titleEn?: string;
    titleEs?: string;
    items?: Array<{ name?: string; location?: string; quoteEn?: string; quoteEs?: string }>;
  };
  faq?: {
    titleEn?: string;
    titleEs?: string;
    items?: Array<{ questionEn?: string; questionEs?: string; answerEn?: string; answerEs?: string }>;
  };
  pageText?: Record<string, Record<string, Record<string, string>>>;
};

// Merges Sanity data into the flat translations Record used by LanguageContext.
// Only fields present in Sanity override the hardcoded defaults — missing fields
// fall through transparently, so partial content is safe.
export function mapSanityToTranslations(
  data: SanityData,
  defaults: Record<string, Record<string, string>>
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {
    en: { ...defaults.en },
    es: { ...defaults.es },
  };

  const set = (lang: "en" | "es", key: string, value: unknown) => {
    if (typeof value === "string" && value.trim()) result[lang][key] = value;
  };

  // Settings (phone/stats are language-agnostic)
  const s = data.settings as Record<string, unknown> | undefined;
  if (s) {
    const stats = s.stats as Record<string, string> | undefined;
    if (stats) {
      (["en", "es"] as const).forEach((l) => {
        set(l, "about.stat1", stats.projects);
        set(l, "about.stat2", stats.years);
        set(l, "about.stat3", stats.satisfaction);
      });
    }
  }

  // Hero
  const h = data.hero;
  if (h) {
    (["en", "es"] as const).forEach((l) => {
      const v = h[l];
      if (!v) return;
      set(l, "hero.headline", v.headline);
      set(l, "hero.sub", v.sub);
      set(l, "hero.badge", v.badge);
      set(l, "hero.cta1", v.cta1);
      set(l, "hero.cta2", v.cta2);
      set(l, "hero.cta3", v.cta3);
    });
  }

  // About
  const a = data.about;
  if (a) {
    (["en", "es"] as const).forEach((l) => {
      const v = a[l];
      if (!v) return;
      set(l, "about.title", v.title);
      set(l, "about.titleAccent", v.titleAccent);
      set(l, "about.body", v.body);
    });
  }

  // Testimonials
  const t = data.testimonials;
  if (t) {
    set("en", "test.title", t.titleEn);
    set("es", "test.title", t.titleEs);
    t.items?.forEach((item, i) => {
      const n = i + 1;
      set("en", `test.${n}`, item.quoteEn);
      set("es", `test.${n}`, item.quoteEs);
      set("en", `test.${n}name`, item.name);
      set("es", `test.${n}name`, item.name);
      set("en", `test.${n}loc`, item.location);
      set("es", `test.${n}loc`, item.location);
    });
  }

  // FAQ
  const f = data.faq;
  if (f) {
    set("en", "faq.title", f.titleEn);
    set("es", "faq.title", f.titleEs);
    f.items?.forEach((item, i) => {
      const n = i + 1;
      set("en", `faq.q${n}`, item.questionEn);
      set("es", `faq.q${n}`, item.questionEs);
      set("en", `faq.a${n}`, item.answerEn);
      set("es", `faq.a${n}`, item.answerEs);
    });
  }

  // pageText (nav, services, colorStudio, difference, process, areas, contact, footer)
  const pt = data.pageText;
  if (pt) {
    const mapSection = (
      sanityKey: string,
      prefix: string,
      fields: string[]
    ) => {
      (["en", "es"] as const).forEach((l) => {
        const section = pt[sanityKey]?.[l] as Record<string, string> | undefined;
        if (!section) return;
        fields.forEach((f) => set(l, `${prefix}.${f}`, section[f]));
      });
    };

    mapSection("nav", "nav", ["home", "services", "colorStudio", "residential", "commercial", "beforeAfter", "process", "areas", "contact", "cta"]);

    const resFields = ["title", "sub", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"];
    mapSection("residential", "residential", resFields);

    const comFields = ["title", "sub", "s1", "s2", "s3", "s4", "s5", "s6", "s7"];
    mapSection("commercial", "commercial", comFields);

    mapSection("colorStudio", "color", ["title", "body", "quote"]);
    mapSection("difference", "diff", ["title", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"]);
    mapSection("process", "process", ["title", "s1", "s2", "s3", "s4", "s5", "s6", "s7"]);
    mapSection("areas", "areas", ["title", "body"]);
    mapSection("contact", "contact", ["title", "sub", "cta"]);

    const footer = pt.footer as Record<string, unknown> | undefined;
    if (footer) {
      set("en", "footer.tagline", footer.taglineEn);
      set("es", "footer.tagline", footer.taglineEs);
    }
  }

  return result;
}

export type TrackingSettings = {
  gtmId?: string;
  ga4Id?: string;
  metaPixelId?: string;
  googleAdsId?: string;
};

export async function fetchTrackingSettings(): Promise<TrackingSettings> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {};
  try {
    const data = await sanityClient.fetch<TrackingSettings>(
      TRACKING_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
    return data ?? {};
  } catch {
    return {};
  }
}

export async function fetchSiteTranslations(
  defaults: Record<string, Record<string, string>>
): Promise<Record<string, Record<string, string>>> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return defaults;
  try {
    const data: SanityData = await sanityClient.fetch(SITE_QUERY, {}, { next: { revalidate: 60 } });
    return mapSanityToTranslations(data, defaults);
  } catch {
    return defaults;
  }
}
