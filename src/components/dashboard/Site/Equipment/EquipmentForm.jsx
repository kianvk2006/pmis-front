import { Construction, Plus } from "lucide-react";

import EquipmentRow from "./EquipmentRow";
import EquipmentSummary from "./EquipmentSummary";

import { useSiteReport } from "../store";

const createEquipmentItem = () => ({
  id: crypto.randomUUID(),

  equipmentId: "",
  activityId: "",

  workHours: "",
  stopHours: "",

  fuel: "",

  status: "active",

  failureType: "",

  description: "",
});

export default function EquipmentForm() {
  const { report, setEquipmentItems } = useSiteReport();

  const items = report.equipmentItems;

  const addItem = () => {
    setEquipmentItems([...items, createEquipmentItem()]);
  };

  const updateItem = (index, field, value) => {
    const updatedItems = items.map((item, itemIndex) => {
      if (itemIndex !== index) {
        return item;
      }

      const updatedItem = {
        ...item,
        [field]: value,
      };

      if (field === "status" && value !== "broken" && value !== "maintenance") {
        updatedItem.failureType = "";
      }

      return updatedItem;
    });

    setEquipmentItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    setEquipmentItems(updatedItems);
  };

  const handleSave = () => {
    const payload = items
      .filter((item) => item.equipmentId)
      .map((item) => ({
        ...item,

        workHours: Number(item.workHours) || 0,

        stopHours: Number(item.stopHours) || 0,

        fuel: Number(item.fuel) || 0,
      }));

    console.log("EQUIPMENT_ITEMS", payload);
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <Construction size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">ثبت ماشین‌آلات و تجهیزات</h2>

            <p className="mt-1 text-slate-500">
              ثبت کارکرد، توقف، سوخت و خرابی تجهیزات پروژه
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          <Plus size={18} />
          افزودن ماشین
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز ماشین‌آلاتی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            برای ثبت کارکرد تجهیزات، یک ماشین اضافه کنید.
          </p>

          <button
            type="button"
            onClick={addItem}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            افزودن اولین ماشین
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {items.map((item, index) => (
              <EquipmentRow
                key={item.id}
                item={item}
                index={index}
                onChange={updateItem}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6">
            <EquipmentSummary items={items} />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              ذخیره اطلاعات ماشین‌آلات
            </button>
          </div>
        </>
      )}
    </section>
  );
}
