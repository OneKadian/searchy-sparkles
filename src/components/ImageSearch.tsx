import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "./ImageUploader";
import ImageCropper from "./ImageCropper";

const ImageSearch = ({ onClose }: { onClose: () => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSearch = () => {
    if (!image) {
      toast({
        title: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    onClose();
    navigate("/image-search", { state: { image } });
  };

  return (
    <DialogContent className="sm:max-w-[90vw] h-[90vh] bg-[#202124] text-white">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Search by image
        </DialogTitle>
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

      <div className="mt-4 flex h-full">
        <div className="w-full flex flex-col">
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
      </div>
    </DialogContent>
  );
};

export default ImageSearch;