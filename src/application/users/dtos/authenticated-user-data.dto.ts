import { randomUUID } from "node:crypto";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntityWithoutPassword } from "../entities/user.entity";

export class AuthenticatedUserDataDTO {
	@ApiProperty({
		description: "User data of the authenticated user",
		example: {
			id: randomUUID(),
			fullname: "Felipe dos Anjos",
			email: "user@email.com",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	})
	user: UserEntityWithoutPassword;

	@ApiProperty({
		description: "Token of the authenticated user",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	})
	token: string;

	@ApiProperty({
		description: "Refresh token of the authenticated user",
		example:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	})
	refreshToken: string;
}
