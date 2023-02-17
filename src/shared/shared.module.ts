import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { LoggerModule } from "../modules/logger/logger.module";
// import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiConfigService } from "./services/api-config.service";
// import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from "./services/generator.service";
import { LoggerService } from "./services/logger.service";
import { TranslationService } from "./services/translation.service";
import { ValidatorService } from "./services/validator.service";

const providers = [
  LoggerService,
  ApiConfigService,
  ValidatorService,
  // AwsS3Service,
  GeneratorService,
  TranslationService,
  // {
  //   provide: 'NATS_SERVICE',
  //   useFactory: (configService: ApiConfigService) => {
  //     const natsConfig = configService.natsConfig;
  //     return ClientProxyFactory.create({
  //       transport: Transport.NATS,
  //       options: {
  //         name: 'NATS_SERVICE',
  //         url: `nats://${natsConfig.host}:${natsConfig.port}`,
  //       },
  //     });
  //   },
  //   inject: [ApiConfigService],
  // },
];

@Global()
@Module({
  providers,
  imports: [HttpModule, CqrsModule, LoggerModule],
  exports: [...providers, HttpModule, CqrsModule],
})
export class SharedModule {}