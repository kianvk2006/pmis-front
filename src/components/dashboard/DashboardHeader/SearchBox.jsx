import { Search } from "lucide-react";

export default function SearchBox() {
  return (
    <div className="relative w-80">
      <Search
        size={18}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="جستجو..."
        className="
          h-11
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          pr-9
          pl-4
          text-sm
          outline-none
          transition-all
          focus:border-orange-500
          focus:bg-white
        "
      />
    </div>
  );
}