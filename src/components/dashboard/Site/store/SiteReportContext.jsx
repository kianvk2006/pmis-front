import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const SiteReportContext = createContext(null);

const createInitialReport = () => ({
  reportId: null,

  status: "draft",

  generalInfo: {
    projectId: "",
    reportDate: "",
    shift: "day",
    weather: "",
    temperature: "",
    supervisor: "",
    description: "",
  },

  progressItems: [],

  workforceItems: [],

  equipmentItems: [],

  materialConsumptions: [],

  materialRequests: [],

  delayItems: [],

  photoItems: [],

  selectedProgressActivityId: null,

  meta: {
    createdAt: null,
    updatedAt: null,
    submittedAt: null,
  },
});

function revokePhotoPreviewUrls(photoItems) {
  if (!Array.isArray(photoItems)) {
    return;
  }

  photoItems.forEach((photo) => {
    if (photo?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(photo.previewUrl);
    }
  });
}

function normalizeLoadedReport(loadedReport) {
  return {
    reportId: loadedReport?.reportId ?? loadedReport?.id ?? null,

    status: loadedReport?.status ?? "draft",

    generalInfo: {
      ...createInitialReport().generalInfo,
      ...(loadedReport?.generalInfo ?? {}),
    },

    progressItems: Array.isArray(loadedReport?.progressItems)
      ? loadedReport.progressItems
      : [],

    workforceItems: Array.isArray(loadedReport?.workforceItems)
      ? loadedReport.workforceItems
      : [],

    equipmentItems: Array.isArray(loadedReport?.equipmentItems)
      ? loadedReport.equipmentItems
      : [],

    materialConsumptions: Array.isArray(loadedReport?.materialConsumptions)
      ? loadedReport.materialConsumptions
      : [],

    materialRequests: Array.isArray(loadedReport?.materialRequests)
      ? loadedReport.materialRequests
      : [],

    delayItems: Array.isArray(loadedReport?.delayItems)
      ? loadedReport.delayItems
      : [],

    /*
      Repository فعلی photos ذخیره می‌کند،
      ولی Store از photoItems استفاده می‌کند.
    */

    photoItems: Array.isArray(loadedReport?.photoItems)
      ? loadedReport.photoItems
      : Array.isArray(loadedReport?.photos)
        ? loadedReport.photos
        : [],

    selectedProgressActivityId: null,

    meta: {
      createdAt:
        loadedReport?.meta?.createdAt ?? loadedReport?.createdAt ?? null,

      updatedAt:
        loadedReport?.meta?.updatedAt ?? loadedReport?.updatedAt ?? null,

      submittedAt:
        loadedReport?.meta?.submittedAt ?? loadedReport?.submittedAt ?? null,
    },
  };
}

export function SiteReportProvider({ children }) {
  const [report, setReport] = useState(createInitialReport);

  const setGeneralInfo = useCallback((generalInfo) => {
    setReport((currentReport) => ({
      ...currentReport,

      generalInfo:
        typeof generalInfo === "function"
          ? generalInfo(currentReport.generalInfo)
          : generalInfo,
    }));
  }, []);

  const updateGeneralInfo = useCallback((field, value) => {
    setReport((currentReport) => ({
      ...currentReport,

      generalInfo: {
        ...currentReport.generalInfo,
        [field]: value,
      },

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setProgressItems = useCallback((progressItems) => {
    setReport((currentReport) => ({
      ...currentReport,

      progressItems:
        typeof progressItems === "function"
          ? progressItems(currentReport.progressItems)
          : progressItems,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setWorkforceItems = useCallback((workforceItems) => {
    setReport((currentReport) => ({
      ...currentReport,

      workforceItems:
        typeof workforceItems === "function"
          ? workforceItems(currentReport.workforceItems)
          : workforceItems,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setEquipmentItems = useCallback((equipmentItems) => {
    setReport((currentReport) => ({
      ...currentReport,

      equipmentItems:
        typeof equipmentItems === "function"
          ? equipmentItems(currentReport.equipmentItems)
          : equipmentItems,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setMaterialConsumptions = useCallback((materialConsumptions) => {
    setReport((currentReport) => ({
      ...currentReport,

      materialConsumptions:
        typeof materialConsumptions === "function"
          ? materialConsumptions(currentReport.materialConsumptions)
          : materialConsumptions,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setMaterialRequests = useCallback((materialRequests) => {
    setReport((currentReport) => ({
      ...currentReport,

      materialRequests:
        typeof materialRequests === "function"
          ? materialRequests(currentReport.materialRequests)
          : materialRequests,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setDelayItems = useCallback((delayItems) => {
    setReport((currentReport) => ({
      ...currentReport,

      delayItems:
        typeof delayItems === "function"
          ? delayItems(currentReport.delayItems)
          : delayItems,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setPhotoItems = useCallback((photoItems) => {
    setReport((currentReport) => ({
      ...currentReport,

      photoItems:
        typeof photoItems === "function"
          ? photoItems(currentReport.photoItems)
          : photoItems,

      meta: {
        ...currentReport.meta,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, []);

  const setSelectedProgressActivityId = useCallback((activityId) => {
    setReport((currentReport) => ({
      ...currentReport,

      selectedProgressActivityId: activityId,
    }));
  }, []);

  /*
    گزارش Repository را داخل فرم‌ها
    برای ویرایش Load می‌کند.
  */

  const loadReport = useCallback((loadedReport) => {
    setReport((currentReport) => {
      revokePhotoPreviewUrls(currentReport.photoItems);

      return normalizeLoadedReport(loadedReport);
    });
  }, []);

  /*
    خروج از حالت ویرایش و ساخت گزارش جدید
  */

  const resetReport = useCallback(() => {
    setReport((currentReport) => {
      revokePhotoPreviewUrls(currentReport.photoItems);

      return createInitialReport();
    });
  }, []);

  const isEditing = Boolean(report.reportId);

  const value = useMemo(
    () => ({
      report,

      setReport,

      setGeneralInfo,
      updateGeneralInfo,

      setProgressItems,

      setWorkforceItems,

      setEquipmentItems,

      setMaterialConsumptions,

      setMaterialRequests,

      setDelayItems,

      setPhotoItems,

      setSelectedProgressActivityId,

      loadReport,

      resetReport,

      isEditing,
    }),
    [
      report,

      setGeneralInfo,
      updateGeneralInfo,

      setProgressItems,

      setWorkforceItems,

      setEquipmentItems,

      setMaterialConsumptions,

      setMaterialRequests,

      setDelayItems,

      setPhotoItems,

      setSelectedProgressActivityId,

      loadReport,

      resetReport,

      isEditing,
    ],
  );

  return (
    <SiteReportContext.Provider value={value}>
      {children}
    </SiteReportContext.Provider>
  );
}

export function useSiteReport() {
  const context = useContext(SiteReportContext);

  if (!context) {
    throw new Error("useSiteReport must be used inside SiteReportProvider");
  }

  return context;
}
