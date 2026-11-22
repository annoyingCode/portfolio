import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VectorField from "@/components/VectorField";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.title}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { title: site.title, description: site.description, type: "website", url: site.url },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
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
        <VectorField />
        <Navbar showBlog={getAllPosts().length > 0} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
