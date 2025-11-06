import type { Metadata } from "next";
import "./globals.css";
import "@polypuls3/sdk/styles";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Polypuls3 SDK Demo",
  description: "Demo application for @polypuls3/sdk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
