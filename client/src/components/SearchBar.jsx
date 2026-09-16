import { Search, MapPin } from "lucide-react";

export default function SearchBar({ search, setSearch, location, setLocation }) {
  return (
    <div className="mx-auto mt-8 grid max-w-4xl gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-indigo-50/50 md:grid-cols-[1fr_1fr_auto] md:items-center md:divide-x md:divide-gray-100 md:p-2">

      {/* Search Input Field */}
      <div className="flex items-center gap-3 px-3 py-2 md:py-1">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Search size={18} />
        </div>

        <input
          type="text"
          placeholder="Job role, skill, or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Location Input Field */}
      <div className="flex items-center gap-3 px-3 py-2 md:py-1 md:pl-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <MapPin size={18} />
        </div>

        <input
          type="text"
          placeholder="City or location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Search Action Button */}
      <div className="md:pl-2">
        <button 
          type="button"
          className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow md:py-3.5"
        >
          Search
        </button>
      </div>

    </div>
  );
}