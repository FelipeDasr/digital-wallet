import { DepositInWalletUseCase } from "@application/transactions/use-cases/deposit-in-wallet/deposit-in-wallet.use-case";
import { ListTransfersUseCase } from "@application/transactions/use-cases/list-transfers/list-transfers.use-case";
import { RevertTransactionUseCase } from "@application/transactions/use-cases/revert-transaction/revert-transaction.use-case";
import { TransferToWalletUseCase } from "@application/transactions/use-cases/transfer-to-wallet/transfer-to-wallet.use-case";

import { UserEntity } from "@application/users/entities/user.entity";

import {
	ListTransactionDTO,
	TransactionListResponseDTO,
} from "@application/transactions/dtos/list-transactions.dto";
import { TransactionIdDTO } from "@application/transactions/dtos/transaction-id.dto";
import { WalletDepositDTO } from "@application/transactions/dtos/wallet-deposit.dto";
import { WalletTransferDTO } from "@application/transactions/dtos/wallet-transfer";

import { LoggedInUser } from "@common/decorators/logged-in-user.decorator";
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
} from "@nestjs/common";
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
		private readonly transferToWalletUseCase: TransferToWalletUseCase,
		private readonly revertTransactionUseCase: RevertTransactionUseCase,
		private readonly listTransfersUseCase: ListTransfersUseCase,
	) {}

	@ApiOperation({
		description: "List all transactions for the authenticated user",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: TransactionListResponseDTO,
	})
	@HttpCode(HttpStatus.OK)
	@Get()
	public async listTransactions(
		@LoggedInUser() user: UserEntity,
		@Query() query: ListTransactionDTO,
	) {
		return await this.listTransfersUseCase.execute(user, query);
	}

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

	@ApiOperation({
		description: "Transfer an amount to another wallet",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: TransactionIdDTO,
	})
	@HttpCode(HttpStatus.OK)
	@Post("transfer")
	public async transferToWallet(
		@LoggedInUser() user: UserEntity,
		@Body() data: WalletTransferDTO,
	) {
		return await this.transferToWalletUseCase.execute(user, data);
	}

	@ApiOperation({
		description: "Revert a transaction",
	})
	@ApiResponse({
		status: HttpStatus.OK,
	})
	@HttpCode(HttpStatus.OK)
	@Post("revert")
	public async revertTransaction(
		@LoggedInUser() user: UserEntity,
		@Body() data: TransactionIdDTO,
	) {
		await this.revertTransactionUseCase.execute(user, data.transactionId);
	}
}
