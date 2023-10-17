export class BadRequestError extends Error {
  constructor(public message: string = "Bad Request") {
    super(message);
  }
}
