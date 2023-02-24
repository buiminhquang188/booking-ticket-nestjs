import { Controller } from "@nestjs/common";

import { CineplexService } from "./cineplex.service";

@Controller("cineplex")
export class CineplexController {
  constructor(private cineplexService: CineplexService) {}
}
