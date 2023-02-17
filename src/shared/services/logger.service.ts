import { Injectable } from "@nestjs/common";
import type { StreamOptions } from "morgan";

import type { ILoggerMorgan } from "../../interfaces/ILogger.interface";
import { LoggerService as _loggerService } from "../../modules/logger/logger.service";
import { logger } from "../../utils/logger";

@Injectable()
export class LoggerService {
  constructor(private readonly sysLog: _loggerService) {}

  public stream(): StreamOptions {
    return {
      write: (logData: string) => {
        const data = JSON.parse(logData) as ILoggerMorgan<typeof logData>;

        if (data.reqBody !== "-") {
          JSON.parse(data.reqBody);
        }

        if (data.method !== "OPTIONS") {
          void this.sysLog.create(data);
        }

        logger.info(
          `${data.method} ${data.url} ${data.status} >>> ${data.totalTime}ms`
        );
      },
    };
  }
}
