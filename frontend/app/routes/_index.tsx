import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <section className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <p className="">
        <h1>{t("greeting")}</h1>
      </p>
    </section>
  );
}
