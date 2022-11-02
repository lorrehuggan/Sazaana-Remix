import React from "react";

const Heading: React.FC = () => {
  return (
    <header className="pt-8">
      <h1 className="bg-gradient-to-b from-secondary-100 via-secondary-100  to-secondary-200 bg-clip-text text-4xl font-black tracking-tighter text-transparent xl:text-8xl">
        Create a playlist with the help of your{" "}
        <span className="">favorite</span> artist
      </h1>
    </header>
  );
};

export default Heading;
