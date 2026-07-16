const activities = [
  {
    id: "ACT-001",
    wbsId: "WBS-001",

    code: "A-001",
    name: "عملیات خاکبرداری",

    type: "task",

    startDate: "2026-01-01",
    endDate: "2026-01-12",

    baselineStart: "2026-01-01",
    baselineEnd: "2026-01-10",

    progress: 100,

    predecessors: [],
    successors: ["ACT-002"],
  },

  {
    id: "ACT-002",
    wbsId: "WBS-001",

    code: "A-002",
    name: "اجرای فونداسیون",

    type: "task",

    startDate: "2026-01-13",
    endDate: "2026-01-28",

    baselineStart: "2026-01-12",
    baselineEnd: "2026-01-26",

    progress: 80,

    predecessors: ["ACT-001"],
    successors: ["ACT-003"],
  },

  {
    id: "ACT-003",
    wbsId: "WBS-001",

    code: "A-003",
    name: "اجرای ستون‌ها",

    type: "task",

    startDate: "2026-01-29",
    endDate: "2026-02-18",

    baselineStart: "2026-01-27",
    baselineEnd: "2026-02-15",

    progress: 55,

    predecessors: ["ACT-002"],
    successors: ["ACT-004"],
  },

  {
    id: "ACT-004",
    wbsId: "WBS-002",

    code: "A-004",
    name: "اجرای سقف",

    type: "task",

    startDate: "2026-02-19",
    endDate: "2026-03-08",

    baselineStart: "2026-02-16",
    baselineEnd: "2026-03-05",

    progress: 40,

    predecessors: ["ACT-003"],
    successors: ["ACT-005"],
  },

  {
    id: "ACT-005",
    wbsId: "WBS-002",

    code: "A-005",
    name: "دیوارچینی",

    type: "task",

    startDate: "2026-03-09",
    endDate: "2026-03-25",

    baselineStart: "2026-03-06",
    baselineEnd: "2026-03-22",

    progress: 25,

    predecessors: ["ACT-004"],
    successors: ["ACT-006"],
  },

  {
    id: "ACT-006",
    wbsId: "WBS-003",

    code: "A-006",
    name: "تأسیسات مکانیکی",

    type: "task",

    startDate: "2026-03-26",
    endDate: "2026-04-08",

    baselineStart: "2026-03-24",
    baselineEnd: "2026-04-05",

    progress: 10,

    predecessors: ["ACT-005"],
    successors: ["ACT-007"],
  },

  {
    id: "ACT-007",
    wbsId: "WBS-003",

    code: "A-007",
    name: "تأسیسات برقی",

    type: "task",

    startDate: "2026-04-09",
    endDate: "2026-04-22",

    baselineStart: "2026-04-06",
    baselineEnd: "2026-04-20",

    progress: 0,

    predecessors: ["ACT-006"],
    successors: ["ACT-008"],
  },

  {
    id: "ACT-008",
    wbsId: "WBS-004",

    code: "A-008",
    name: "نازک‌کاری",

    type: "task",

    startDate: "2026-04-23",
    endDate: "2026-05-10",

    baselineStart: "2026-04-21",
    baselineEnd: "2026-05-08",

    progress: 0,

    predecessors: ["ACT-007"],
    successors: ["ACT-009"],
  },

  {
    id: "ACT-009",
    wbsId: "WBS-004",

    code: "A-009",
    name: "آزمون و راه‌اندازی",

    type: "task",

    startDate: "2026-05-11",
    endDate: "2026-05-18",

    baselineStart: "2026-05-09",
    baselineEnd: "2026-05-16",

    progress: 0,

    predecessors: ["ACT-008"],
    successors: ["ACT-010"],
  },

  {
    id: "ACT-010",
    wbsId: "WBS-004",

    code: "M-001",
    name: "تحویل موقت پروژه",

    type: "milestone",

    startDate: "2026-05-19",
    endDate: "2026-05-19",

    baselineStart: "2026-05-18",
    baselineEnd: "2026-05-18",

    progress: 0,

    predecessors: ["ACT-009"],
    successors: [],
  },
];

export function getGanttActivities() {
  return structuredClone(activities);
}
