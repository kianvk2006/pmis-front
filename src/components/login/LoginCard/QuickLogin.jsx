import Button from "@/components/ui/Button";

export default function QuickLogin() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <Button className="bg-slate-700 hover:bg-slate-600">
        ورود کارفرما
      </Button>

      <Button className="bg-slate-700 hover:bg-slate-600">
        ورود کارگاه
      </Button>
    </div>
  );
}