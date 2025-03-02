class responseHandler<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  constructor(statusCode: number, success: boolean, data: T, message: string) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

export default responseHandler;
