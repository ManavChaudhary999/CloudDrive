import {ClerkProvider} from '@clerk/nextjs'
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
// import { PostHogProvider } from './_providers/posthog-provider';

export const metadata: Metadata = {
  title: "Cloud Drive",
  description: "Upload your files to the cloud",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          {children}
          {/* <PostHogProvider>{children}</PostHogProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
