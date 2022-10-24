import { Outlet } from "@remix-run/react";
import Footer from "~/components/footer";
import Heading from "~/components/heading";
import Input from "~/components/input";
import Nav from "~/components/navigation";

export default function Index() {
  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-6.5rem)]">
        <Heading />
        <Input />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
