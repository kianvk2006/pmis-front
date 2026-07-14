import { initialSiteReport } from "./initialSiteReport";

export const SITE_REPORT_ACTIONS = {
  UPDATE_GENERAL_INFO: "UPDATE_GENERAL_INFO",

  SET_PROGRESS_ITEMS: "SET_PROGRESS_ITEMS",
  SET_WORKFORCE_ITEMS: "SET_WORKFORCE_ITEMS",
  SET_EQUIPMENT_ITEMS: "SET_EQUIPMENT_ITEMS",

  SET_MATERIAL_CONSUMPTIONS: "SET_MATERIAL_CONSUMPTIONS",
  SET_MATERIAL_REQUESTS: "SET_MATERIAL_REQUESTS",

  SET_DELAY_ITEMS: "SET_DELAY_ITEMS",
  SET_PHOTO_ITEMS: "SET_PHOTO_ITEMS",

  SAVE_DRAFT: "SAVE_DRAFT",
  MARK_SUBMITTED: "MARK_SUBMITTED",

  LOAD_REPORT: "LOAD_REPORT",
  RESET_REPORT: "RESET_REPORT",
};

function createUpdatedMeta(state) {
  return {
    ...state.meta,
    updatedAt: new Date().toISOString(),
  };
}

export function siteReportReducer(state, action) {
  switch (action.type) {
    case SITE_REPORT_ACTIONS.UPDATE_GENERAL_INFO:
      return {
        ...state,

        generalInfo: {
          ...state.generalInfo,
          ...action.payload,
        },

        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_PROGRESS_ITEMS:
      return {
        ...state,
        progressItems: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_WORKFORCE_ITEMS:
      return {
        ...state,
        workforceItems: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_EQUIPMENT_ITEMS:
      return {
        ...state,
        equipmentItems: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_MATERIAL_CONSUMPTIONS:
      return {
        ...state,
        materialConsumptions: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_MATERIAL_REQUESTS:
      return {
        ...state,
        materialRequests: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_DELAY_ITEMS:
      return {
        ...state,
        delayItems: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SET_PHOTO_ITEMS:
      return {
        ...state,
        photoItems: action.payload,
        meta: createUpdatedMeta(state),
      };

    case SITE_REPORT_ACTIONS.SAVE_DRAFT: {
      const now = new Date().toISOString();

      return {
        ...state,

        status: "draft",

        meta: {
          ...state.meta,

          createdAt: state.meta.createdAt || now,

          updatedAt: now,
        },
      };
    }

    case SITE_REPORT_ACTIONS.MARK_SUBMITTED: {
      const now = new Date().toISOString();

      return {
        ...state,

        status: "submitted",

        meta: {
          ...state.meta,

          createdAt: state.meta.createdAt || now,

          updatedAt: now,

          submittedAt: now,
        },
      };
    }

    case SITE_REPORT_ACTIONS.LOAD_REPORT:
      return {
        ...initialSiteReport,

        ...action.payload,

        generalInfo: {
          ...initialSiteReport.generalInfo,
          ...action.payload.generalInfo,
        },

        meta: {
          ...initialSiteReport.meta,
          ...action.payload.meta,
        },

        progressItems: action.payload.progressItems ?? [],

        workforceItems: action.payload.workforceItems ?? [],

        equipmentItems: action.payload.equipmentItems ?? [],

        materialConsumptions: action.payload.materialConsumptions ?? [],

        materialRequests: action.payload.materialRequests ?? [],

        delayItems: action.payload.delayItems ?? [],

        photoItems: action.payload.photoItems ?? [],
      };

    case SITE_REPORT_ACTIONS.RESET_REPORT:
      return structuredClone(initialSiteReport);

    default:
      return state;
  }
}
