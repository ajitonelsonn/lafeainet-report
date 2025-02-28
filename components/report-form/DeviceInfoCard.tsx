import { useEffect } from "react";
import { Smartphone } from "lucide-react";
import { DeviceInfo } from "./types";

interface DeviceInfoCardProps {
  deviceInfo: DeviceInfo;
  setDeviceInfo: (info: DeviceInfo) => void;
}

export default function DeviceInfoCard({
  deviceInfo,
  setDeviceInfo,
}: DeviceInfoCardProps) {
  // Set device info after component mounts
  useEffect(() => {
    setDeviceInfo({
      platform: window.navigator.platform,
      vendor: window.navigator.vendor,
    });
  }, [setDeviceInfo]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Device Information</h2>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Platform:</span> {deviceInfo.platform}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Vendor:</span> {deviceInfo.vendor}
        </p>
      </div>
    </div>
  );
}
