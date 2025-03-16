import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import InlineSearchResults from "@/components/search/InlineSearchResults";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Mock categories for the initial implementation
  const categories = [
    { id: 1, name: "Implantable Devices", icon: "🫀", count: 124 },
    { id: 2, name: "External Devices", icon: "🔌", count: 87 },
    { id: 3, name: "Imaging Equipment", icon: "📷", count: 45 },
    { id: 4, name: "Patient Monitors", icon: "📊", count: 63 },
    { id: 5, name: "Surgical Instruments", icon: "🔪", count: 92 },
    { id: 6, name: "Prosthetics", icon: "🦿", count: 38 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery);
      setIsSearching(true);
    }
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    setSubmittedQuery("");
  };

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        handleCloseSearch();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle popular search terms
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setSubmittedQuery(term);
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[980px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
              MRI Safety Docs
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about">
              <Button
                variant="ghost"
                className="text-sm font-light hover:text-gray-500"
              >
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="ghost"
                className="text-sm font-light hover:text-gray-500"
              >
                Contact
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-sm font-light hover:text-gray-500"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="pt-12">
        {/* Hero section with search */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white text-center">
          <h1 className="text-5xl font-semibold tracking-tight mb-2">
            MRI Safety Information Search
          </h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-8">
            Find safety information for medical devices quickly and reliably
          </h2>

          <div
            className="max-w-2xl mx-auto px-4 relative"
            ref={searchContainerRef}
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for a device..."
                  className="h-14 pl-12 pr-4 rounded-full text-lg shadow-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim()) {
                      setSubmittedQuery(searchQuery);
                      setIsSearching(true);
                    }
                  }}
                />
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 px-4"
                >
                  Search
                </Button>
              </div>
            </form>

            {isSearching && submittedQuery && (
              <InlineSearchResults
                query={submittedQuery}
                onClose={handleCloseSearch}
              />
            )}

            <div className="mt-3 text-sm text-gray-500">
              Popular searches:{" "}
              <button
                onClick={() => handlePopularSearch("Pacemaker")}
                className="text-blue-600 hover:underline"
              >
                Pacemaker
              </button>
              ,{" "}
              <button
                onClick={() => handlePopularSearch("Insulin Pump")}
                className="text-blue-600 hover:underline"
              >
                Insulin Pump
              </button>
              ,{" "}
              <button
                onClick={() => handlePopularSearch("Cochlear Implant")}
                className="text-blue-600 hover:underline"
              >
                Cochlear Implant
              </button>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link to={`/category/${category.id}`} key={category.id}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{category.icon}</div>
                      <div>
                        <h3 className="text-xl font-medium">{category.name}</h3>
                        <p className="text-gray-500">
                          {category.count} devices
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Why Use Our Database
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Access</h3>
                <p className="text-gray-600">
                  Get critical MRI safety information in seconds, not minutes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Reliable Information
                </h3>
                <p className="text-gray-600">
                  All data is sourced directly from manufacturer documentation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">
                  Access from any device in the clinical setting when you need
                  it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent additions section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Recently Added Devices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">
                      Neurostimulator XYZ-{item}00
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Manufacturer: Neurotech Solutions
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
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
                      </div>
                      <span className="text-green-600 font-medium">
                        MR Conditional
                      </span>
                    </div>
                    <Link to={`/device/${item}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/devices">
                <Button variant="outline">View All Devices</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-50 py-12 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">
                MRI Safety Database
              </h4>
              <p className="text-gray-600 mb-4">
                A comprehensive resource for MRI technicians and healthcare
                professionals.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Device Search
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Manufacturers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Safety Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Data Sources
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <p>
              © 2024 MRI Safety Database. All information should be verified
              with official manufacturer documentation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
