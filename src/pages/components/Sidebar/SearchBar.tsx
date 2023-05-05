export default function SearchBar({
  filterText,
  setFilterText,
}: {
  filterText: string;
  setFilterText: (text: string) => void;
}) {
  return (
    <div className="my-3 flex">
      <input
        type="text"
        placeholder="Search (username)"
        value={filterText}
        className="ml-2 w-full rounded-lg bg-[#333333] px-2 py-1.5"
        onChange={(e) => setFilterText(e.target.value)}
      />
      <button className="mx-2 bg-[#1c1c1c] text-2xl transition-all hover:text-green-200">
        +
      </button>
    </div>
  );
}
