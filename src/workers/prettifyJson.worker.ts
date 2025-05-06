import { prettifyJson } from "../processors/prettifyJson";
import type { WorkerRequest, WorkerResponse } from "./types";

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  try {
    const result = prettifyJson(e.data.text);
    const response: WorkerResponse = { success: true, result };
    self.postMessage(response);
  } catch (err) {
    self.postMessage({ success: false, error: (err as Error).message });
  }
};

export {};
