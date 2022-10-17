import React from "react";
import Button from "../ui/Button";

const Nav: React.FC = () => {
  return (
    <nav className="mx-auto flex h-16 items-center justify-between ">
      <span className="font-black uppercase tracking-tighter">Sazaana</span>
      <Button title="Login" theme="primary" size="medium" />
    </nav>
  );
};

export default Nav;
