import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Link, Outlet } from "@remix-run/react";
import Footer from "~/components/footer";
import Heading from "~/components/heading";
import Nav from "~/components/navigation";
import Button from "~/components/ui/Button";

export default function Index() {
  return (
    <>
      <Nav />
      <main className="min-h-[calc(100vh-6.5rem)]">
        <Heading />
        <div className="mt-8 flex w-full justify-between border-b-2 pb-2 ">
          <p>Artist name goes here</p>
          <Link to="..">
            <Button
              type="submit"
              theme="primary-outline"
              size="small"
              title="Search"
            >
              <ArrowUturnLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
