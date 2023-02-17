export interface ILoggerMorgan<TReqBody> {
  method: string;
  url: string;
  status: string;
  totalTime: string;
  responseTime: string;
  userAgent: string;
  reqBody: TReqBody;
  token: string;
  ip: string;
}
