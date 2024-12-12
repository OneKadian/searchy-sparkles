import { useState, useCallback } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "./ImageUploader";
import ImageCropper from "./ImageCropper";
import SearchResults from "./SearchResults";
import { searchImage } from "@/services/imageSearch";

const ImageSearch = ({ onClose }: { onClose: () => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { toast } = useToast();

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSearch = async () => {
    if (!image) {
      toast({
        title: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    try {
      const results = await searchImage(image);
      setSearchResults(results.results);
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Error searching image",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[90vw] h-[90vh] bg-[#202124] text-white">
      <DialogHeader>
        <div className="flex items-center">
          {showResults && (
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => setShowResults(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <DialogTitle className="text-xl font-semibold">
            Search by image
          </DialogTitle>
        </div>
        <DialogDescription className="text-[#9aa0a6]">
          Search Google for related images
        </DialogDescription>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogHeader>

      <div className="mt-4 flex h-full gap-4">
        <div className="w-1/2 flex flex-col">
          {!image ? (
            <ImageUploader onImageSelect={setImage} image={image} />
          ) : (
            <ImageCropper
              image={image}
              crop={crop}
              zoom={zoom}
              setCrop={setCrop}
              setZoom={setZoom}
              onCropComplete={onCropComplete}
              onClear={() => setImage(null)}
              onSearch={handleSearch}
            />
          )}
        </div>

        {showResults && (
          <div className="w-1/2 overflow-y-auto">
            <SearchResults results={searchResults} />
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default ImageSearch;