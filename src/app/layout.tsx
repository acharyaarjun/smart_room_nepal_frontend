import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { AosProvider, StoreProvider, CustomThemeProvider } from "@/providers";
import AppUrl from "@/utils/appConsts";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gyaan Danam",
  description: "Gyaan Danam",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: new URL(`${AppUrl.APP_BASE_URL}`),
    images: [
      {
        url: `${AppUrl.APP_BASE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    site: "@gyaandanam",
    title: "Gyaan Danam",
    description: "Gyaan Danam",
    creator: "@gyaandanam",
    images: [
      {
        url: `${AppUrl.APP_BASE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-[#efefef] dark:bg-dark`}
      >
        <AosProvider>
          <StoreProvider>
            <CustomThemeProvider>{children}</CustomThemeProvider>
          </StoreProvider>
        </AosProvider>
      </body>
    </html>
  );
}
