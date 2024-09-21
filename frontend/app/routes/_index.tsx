import { useTranslation } from "react-i18next";
import goAvatar from "../../public/images/go.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

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
  ];

  return (
    <main className="h-1/4">
      <section className="flex flex-col justify-center items-center w-full h-full">
        <div className="md:flex w-full justify-center">
          <div className="flex justify-center">
            <img
              src={goAvatar}
              alt="Go Toolkit"
              className="mr-4 w-14 h-14 inline-block"
            />
          </div>
          <h1 className="text-4xl mt-2 mr-4 font-core-sans font-bold text-center text-primary dark:text-primary-foreground">
            {t("main.title")}
          </h1>
        </div>
        <p className="font-extralight font-core-sans text-center text-muted-foreground dark:text-muted-foreground">
          {t("main.description")}
        </p>
      </section>
      <section className="flex justify-center">
        <div className="grid gap-8 grid-cols-2 md:w-1/2">
          {services.map((service, index) => (
            <Card key={index}>
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
