"use client";

import { useState } from "react";
import {
  DeviceInfo,
  LocationData,
  NetworkSpeedData,
  ReportData,
  SubmissionStatus,
} from "./types";
import NetworkSpeedCard from "./NetworkSpeedCard";
import DeviceInfoCard from "./DeviceInfoCard";
import LocationCard from "./LocationCard";
import ProviderCard from "./ProviderCard";
import ReportFormCard from "./ReportFormCard";
import LoadingOverlay from "./LoadingOverlay";
import SuccessOverlay from "./SuccessOverlay";

export default function ReportForm() {
  // Form state
  const [provider, setProvider] = useState<string>("");
  const [dataPackage, setDataPackage] = useState("");
  const [comment, setComment] = useState("");
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [submitting, setSubmitting] = useState(false);

  // Device info state
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    platform: "",
    vendor: "",
  });

  // Network speed state
  const [networkSpeed, setNetworkSpeed] = useState<NetworkSpeedData>({
    download: null,
    upload: null,
  });

  // Location state
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
  });

  const validateForm = (): boolean => {
    if (!provider || provider === "Unknown Provider") return false;
    if (!dataPackage?.trim()) return false;
    if (!comment?.trim()) return false;
    if (!networkSpeed.download || !networkSpeed.upload) return false;
    if (!location.latitude || !location.longitude) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmissionStatus("submitting");

    try {
      const reportData: ReportData = {
        provider,
        dataPackage,
        downloadSpeed: networkSpeed.download,
        uploadSpeed: networkSpeed.upload,
        deviceInfo,
        locationLat: location.latitude,
        locationLng: location.longitude,
        comment,
      };

      console.log("Submitting report data:", reportData);

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report");
      }

      if (data.success) {
        setSubmissionStatus("success");
        // Reset form
        setDataPackage("");
        setComment("");
        setNetworkSpeed({ download: null, upload: null });
        setLocation({ latitude: null, longitude: null });
      } else {
        throw new Error(data.message || "Failed to submit report");
      }
    } catch (error: unknown) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert("Error submitting report: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 px-2 max-w-lg mx-auto">
      <div className="grid gap-4 md:grid-cols-2">
        <NetworkSpeedCard
          networkSpeed={networkSpeed}
          setNetworkSpeed={setNetworkSpeed}
        />

        <DeviceInfoCard deviceInfo={deviceInfo} setDeviceInfo={setDeviceInfo} />
      </div>

      <LocationCard location={location} setLocation={setLocation} />

      <ProviderCard provider={provider} setProvider={setProvider} />

      <ReportFormCard
        dataPackage={dataPackage}
        setDataPackage={setDataPackage}
        comment={comment}
        setComment={setComment}
        handleSubmit={handleSubmit}
        isSubmitting={submitting}
        isValid={validateForm()}
      />

      {submissionStatus === "submitting" && <LoadingOverlay />}
      {submissionStatus === "success" && (
        <SuccessOverlay onClose={() => setSubmissionStatus("idle")} />
      )}
    </div>
  );
}
