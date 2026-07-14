import {
  getEVMBaseline,
  getActualCostRecords,
  getProgressRecords,
} from "@/data/repositories/projectRepository";

import { calculateEVM, calculateEVMHistory } from "./evmCalculator";

const DEFAULT_PROJECT_ID = "PROJECT-001";

function getEVMSourceData(projectId) {
  return {
    baseline: getEVMBaseline(projectId),

    progressRecords: getProgressRecords(projectId),

    actualCostRecords: getActualCostRecords(projectId),
  };
}

export function getEVMData({
  projectId = DEFAULT_PROJECT_ID,
  dataDate = new Date().toISOString(),
} = {}) {
  const sourceData = getEVMSourceData(projectId);

  return calculateEVM({
    ...sourceData,
    dataDate,
  });
}

export function getEVMHistory({
  projectId = DEFAULT_PROJECT_ID,
  dataDate = new Date().toISOString(),
} = {}) {
  const sourceData = getEVMSourceData(projectId);

  return calculateEVMHistory({
    ...sourceData,
    dataDate,
  });
}
