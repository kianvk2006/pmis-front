import Typography from "@/components/ui/Typography";

export default function Header() {
  return (
    <header className="h-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-bold text-white">
            P
          </div>

          <div>
            <Typography as="h3" variant="h4">
              PMIS
            </Typography>

            <Typography variant="small">
              Project Management
            </Typography>
          </div>
        </div>

        {/* Title */}

        <Typography
          as="h1"
          variant="h3"
          className="text-slate-800"
        >
          پروژه راه‌آهن سریع‌السیر
        </Typography>

      </div>
    </header>
  );
}