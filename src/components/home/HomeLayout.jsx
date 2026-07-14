import LeftSidebar from "./LeftSidebar";
import MainContent from "./MainContent";

export default function HomeLayout() {
  return (
    <main className="mx-auto max-w-[1600px] px-6 py-8">
      <div className="grid grid-cols-12 gap-6">
        
        {/* ستون اصلی */}
        <section className="col-span-8">
          <MainContent />
        </section>

        {/* سایدبار */}
        <aside className="col-span-4">
          <LeftSidebar />
        </aside>

      </div>
    </main>
  );
}