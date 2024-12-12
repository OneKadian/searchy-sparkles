import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import ImageSearch from "@/components/ImageSearch";
import ImageCropper from "@/components/ImageCropper";
import SearchResults from "@/components/SearchResults";

const ImageSearchResults = () => {
  const [showImageSearch, setShowImageSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {};

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const mockResults = [
    {
      id: 1,
      title: "Uniqlo Sweat Cardigan",
      price: "₹2,490.00",
      store: "Uniqlo",
      status: "In stock",
      image: "/lovable-uploads/656c9e72-64a4-4ee1-9bb5-87a17e0a7964.png"
    },
    {
      id: 2,
      title: "UNIQLO US Fleece Full-Zip Jacket",
      price: "₹4,960.00",
      store: "UNIQLO US",
      status: "In stock",
      image: "/lovable-uploads/656c9e72-64a4-4ee1-9bb5-87a17e0a7964.png"
    },
    {
      id: 3,
      title: "H&M THERMOLITE Relaxed Fit Teddy jacket",
      price: "₹2,249.00",
      store: "H&M",
      status: "Out of stock",
      image: "/lovable-uploads/656c9e72-64a4-4ee1-9bb5-87a17e0a7964.png"
    }
  ];

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    // Handle crop complete if needed
  };

  if (!image) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#202124]">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-[#3c4043]">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl text-white">Google</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowImageSearch(true)}
            className="text-[#8ab4f8] hover:bg-[#303134]"
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[#e8eaed] hover:bg-[#303134]">
            <Menu className="h-5 w-5" />
          </Button>
          <Button className="bg-[#8ab4f8] text-[#202124] hover:bg-[#aecbfa] rounded-full h-8 w-8 p-0">
            A
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Image with crop */}
          <div className="h-[600px] bg-[#202124] rounded-lg overflow-hidden">
            <ImageCropper
              image={image}
              crop={crop}
              zoom={zoom}
              setCrop={setCrop}
              setZoom={setZoom}
              onCropComplete={handleCropComplete}
              onClear={() => navigate("/")}
              onSearch={() => {}}
            />
          </div>

          {/* Right side - Search results */}
          <div className="bg-[#202124] rounded-lg p-6">
            <SearchResults results={mockResults} />
          </div>
        </div>
      </div>

      {/* Image Search Modal */}
      <Dialog open={showImageSearch} onOpenChange={setShowImageSearch}>
        <ImageSearch onClose={() => setShowImageSearch(false)} />
      </Dialog>
    </div>
  );
};

export default ImageSearchResults;