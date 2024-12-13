import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import { X } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const ImageSearch = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

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
    navigate("/images", { state: { image } });
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[600px] bg-[#202124] text-white">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold">
          Search by image
        </DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogHeader>

      <div className="mt-4">
        {!image ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-[#5f6368] rounded-lg p-8 text-center cursor-pointer
              ${isDragActive ? "border-[#8ab4f8] bg-[#303134]" : ""}`}
          >
            <input {...getInputProps()} />
            <p className="text-[#9aa0a6]">
              {isDragActive
                ? "Drop the image here"
                : "Drag and drop an image here, or click to select"}
            </p>
          </div>
        ) : (
          <div className="relative h-[400px]">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}

        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setImage(null)}
            className="bg-transparent text-white hover:bg-[#303134]"
          >
            Clear
          </Button>
          <Button
            onClick={handleSearch}
            className="bg-[#8ab4f8] text-black hover:bg-[#aecbfa]"
          >
            Search
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default ImageSearch;