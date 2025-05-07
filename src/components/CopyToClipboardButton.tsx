import { useState } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

type CopyToClipboardButtonProps = {
  text?: string;
};

export function CopyToClipboardButton({ text }: CopyToClipboardButtonProps) {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;

    copy(text)
      .then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => console.error("Failed to copy!", error));
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
      className="bg-zinc-600 hover:bg-zinc-500 font-semibold text-white px-3 py-1 rounded text-xs flex items-center hover:cursor-pointer"
    >
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
}
