import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class WalletDepositDTO {
	@ApiProperty({
		description: "The amount to deposit into the wallet (in cents)",
		example: 1000,
	})
	@IsNotEmpty({ message: "Amount is required" })
	@IsInt({ message: "Amount must be an integer" })
	@Min(1, { message: "Amount must be at least 1 cent" })
	amount: number;
}
