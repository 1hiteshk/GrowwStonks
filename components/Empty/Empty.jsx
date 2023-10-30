import React from "react";

const Empty = ({ size }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex gap-x-2 items-center">
        <img
          src="/assets/error.webp"
          alt="Error"
          className={`${size === "large" ? "w-24" : "w-10"}`}
        />
        <div
          className={`${
            size === "large" ? "text-4xl font-extrabold" : "text-lg font-bold"
          }`}
        >
          SORRY! NO DATA AVAILABLE
        </div>
      </div>
    </div>
  );
};

export default Empty;
