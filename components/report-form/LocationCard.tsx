import { useState } from "react";
import { MapPin } from "lucide-react";
import { LocationData } from "./types";

interface LocationCardProps {
  location: LocationData;
  setLocation: (location: LocationData) => void;
}

export default function LocationCard({
  location,
  setLocation,
}: LocationCardProps) {
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const detectLocation = () => {
    setDetectingLocation(true);
    setLocationError(null);

    if (!navigator?.geolocation) {
      setLocationError("Geolocation is not supported by your device");
      setDetectingLocation(false);
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setDetectingLocation(false);
      },
      (error: GeolocationPositionError) => {
        let errorMessage = "";
        switch (error.code) {
          case 1:
            errorMessage =
              "Location access denied. Please check your device settings and allow location access.";
            break;
          case 2:
            errorMessage =
              "Location unavailable. Please check if GPS is enabled.";
            break;
          case 3:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "Unable to get location. Please try again.";
        }
        setLocationError(errorMessage);
        setDetectingLocation(false);
      },
      options
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">Location</h2>
      </div>

      <div className="space-y-4">
        {locationError ? (
          <div className="space-y-2">
            <p className="text-sm text-red-500">{locationError}</p>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Troubleshooting steps:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Enable GPS on your device</li>
                <li>Allow location access in browser settings</li>
                <li>Refresh the page and try again</li>
              </ol>
            </div>
          </div>
        ) : location.latitude && location.longitude ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Latitude:</span>{" "}
              {location.latitude.toFixed(6)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Longitude:</span>{" "}
              {location.longitude.toFixed(6)}
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={detectLocation}
          disabled={detectingLocation}
          className="w-full py-3 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors active:bg-blue-700 touch-manipulation"
        >
          {detectingLocation ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Detecting Location...
            </span>
          ) : (
            "Detect Location"
          )}
        </button>
      </div>
    </div>
  );
}
