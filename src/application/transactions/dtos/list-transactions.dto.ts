import { WalletSimpleDataDTO } from "@application/wallets/dtos/wallet-simple-data.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";
import {
	TransactionStatus,
	TransactionType,
} from "../entities/transaction.entity";

export class ListTransactionDTO {
	@ApiProperty({
		description: "The page number for pagination",
		type: Number,
		example: 1,
	})
	@IsOptional()
	@IsInt({ message: "Page must be an integer" })
	@Min(1, { message: "Page must be at least 1" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	page = 1;

	@ApiProperty({
		description: "The number of items per page",
		type: Number,
		example: 10,
	})
	@IsOptional()
	@IsInt({ message: "Limit must be an integer" })
	@Min(1, { message: "Limit must be at least 1" })
	@Transform(({ value }) => Number.parseInt(value, 10))
	limit = 10;
}

export class TransactionListItemDTO {
	@ApiProperty({
		description: "The unique identifier of the transaction",
		example: "123e4567-e89b-12d3-a456-426614174000",
		type: String,
	})
	id: string;

	@ApiProperty({
		description: "The type of the transaction",
		example: TransactionType.TRANSFER,
		enum: TransactionType,
	})
	type: TransactionType;

	@ApiProperty({
		description: "The status of the transaction",
		example: TransactionStatus.COMPLETED,
		enum: TransactionStatus,
	})
	status: TransactionStatus;

	@ApiProperty({
		description: "The amount involved in the transaction (In cents)",
		example: 1050,
		type: Number,
	})
	amount: number;

	@ApiProperty({
		description: "The source wallet of the transaction",
		type: WalletSimpleDataDTO,
		required: false,
	})
	sourceWallet: WalletSimpleDataDTO | null;

	@ApiProperty({
		description: "The destination wallet of the transaction",
		type: WalletSimpleDataDTO,
	})
	destinationWallet: WalletSimpleDataDTO;

	@ApiProperty({
		description: "The date and time when the transaction was created",
		example: new Date().toISOString(),
		type: String,
	})
	createdAt: Date;

	@ApiProperty({
		description: "The date and time when the transaction was last updated",
		example: new Date().toISOString(),
		type: String,
	})
	updatedAt: Date;
}

export class TransactionListResponseDTO {
	@ApiProperty({
		description: "The total number of transactions",
		example: 100,
	})
	total: number;

	@ApiProperty({
		description: "The list of transactions",
		type: [TransactionListItemDTO],
	})
	data: TransactionListItemDTO[];
}
