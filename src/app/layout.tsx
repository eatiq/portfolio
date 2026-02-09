import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const fontFamily = Bricolage_Grotesque({
  variable: "--font-main",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Ehsan Atiq - Product Designer & Frontend Developer",
    template: "%s | Ehsan Atiq",
  },
  description: "Front end developer turned product designer with over ten years of experience. Operating at the intersection of design and code, currently at Meta.",
  keywords: ["Product Designer", "Frontend Developer", "UI/UX", "Meta", "Microsoft", "Portfolio"],
  authors: [{ name: "Ehsan Atiq" }],
  creator: "Ehsan Atiq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ehsan.fyi",
    title: "Ehsan Atiq - Product Designer & Frontend Developer",
    description: "Front end developer turned product designer with over ten years of experience. Currently at Meta.",
    siteName: "Ehsan Atiq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ehsan Atiq - Product Designer & Frontend Developer",
    description: "Front end developer turned product designer with over ten years of experience. Currently at Meta.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontFamily.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
