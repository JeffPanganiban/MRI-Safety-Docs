import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDeviceById } from "@/lib/api";
import { Device, SafetyStatus } from "@/types/device";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

export default function DeviceDetail() {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDevice() {
      try {
        if (!id) return;
        setLoading(true);
        const deviceData = await getDeviceById(id);
        setDevice(deviceData);
        setError(null);
      } catch (err) {
        console.error("Error loading device:", err);
        setError("Failed to load device information. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadDevice();
  }, [id]);

  // Helper function to get safety status icon and color
  const getSafetyStatusInfo = (status: SafetyStatus) => {
    switch (status) {
      case "MR Safe":
        return {
          icon: <CheckCircle className="h-6 w-6" />,
          color: "text-green-600 bg-green-50",
          border: "border-green-200",
        };
      case "MR Conditional":
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          color: "text-yellow-600 bg-yellow-50",
          border: "border-yellow-200",
        };
      case "MR Unsafe":
        return {
          icon: <XCircle className="h-6 w-6" />,
          color: "text-red-600 bg-red-50",
          border: "border-red-200",
        };
      default:
        return {
          icon: <HelpCircle className="h-6 w-6" />,
          color: "text-gray-600 bg-gray-50",
          border: "border-gray-200",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error || "Device not found"}
        </div>
        <Link to="/devices">
          <Button>Back to Devices</Button>
        </Link>
      </div>
    );
  }

  const safetyInfo = getSafetyStatusInfo(device.safetyStatus);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/devices">
          <Button variant="ghost" size="sm">
            ← Back to Devices
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Device header */}
        <div className="p-6 md:p-8 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{device.name}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                {device.modelNumber && (
                  <span className="mr-4">Model: {device.modelNumber}</span>
                )}
                {device.manufacturer && (
                  <Link
                    to={`/manufacturers/${device.manufacturerId}`}
                    className="hover:underline"
                  >
                    {device.manufacturer.name}
                  </Link>
                )}
              </div>
            </div>
            <div
              className={`flex items-center px-4 py-2 rounded-full ${safetyInfo.color} ${safetyInfo.border} border`}
            >
              {safetyInfo.icon}
              <span className="ml-2 font-medium">{device.safetyStatus}</span>
            </div>
          </div>
        </div>

        {/* Device image if available */}
        {device.imageUrl && (
          <div className="border-b">
            <img
              src={device.imageUrl}
              alt={device.name}
              className="w-full h-64 object-contain bg-gray-50 p-4"
            />
          </div>
        )}

        {/* Safety information */}
        <div className="p-6 md:p-8 border-b">
          <h2 className="text-xl font-semibold mb-4">MRI Safety Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Safety Status</h3>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full ${safetyInfo.color} ${safetyInfo.border} border`}
              >
                {safetyInfo.icon}
                <span className="ml-2">{device.safetyStatus}</span>
              </div>
            </div>

            {device.fieldStrength && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Field Strength
                </h3>
                <p>{device.fieldStrength}</p>
              </div>
            )}
          </div>

          {device.conditions && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">Conditions</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-line">{device.conditions}</p>
              </div>
            </div>
          )}

          {device.additionalInfo && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-2">
                Additional Information
              </h3>
              <p className="whitespace-pre-line">{device.additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Documentation */}
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Documentation</h2>

          {device.documentationUrl ? (
            <a
              href={device.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FileText className="mr-2 h-5 w-5" />
              Official Documentation
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <p className="text-gray-500">No documentation available</p>
          )}

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Always verify MRI safety information with the manufacturer's
                most recent documentation before proceeding with any MRI
                procedure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category information */}
      {device.category && (
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Category Information</h2>
          <Link
            to={`/categories/${device.categoryId}`}
            className="flex items-center"
          >
            {device.category.icon && (
              <span className="text-2xl mr-3">{device.category.icon}</span>
            )}
            <span className="text-lg hover:underline">
              {device.category.name}
            </span>
          </Link>
          {device.category.description && (
            <p className="mt-2 text-gray-600">{device.category.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
