import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import { Menu, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#202124] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm hover:text-[#8ab4f8]">About</a>
          <a href="#" className="text-sm hover:text-[#8ab4f8]">Store</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm hover:text-[#8ab4f8]">Gmail</a>
          <a href="#" className="text-sm hover:text-[#8ab4f8]">Images</a>
          <Button variant="ghost" size="icon" className="text-[#e8eaed] hover:bg-[#303134]">
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="bg-[#8ab4f8] text-[#202124] hover:bg-[#aecbfa] rounded-full h-8 w-8 p-0">
            A
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow mt-32">
        <div className="mb-8">
          <h1 className="text-6xl font-normal text-white">Google</h1>
        </div>
        
        <SearchBar />

        <div className="mt-8 flex space-x-4">
          <Button
            variant="secondary"
            className="bg-[#303134] text-white hover:bg-[#3c4043] border-none"
          >
            Google Search
          </Button>
          <Button
            variant="secondary"
            className="bg-[#303134] text-white hover:bg-[#3c4043] border-none"
          >
            I'm Feeling Lucky
          </Button>
        </div>

        <div className="mt-8 text-sm">
          <span className="text-[#9aa0a6]">Google offered in: </span>
          {["हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ਪੰਜਾਬੀ"].map(
            (lang, i) => (
              <a
                key={i}
                href="#"
                className="text-[#8ab4f8] hover:underline ml-2"
              >
                {lang}
              </a>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-[#171717] text-[#9aa0a6]">
        <div className="px-6 py-3 border-b border-[#3c4043]">
          <span>India</span>
        </div>
        <div className="px-6 py-3 flex justify-between">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Advertising</a>
            <a href="#" className="hover:text-white">Business</a>
            <a href="#" className="hover:text-white">How Search works</a>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;