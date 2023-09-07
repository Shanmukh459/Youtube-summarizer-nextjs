import { Roboto_Mono, Montserrat } from "next/font/google";

export const robotoMono = Roboto_Mono({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat-normal",
  display: "swap",
});

export const montserratBold = Montserrat({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-montserrat-bold",
  display: "swap",
});
