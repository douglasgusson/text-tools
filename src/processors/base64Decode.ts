export function base64Decode(input: string): string {
  if (!input) throw new Error("Empty input");

  return decodeURIComponent(atob(input));
}
