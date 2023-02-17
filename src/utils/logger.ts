import json from "morgan-json";
import winston from "winston";

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.colorize()
    ),
  })
);

export const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  totalTime: ":total-time",
  responseTime: ":response-time",
  userAgent: ":user-agent",
  reqBody: ":req[header]",
  token: ":req[Authorization]",
  ip: ":remote-addr",
});
