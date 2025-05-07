import CsvToJsonWorker from "./csvToJson.worker?worker";
import PrettifyJsonWorker from "./prettifyJson.worker?worker";

export const workers = {
  csvToJson: "CSV → JSON",
  prettifyJson: "Prettify JSON",
};

export type WorkerType = keyof typeof workers;

type WorkerConstructor = new (options?: { name?: string }) => Worker;

const workersMap: Record<WorkerType, WorkerConstructor> = {
  csvToJson: CsvToJsonWorker,
  prettifyJson: PrettifyJsonWorker,
};

export const getWorker = (type: WorkerType): Worker => {
  const constructor = workersMap[type];
  return new constructor();
};
