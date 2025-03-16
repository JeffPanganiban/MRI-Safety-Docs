import { useEffect, useState } from "react";
import { getDevices, getCategories, getManufacturers } from "@/lib/api";
import { Device, Category, Manufacturer, SafetyStatus } from "@/types/device";
import DeviceList from "./DeviceList";
import SearchBar from "../search/SearchBar";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<
    number | null
  >(null);
  const [selectedSafetyStatus, setSelectedSafetyStatus] =
    useState<SafetyStatus | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Load all required data in parallel
        const [devicesData, categoriesData, manufacturersData] =
          await Promise.all([
            getDevices(),
            getCategories(),
            getManufacturers(),
          ]);

        setDevices(devicesData);
        setCategories(categoriesData);
        setManufacturers(manufacturersData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load devices. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Apply filters
  const filteredDevices = devices.filter((device) => {
    if (selectedCategory && device.categoryId !== selectedCategory)
      return false;
    if (selectedManufacturer && device.manufacturerId !== selectedManufacturer)
      return false;
    if (selectedSafetyStatus && device.safetyStatus !== selectedSafetyStatus)
      return false;
    return true;
  });

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedManufacturer(null);
    setSelectedSafetyStatus(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Medical Devices Database</h1>

      <div className="mb-8">
        <SearchBar className="max-w-2xl mb-4" />

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">Filter Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* These would be actual Select components in a real implementation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedCategory || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedManufacturer || ""}
                onChange={(e) =>
                  setSelectedManufacturer(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              >
                <option value="">All Manufacturers</option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Safety Status
              </label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={selectedSafetyStatus || ""}
                onChange={(e) =>
                  setSelectedSafetyStatus(
                    (e.target.value as SafetyStatus) || null,
                  )
                }
              >
                <option value="">All Statuses</option>
                <option value="MR Safe">MR Safe</option>
                <option value="MR Conditional">MR Conditional</option>
                <option value="MR Unsafe">MR Unsafe</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
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
        <DeviceList
          devices={filteredDevices}
          title={`All Devices (${filteredDevices.length})`}
          emptyMessage="No devices match the selected filters. Try changing your filter criteria."
        />
      )}
    </div>
  );
}
