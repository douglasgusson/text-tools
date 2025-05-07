import { useRef, useState } from "react";
import { type WorkerType, getWorker, workers } from "../workers";
import { CodeOutput } from "./CodeOutput";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export function TextProcessor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [workerType, setWorkerType] = useState<WorkerType>("csvToJson");
  const workerRef = useRef<Worker | null>(null);

  const handleProcess = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const worker = getWorker(workerType);
    worker.onmessage = (e) => {
      const { success, result, error } = e.data;
      setOutput(success ? result : `Error: ${error}`);
    };
    workerRef.current = worker;
    worker.postMessage({ text: input });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="bg-zinc-900 p-2 flex items-center">
        <div className="flex space-x-2 flex-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <select
          className="flex-1 max-w-2xs bg-zinc-700 text-zinc-300 text-sm mx-auto px-2 py-1 rounded border-0 focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none"
          value={workerType}
          onChange={(e) => setWorkerType(e.target.value as WorkerType)}
        >
          {Object.entries(workers).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>

        <div className="flex flex-row-reverse gap-2 flex-1">
          <button
            onClick={handleProcess}
            className="bg-blue-600 hover:bg-blue-500 font-semibold text-white px-3 py-1 rounded text-xs flex items-center"
          >
            Processar
            <span className="ml-1 bg-black/20 rounded px-0.5 font-mono text-gray-300 text-xs">
              <kbd>Ctrl</kbd>+<kbd>Enter</kbd>
            </span>
          </button>
          <button
            onClick={handleClear}
            className="bg-orange-600 hover:bg-orange-500 font-semibold text-white px-3 py-1 rounded text-xs flex items-center"
          >
            Limpar
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex flex-col flex-1 h-full">
          <textarea
            className="flex-1 bg-zinc-800 text-zinc-200 font-mono font-medium p-4 outline-none resize-none border-0 text-sm leading-relaxed"
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck="false"
            onKeyDown={(e) => {
              // Detecta Ctrl+Enter
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                handleProcess();
              }
            }}
          />
          <div className="flex gap-4 h-10 items-center text-xs text-gray-400 bg-zinc-900 p-2">
            <span>input</span>
            <span>caracteres: {input.length}</span>
          </div>
        </div>
        <div className="flex flex-col flex-1 md:max-w-1/2 shadow-md">
          <div className="flex flex-col flex-1 w-full h-full">
            <CodeOutput code={output} />
          </div>
          <div className="flex gap-4 h-10 justify-between items-center text-xs text-gray-400 bg-zinc-900 p-2">
            <span>output</span>
            <CopyToClipboardButton text={output} />
          </div>
        </div>
      </div>
    </div>
  );
}
