import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "../../styles/animate.min.css";
import "swiper/css";
import "swiper/css/bundle";

// Global styles
import "../../styles/style.css";
import "../../styles/responsive.css";

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Layout/Footer";
import GoTop from "@/components/Layout/GoTop";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Aytan Abdullayeva",
  description:
    "Dr. Aytən Abdullayeva, Onkoloq-Ginekoloq, Tibb üzrə Fəlsəfə Doktoru",
  icons: {
    icon: "/images/favicon.svg",
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable}`}>
        <LanguageProvider>
          {children}
          <Footer />
          <GoTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
