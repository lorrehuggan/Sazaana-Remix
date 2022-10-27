import React from "react";
import Button from "../ui/Button";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

const Nav: React.FC = () => {
  return (
    <nav className="mx-auto flex h-16 items-center justify-between ">
      <span className=" flex items-center text-xl font-black uppercase tracking-tighter text-secondary-100">
        <ChevronDoubleRightIcon className="h-6 w-6" />
        Sazaana
      </span>
      <Button title="Login" theme="primary-outline" size="medium" />
    </nav>
  );
};

export default Nav;
