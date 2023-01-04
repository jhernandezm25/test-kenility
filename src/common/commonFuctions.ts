export function getResponse(statusCode: number, message: string, data: any) {
  return {
    statusCode,
    message,
    data,
  };
}
