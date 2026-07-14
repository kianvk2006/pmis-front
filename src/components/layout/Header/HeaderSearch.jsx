import { Search } from "lucide-react";

export default function HeaderSearch() {
  return (
    <div className="relative w-[380px]">

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
        rounded-xl
        border
        border-slate-200
        bg-white
        pr-11
        pl-4
        outline-none
        focus:border-orange-500
        "
      />

    </div>
  );
}