import { useState } from "react";

import { CheckCircle2, ClipboardCheck, Send } from "lucide-react";

import { useSiteReport } from "../store";

import { validateSiteReport } from "./reportValidation";
import { buildReportPayload } from "./buildReportPayload";

import ValidationErrors from "./ValidationErrors";

import { submitSiteReport } from "@/data/repositories/projectRepository";

export default function SubmitReport() {
  const { report, loadReport, isEditing } = useSiteReport();

  const [errors, setErrors] = useState([]);

  const [isValidated, setIsValidated] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submittedReport, setSubmittedReport] = useState(null);

  const [submitOperation, setSubmitOperation] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const handleValidate = () => {
    setSuccessMessage("");

    const validationErrors = validateSiteReport(report);

    setErrors(validationErrors);

    const isValid = validationErrors.length === 0;

    setIsValidated(isValid);

    if (isValid) {
      setSuccessMessage(
        isEditing
          ? "تغییرات گزارش بررسی شد و آماده بروزرسانی است."
          : "گزارش با موفقیت بررسی شد و آماده ارسال است.",
      );
    }
  };

  const handleSubmit = async () => {
    setSuccessMessage("");

    const validationErrors = validateSiteReport(report);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      setIsValidated(false);

      return;
    }

    setErrors([]);

    setIsSubmitting(true);

    try {
      const payload = buildReportPayload(report);

      const result = submitSiteReport(payload);

      /*
        مهم:

        Repository Report دارای id است.

        loadReport آن را Normalize می‌کند
        و id را داخل reportId قرار می‌دهد.

        بنابراین Store بعد از اولین Submit
        وارد حالت Edit می‌شود.
      */

      loadReport(result.report);

      setSubmittedReport(result.report);

      setSubmitOperation(result.operation);

      setIsValidated(false);

      setSuccessMessage(
        result.operation === "created"
          ? "گزارش جدید با موفقیت ثبت شد."
          : "گزارش قبلی با موفقیت بروزرسانی شد.",
      );

      console.log("SUBMIT_SITE_REPORT_RESULT", result);
    } catch (error) {
      console.error("SUBMIT_SITE_REPORT_ERROR", error);

      if (error?.message === "EDIT_SITE_REPORT_NOT_FOUND") {
        setErrors(["گزارشی که قصد ویرایش آن را دارید در Data Layer پیدا نشد."]);
      } else {
        setErrors(["در ثبت گزارش کارگاه خطایی رخ داده است."]);
      }

      setIsValidated(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
            <ClipboardCheck size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isEditing ? "بررسی و بروزرسانی گزارش" : "بررسی و ارسال گزارش"}
            </h2>

            <p className="mt-1 text-slate-500">
              {isEditing
                ? "پس از اعمال تغییرات، گزارش را بررسی و بروزرسانی کنید."
                : "پیش از ارسال نهایی، اطلاعات گزارش را بررسی کنید."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isEditing && (
            <div className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600">
              حالت ویرایش
            </div>
          )}

          {isValidated && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-600">
              <CheckCircle2 size={18} />

              {isEditing ? "آماده بروزرسانی" : "آماده ارسال"}
            </div>
          )}

          {submittedReport && (
            <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-600">
              <CheckCircle2 size={18} />

              {submitOperation === "updated"
                ? "بروزرسانی‌شده در Data Layer"
                : "ثبت‌شده در Data Layer"}
            </div>
          )}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="mt-7">
          <ValidationErrors errors={errors} onClose={() => setErrors([])} />
        </div>
      )}

      {successMessage && (
        <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}

      {submittedReport && (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">شناسه گزارش</p>

          <p className="mt-2 break-all font-bold text-slate-800">
            {submittedReport.id}
          </p>

          <p className="mt-3 text-xs text-slate-400">
            آخرین زمان ثبت:{" "}
            {submittedReport.updatedAt ?? submittedReport.submittedAt}
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleValidate}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isEditing ? "بررسی تغییرات" : "بررسی گزارش"}
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValidated || isSubmitting}
          className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Send size={18} />

          {isSubmitting
            ? isEditing
              ? "در حال بروزرسانی..."
              : "در حال ثبت گزارش..."
            : isEditing
              ? "بروزرسانی گزارش"
              : "ارسال نهایی گزارش"}
        </button>
      </div>
    </section>
  );
}
