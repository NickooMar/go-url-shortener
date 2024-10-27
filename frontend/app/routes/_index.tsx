import { useTranslation } from "react-i18next";
import goAvatar from "../../public/images/go.png";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    {
      title: t("main.services.url_shortener.title"),
      description: t("main.services.url_shortener.description"),
    },
    {
      title: t("main.services.url_shortener.title"),
      description: t("main.services.url_shortener.description"),
    },
  ];

  return (
    <main className="h-1/4">
      <section
        id="hero"
        className="flex flex-col justify-center items-center w-full py-32"
      >
        <figure className="flex flex-col justify-center items-center mt-2">
          <img src={goAvatar} alt="Go Toolkit" className="mb-4 w-20 h-20" />
          <figcaption className="text-6xl font-sora text-center text-primary dark:text-primary-foreground">
            {t("main.title")}
          </figcaption>
        </figure>

        <p className="text-lg font-light font-sora text-center text-muted-foreground dark:text-muted-foreground mt-6">
          {t("main.description")}
        </p>
      </section>
      <section id="hero-search" className="flex flex-col justify-center py-8">
        <div className="flex flex-col justify-center items-center mb-12">
          <Input
            id="search_service"
            type="text"
            placeholder={t("main.description")}
            className="w-1/3 flex h-11 rounded-md border border-input bg-background"
          />
        </div>
        <div className="w-full grid grid-auto-fit px-16 place-content-center gap-12">
          {services.map((service, index) => (
            <Card
              className="bg-card border text-card-foreground dark:bg-card rounded-xl shadow-sm"
              key={index}
            >
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
