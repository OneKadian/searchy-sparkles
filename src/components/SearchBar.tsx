import { useState, useCallback, KeyboardEvent } from "react";
import { Mic, Camera, Search } from "lucide-react";
import debounce from "lodash.debounce";
import { useToast } from "@/hooks/use-toast";
import { Dialog } from "./ui/dialog";
import ImageSearch from "./ImageSearch";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const { toast } = useToast();

  const debouncedSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }
      
      // For demo, using mock suggestions. In production, replace with actual API call
      const mockSuggestions = [
        `${searchTerm} news`,
        `${searchTerm} weather`,
        `${searchTerm} images`,
        `${searchTerm} videos`,
        `${searchTerm} maps`
      ];
      setSuggestions(mockSuggestions);
    }, 300),
    []
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      handleSearch(suggestions[selectedIndex] || query);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex items-center bg-[#202124] rounded-full border border-[#5f6368] hover:border-[#8ab4f8] focus-within:border-[#8ab4f8] px-4 py-2">
          <Search className="w-5 h-5 text-[#9aa0a6] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              debouncedSearch(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none"
            placeholder="Search Google or type a URL"
          />
          <button 
            onClick={() => setShowImageSearch(true)}
            className="p-2 hover:bg-[#303134] rounded-full"
          >
            <Camera className="w-5 h-5 text-[#8ab4f8]" />
          </button>
          <button className="p-2 hover:bg-[#303134] rounded-full">
            <Mic className="w-5 h-5 text-[#8ab4f8]" />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#202124] border border-[#5f6368] rounded-lg overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                className={`px-4 py-2 cursor-pointer hover:bg-[#303134] ${
                  index === selectedIndex ? "bg-[#303134]" : ""
                }`}
                onClick={() => handleSearch(suggestion)}
              >
                <div className="flex items-center text-white">
                  <Search className="w-4 h-4 text-[#9aa0a6] mr-3" />
                  {suggestion}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showImageSearch} onOpenChange={setShowImageSearch}>
        <ImageSearch onClose={() => setShowImageSearch(false)} />
      </Dialog>
    </div>
  );
};

export default SearchBar;