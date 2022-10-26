import React from "react";

const Heading: React.FC = () => {
  return (
    <header className="pt-8">
      <h1 className="to-emerald-00 bg-gradient-to-b from-emerald-300 via-emerald-400 to-teal-800 bg-clip-text text-4xl  font-black tracking-tighter text-transparent xl:text-8xl">
        Create a playlist with the help of your{" "}
        <span className="">favorite</span> artist
      </h1>
    </header>
  );
};

export default Heading;
