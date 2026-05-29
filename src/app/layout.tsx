import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppProvider } from "@/providers/AppProvider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transactions Dashboard",
  description: "Subscription transactions management",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} bg-gray-950 text-gray-100 antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
