import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { DeviceDetectorResult } from "device-detector-js";
import DeviceDetector from "device-detector-js";
import { Repository } from "typeorm";

import type { ILoggerMorgan } from "../../interfaces/ILogger.interface";
import { SysLogEntity } from "./logger.entity";

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(SysLogEntity)
    private sysLogRepository: Repository<SysLogEntity>
  ) {}

  private readonly deviceDetector = new DeviceDetector();

  public async create(request: ILoggerMorgan<any>) {
    let currentUser = "";

    if (request.token === "-") {
      currentUser = request.reqBody.username;
    }
    // else {
    //   try {

    //   } catch {
    //     throw new UnauthorizedException();
    //   }
    // }

    const device: DeviceDetectorResult = this.deviceDetector.parse(
      request.userAgent
    );
    let saveDeviceName = "";

    if (device.client?.name) {
      saveDeviceName = device.os?.name
        ? `${device.client.name}/${device.client.version} [${device.os.name}]`
        : `${device.client.name}/${device.client.version}`;
    }

    const sysLog: SysLogEntity = new SysLogEntity(
      saveDeviceName,
      request.method,
      request.url,
      Number.parseInt(request.status, 10),
      Number.parseFloat(request.totalTime),
      Number.parseFloat(request.responseTime),
      currentUser,
      request.ip
    );

    await this.sysLogRepository.save(sysLog);
  }
}
