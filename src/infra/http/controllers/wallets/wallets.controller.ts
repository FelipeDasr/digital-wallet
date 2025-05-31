import { FindUserWalletUseCase } from "@application/wallets/use-cases/find-user-wallet/find-user-wallet.use-case";

import { UserEntity } from "@application/users/entities/user.entity";
import { WalletEntity } from "@application/wallets/entities/wallet.entity";

import { WalletDepositDTO } from "@application/wallets/dtos/wallet-deposit.dto";
import { DepositInWalletUseCase } from "@application/wallets/use-cases/deposit-in-wallet/deposit-in-wallet.use-case";
import { LoggedInUser } from "@common/decorators/logged-in-user.decorator";
import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

@Controller("wallets")
@ApiTags("Wallets")
@ApiBearerAuth()
export class WalletsController {
	constructor(
		private readonly findUserWalletUseCase: FindUserWalletUseCase,
		private readonly depositInWalletUseCase: DepositInWalletUseCase,
	) {}

	@ApiOperation({
		description: "Retrieve the wallet of a user by their ID",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: WalletEntity,
	})
	@Get()
	public async findUserWallet(@LoggedInUser() user: UserEntity) {
		return await this.findUserWalletUseCase.execute(user.id);
	}

	@ApiOperation({
		description: "Deposit an amount into the user's wallet",
	})
	@ApiResponse({
		status: HttpStatus.OK,
	})
	@Post("deposit")
	public async depositInWallet(
		@LoggedInUser() user: UserEntity,
		@Body() data: WalletDepositDTO,
	) {
		await this.depositInWalletUseCase.execute(user, data);
	}
}
