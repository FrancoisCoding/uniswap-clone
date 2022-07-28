import React from "react";
import Image from "next/future/image";
import Logo from "../../../assets/logo-white.svg";

const Loader = () => {
  return (
    <div className="bg-black text-white h-screen flex justify-center items-center">
      <Image src={Logo} alt="Hal Logo" className="loader h-max" />
    </div>
  );
};

export default Loader;
