import { UsersRepository } from "@application/users/repositories/users.repository";
import { Module } from "@nestjs/common";
import { TypeORMUserRepository } from "./typeorm/repositories/users/typeorm-user.repository";
import { TypeORMService } from "./typeorm/typeorm.service";

@Module({
	providers: [
		TypeORMService,
		{
			provide: UsersRepository,
			useClass: TypeORMUserRepository,
		},
	],
	exports: [UsersRepository],
})
export class DatabaseModule {}
