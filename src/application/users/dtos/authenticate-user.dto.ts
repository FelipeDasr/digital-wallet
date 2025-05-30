import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthenticateUserDTO {
	@ApiProperty({
		description: "User email",
		example: "user@email.com",
		required: true,
		type: String,
	})
	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Email must be a valid email address" })
	@Transform(({ value }) => String(value).toLowerCase())
	email: string;

	@ApiProperty({
		description: "User password",
		example: "password123",
		required: true,
		type: String,
	})
	@IsNotEmpty({ message: "Password is required" })
	@IsString({ message: "Password must be a valid string" })
	@MinLength(6, { message: "Password must be at least 6 characters long" })
	password: string;
}
