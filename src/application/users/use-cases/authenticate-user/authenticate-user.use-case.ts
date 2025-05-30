import { AuthenticateUserDTO } from "@application/users/dtos/authenticate-user.dto";
import { AuthenticatedUserDataDTO } from "@application/users/dtos/authenticated-user-data.dto";
import { UserEntityWithoutPassword } from "@application/users/entities/user.entity";

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
		const user = await this.usersRepository.findByEmail(email);
		if (!user) {
			throw new NotFoundException("User not found");
		}

		const confirmedPassword = await this.hashProvider.compare(
			password as string,
			user.password as string,
		);

		if (!confirmedPassword) {
			throw new UnauthorizedException("E-mail or password is incorrect.");
		}

		const token = await this.authService.createAccessToken(user.id);
		const refreshToken = await this.authService.createRefreshToken(user.id);

		return {
			user: {
				...user,
				password: undefined,
			} as UserEntityWithoutPassword,
			token,
			refreshToken,
		};
	}
}
