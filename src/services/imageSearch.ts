import { useToast } from "@/hooks/use-toast";

const TINEYE_API_URL = "https://api.tineye.com/rest/search/";
const API_KEY = "your_tineye_api_key"; // This should be stored securely

export interface SearchResponse {
  results: {
    id: number;
    title: string;
    price: string;
    store: string;
    status: string;
    image: string;
  }[];
}

export const searchImage = async (imageData: string): Promise<SearchResponse> => {
  try {
    const formData = new FormData();
    // Convert base64 to blob
    const blob = await fetch(imageData).then((res) => res.blob());
    formData.append("image", blob);

    const response = await fetch(TINEYE_API_URL, {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to search image");
    }

    // For now, return mock data as we don't have the API key
    return {
      results: [
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
      ]
    };
  } catch (error) {
    console.error("Error searching image:", error);
    throw error;
  }
};