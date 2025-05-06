import CsvToJsonWorker from "./csvToJson.worker?worker";
import PrettifyJsonWorker from "./prettifyJson.worker?worker";

export enum WorkerType {
  csvToJson = "csvToJson",
  prettifyJson = "prettifyJson",
}

export const workersLabels: Record<WorkerType, string> = {
  csvToJson: "CSV → JSON",
  prettifyJson: "Prettify JSON",
};

export const getWorker = (type: WorkerType): Worker => {
  switch (type) {
    case WorkerType.csvToJson:
      return new CsvToJsonWorker();
    case WorkerType.prettifyJson:
      return new PrettifyJsonWorker();
    default:
      throw new Error("Worker não implementado");
  }
};
