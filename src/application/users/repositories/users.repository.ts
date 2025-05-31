import { CreateUserDTO } from "../dtos/create-user.dto";
import { UserEntity, UserEntityWithoutPassword } from "../entities/user.entity";

export abstract class UsersRepository {
	public abstract create(
		user: CreateUserDTO,
	): Promise<UserEntityWithoutPassword>;
	public abstract findById(id: string): Promise<UserEntity | null>;
	public abstract findByEmail(email: string): Promise<UserEntity | null>;
}
