import { useCallback, useEffect, useMemo, useState } from "react";

import { Banknote, Plus, Save, Trash2 } from "lucide-react";

import {
  deleteActualCostRecord,
  getActualCostRecords,
  saveActualCostRecord,
} from "@/data/repositories/projectRepository";

const PROJECT_ID = "PROJECT-001";

const COST_CATEGORIES = [
  {
    value: "workforce",
    label: "نیروی انسانی",
  },
  {
    value: "equipment",
    label: "تجهیزات",
  },
  {
    value: "materials",
    label: "مصالح",
  },
  {
    value: "subcontractor",
    label: "پیمانکار جزء",
  },
  {
    value: "transportation",
    label: "حمل‌ونقل",
  },
  {
    value: "other",
    label: "سایر",
  },
];

function createId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
}

function createCostItem() {
  return {
    id: createId(),

    category: "workforce",

    amount: "",

    reportDate: "",

    description: "",
  };
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

export default function ActualCostForm() {
  const [items, setItems] = useState([]);

  const [message, setMessage] = useState("");

  const loadRecords = useCallback(() => {
    try {
      const records = getActualCostRecords(PROJECT_ID);

      setItems(
        normalizeArray(records).map((item) => ({
          ...item,

          amount:
            item?.amount === undefined || item?.amount === null
              ? ""
              : String(item.amount),
        })),
      );
    } catch (error) {
      console.error("LOAD_ACTUAL_COST_RECORDS_ERROR", error);

      setItems([]);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const addItem = () => {
    setItems((currentItems) => [...currentItems, createCostItem()]);

    setMessage("");
  };

  const updateItem = (index, field, value) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );

    setMessage("");
  };

  const removeItem = (index) => {
    const targetItem = items[index];

    try {
      if (targetItem?.createdAt) {
        deleteActualCostRecord(targetItem.id);
      }

      setItems((currentItems) =>
        currentItems.filter((_, itemIndex) => itemIndex !== index),
      );

      setMessage("");
    } catch (error) {
      console.error("DELETE_ACTUAL_COST_RECORD_ERROR", error);

      setMessage("در حذف رکورد هزینه خطایی رخ داد.");
    }
  };

  const totalAmount = useMemo(() => {
    return items.reduce(
      (total, item) => total + normalizeNumber(item?.amount),
      0,
    );
  }, [items]);

  const handleSave = () => {
    try {
      const validItems = items.filter(
        (item) =>
          item?.category &&
          item?.reportDate &&
          normalizeNumber(item?.amount) > 0,
      );

      if (validItems.length === 0) {
        setMessage("حداقل یک رکورد هزینه معتبر وارد کنید.");

        return;
      }

      validItems.forEach((item) => {
        saveActualCostRecord({
          ...item,

          projectId: PROJECT_ID,

          amount: normalizeNumber(item.amount),
        });
      });

      loadRecords();

      setMessage("هزینه‌های واقعی پروژه با موفقیت ذخیره شدند.");
    } catch (error) {
      console.error("SAVE_ACTUAL_COST_RECORDS_ERROR", error);

      setMessage("در ذخیره هزینه‌های واقعی خطایی رخ داد.");
    }
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <Banknote size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              ثبت هزینه واقعی پروژه
            </h2>

            <p className="mt-1 text-slate-500">
              ثبت هزینه‌های واقعی برای محاسبه AC و شاخص‌های هزینه EVM
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          <Plus size={18} />
          افزودن هزینه
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز هزینه واقعی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            برای فعال شدن AC و شاخص‌های هزینه EVM، اولین رکورد هزینه را ثبت
            کنید.
          </p>

          <button
            type="button"
            onClick={addItem}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            ثبت اولین هزینه
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 p-5 lg:grid-cols-12"
            >
              <select
                value={item.category}
                onChange={(event) =>
                  updateItem(index, "category", event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-400 lg:col-span-2"
              >
                {COST_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                value={item.amount}
                onChange={(event) =>
                  updateItem(index, "amount", event.target.value)
                }
                placeholder="مبلغ هزینه"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 lg:col-span-3"
              />

              <input
                type="date"
                value={item.reportDate}
                onChange={(event) =>
                  updateItem(index, "reportDate", event.target.value)
                }
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 lg:col-span-2"
              />

              <input
                value={item.description}
                onChange={(event) =>
                  updateItem(index, "description", event.target.value)
                }
                placeholder="شرح هزینه"
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 lg:col-span-4"
              />

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="flex items-center justify-center rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100 lg:col-span-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-sm text-slate-500">
              مجموع هزینه‌های ثبت‌شده:
            </span>

            <strong className="mr-2 text-xl text-slate-900">
              {totalAmount.toLocaleString("fa-IR")}
            </strong>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Save size={18} />
            ذخیره هزینه‌ها
          </button>
        </div>
      )}

      {message && (
        <div className="mt-5 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
          {message}
        </div>
      )}
    </section>
  );
}
