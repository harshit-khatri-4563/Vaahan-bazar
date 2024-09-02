'use client'
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

import React from "react";

const ScreenLoader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("black");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center  overflow-hidden bg-[#fffff7] gap-10 absolute z-40 top-0 left-0 opacity-60">
      <ClipLoader
        color={color}
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="text-black w-20% h-20% border-2"
      />
    </div>
  );
};

export default ScreenLoader;