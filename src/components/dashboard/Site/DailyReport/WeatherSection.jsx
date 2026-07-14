import { CloudSun, Thermometer } from "lucide-react";

const weatherOptions = [
  {
    value: "",
    label: "انتخاب وضعیت هوا",
  },
  {
    value: "sunny",
    label: "آفتابی",
  },
  {
    value: "cloudy",
    label: "ابری",
  },
  {
    value: "rainy",
    label: "بارانی",
  },
  {
    value: "snowy",
    label: "برفی",
  },
  {
    value: "windy",
    label: "وزش باد شدید",
  },
  {
    value: "dusty",
    label: "گرد و غبار",
  },
];

export default function WeatherSection({ generalInfo, onChange }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-800">شرایط جوی</h3>

        <p className="mt-1 text-sm text-slate-500">
          وضعیت آب‌وهوا و دمای محل پروژه را ثبت کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            وضعیت هوا
          </label>

          <div className="relative">
            <select
              value={generalInfo.weather ?? ""}
              onChange={(event) => onChange("weather", event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white p-3 pr-11 outline-none transition focus:border-orange-500"
            >
              {weatherOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <CloudSun
              size={19}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            دمای هوا
          </label>

          <div className="relative">
            <input
              type="number"
              value={generalInfo.temperature ?? ""}
              onChange={(event) => onChange("temperature", event.target.value)}
              placeholder="مثلاً ۲۵"
              className="w-full rounded-xl border border-slate-200 bg-white p-3 pr-11 pl-14 outline-none transition focus:border-orange-500"
            />

            <Thermometer
              size={19}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              °C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
