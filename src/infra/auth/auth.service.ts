import { UsersRepository } from "@application/users/repositories/users.repository";
import { ForbiddenException, Injectable } from "@nestjs/common";

import { sign } from "jsonwebtoken";
import { env } from "src/env";

@Injectable()
export class AuthService {
	constructor(private readonly usersRepository: UsersRepository) {}

	public async createAccessToken(user_id: string) {
		return sign({ sub: user_id }, env.JWT_SECRET, {
			expiresIn: "7d",
		});
	}

	public async createRefreshToken(user_id: string) {
		return sign({ sub: user_id }, env.JWT_REFRESH_SECRET, {
			expiresIn: "30d",
		});
	}

	public async validateUser(user_id: string) {
		const user = await this.usersRepository.findById(user_id);
		if (!user) {
			throw new ForbiddenException("User not found or does not have access");
		}

		return user;
	}
}
