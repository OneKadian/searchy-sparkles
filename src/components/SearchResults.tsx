interface SearchResult {
  id: number;
  title: string;
  price: string;
  store: string;
  status: string;
  image: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Related searches</h3>
      {results.map((result) => (
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
            <p
              className={`text-sm ${
                result.status === "In stock"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {result.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;