import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Novillero",
  description: "Mariscos a domicilio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-b from-[rgb(255,245,240)] via-[rgb(255,250,240)] to-[rgb(255,250,245)] text-center">
        <header className="text-[var(--color-primary)] p-4">
          <h1 className="text-5xl font-bold font-[Nandaka] [text-shadow:4px_4px_0px_black] tracking-wider">Novillero</h1>

          {/* texto principal */}
          <h2 className="[text-shadow:-4px_4px_0px_rgba(100,200,255,.3)] text-7xl font-[SunLight] 
  bg-[linear-gradient(to_bottom,#ff0000_49%,#b91c1c_51%)]
  bg-clip-text text-transparent">
            Pescadería
          </h2>

        </header>
        <main className="p-6">{children}</main>
        <footer className="bg-[var(--color-secondary)] text-white p-4 text-center">
          <p>Servicio a domicilio gratis · Tel: 384 108 8723</p>
        </footer>
      </body>
    </html>
  );
}

