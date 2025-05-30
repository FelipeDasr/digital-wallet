import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from "class-validator";
import { AuthenticateUserDTO } from "./authenticate-user.dto";

export class CreateUserDTO extends AuthenticateUserDTO {
	@ApiProperty({
		description: "User name",
		example: "Felipe dos Anjos",
		required: true,
		type: String,
	})
	@IsNotEmpty({ message: "fullname is required" })
	@IsString({ message: "fullname must be a valid string" })
	@MinLength(5, { message: "fullname must be at least 5 characters long" })
	fullname: string;

	@ApiProperty({
		description: "Initial balance for the user (in cents)",
		example: 15000,
		required: true,
		type: Number,
	})
	@IsNotEmpty({ message: "Initial balance is required" })
	@IsInt({ message: "Initial balance must be an integer" })
	@Min(1, { message: "Initial balance must be a non-negative integer" })
	initialBalance: number;
}
