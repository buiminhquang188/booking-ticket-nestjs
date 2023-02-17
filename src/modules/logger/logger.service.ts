import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { ILoggerMorgan } from "@interfaces/ILogger.interface";
import DeviceDetector from "device-detector-js";
import { InjectRepository } from "@nestjs/typeorm";
import { SysLogEntity } from "./logger.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(SysLogEntity)
    private sysLogRepository: Repository<SysLogEntity>
  ) {}

  private readonly deviceDetector = new DeviceDetector();
  public async create(request: ILoggerMorgan) {
    let currentUser = "";
    if (request.token === "-") {
      currentUser = request.reqBody.username;
    } else {
      try {
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
    const device = this.deviceDetector.parse(request.userAgent);
    let saveDeviceName = "";

    if (device?.client?.name) {
      if (device?.os?.name) {
        saveDeviceName = `${device.client.name}/${device.client.version} [${device.os.name}]`;
      } else {
        saveDeviceName = `${device.client.name}/${device.client.version}`;
      }
    }

    const sysLog: SysLogEntity = new SysLogEntity(
      saveDeviceName,
      request.method,
      request.url,
      parseInt(request.status),
      parseFloat(request.totalTime),
      parseFloat(request.responseTime),
      currentUser,
      request.ip
    );

    await this.sysLogRepository.save(sysLog);
  }
}
