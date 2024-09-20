import { Button } from "../ui/button";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "~/lib/i18n";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const languages = [
    { label: t("languages.english"), value: SupportedLanguages.EN },
    { label: t("languages.spanish"), value: SupportedLanguages.ES },
  ];

  const changeLanguage = (language: SupportedLanguages) => {
    i18n.changeLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary dark:bg-primary-foreground">
          <Languages className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Languages className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Language selector</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <div key={language.value}>
            <DropdownMenuItem onClick={() => changeLanguage(language.value)}>
              {language.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
