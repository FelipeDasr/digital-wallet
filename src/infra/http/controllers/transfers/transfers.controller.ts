import { DepositInWalletUseCase } from "@application/transactions/use-cases/deposit-in-wallet/deposit-in-wallet.use-case";

import { UserEntity } from "@application/users/entities/user.entity";

import { WalletDepositDTO } from "@application/transactions/dtos/wallet-deposit.dto";

import { LoggedInUser } from "@common/decorators/logged-in-user.decorator";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

@Controller("transactions")
@ApiTags("Transactions")
@ApiBearerAuth()
export class TransactionsController {
	constructor(
		private readonly depositInWalletUseCase: DepositInWalletUseCase,
	) {}

	@ApiOperation({
		description: "Deposit an amount into the user's wallet",
	})
	@ApiResponse({
		status: HttpStatus.OK,
	})
	@HttpCode(HttpStatus.OK)
	@Post("deposit")
	public async depositInWallet(
		@LoggedInUser() user: UserEntity,
		@Body() data: WalletDepositDTO,
	) {
		await this.depositInWalletUseCase.execute(user, data);
	}
}
