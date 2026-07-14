import { AlertTriangle, Plus } from "lucide-react";

import DelayRow from "./DelayRow";
import DelaysSummary from "./DelaysSummary";

import { useSiteReport } from "../store";

const createDelayItem = () => ({
  id: crypto.randomUUID(),

  delayType: "",

  activityId: "",

  delayHours: "",

  severity: "medium",

  responsibility: "unknown",

  status: "open",

  reason: "",

  correctiveAction: "",
});

export default function DelaysForm() {
  const { report, setDelayItems } = useSiteReport();

  const items = report.delayItems;

  const addItem = () => {
    setDelayItems([...items, createDelayItem()]);
  };

  const updateItem = (index, field, value) => {
    const updatedItems = items.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [field]: value,
          }
        : item,
    );

    setDelayItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    setDelayItems(updatedItems);
  };

  const handleSave = () => {
    const payload = items
      .filter((item) => item.delayType)
      .map((item) => ({
        ...item,

        delayHours: Number(item.delayHours) || 0,
      }));

    console.log("DELAY_ITEMS", payload);
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">ثبت موانع و تأخیرات</h2>

            <p className="mt-1 text-slate-500">
              ثبت علت، مدت، مسئولیت و اقدام اصلاحی تأخیرهای پروژه
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          <Plus size={18} />
          افزودن تأخیر
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            تأخیر یا مانعی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            در صورت وقوع توقف، مانع اجرایی یا تأخیر، اطلاعات آن را ثبت کنید.
          </p>

          <button
            type="button"
            onClick={addItem}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            ثبت اولین تأخیر
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {items.map((item, index) => (
              <DelayRow
                key={item.id}
                item={item}
                index={index}
                onChange={updateItem}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6">
            <DelaysSummary items={items} />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              ذخیره اطلاعات تأخیرات
            </button>
          </div>
        </>
      )}
    </section>
  );
}
