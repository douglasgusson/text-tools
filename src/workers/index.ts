import CsvToJsonWorker from "./csvToJson.worker?worker";
import PrettifyJsonWorker from "./prettifyJson.worker?worker";
import Base64EncodeWorker from "./base64Encode.worker?worker";
import Base64DecodeWorker from "./base64Decode.worker?worker";
import SortLinesWorker from "./sortLines.worker?worker";
import DedupeLinesWorker from "./dedupeLines.worker?worker";

export const workers = {
  csvToJson: "CSV → JSON",
  prettifyJson: "Prettify JSON",
  base64Encode: "Base 64 encode",
  base64Decode: "Base 64 decode",
  sortLines: "Sort lines",
  dedupeLines: "Dedupe lines",
};

export type WorkerType = keyof typeof workers;

type WorkerConstructor = new (options?: { name?: string }) => Worker;

const workersMap: Record<WorkerType, WorkerConstructor> = {
  csvToJson: CsvToJsonWorker,
  prettifyJson: PrettifyJsonWorker,
  base64Encode: Base64EncodeWorker,
  base64Decode: Base64DecodeWorker,
  sortLines: SortLinesWorker,
  dedupeLines: DedupeLinesWorker,
};

export const getWorker = (type: WorkerType): Worker => {
  const WorkerClass = workersMap[type];
  return new WorkerClass();
};
