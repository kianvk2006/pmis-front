export const initialSiteReport = {
  reportId: null,

  status: "draft",

  generalInfo: {
    projectId: "",

    reportDate: "",

    shift: "morning",

    sectionId: "",

    supervisorId: "",

    supervisor: "",

    weather: "",

    temperature: "",

    windSpeed: "",

    description: "",
  },

  progressItems: [],

  workforceItems: [],

  equipmentItems: [],

  materialConsumptions: [],

  materialRequests: [],

  delayItems: [],

  photoItems: [],

  meta: {
    createdAt: null,
    updatedAt: null,
    submittedAt: null,
  },
};
