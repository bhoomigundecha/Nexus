"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Dot Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Background Gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-purple-100 via-purple-50 to-transparent z-[-1]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-purple-200 blur-[120px] opacity-60 z-[-1]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100 blur-[120px] opacity-40 z-[-1]"></div>

      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />
    </div>
  );
}
