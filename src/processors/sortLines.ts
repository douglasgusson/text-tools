export function sortLines(input: string) {
  return input
    .split("\n")
    .filter((value) => value.trim().length !== 0)
    .sort()
    .join("\n");
}
