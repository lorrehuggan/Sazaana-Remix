import Footer from "~/components/footer";
import Input from "~/components/input";
import Heading from "~/components/heading";
import Nav from "~/components/navigation";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sazaana",
  viewport: "width=device-width,initial-scale=1",
});

export default function Index() {
  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-6.5rem)]">
        <Heading />
        <Input />
      </main>
      <Footer />
    </>
  );
}
