import { ApiProperty } from "@nestjs/swagger";

export class WalletSimpleDataDTO {
	@ApiProperty({
		description: "The unique identifier of the wallet",
		example: "123e4567-e89b-12d3-a456-426614174000",
		type: String,
	})
	id: string;

	@ApiProperty({
		description: "The owner of the wallet",
		example: {
			id: "123e4567-e89b-12d3-a456-426614174000",
			fullname: "John Doe",
		},
	})
	owner: {
		id: string;
		fullname: string;
	};
}
