import { UserEntity } from "@application/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "wallets" })
export class WalletEntity {
	@Column()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "integer", default: 0 })
	balance: number;

	@Column({ name: "user_id" })
	userId: string;

	@ManyToOne(
		() => UserEntity,
		(user) => user.wallets,
	)
	user?: UserEntity;
}

export default WalletEntity;
