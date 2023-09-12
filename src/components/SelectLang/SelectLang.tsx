import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

export default function SelectLang({
  url,
  locale,
}: {
  url: string;
  locale: string;
}) {
  const router = useRouter();
  const t = useTranslations();

  const handleLanguageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLocale = e.target.value;
    await router.push(url, url, { locale: selectedLocale });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleLanguageChange(e).catch((err) => {
      console.error("Failed to change the language:", err);
    });
  };

  return (
    <div className="w-30 relative ml-2 inline-flex">
      <select
        onChange={handleChange}
        value={locale}
        className="select select-accent w-full max-w-xs"
      >
        <option value="en">{t("Navbar.english")}</option>
        <option value="tr">{t("Navbar.turkish")}</option>
      </select>
      <div className="text-accent-content pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"></div>
    </div>
  );
}
