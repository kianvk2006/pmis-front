import Checkbox from "@/components/ui/Checkbox";

export default function LoginActions() {
  return (
    <div className="my-6 flex items-center justify-between">
      <label className="flex items-center gap-3 text-sm text-slate-300">
        <Checkbox />

        مرا به خاطر بسپار
      </label>

      <button
        type="button"
        className="text-sm text-orange-400 hover:text-orange-300"
      >
        فراموشی رمز عبور
      </button>
    </div>
  );
}