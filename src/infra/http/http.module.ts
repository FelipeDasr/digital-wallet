import { AuthModule } from "@infra/auth/auth.module";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [DatabaseModule, AuthModule],
	controllers: [],
	providers: [],
	exports: [],
})
export class HttpModule {}
