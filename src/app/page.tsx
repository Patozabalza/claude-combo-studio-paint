import { defaultTranslations } from "@/context/LanguageContext";
import { fetchSiteTranslations } from "@/lib/sanity.queries";
import PageClient from "./PageClient";

export default async function Home() {
  const translations = await fetchSiteTranslations(defaultTranslations);
  return <PageClient initialTranslations={translations} />;
}
