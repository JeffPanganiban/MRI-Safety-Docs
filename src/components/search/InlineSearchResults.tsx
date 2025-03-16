import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchDevices } from "@/lib/api";
import { Device } from "@/types/device";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface InlineSearchResultsProps {
  query: string;
  onClose: () => void;
}

export default function InlineSearchResults({
  query,
  onClose,
}: InlineSearchResultsProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setDevices([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const results = await searchDevices(query);
        setDevices(results);
      } catch (err) {
        console.error("Error searching devices:", err);
        setError("Failed to search devices. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [query]);

  return (
    <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-[70vh] overflow-y-auto">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <div className="text-sm text-gray-500">
          {loading
            ? "Searching..."
            : error
              ? "Error searching"
              : devices.length === 0
                ? "No results found"
                : `Found ${devices.length} result${devices.length === 1 ? "" : "s"}`}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="px-4 py-2 text-sm text-red-500">{error}</div>
      ) : devices.length === 0 ? (
        <div className="px-4 py-2 text-sm text-gray-500">
          No devices found matching "{query}". Try different keywords.
        </div>
      ) : (
        <div className="p-2">
          {devices.map((device) => (
            <Link
              to={`/device/${device.id}`}
              key={device.id}
              className="block p-3 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={onClose}
            >
              <div className="flex items-start">
                {device.imageUrl && (
                  <div className="flex-shrink-0 mr-3">
                    <img
                      src={device.imageUrl}
                      alt={device.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-gray-900">{device.name}</h4>
                  <div className="text-sm text-gray-500">
                    {device.manufacturer?.name}
                    {device.modelNumber ? ` • ${device.modelNumber}` : ""}
                  </div>
                  <div className="mt-1 flex items-center">
                    <span
                      className={`inline-block h-2 w-2 rounded-full mr-1 ${
                        device.safetyStatus === "MR Safe"
                          ? "bg-green-500"
                          : device.safetyStatus === "MR Conditional"
                            ? "bg-yellow-500"
                            : device.safetyStatus === "MR Unsafe"
                              ? "bg-red-500"
                              : "bg-gray-500"
                      }`}
                    ></span>
                    <span className="text-xs font-medium">
                      {device.safetyStatus}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="px-2 pt-2 border-t mt-2">
            <Link
              to={`/search?q=${encodeURIComponent(query)}`}
              className="block text-center text-sm text-blue-600 hover:text-blue-800 py-2"
              onClick={onClose}
            >
              View all results
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
