import { ImagePlus, Upload } from "lucide-react";

export default function PhotoUploader({ onUpload, error }) {
  const handleFiles = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0) {
      onUpload(files);
    }

    event.target.value = "";
  };

  return (
    <div>
      <label
        className="
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-slate-200
          bg-slate-50
          px-6
          py-12
          text-center
          transition
          hover:border-orange-300
          hover:bg-orange-50/40
        "
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFiles}
          className="hidden"
        />

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
          <ImagePlus size={30} />
        </div>

        <p className="mt-4 font-bold text-slate-800">انتخاب تصاویر کارگاه</p>

        <p className="mt-2 max-w-lg text-sm leading-7 text-slate-500">
          تصاویر پیشرفت عملیات، وضعیت تجهیزات، مصالح، موانع اجرایی و سایر
          مستندات کارگاه را انتخاب کنید.
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white">
          <Upload size={18} />
          انتخاب تصویر
        </div>

        <p className="mt-4 text-xs text-slate-400">
          JPG، PNG یا WEBP — حداکثر حجم هر فایل ۱۰ مگابایت
        </p>
      </label>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}
