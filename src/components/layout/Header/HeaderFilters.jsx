export default function HeaderFilters() {
  return (
    <select
      className="
      h-11
      rounded-xl
      border
      border-slate-200
      bg-white
      px-4
      text-sm
      outline-none
      transition
      focus:border-orange-500
      "
      defaultValue="month"
    >
      <option value="today">امروز</option>
      <option value="week">این هفته</option>
      <option value="month">این ماه</option>
      <option value="year">امسال</option>
    </select>
  );
}