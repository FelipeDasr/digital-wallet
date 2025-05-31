import { AuthenticateUserUseCase } from "@application/users/use-cases/authenticate-user/authenticate-user.use-case";
import { CreateUserUseCase } from "@application/users/use-cases/create-user/create-user.use-case";
import { FindUserWalletUseCase } from "@application/wallets/use-cases/find-user-wallet/find-user-wallet.use-case";

import { AuthController } from "./controllers/auth/auth.controller";
import { WalletsController } from "./controllers/wallets/wallets.controller";

import { ProvidersModule } from "@common/providers/providers.module";
import { AuthModule } from "@infra/auth/auth.module";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [DatabaseModule, AuthModule, ProvidersModule],
	controllers: [AuthController, WalletsController],
	providers: [
		CreateUserUseCase,
		AuthenticateUserUseCase,
		FindUserWalletUseCase,
	],
	exports: [],
})
export class HttpModule {}
