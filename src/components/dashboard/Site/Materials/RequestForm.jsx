import { ShoppingCart, Plus } from "lucide-react";

import RequestRow from "./RequestRow";

export default function RequestForm({ items = [], onAdd, onChange, onRemove }) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-orange-600" />

            <h3 className="text-lg font-bold text-slate-800">
              ثبت درخواست تأمین مصالح
            </h3>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            مصالح موردنیاز پروژه را برای تأمین و تحویل ثبت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
        >
          <Plus size={18} />
          افزودن درخواست
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <p className="font-bold text-slate-700">
            هنوز درخواست مصالحی ثبت نشده است
          </p>

          <p className="mt-2 text-sm text-slate-500">
            برای ثبت درخواست تأمین مصالح، یک درخواست جدید اضافه کنید.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-5 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            ثبت اولین درخواست
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <RequestRow
              key={item.id}
              item={item}
              index={index}
              onChange={onChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
