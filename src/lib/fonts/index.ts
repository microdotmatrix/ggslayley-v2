import { Inter, Kanit, Barlow, Space_Grotesk } from "next/font/google";
import { GeistSans as geistSans } from "geist/font/sans";
import localFont from "next/font/local";

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["200", "400", "700"],
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const blacklisted = localFont({
  src: "./Blacklisted.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-blacklisted",
});

const lighters = localFont({
  src: "./lighters/lighters-demo.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-lighters",
});

const unisans = localFont({
  src: [
    {
      path: "./uni-sans/UniSansThin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./uni-sans/UniSansHeavy.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-unisans",
});

export {
  kanit,
  barlow,
  spaceGrotesk,
  geistSans,
  blacklisted,
  lighters,
  unisans,
};
