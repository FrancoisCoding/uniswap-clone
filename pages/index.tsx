import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Router.push("/pools");
  }, []);
  return <div className="bg-black h-screen"></div>;
}
