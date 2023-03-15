export default class CustomError extends Error {
  public statusCode: number;

  public stack: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.stack = new Error().stack;
  }

  static create(message: string, statusCode: number): CustomError {
    return new CustomError(message, statusCode);
  }
}
