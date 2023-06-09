export default function SearchBar({ filterText, setFilterText }: { filterText: string; setFilterText: (text: string) => void }) {
  return <input type="text" placeholder="Search (email)" value={filterText} className="ml-2 w-full rounded-lg bg-rootBg h-[2.9rem] pl-4 pr-2 py-1.5" onChange={(e) => setFilterText(e.target.value)} />
}
