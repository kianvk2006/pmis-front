export default function Description({ generalInfo, onChange }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-800">
          توضیحات عمومی روزانه
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          رویدادهای مهم، وضعیت عمومی کارگاه و توضیحات تکمیلی را ثبت کنید.
        </p>
      </div>

      <textarea
        rows={5}
        value={generalInfo.description ?? ""}
        onChange={(event) => onChange("description", event.target.value)}
        placeholder="توضیحات عمومی گزارش روزانه..."
        className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 leading-7 outline-none transition focus:border-orange-500"
      />
    </div>
  );
}
