export class ApiException extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static badRequest = (message: string = "Bad Request") =>
    new ApiException(400, message);
  static unnathorized = (message: string = "Unnathorized") =>
    new ApiException(401, message);
  static forbidden = (message: string = "Forbidden") =>
    new ApiException(403, message);
  static notFound = (message: string = "Not Found") =>
    new ApiException(404, message);
}
