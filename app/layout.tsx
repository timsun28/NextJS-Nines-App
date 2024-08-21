import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nines Score",
    description: "Keep track of your nines score",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    icons: {
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        icon: [
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        other: [
            { rel: "manifest", url: "/site.webmanifest" },
            { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
        ],
    },
    themeColor: "#ffffff",
    other: {
        "msapplication-TileColor": "#da532c",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
