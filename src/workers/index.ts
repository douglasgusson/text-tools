import CsvToJsonWorker from "./csvToJson.worker?worker";

export enum WorkerType {
  csvToJson = "csvToJson",
}

export const getWorker = (type: WorkerType): Worker => {
  switch (type) {
    case WorkerType.csvToJson:
      return new CsvToJsonWorker();
    default:
      throw new Error("Worker não implementado");
  }
};
