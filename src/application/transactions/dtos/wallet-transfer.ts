import { randomUUID } from "node:crypto";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";

export class WalletTransferDTO {
	@ApiProperty({
		description: "The amount to transfer to the wallet (in cents)",
		example: 1000,
	})
	@IsNotEmpty({ message: "Amount is required" })
	@IsInt({ message: "Amount must be an integer" })
	@Min(1, { message: "Amount must be at least 1 cent" })
	amount: number;

	@ApiProperty({
		description: "The ID of the destination wallet",
		example: randomUUID(),
	})
	@IsNotEmpty({ message: "Destination wallet ID is required" })
	@IsUUID(undefined, { message: "Destination wallet ID must be a valid UUID" })
	destinationWalletId: string;
}
