import { useState } from "react";
import { Download } from "lucide-react";
import { NetworkSpeedData } from "./types";

interface NetworkSpeedCardProps {
  networkSpeed: NetworkSpeedData;
  setNetworkSpeed: (data: NetworkSpeedData) => void;
}

export default function NetworkSpeedCard({
  networkSpeed,
  setNetworkSpeed,
}: NetworkSpeedCardProps) {
  const [testing, setTesting] = useState(false);

  // Constants for speed test
  const TEST_DURATION = 8000; // 8 seconds
  const CHUNK_SIZE = 256 * 1024; // 256KB chunks
  const SAMPLE_INTERVAL = 200; // 200ms between samples

  const testNetworkSpeed = async () => {
    setTesting(true);
    try {
      const results: Array<{
        type: "download" | "upload";
        speed: number;
        time: number;
      }> = [];
      const startTime = performance.now();

      // Test latency first
      await fetch("/api/ping");

      // Download speed test
      let totalDownloadBytes = 0;
      const downloadChunks: Uint8Array[] = [];

      // Use a CDN-hosted file for testing
      const testFiles = [
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
      ];

      for (const testFile of testFiles) {
        const response = await fetch(testFile, {
          cache: "no-store",
          mode: "cors",
        });
        const reader = response.body?.getReader();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done || performance.now() - startTime > TEST_DURATION) break;

            if (value) {
              downloadChunks.push(value);
              totalDownloadBytes += value.length;

              const currentTime = (performance.now() - startTime) / 1000;
              const currentSpeed =
                (totalDownloadBytes * 8) / currentTime / 1000000;

              results.push({
                type: "download",
                speed: currentSpeed,
                time: currentTime,
              });
            }
          }
        }
      }

      // Upload speed test
      let totalUploadBytes = 0;
      const chunk = new Uint8Array(CHUNK_SIZE).fill(88); // "X"

      while (performance.now() - startTime < TEST_DURATION) {
        await fetch("/api/speed-test", {
          method: "POST",
          body: chunk,
        });

        totalUploadBytes += CHUNK_SIZE;
        const currentTime = (performance.now() - startTime) / 1000;
        const currentSpeed = (totalUploadBytes * 8) / currentTime / 1000000;

        results.push({
          type: "upload",
          speed: currentSpeed,
          time: currentTime,
        });

        // Add delay between samples
        await new Promise((resolve) => setTimeout(resolve, SAMPLE_INTERVAL));
      }

      // Calculate average speeds
      const downloadResults = results.filter((r) => r.type === "download");
      const uploadResults = results.filter((r) => r.type === "upload");

      const avgDownload =
        downloadResults.length > 0
          ? downloadResults.reduce((acc, curr) => acc + curr.speed, 0) /
            downloadResults.length
          : 0;

      const avgUpload =
        uploadResults.length > 0
          ? uploadResults.reduce((acc, curr) => acc + curr.speed, 0) /
            uploadResults.length
          : 0;

      setNetworkSpeed({
        download: avgDownload,
        upload: avgUpload,
      });
    } catch (error) {
      console.error("Error testing network speed:", error);
      alert("Failed to test network speed. Please try again.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Download className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Network Speed</h2>
      </div>

      {(networkSpeed.download !== null || networkSpeed.upload !== null) && (
        <div className="space-y-4 mb-4">
          {networkSpeed.download !== null && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Download Speed</p>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {networkSpeed.download.toFixed(2)}
                </span>
                <span className="text-base text-gray-600 ml-2">Mbps</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Multiple samples over {TEST_DURATION / 1000}s
              </p>
            </div>
          )}

          {networkSpeed.upload !== null && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Upload Speed</p>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">
                  {networkSpeed.upload.toFixed(2)}
                </span>
                <span className="text-base text-gray-600 ml-2">Mbps</span>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={testNetworkSpeed}
        disabled={testing}
        className="w-full py-3 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors active:bg-blue-700 touch-manipulation"
      >
        {testing ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Running Speed Test...
          </span>
        ) : (
          "Test Speed"
        )}
      </button>
      {testing && (
        <p className="text-xs text-gray-500 text-center mt-2">
          Test runs for {TEST_DURATION / 1000} seconds for accuracy
        </p>
      )}
    </div>
  );
}
