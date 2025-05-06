export function prettifyJson(json: string): string {
  const parsedJson = JSON.parse(json);
  return JSON.stringify(parsedJson, null, 2);
}
