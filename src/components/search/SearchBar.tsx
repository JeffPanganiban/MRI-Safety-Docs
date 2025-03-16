import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search for a device...",
  className = "",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Mock suggestions - in a real app, this would come from an API call
  useEffect(() => {
    if (query.length > 1) {
      // Mock suggestions based on query
      const mockSuggestions = [
        `${query} - Medtronic`,
        `${query} - Boston Scientific`,
        `${query} - Abbott`,
        `${query} - Philips`,
      ].filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase()),
      );

      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim() === "") return;

    console.log("Search triggered with query:", query);

    if (onSearch) {
      onSearch(query);
    } else {
      // Default behavior: navigate to search results
      console.log("Navigating to search results with query:", query);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          className="h-12 pl-12 pr-16 rounded-full text-base shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <Button
          type="button"
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 rounded-full px-3 text-xs"
          size="sm"
        >
          Search
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2">
          <div className="px-4 py-1 text-xs text-gray-500 border-b">
            Suggestions
          </div>
          <div className="max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
