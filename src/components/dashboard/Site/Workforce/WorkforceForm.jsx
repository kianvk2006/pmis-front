import { Plus, Users } from "lucide-react";

import WorkforceRow from "./WorkforceRow";
import WorkforceSummary from "./WorkforceSummary";

import { useSiteReport } from "../store";

const createWorkforceItem = () => ({
  id: crypto.randomUUID(),

  workforceType: "",

  activityId: "",

  quantity: "",

  workHours: "",

  overtimeHours: "",

  absentCount: "",

  description: "",
});

export default function WorkforceForm() {
  const { report, setWorkforceItems } = useSiteReport();

  const items = report.workforceItems;

  const addItem = () => {
    setWorkforceItems([...items, createWorkforceItem()]);
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

    setWorkforceItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    setWorkforceItems(updatedItems);
  };

  const handleSave = () => {
    const payload = items
      .filter((item) => item.workforceType)
      .map((item) => ({
        ...item,

        quantity: Number(item.quantity) || 0,

        workHours: Number(item.workHours) || 0,

        overtimeHours: Number(item.overtimeHours) || 0,

        absentCount: Number(item.absentCount) || 0,
      }));

    /*
      فعلاً فقط برای تست است.

      بعداً در Submit نهایی، کل report
      برای Backend ارسال می‌شود.
    */

    console.log("WORKFORCE_ITEMS", payload);
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Users size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">ثبت نیروی انسانی</h2>

            <p className="mt-1 text-slate-500">
              ثبت تعداد، ساعت کارکرد و اضافه‌کاری نیروهای پروژه
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          <Plus size={18} />
          افزودن نیروی انسانی
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز نیروی انسانی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            برای ثبت اطلاعات نیروی انسانی یک ردیف جدید اضافه کنید.
          </p>

          <button
            type="button"
            onClick={addItem}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            افزودن اولین ردیف
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {items.map((item, index) => (
              <WorkforceRow
                key={item.id}
                item={item}
                index={index}
                onChange={updateItem}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6">
            <WorkforceSummary items={items} />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              ذخیره اطلاعات نیروی انسانی
            </button>
          </div>
        </>
      )}
    </section>
  );
}
