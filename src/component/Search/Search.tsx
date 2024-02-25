import React from "react";

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-input-container">
      <input
        className="text-l p-2 px-8 rounded-md"
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}></button>
    </div>
  );
};

export default Search;
