import { FindUserWalletUseCase } from "@application/wallets/use-cases/find-user-wallet/find-user-wallet.use-case";

import { UserEntity } from "@application/users/entities/user.entity";
import { WalletEntity } from "@application/wallets/entities/wallet.entity";

import { LoggedInUser } from "@common/decorators/logged-in-user.decorator";
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
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
	constructor(private readonly findUserWalletUseCase: FindUserWalletUseCase) {}

	@ApiOperation({
		description: "Retrieve the wallet of a user by their ID",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: WalletEntity,
	})
	@HttpCode(HttpStatus.OK)
	@Get()
	public async findUserWallet(@LoggedInUser() user: UserEntity) {
		return await this.findUserWalletUseCase.execute(user.id);
	}
}
