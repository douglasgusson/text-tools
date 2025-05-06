import { useRef, useState } from "react";
import { WorkerType, getWorker } from "../workers";

export function TextProcessor() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [workerType, setWorkerType] = useState<WorkerType>(
    WorkerType.csvToJson,
  );
  const workerRef = useRef<Worker | null>(null);

  const handleProcess = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    const worker = getWorker(workerType);
    worker.onmessage = (e) => {
      const { success, result, error } = e.data;
      setOutput(success ? result : `Erro: ${error}`);
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
      <div className="bg-gray-800 p-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <select
          className="bg-gray-700 text-gray-300 text-sm mx-auto px-2 py-1 rounded border-0 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={workerType}
          onChange={(e) => setWorkerType(e.target.value as WorkerType)}
        >
          <option value={WorkerType.csvToJson}>CSV → JSON</option>
        </select>
      </div>
      <div className="flex h-full">
        <textarea
          className="flex-1 h-full bg-gray-900 text-gray-300 font-mono p-4 outline-none resize-y border-0 focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed"
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
        <pre className="flex-1 bg-gray-800 text-gray-200 font-mono p-4">
          {output}
        </pre>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-400 bg-gray-800 p-2">
        <div>Caracteres: {input.length}</div>
        <div className="flex flex-row-reverse gap-2">
          <button
            onClick={handleProcess}
            className="bg-blue-600 hover:bg-blue-500 font-semibold text-white px-3 py-1 rounded text-xs flex items-center"
          >
            Processar{" "}
            <span className="ml-1 text-gray-300 text-xs">(Ctrl+Enter)</span>
          </button>
          <button
            onClick={handleClear}
            className="bg-orange-600 hover:bg-orange-500 font-semibold text-white px-3 py-1 rounded text-xs flex items-center"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
