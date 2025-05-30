import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
	public abstract findById(id: string): Promise<UserEntity | null>;
}
