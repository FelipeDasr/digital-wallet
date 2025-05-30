import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { JwtAccessAuthGuard } from "@infra/auth/guards/jwt-access-auth.guard";
import { HttpModule } from "@infra/http/http.module";

@Module({
	imports: [HttpModule],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAccessAuthGuard,
		},
	],
})
export class AppModule {}
