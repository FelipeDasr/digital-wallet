import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import { OmitType } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@Column()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	fullname: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		name: "created_at",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt: Date;

	@Column({
		name: "updated_at",
		default: () => "CURRENT_TIMESTAMP",
	})
	updatedAt: Date;

	@OneToMany(
		() => WalletEntity,
		(wallet) => wallet.user,
		{ createForeignKeyConstraints: false, eager: true },
	)
	wallets: WalletEntity[];

	constructor(partial: Partial<UserEntity> = {}) {
		Object.assign(this, partial);
	}
}

export class UserEntityWithoutPassword extends OmitType(UserEntity, [
	"password",
]) {}
