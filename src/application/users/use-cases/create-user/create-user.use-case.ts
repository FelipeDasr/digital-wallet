import { CreateUserDTO } from "@application/users/dtos/create-user.dto";

import { UsersRepository } from "@application/users/repositories/users.repository";

import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserUseCase {
	constructor(private readonly usersRepository: UsersRepository) {}

	public async execute(data: CreateUserDTO) {}
}
