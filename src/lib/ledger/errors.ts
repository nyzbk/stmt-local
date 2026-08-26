export class ExtractError extends Error {
  constructor(
    message: string,
    public code: "password" | "scan" | "empty" | "too-large" | "generic",
  ) {
    super(message);
    this.name = "ExtractError";
  }
}
