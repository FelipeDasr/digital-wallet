import { DepositInWalletUseCase } from "@application/transactions/use-cases/deposit-in-wallet/deposit-in-wallet.use-case";
import { ListTransfersUseCase } from "@application/transactions/use-cases/list-transfers/list-transfers.use-case";
import { RevertTransactionUseCase } from "@application/transactions/use-cases/revert-transaction/revert-transaction.use-case";
import { TransferToWalletUseCase } from "@application/transactions/use-cases/transfer-to-wallet/transfer-to-wallet.use-case";
import { AuthenticateUserUseCase } from "@application/users/use-cases/authenticate-user/authenticate-user.use-case";
import { CreateUserUseCase } from "@application/users/use-cases/create-user/create-user.use-case";
import { CheckWalletBalanceUseCase } from "@application/wallets/use-cases/check-wallet-balance/check-wallet-balance.use-case";
import { FindUserWalletUseCase } from "@application/wallets/use-cases/find-user-wallet/find-user-wallet.use-case";
import { ReallocateWalletBalancesUseCase } from "@application/wallets/use-cases/reallocate-wallet-balances/reallocate-wallet-balances.use-case";

import { AuthController } from "./controllers/auth/auth.controller";
import { TransactionsController } from "./controllers/transfers/transfers.controller";
import { WalletsController } from "./controllers/wallets/wallets.controller";

import { ProvidersModule } from "@common/providers/providers.module";
import { AuthModule } from "@infra/auth/auth.module";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [DatabaseModule, AuthModule, ProvidersModule],
	controllers: [AuthController, WalletsController, TransactionsController],
	providers: [
		CreateUserUseCase,
		AuthenticateUserUseCase,
		FindUserWalletUseCase,
		CheckWalletBalanceUseCase,
		ReallocateWalletBalancesUseCase,
		DepositInWalletUseCase,
		TransferToWalletUseCase,
		RevertTransactionUseCase,
		ListTransfersUseCase,
	],
	exports: [],
})
export class HttpModule {}
