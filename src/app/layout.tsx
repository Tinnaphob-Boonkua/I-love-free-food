import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Sora } from "next/font/google";
import { RoomLight } from "@/components/chrome/room-light";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const ui = Sora({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MomentUS — Moment of Us",
  description: "A memory place for anyone you love. Timeline first. Gifts are a reading of it.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable}`}>
      <body>
        {/*
          THESIS: Memory as a contact sheet in a darkroom — refuse SaaS dashboards and three feature cards.
          OWN-WORLD: Umbra ground, filament tungsten fields, Bodoni Moda + Sora, uneven film frames.
          STORY: You keep the feeling in order; you can send it as a gift.
          FIRST VIEWPORT: Full-bleed umbra, oversized wordmark, one filament action into the demo Space.
          FORM: Contact-sheet / darkroom. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <RoomLight />
        {children}
      </body>
    </html>
  );
}
