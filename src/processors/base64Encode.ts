export function base64Encode(input: string): string {
  if (!input) throw new Error("Empty input");

  return btoa(encodeURIComponent(input));
}
