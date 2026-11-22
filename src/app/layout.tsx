import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.title}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
};

// Runs before paint: applies the saved theme (dark by default) and marks JS as available
// so scroll-reveal styles only hide content when they can also reveal it.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');}catch(e){}
document.documentElement.dataset.theme=t==='light'?'light':'dark';
document.documentElement.classList.add('js');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 -z-10" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
