import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { DatabaseModule } from "@infra/database/database.module";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

import { env } from "src/env";

@Module({
	imports: [
		DatabaseModule,
		PassportModule,
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: {
				expiresIn: "7d",
			},
		}),
	],
	controllers: [],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
