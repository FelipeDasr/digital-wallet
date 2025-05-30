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
		default: new Date(),
	})
	createdAt: Date;

	@Column({
		name: "updated_at",
		default: new Date(),
	})
	updatedAt: Date;

	@OneToMany(
		() => WalletEntity,
		(wallet) => wallet.user,
	)
	wallets?: WalletEntity[];
}

export class UserEntityWithoutPassword extends OmitType(UserEntity, [
	"password",
]) {}
