import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { X, Search, ArrowLeft } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock search results for demonstration
const mockResults = [
  {
    id: 1,
    title: "Uniqlo Fleece Full-Zip Jacket",
    price: "₹2,490.00",
    store: "UNIQLO US",
    status: "In stock",
    image: "/lovable-uploads/10bf876f-1bb0-4649-8093-af3658a9f388.png"
  },
  {
    id: 2,
    title: "THERMOLITE Relaxed Fit Teddy jacket",
    price: "₹2,249.00",
    store: "H&M",
    status: "Out of stock",
    image: "/lovable-uploads/10bf876f-1bb0-4649-8093-af3658a9f388.png"
  },
  {
    id: 3,
    title: "YOUSTA Men Regular Fit Zip-Front Jacket",
    price: "₹799.00",
    store: "Ajio.com",
    status: "In stock",
    image: "/lovable-uploads/10bf876f-1bb0-4649-8093-af3658a9f388.png"
  }
];

const ImageSearch = ({ onClose }: { onClose: () => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [showResults, setShowResults] = useState(false);
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
    setShowResults(true);
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
            <div className="relative flex-1">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
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
          )}
        </div>

        {showResults && (
          <div className="w-1/2 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Related searches</h3>
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#303134] transition-colors"
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{result.title}</h4>
                    <p className="text-[#8ab4f8] text-lg font-semibold">
                      {result.price}
                    </p>
                    <p className="text-sm text-[#9aa0a6]">{result.store}</p>
                    <p className={`text-sm ${
                      result.status === "In stock" ? "text-green-500" : "text-red-500"
                    }`}>
                      {result.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default ImageSearch;