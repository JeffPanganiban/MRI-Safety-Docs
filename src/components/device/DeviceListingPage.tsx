import { useEffect, useState } from "react";
import { getDevices } from "@/lib/api";
import { Device } from "@/types/device";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeviceCard from "./DeviceCard";
import DeviceList from "./DeviceList";

export default function DeviceListingPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    async function loadDevices() {
      try {
        setLoading(true);
        const data = await getDevices();
        setDevices(data);
        setFilteredDevices(data);
        setError(null);
      } catch (err) {
        console.error("Error loading devices:", err);
        setError("Failed to load devices. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadDevices();
  }, []);

  useEffect(() => {
    // Filter devices based on search query and active filter
    let result = devices;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (device) =>
          device.name.toLowerCase().includes(query) ||
          (device.modelNumber &&
            device.modelNumber.toLowerCase().includes(query)) ||
          (device.manufacturer?.name &&
            device.manufacturer.name.toLowerCase().includes(query)),
      );
      console.log("Search results:", result); // Debug log
    }

    // Apply safety status filter
    if (activeFilter) {
      result = result.filter((device) => device.safetyStatus === activeFilter);
    }

    setFilteredDevices(result);
  }, [searchQuery, activeFilter, devices]);

  const handleFilterClick = (status: string) => {
    setActiveFilter(activeFilter === status ? null : status);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect that filters devices
    // This function is just to handle the form submission
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center">
        <p className="text-lg font-medium mb-2">Error</p>
        <p>{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MRI Safety Device Database</h1>
        <p className="text-gray-600 mb-6">
          Browse our comprehensive database of medical devices and their MRI
          safety information.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative max-w-md mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search devices by name or model..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="sr-only">
            Search
          </button>
        </form>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeFilter === null ? "default" : "outline"}
            onClick={() => setActiveFilter(null)}
            className="flex items-center gap-1"
          >
            All Devices
          </Button>
          <Button
            variant={activeFilter === "MR Safe" ? "default" : "outline"}
            onClick={() => handleFilterClick("MR Safe")}
            className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
          >
            <CheckCircle className="h-4 w-4" />
            MR Safe
          </Button>
          <Button
            variant={activeFilter === "MR Conditional" ? "default" : "outline"}
            onClick={() => handleFilterClick("MR Conditional")}
            className="flex items-center gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200"
          >
            <AlertTriangle className="h-4 w-4" />
            MR Conditional
          </Button>
          <Button
            variant={activeFilter === "MR Unsafe" ? "default" : "outline"}
            onClick={() => handleFilterClick("MR Unsafe")}
            className="flex items-center gap-1 bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
          >
            <XCircle className="h-4 w-4" />
            MR Unsafe
          </Button>
        </div>
      </div>

      {filteredDevices.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg font-medium mb-2">No devices found</p>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria
          </p>
          {searchQuery && (
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <DeviceList
          devices={filteredDevices}
          title={`Devices (${filteredDevices.length})`}
          emptyMessage="No devices match the selected filters. Try changing your filter criteria."
        />
      )}
    </div>
  );
}
