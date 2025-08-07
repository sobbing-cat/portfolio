import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NProgressProvider from "@/providers/nprogress";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ExternalLinkInterceptor } from "@/providers/external-link-interceptor";
import SiteData from "@/content/information.json";

const hankedGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const pageTitle = `${SiteData.site.title} | Portfolio`;
const pageDescription = SiteData.site.description;
const ogImageUrl = `${SiteData.site.baseUrl}${SiteData.metadata.openGraph.image}`;

export const metadata: Metadata = {
  title: SiteData.site.title,
  description: pageDescription,
  keywords: SiteData.metadata.keywords,
  authors: [{ name: SiteData.author.name, url: SiteData.site.baseUrl }],

  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: SiteData.site.baseUrl,
    siteName: SiteData.site.title,
    images: [
      {
        url: ogImageUrl,
        alt: SiteData.metadata.openGraph.imageAlt,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hankedGrotesk.variable} flex flex-col min-h-screen antialiased`}
      >
        <NProgressProvider>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer SiteData={SiteData} />
              <ExternalLinkInterceptor />
            </ThemeProvider>
          </TooltipProvider>
        </NProgressProvider>
      </body>
    </html>
  );
}
