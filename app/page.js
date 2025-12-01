"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Dot Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 via-blue-300/35 to-blue-500/50 z-[-1]"></div>
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-blue-300/60 via-transparent to-blue-400/60 z-[-1]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] rounded-full bg-blue-500 blur-[150px] opacity-70 z-[-1]"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400 blur-[150px] opacity-60 z-[-1]"></div>
      <div className="absolute top-[30%] right-[20%] w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px] opacity-50 z-[-1]"></div>

      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />
    </div>
  );
}
