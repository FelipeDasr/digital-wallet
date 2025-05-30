import { UserEntity } from "@application/users/entities/user.entity";
import { UsersRepository } from "@application/users/repositories/users.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TypeORMService } from "../../typeorm.service";

@Injectable()
export class TypeORMUserRepository implements UsersRepository {
	private repository: Repository<UserEntity>;

	constructor(private readonly db: TypeORMService) {
		this.repository = this.db.getRepository(UserEntity);
	}

	public async findById(id: string): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ id });
	}

	public async findByEmail(email: string): Promise<UserEntity | null> {
		return await this.repository.findOneBy({ email });
	}
}
