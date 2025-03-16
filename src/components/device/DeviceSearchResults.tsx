import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchDevices } from "@/lib/api";
import { Device } from "@/types/device";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import DeviceList from "./DeviceList";

export default function DeviceSearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setDevices([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Performing search for:", query);
        const results = await searchDevices(query);
        console.log("Search results:", results);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <form onSubmit={handleSearch} className="relative max-w-md mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Refine your search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-4"
          >
            Search
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      ) : (
        <>
          <div className="mb-4">
            {query && (
              <p className="text-gray-600">
                {devices.length === 0
                  ? `No results found for "${query}"`
                  : `Found ${devices.length} result${devices.length === 1 ? "" : "s"} for "${query}"`}
              </p>
            )}
          </div>

          <DeviceList
            devices={devices}
            emptyMessage={
              <div className="text-center">
                <p className="mb-4">
                  No devices found matching your search criteria.
                </p>
                <p className="mb-6">
                  Try using different keywords or browse by category.
                </p>
                <Button variant="outline" onClick={() => navigate("/devices")}>
                  View All Devices
                </Button>
              </div>
            }
          />
        </>
      )}
    </div>
  );
}
