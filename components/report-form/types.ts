// Type definitions for report form components
export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface DeviceInfo {
  platform: string;
  vendor: string;
}

export interface SubmissionError extends Error {
  message: string;
}

export interface IPInfoResponse {
  org?: string;
  isp?: string;
  as?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface NetworkSpeedData {
  download: number | null;
  upload: number | null;
}

export interface LocationData {
  latitude: number | null;
  longitude: number | null;
}

export interface ReportData {
  provider: string;
  dataPackage: string;
  downloadSpeed: number | null;
  uploadSpeed: number | null;
  deviceInfo: DeviceInfo;
  locationLat: number | null;
  locationLng: number | null;
  comment: string;
}
