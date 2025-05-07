export function dedupeLines(input: string): string {
  const lines = input.split("\n");
  const dedupedLines = Array.from(new Set(lines));
  return dedupedLines.join("\n");
}
