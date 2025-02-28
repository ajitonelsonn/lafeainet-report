import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { IPInfoResponse } from "./types";

interface ProviderCardProps {
  provider: string;
  setProvider: (provider: string) => void;
}

export default function ProviderCard({
  provider,
  setProvider,
}: ProviderCardProps) {
  const [isLoadingProvider, setIsLoadingProvider] = useState(false);

  // Helper function to clean provider name
  const cleanProviderName = (providerName: string) => {
    return providerName
      .replace(/^AS\d+\s+/i, "") // Remove AS number prefix
      .replace(/\sLimited$/i, "") // Remove "Limited" suffix
      .replace(/\sLtd\.?$/i, "") // Remove "Ltd" suffix
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();
  };

  // Function to detect provider using multiple fallback options
  const detectProvider = async () => {
    setIsLoadingProvider(true);
    try {
      // Try ip-api.com (open source alternative) first
      try {
        const response = await fetch(
          `https://ip-api.com/json?fields=as,isp,org`
        );
        const data = (await response.json()) as IPInfoResponse;

        if (data.org || data.isp || data.as) {
          // Prioritize organization name, fall back to ISP or AS
          const providerInfo = data.org || data.isp || data.as || "";
          const providerName = cleanProviderName(providerInfo);
          console.log("Setting provider:", providerName);
          setProvider(providerName);
          return;
        }
      } catch (error) {
        console.error("Error with ip-api.com:", error);
      }

      // Fallback to ipapi.co (another open source option)
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.org) {
          const providerName = cleanProviderName(data.org);
          console.log("Setting provider from fallback:", providerName);
          setProvider(providerName);
          return;
        }
      } catch (error) {
        console.error("Error with ipapi.co:", error);
      }

      // Second fallback to freegeoip.app
      try {
        const response = await fetch("https://freegeoip.app/json/");
        const data = await response.json();

        if (data.isp) {
          const providerName = cleanProviderName(data.isp);
          console.log("Setting provider from second fallback:", providerName);
          setProvider(providerName);
          return;
        }
      } catch (error) {
        console.error("Error with freegeoip.app:", error);
      }

      // Set unknown provider if all methods fail
      setProvider("Unknown Provider");
    } catch (error) {
      console.error("Error detecting provider:", error);
      setProvider("Unknown Provider");
    } finally {
      setIsLoadingProvider(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Provider</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Provider
        </label>
        <div className="relative">
          <div className="w-full p-2.5 border border-gray-300 rounded-md text-sm bg-gray-50">
            {isLoadingProvider ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                <span className="text-gray-500">Detecting provider...</span>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span>{provider || "Click detect to find your provider"}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={detectProvider}
        disabled={isLoadingProvider}
        className="w-full mt-4 py-3 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors active:bg-blue-700 touch-manipulation"
      >
        {isLoadingProvider ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Detecting Provider...
          </span>
        ) : (
          "Detect Provider"
        )}
      </button>
    </div>
  );
}
