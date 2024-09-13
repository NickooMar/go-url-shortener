import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { useChangeLanguage } from "remix-i18next/react";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import { themeSessionResolver } from "./sessions.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import Navbar from "./components/Navbar/Navbar";
import i18next from "./i18n.server";
import { useTranslation } from "react-i18next";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const locale = await i18next.getLocale(request);

  return {
    theme: getTheme(),
    locale,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, locale } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
      <ThemeContent locale={locale}>{children}</ThemeContent>
    </ThemeProvider>
  );
}

function ThemeContent({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [theme] = useTheme();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
