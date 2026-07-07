interface Props {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder=" Search child by name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border border-black-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;