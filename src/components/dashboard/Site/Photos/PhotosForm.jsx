import { useState } from "react";

import { Camera, Images } from "lucide-react";

import PhotoUploader from "./PhotoUploader";
import PhotoCard from "./PhotoCard";
import PhotosSummary from "./PhotosSummary";

import { useSiteReport } from "../store";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function PhotosForm() {
  const [error, setError] = useState("");

  const { report, setPhotoItems } = useSiteReport();

  const items = report.photoItems;

  const addPhotos = (files) => {
    setError("");

    const invalidFiles = files.filter(
      (file) =>
        !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE,
    );

    if (invalidFiles.length > 0) {
      setError(
        "برخی تصاویر فرمت معتبر ندارند یا حجم آن‌ها بیشتر از ۱۰ مگابایت است.",
      );
    }

    const validFiles = files.filter(
      (file) =>
        ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE,
    );

    if (validFiles.length === 0) {
      return;
    }

    const newItems = validFiles.map((file) => ({
      id: crypto.randomUUID(),

      file,

      previewUrl: URL.createObjectURL(file),

      fileName: file.name,

      fileSize: file.size,

      mimeType: file.type,

      title: "",

      description: "",

      activityId: "",

      km: "",

      capturedAt: new Date().toISOString(),

      uploadStatus: "pending",

      uploadedFileId: null,
    }));

    setPhotoItems([...items, ...newItems]);
  };

  const updatePhoto = (index, field, value) => {
    const updatedItems = items.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            [field]: value,
          }
        : item,
    );

    setPhotoItems(updatedItems);
  };

  const removePhoto = (index) => {
    const targetPhoto = items[index];

    if (targetPhoto?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(targetPhoto.previewUrl);
    }

    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    setPhotoItems(updatedItems);
  };

  const handleSave = () => {
    const metadata = items.map((item) => ({
      clientId: item.id,

      fileName: item.fileName,

      fileSize: item.fileSize,

      mimeType: item.mimeType,

      title: item.title,

      description: item.description,

      activityId: item.activityId || null,

      km: item.km || null,

      capturedAt: item.capturedAt,

      uploadStatus: item.uploadStatus,

      uploadedFileId: item.uploadedFileId,
    }));

    console.log("PHOTO_METADATA", metadata);
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <Camera size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">تصاویر و مستندات کارگاه</h2>

            <p className="mt-1 text-slate-500">
              ثبت تصاویر پیشرفت عملیات و مستندات تصویری گزارش روزانه
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
            <Images size={18} />
            {items.length} تصویر
          </div>
        )}
      </div>

      <PhotoUploader onUpload={addPhotos} error={error} />

      {items.length > 0 && (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {items.map((item, index) => (
              <PhotoCard
                key={item.id}
                item={item}
                index={index}
                onChange={updatePhoto}
                onRemove={removePhoto}
              />
            ))}
          </div>

          <div className="mt-6">
            <PhotosSummary items={items} />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              ذخیره اطلاعات تصاویر
            </button>
          </div>
        </>
      )}
    </section>
  );
}
