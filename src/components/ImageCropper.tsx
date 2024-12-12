import { useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "./ui/button";

interface ImageCropperProps {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: (crop: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
  onClear: () => void;
  onSearch: () => void;
}

const ImageCropper = ({
  image,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  onClear,
  onSearch,
}: ImageCropperProps) => {
  return (
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
          onClick={onClear}
          className="bg-transparent text-white hover:bg-[#303134]"
        >
          Clear
        </Button>
        <Button
          onClick={onSearch}
          className="bg-[#8ab4f8] text-black hover:bg-[#aecbfa]"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default ImageCropper;