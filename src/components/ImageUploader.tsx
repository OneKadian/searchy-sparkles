import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageSelect: (image: string) => void;
  image: string | null;
}

const ImageUploader = ({ onImageSelect, image }: ImageUploaderProps) => {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  return (
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
  );
};

export default ImageUploader;