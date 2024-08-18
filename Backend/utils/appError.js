class appError extends Error {
    constructor(message, statusCode, httpStatusText ) {
        super();
        this.message = message;
        this.status = statusCode;
        this.httpStatusText = httpStatusText;
    }
}

module.exports = appError;
