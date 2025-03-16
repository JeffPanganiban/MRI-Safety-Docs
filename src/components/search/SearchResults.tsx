import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchDevices } from "@/lib/api";
import { Device } from "@/types/device";
import DeviceList from "../device/DeviceList";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <SearchBar placeholder="Refine your search..." className="max-w-2xl" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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
                <Button variant="outline" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            }
          />
        </>
      )}
    </div>
  );
}
