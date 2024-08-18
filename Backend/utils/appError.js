class AppError extends Error {
  constructor(message, statusCode, httpStatusText) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.httpStatusText = httpStatusText;
  }
}

module.exports =  AppError;
