export function csvToJson(text: string): object[] {
  const [headerLine, ...lines] = text.trim().split("\n");
  const headers = headerLine.split(",");

  return lines.map((line) => {
    const values = line.split(",");
    return headers.reduce(
      (acc, key, idx) => {
        acc[key.trim()] = values[idx]?.trim();
        return acc;
      },
      {} as Record<string, string>,
    );
  });
}
