import type { Metadata } from "next";
import { Livvic } from "next/font/google";
import "@/styles/globals.css";
import { AosProvider, StoreProvider, CustomThemeProvider } from "@/providers";
import AppUrl from "@/utils/appConsts";
import AppConsts from "@/utils/appConsts";
import { Navbar } from "@/components/common/header";
import Footer from "@/components/common/footer/Footer";
import { ToastUtils } from "@/utils";

const livvic = Livvic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-livvic",
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: AppConsts.APP_NAME,
  description: AppConsts.APP_DESCRIPTION,
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
    site: AppConsts.APP_CREATOR,
    title: AppConsts.APP_NAME,
    description: AppConsts.APP_DESCRIPTION,
    creator: AppConsts.APP_CREATOR,
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
      <body className={`${livvic.variable} antialiased bg-light dark:bg-dark`}>
        <AosProvider>
          <StoreProvider>
            <CustomThemeProvider>
              <Navbar />
              {children}

              <ToastUtils />
              <Footer />
            </CustomThemeProvider>
          </StoreProvider>
        </AosProvider>
      </body>
    </html>
  );
}
