import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export function CodeOutput({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="json"
      style={theme}
      wrapLongLines
      customStyle={{
        margin: 0,
        height: "100%",
        borderRadius: 0,
        border: 0,
        overflowX: "scroll",
        maxWidth: "50vw",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
