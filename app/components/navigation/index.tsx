import React from "react";
import Button from "../ui/Button";

const Nav: React.FC = () => {
  return (
    <nav className="mx-auto flex h-16 items-center justify-between ">
      <span className=" text-xl font-black uppercase italic tracking-tighter">
        Sazaana
      </span>
      <Button title="Login" theme="primary-outline" size="medium" />
    </nav>
  );
};

export default Nav;
