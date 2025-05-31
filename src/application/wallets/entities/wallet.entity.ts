import { TransactionEntity } from "@application/transactions/entities/transaction.entity";
import { UserEntity } from "@application/users/entities/user.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "wallets" })
export class WalletEntity {
	@Column()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "integer", default: 0 })
	balance: number;

	@Column({ name: "user_id", type: "uuid" })
	user_id: string;

	@ManyToOne(
		() => UserEntity,
		(user) => user.wallets,
	)
	@JoinColumn({ name: "user_id" })
	user?: UserEntity;

	@OneToMany(
		() => TransactionEntity,
		(wallet) => wallet.sourceWallet,
		{ createForeignKeyConstraints: false },
	)
	sentTransactions?: TransactionEntity[];

	@OneToMany(
		() => TransactionEntity,
		(wallet) => wallet.destinationWallet,
		{ createForeignKeyConstraints: false },
	)
	receivedTransactions?: TransactionEntity[];

	constructor(partial: Partial<WalletEntity>) {
		Object.assign(this, partial);
	}
}

export default WalletEntity;
