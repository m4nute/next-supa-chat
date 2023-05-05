export default function SearchBar({
  filterText,
  setFilterText,
}: {
  filterText: string;
  setFilterText: (text: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search (email)"
      value={filterText}
      className="ml-2 w-full rounded-lg bg-[#333333] px-2 py-1.5"
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
}
