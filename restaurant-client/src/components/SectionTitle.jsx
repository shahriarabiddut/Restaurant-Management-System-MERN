import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="my-8 md:w-1/3 mx-auto text-center">
      <p className="text-yellow-500 py-4">---{subHeading}---</p>
      <h3 className="text-4xl uppercase border-y-4 py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
