import "@/styles/globals.css";
import { Metadata } from "next";
import type { Viewport } from "next";
import { Outfit } from "next/font/google";
import { ThemeSelect } from "@/components/ThemeSelect";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nines Score",
  description: "Keep track of your nines score",
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/manifest.json" },
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
  },
  other: {
    "msapplication-TileColor": "#da532c",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${outfit.className} min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300 text-base-content antialiased transition-colors duration-300 flex flex-col`}
      >
        <div className="w-full max-w-md mx-auto p-4 flex flex-col flex-1 justify-between gap-4">
          {/* Global App Header */}
          <header className="flex items-center justify-between py-2 px-1 w-full shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20 font-black text-xl select-none">
                9
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-none">
                  Nines
                </h1>
                <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest mt-1">
                  Score Tracker
                </p>
              </div>
            </div>
            <ThemeSelect />
          </header>

          {/* Main Card Container */}
          <main className="flex-1 flex flex-col justify-center w-full card bg-base-100/70 backdrop-blur-md shadow-xl border border-base-content/5 p-6 rounded-3xl gap-6">
            {children}
          </main>

          {/* Footer info */}
          <footer className="text-center py-2 text-[11px] opacity-40 font-medium tracking-wide">
            Nines • Keep Track in Style
          </footer>
        </div>
      </body>
    </html>
  );
}

