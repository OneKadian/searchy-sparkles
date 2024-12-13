import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Search, Camera } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import ImageSearch from "@/components/ImageSearch";
import ImageBrowser from "@/components/ImageBrowser";
import { useToast } from "@/hooks/use-toast";

const Images = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Get the image from location state or redirect if none exists
  const uploadedImage = location.state?.image;
  if (!uploadedImage && !showImageSearch) {
    navigate("/");
    return null;
  }

  const handleImageSearch = async () => {
    setIsSearching(true);
    // In a real implementation, you would:
    // 1. Convert the cropped image to a buffer
    // 2. Send it to TinEye API
    // 3. Process and display results
    toast({
      title: "Starting image search",
      description: "Please wait while we search for similar images...",
    });
    
    // Simulate API delay
    setTimeout(() => {
      setIsSearching(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#202124]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-2 border-b border-[#3c4043]">
        <div className="flex items-center gap-6">
          <span 
            className="text-white text-2xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Google
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#e8eaed] hover:bg-[#3c4043]"
              onClick={() => setShowImageSearch(true)}
            >
              <Camera className="w-4 h-4 mr-2" />
              Search by image
            </Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <ResizablePanelGroup direction="horizontal">
        {/* Left panel with image and cropping */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-[calc(100vh-56px)] bg-[#202124] p-6">
            <Button
              variant="outline"
              className="w-full mb-4 rounded-full bg-[#303134] text-[#e8eaed] border-none hover:bg-[#3c4043]"
              onClick={handleImageSearch}
            >
              Find image source
            </Button>
            <div className="relative h-[70vh] bg-[#303134] rounded-lg overflow-hidden">
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mt-4 flex justify-end items-center gap-2">
              <Button
                variant="outline"
                className="rounded-full bg-[#303134] text-[#e8eaed] border-none hover:bg-[#3c4043]"
              >
                Text
              </Button>
              <Button
                variant="outline"
                className="rounded-full bg-[#303134] text-[#e8eaed] border-none hover:bg-[#3c4043]"
              >
                Translate
              </Button>
              <Button 
                className="rounded-full bg-[#8ab4f8] text-black hover:bg-[#aecbfa]"
                onClick={handleImageSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </ResizablePanel>

        {/* Right panel with browser */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-[calc(100vh-56px)] bg-[#202124] p-6">
            <ImageBrowser isLoading={isSearching} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Image search modal */}
      <Dialog open={showImageSearch} onOpenChange={setShowImageSearch}>
        <ImageSearch onClose={() => setShowImageSearch(false)} />
      </Dialog>
    </div>
  );
};

export default Images;