import { randomUUID } from "node:crypto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class TransactionIdDTO {
	@ApiProperty({
		description: "The unique identifier of the transaction",
		example: randomUUID(),
	})
	@IsNotEmpty({ message: "Transaction ID cannot be empty" })
	@IsUUID(undefined, { message: "Transaction ID must be a valid UUID" })
	transactionId: string;
}
