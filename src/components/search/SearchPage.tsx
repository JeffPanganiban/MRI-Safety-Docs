import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          MRI Safety Information Search
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find safety information for medical devices in MRI environments
        </p>

        <form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search by device name or model number..."
            className="pl-12 pr-4 h-14 text-lg rounded-full shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
          >
            Search
          </Button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">MR Safe</h3>
            <p className="text-gray-600 mb-4">
              Items that pose no known hazards in all MRI environments
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/devices?safety=MR%20Safe")}
              className="w-full"
            >
              View Safe Devices
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">MR Conditional</h3>
            <p className="text-gray-600 mb-4">
              Items that have been demonstrated to pose no hazards in a
              specified MRI environment
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/devices?safety=MR%20Conditional")}
              className="w-full"
            >
              View Conditional Devices
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">MR Unsafe</h3>
            <p className="text-gray-600 mb-4">
              Items that are known to pose hazards in all MRI environments
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/devices?safety=MR%20Unsafe")}
              className="w-full"
            >
              View Unsafe Devices
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
