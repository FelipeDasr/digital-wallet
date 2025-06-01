import { CreateUserDTO } from "@application/users/dtos/create-user.dto";
import {
	UserEntity,
	UserEntityWithoutPassword,
} from "@application/users/entities/user.entity";
import { UsersRepository } from "@application/users/repositories/users.repository";

export class UsersRepositoryMock implements UsersRepository {
	public create(user: CreateUserDTO): Promise<UserEntityWithoutPassword> {
		throw new Error("Method not implemented.");
	}

	public findById(id: string): Promise<UserEntity | null> {
		throw new Error("Method not implemented.");
	}

	public findByEmail(email: string): Promise<UserEntity | null> {
		throw new Error("Method not implemented.");
	}
}
