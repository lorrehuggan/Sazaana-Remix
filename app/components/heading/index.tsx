import React from "react";

const Heading: React.FC = () => {
  return (
    <header className="pt-8">
      <h1 className="to-emerald-00 text-4xl font-black  tracking-tighter text-primary-100 text-transparent xl:text-8xl">
        Create a playlist with the help of your{" "}
        <span className="">favorite</span> artist
      </h1>
    </header>
  );
};

export default Heading;
