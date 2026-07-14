import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import HeaderFilters from "./HeaderFilters";

export default function Header() {
  return (
    <header
      className="
      mb-8
      flex
      items-center
      justify-between
      gap-8
      "
    >
      {/* عنوان صفحه */}
      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          داشبورد
        </h1>

        <p className="mt-2 text-slate-500">
          سامانه مدیریت پروژه قطار برقی گلبهار مشهد
        </p>

      </div>

      {/* ابزارها */}
      <div className="flex items-center gap-5">

        <HeaderFilters />

        <HeaderSearch />

        <HeaderActions />

      </div>

    </header>
  );
}