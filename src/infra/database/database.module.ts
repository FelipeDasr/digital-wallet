import { UsersRepository } from "@application/users/repositories/users.repository";
import { TypeORMUserRepository } from "./typeorm/repositories/users/typeorm-user.repository";

import { Module } from "@nestjs/common";
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
