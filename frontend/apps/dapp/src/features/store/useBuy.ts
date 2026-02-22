"use client";

import {
  useAddTxIntention,
  useSignIntention,
  useFinalizeBTCTransaction,
} from "@midl/executor-react";
import { usePublicClient } from "wagmi";
import { encodeFunctionData } from "viem";
import { StoreAbi } from "@/abi/StoreAbi";
import { useWaitForTransaction } from "@midl/react";
import { useState } from "react";

const STORE_ADDRESS = "0x848982C7AdF433C2D0407cCe64B1C76bb4e8493e" as const;

export interface TransactionResult {
  txId: string;
  explorerUrl: string;
  btcExplorerUrl: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

// Define types based on MIDL SDK
interface BTCTxResponse {
  id: string;
  hex: string;
}

interface IntentionResponse {
  // Intention structure - id might not exist directly
  intentionId?: string;
  // other properties
}

export const useBuy = () => {
  const publicClient = usePublicClient();
  const [lastTransaction, setLastTransaction] = useState<TransactionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addTxIntentionAsync } = useAddTxIntention();
  const { signIntentionAsync } = useSignIntention();
  const { finalizeBTCTransactionAsync } = useFinalizeBTCTransaction();
  const { waitForTransaction } = useWaitForTransaction();

  const buy = async (
    evmFrom: `0x${string}`,
    btcFrom: string,
    productId: number
  ): Promise<TransactionResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("🚀 Starting buy transaction for product:", productId);
      console.log("📝 EVM Address:", evmFrom);
      console.log("🔗 BTC Address:", btcFrom);

      // Step 1: Encode EVM call
      console.log("📦 Step 1: Encoding function data...");
      const data = encodeFunctionData({
        abi: StoreAbi,
        functionName: "buy",
        args: [productId],
      });
      console.log("✅ Encoded data:", data);

      // Step 2: Create intention
      console.log("📝 Step 2: Creating transaction intention...");
      const intention = await addTxIntentionAsync({
        intention: {
          evmTransaction: {
            to: STORE_ADDRESS,
            data,
            value: 10000n,
          },
        },
      });
      console.log("✅ Intention created:", intention);
      
      // Safely access intention ID if it exists
      const intentionId = (intention as any).id || (intention as any).intentionId;
      console.log("📋 Intention ID:", intentionId || "Not available");

      // Step 3: Finalize BTC transaction
      console.log("💰 Step 3: Finalizing Bitcoin transaction...");
      const btcResponse = await finalizeBTCTransactionAsync() as unknown as { tx: BTCTxResponse };
      const tx = btcResponse.tx;
      
      console.log("✅ BTC Transaction finalized!");
      console.log("🔑 BTC Transaction ID:", tx.id);
      console.log("📦 BTC Transaction Hex:", tx.hex.substring(0, 50) + "...");

      // Step 4: Sign intention
      console.log("✍️ Step 4: Signing transaction intention...");
      const signedTransaction = await signIntentionAsync({
        intention: intention as any, // Type assertion to avoid issues
        txId: tx.id,
      });
      console.log("✅ Transaction signed!");
      console.log("🔏 Signed transaction:", signedTransaction.substring(0, 50) + "...");

      // Step 5: Broadcast
      console.log("📡 Step 5: Broadcasting to network...");
      if (publicClient && 'sendBTCTransactions' in publicClient) {
        await (publicClient as any).sendBTCTransactions({
          serializedTransactions: [signedTransaction],
          btcTransaction: tx.hex,
        });
        console.log("✅ Transaction broadcasted successfully!");
      } else {
        throw new Error("Public client does not support sendBTCTransactions");
      }

      // Step 6: Wait for confirmation
      console.log("⏳ Step 6: Waiting for confirmation...");
      const confirmedTx = await waitForTransaction({ txId: tx.id });
      console.log("✅ Transaction confirmed!", confirmedTx);

      // Create explorer URLs
      const explorerUrl = `https://blockscout.staging.midl.xyz/tx/${tx.id}`;
      const btcExplorerUrl = `https://mempool.staging.midl.xyz/tx/${tx.id}`;

      const transactionResult: TransactionResult = {
        txId: tx.id,
        explorerUrl,
        btcExplorerUrl,
        status: 'confirmed',
        timestamp: Date.now()
      };

      setLastTransaction(transactionResult);

      console.log("🎉 Transaction complete!");
      console.log("🔍 Block Explorer:", explorerUrl);
      console.log("🔍 Bitcoin Explorer:", btcExplorerUrl);

      return transactionResult;
      
    } catch (error: any) {
      console.error("❌ Buy failed with error:", error);
      
      let errorMessage = "Transaction failed";
      
      if (error.message?.includes("unknown account")) {
        errorMessage = "Wallet account not recognized. Please reconnect your wallet.";
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction rejected in wallet";
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient BTC balance for fees";
      } else {
        errorMessage = error.message || "Unknown error occurred";
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTransaction = async (txId: string): Promise<boolean> => {
    try {
      console.log("🔍 Verifying transaction:", txId);
      
      // Check on Blockscout
      const response = await fetch(
        `https://blockscout.staging.midl.xyz/api?module=transaction&action=gettxinfo&txhash=${txId}`
      );
      const data = await response.json();
      
      if (data.status === "1") {
        console.log("✅ Transaction verified on explorer!");
        return true;
      } else {
        console.log("⚠️ Transaction not yet visible on explorer");
        return false;
      }
    } catch (error) {
      console.error("❌ Verification failed:", error);
      return false;
    }
  };

  const getTransactionLink = (txId: string): { blockscout: string; mempool: string } => {
    return {
      blockscout: `https://blockscout.staging.midl.xyz/tx/${txId}`,
      mempool: `https://mempool.staging.midl.xyz/tx/${txId}`
    };
  };

  const getLastTransaction = () => lastTransaction;
  
  const clearLastTransaction = () => {
    setLastTransaction(null);
    setError(null);
  };

  return {
    buy,
    verifyTransaction,
    getTransactionLink,
    getLastTransaction,
    clearLastTransaction,
    isLoading,
    error,
    lastTransaction
  };
};