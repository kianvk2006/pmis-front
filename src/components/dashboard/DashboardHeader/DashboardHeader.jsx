import SearchBox from "./SearchBox";
import NotificationButton from "./NotificationButton";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function DashboardHeader() {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white
        px-5
      "
    >
      <h1 className="text-2xl font-bold text-slate-800">
        داشبورد
      </h1>

      <div className="flex items-center gap-4">
        <SearchBox />

        <NotificationButton />

        <ThemeToggle />

        <UserMenu />
      </div>
    </header>
  );
}