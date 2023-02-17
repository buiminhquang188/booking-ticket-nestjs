import { LoggerService as _loggerService } from "@modules/logger/logger.service";
import { Injectable } from "@nestjs/common";

import type { StreamOptions } from "morgan";

import type { ILoggerMorgan } from "@interfaces/ILogger.interface";
import { logger } from "@utils/logger";

@Injectable()
export class LoggerService {
  constructor(private readonly _sysLog: _loggerService) {}

  public stream(): StreamOptions {
    return {
      write: (logData: string) => {
        const data = JSON.parse(logData) as ILoggerMorgan;
        if (data.reqBody !== "-") JSON.parse(data.reqBody);

        if (data.method !== "OPTIONS") {
          this._sysLog.create(data);
        }

        logger.info(
          `${data.method} ${data.url} ${data.status} >>> ${data.totalTime}ms`
        );
      },
    };
  }
}
