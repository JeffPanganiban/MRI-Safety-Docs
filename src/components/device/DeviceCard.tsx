import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type SafetyStatus =
  | "MR Safe"
  | "MR Conditional"
  | "MR Unsafe"
  | "Unknown";

export interface DeviceCardProps {
  id: string | number;
  name: string;
  manufacturer: string;
  safetyStatus: SafetyStatus;
  imageUrl?: string;
  className?: string;
}

export default function DeviceCard({
  id,
  name,
  manufacturer,
  safetyStatus,
  imageUrl,
  className = "",
}: DeviceCardProps) {
  // Determine status color and icon
  const getStatusInfo = (status: SafetyStatus) => {
    switch (status) {
      case "MR Safe":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        };
      case "MR Conditional":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
        };
      case "MR Unsafe":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-600",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
    }
  };

  const statusInfo = getStatusInfo(safetyStatus);

  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white ${className}`}
    >
      {imageUrl && (
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray-500 mb-4">{manufacturer}</p>
        <div className="flex items-center mb-4">
          <div
            className={`h-8 w-8 rounded-full ${statusInfo.bgColor} flex items-center justify-center mr-2`}
          >
            {statusInfo.icon}
          </div>
          <span className={`${statusInfo.textColor} font-medium`}>
            {safetyStatus}
          </span>
        </div>
        <Link to={`/device/${id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
}
