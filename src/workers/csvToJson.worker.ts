import { csvToJson } from "../processors/csvToJson";
import type { WorkerRequest, WorkerResponse } from "./types";

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  try {
    const result = JSON.stringify(csvToJson(e.data.text), null, 2);
    const response: WorkerResponse = { success: true, result };
    self.postMessage(response);
  } catch (err) {
    self.postMessage({ success: false, error: (err as Error).message });
  }
};

export {};
