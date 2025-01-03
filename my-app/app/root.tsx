import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import {cssBundleHref} from "@remix-run/css-bundle";
import styles from "./tailwind.css?url";

import { SajhaSandukFooter } from "./components/Footer";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }, // Tailwind CSS
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []), // Include CSS bundle in production
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body >
        {children}
        <ScrollRestoration />
        <Scripts />
        <SajhaSandukFooter></SajhaSandukFooter>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}
