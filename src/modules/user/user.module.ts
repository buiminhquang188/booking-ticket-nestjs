import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "../../entity/user.entity";
import { CreateSettingsHandler } from "./commands/create-settings.command";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserSettingsEntity } from "./user-settings.entity";

export const handlers = [CreateSettingsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, ...handlers],
})
export class UserModule {}