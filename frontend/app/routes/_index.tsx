import { useTranslation } from "react-i18next";
import Navbar from "~/components/Navbar/Navbar";

type Service = {
  title: string;
  description: string;
};

export default function Index() {
  const { t } = useTranslation();

  const services: Service[] = [
    {
      title: t("main.services.url_shortener.title"),
      description: t("main.services.url_shortener.description"),
    },
  ];

  return (
    <main className="h-screen w-full flex flex-col bg-background bg-dot-black/[0.2] dark:bg-background dark:bg-dot-white/[0.2]">
      <Navbar />
      <section className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold text-center text-primary dark:text-primary-foreground">
          {t("main.title")}
        </h1>
        <p className="font-bold text-center text-primary dark:text-primary-foreground">
          {t("main.description")}
        </p>
      </section>
    </main>
  );
}
