class errorHandler extends Error {
  statusCode: number;
  data: any | null;
  success: boolean;
  errors: any[];
  stack?: string | undefined;
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default errorHandler;
