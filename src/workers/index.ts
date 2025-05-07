import CsvToJsonWorker from "./csvToJson.worker?worker";
import PrettifyJsonWorker from "./prettifyJson.worker?worker";
import Base64EncodeWorker from "./base64Encode.worker?worker";
import Base64DecodeWorker from "./base64Decode.worker?worker";

export const workers = {
  csvToJson: "CSV → JSON",
  prettifyJson: "Prettify JSON",
  base64Encode: "Base64 Encode",
  base64Decode: "Base64 Decode",
};

export type WorkerType = keyof typeof workers;

type WorkerConstructor = new (options?: { name?: string }) => Worker;

const workersMap: Record<WorkerType, WorkerConstructor> = {
  csvToJson: CsvToJsonWorker,
  prettifyJson: PrettifyJsonWorker,
  base64Encode: Base64EncodeWorker,
  base64Decode: Base64DecodeWorker,
};

export const getWorker = (type: WorkerType): Worker => {
  const constructor = workersMap[type];
  return new constructor();
};
