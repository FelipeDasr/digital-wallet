import { CreateUserDTO } from "@application/users/dtos/create-user.dto";

import { UsersRepository } from "@application/users/repositories/users.repository";
import { HashProvider } from "@common/providers/hash/types/hash.provider-props";

import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly hashProvider: HashProvider,
	) {}

	public async execute({
		fullname,
		email,
		initialBalance,
		password,
	}: CreateUserDTO) {
		await this.checkIfUserAlreadyExists(email);

		const hashedPassword = await this.hashProvider.hash(password);

		return this.usersRepository.create({
			fullname,
			email,
			initialBalance,
			password: hashedPassword,
		});
	}

	private async checkIfUserAlreadyExists(email: string) {
		const user = await this.usersRepository.findByEmail(email);

		if (user) {
			throw new BadRequestException("User already exists with this email");
		}
	}
}
