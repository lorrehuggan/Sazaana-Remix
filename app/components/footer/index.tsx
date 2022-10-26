import React from "react";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

const Footer: React.FC = () => {
  return (
    <footer className="flex h-8 items-center  justify-between border-t text-sm">
      <a href="https://www.lorrehuggan.com">Lorre Huggan</a>
      <a
        className="flex items-center gap-1"
        href="https://twitter.com/lorrehuggan"
      >
        <TwitterLogoIcon className="h-4 w-4" />
        <span>lorrehuggan</span>
      </a>
    </footer>
  );
};
export default Footer;
