"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useBuy } from "@/features/store/useBuy";
import { toast } from "sonner";
import { Loader2, ExternalLink, CheckCircle, Copy } from "lucide-react";

export const Buy = () => {
  const { address } = useAccount();
  const { buy, isLoading, error, lastTransaction, verifyTransaction } = useBuy();
  const [verifying, setVerifying] = useState(false);

  const handleBuy = async () => {
    try {
      if (!address) {
        toast.error("Please connect your wallet first");
        return;
      }

      // You need to get the actual BTC address from user's wallet
      // This is just a placeholder
      const btcAddress = "bcrt1..."; 
      
      const result = await buy(address, btcAddress, 1);
      
      toast.success("Transaction submitted successfully!");
      
      // Verify after 2 seconds
      setTimeout(async () => {
        setVerifying(true);
        const verified = await verifyTransaction(result.txId);
        if (verified) {
          toast.success("Transaction confirmed on blockchain!");
        }
        setVerifying(false);
      }, 2000);
      
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleBuy} 
        disabled={isLoading || !address}
        className="w-full relative overflow-hidden"
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing Transaction...
          </span>
        ) : (
          "Buy Product (0.00001 BTC)"
        )}
      </Button>

      {/* Transaction Status */}
      {lastTransaction && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 text-green-700 mb-3">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">Transaction Successful!</span>
            {verifying && (
              <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-auto">
                <Loader2 className="h-3 w-3 animate-spin" />
                Verifying
              </span>
            )}
          </div>

          {/* Transaction Hash */}
          <div className="bg-white/80 backdrop-blur p-3 rounded-lg border border-green-100 mb-3">
            <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono bg-gray-100 p-1.5 rounded flex-1 overflow-x-auto">
                {lastTransaction.txId}
              </code>
              <button
                onClick={() => copyToClipboard(lastTransaction.txId)}
                className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              >
                <Copy className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Explorer Links */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <a
              href={lastTransaction.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              Blockscout
            </a>
            
            <a
              href={lastTransaction.btcExplorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all transform hover:scale-[1.02] text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              Mempool
            </a>
          </div>

          {/* Timestamp */}
          <p className="text-xs text-gray-400 text-right mt-2">
            {new Date(lastTransaction.timestamp).toLocaleString()}
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          <span className="font-medium">❌ Error:</span> {error}
        </div>
      )}
    </div>
  );
};