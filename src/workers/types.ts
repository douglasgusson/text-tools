export type WorkerRequest = {
  text: string;
};

export type WorkerResponse =
  | { success: true; result: string }
  | { success: false; error: string };
