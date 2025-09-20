import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supernova Forge - MultiversX dApp",
  description: "Advanced MultiversX dApp Development Platform with Supernova Updates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DappProvider
          environment={process.env.NEXT_PUBLIC_MULTIVERSX_NETWORK || "devnet"}
          customNetworkConfig={{
            walletConnectV2ProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ""
          }}
          dappConfig={{
            shouldUseWebViewProvider: true,
          }}
        >
          {children}
          <Toaster position="top-right" richColors />
        </DappProvider>
      </body>
    </html>
  );
}
