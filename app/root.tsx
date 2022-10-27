import type { MetaFunction } from "@remix-run/node";
import styles from "./styles/app.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sazaana",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com/css2?family=Hanuman:wght@300;400;700;900&family=Hind+Vadodara:wght@300;400;500;600;700&family=Inter:wght@100;300;400;500;700;900&display=swap",
    },
  ];
}

export default function App() {
  return (
    <html lang="en" className=" bg-base-100 text-zinc-50">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="mx-auto w-[90%]">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
