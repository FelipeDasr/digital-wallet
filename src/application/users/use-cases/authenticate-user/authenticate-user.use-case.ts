import { AuthenticateUserDTO } from "@application/users/dtos/authenticate-user.dto";
import { AuthenticatedUserDataDTO } from "@application/users/dtos/authenticated-user-data.dto";
import {
	UserEntity,
	UserEntityWithoutPassword,
} from "@application/users/entities/user.entity";

import { UsersRepository } from "@application/users/repositories/users.repository";
import { HashProvider } from "@common/providers/hash/types/hash.provider-props";

import { AuthService } from "@infra/auth/auth.service";
import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthenticateUserUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hashProvider: HashProvider,
		private readonly authService: AuthService,
	) {}

	public async execute({
		email,
		password,
	}: AuthenticateUserDTO): Promise<AuthenticatedUserDataDTO> {
		const user = await this.getAndCheckIfUserExists(email);
		await this.checkUserCredentials(password, user);

		const { token, refreshToken } = await this.generateTokens(user);

		return {
			user: {
				...user,
				password: undefined,
			} as UserEntityWithoutPassword,
			token,
			refreshToken,
		};
	}

	private async getAndCheckIfUserExists(email: string) {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}

	private async checkUserCredentials(
		passwordToCompare: string,
		{ password }: UserEntity,
	) {
		const confirmedPassword = await this.hashProvider.compare(
			passwordToCompare as string,
			password as string,
		);

		if (!confirmedPassword) {
			throw new UnauthorizedException("E-mail or password is incorrect.");
		}
	}

	private async generateTokens(user: UserEntity) {
		return {
			token: await this.authService.createAccessToken(user.id),
			refreshToken: await this.authService.createRefreshToken(user.id),
		};
	}
}
