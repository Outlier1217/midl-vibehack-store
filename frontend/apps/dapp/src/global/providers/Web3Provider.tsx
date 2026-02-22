"use client";

import { midlConfig, queryClient } from "@/app/config";
import { WagmiMidlProvider } from "@midl/executor-react";
import { MidlProvider } from "@midl/react";
import { SatoshiKitProvider } from "@midl/satoshi-kit";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Web3Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MidlProvider config={midlConfig}>
        <SatoshiKitProvider>
          <WagmiMidlProvider>
            {children}
          </WagmiMidlProvider>
        </SatoshiKitProvider>
      </MidlProvider>
    </QueryClientProvider>
  );
}