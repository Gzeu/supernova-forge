import { useEffect, useState } from "react";
import { useGetNetworkConfig } from "@multiversx/sdk-dapp/hooks";

interface UseGetAccountBalanceReturn {
  balance: string;
  isLoading: boolean;
  error: string | null;
}

export function useGetAccountBalance(address: string): UseGetAccountBalanceReturn {
  const [balance, setBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { network } = useGetNetworkConfig();

  useEffect(() => {
    if (!address || !network.apiAddress) {
      setBalance("0");
      setIsLoading(false);
      return;
    }

    const fetchBalance = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${network.apiAddress}/accounts/${address}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBalance(data.balance || "0");
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setBalance("0");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
    
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    
    return () => clearInterval(interval);
  }, [address, network.apiAddress]);

  return { balance, isLoading, error };
}
