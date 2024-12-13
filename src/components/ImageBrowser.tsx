import { Loader } from "lucide-react";

interface ImageBrowserProps {
  isLoading?: boolean;
}

const ImageBrowser = ({ isLoading = true }: ImageBrowserProps) => {
  return (
    <div className="h-full bg-[#303134] rounded-lg p-6">
      {isLoading ? (
        <div className="h-full flex flex-col items-center justify-center text-[#e8eaed]">
          <div className="relative">
            <Loader className="w-8 h-8 animate-spin text-[#8ab4f8]" />
          </div>
          <p className="mt-4 text-sm">Results are loadin'</p>
        </div>
      ) : (
        <div className="h-full">
          {/* Results will be displayed here */}
        </div>
      )}
    </div>
  );
};

export default ImageBrowser;