import { WalletEntity } from "@application/wallets/entities/wallet.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

export enum TransactionStatus {
	COMPLETED = "COMPLETED",
	REFUNDED = "REFUNDED",
}

export enum TransactionType {
	TRANSFER = "TRANSFER",
	DEPOSIT = "DEPOSIT",
}

@Entity({ name: "transactions" })
export class TransactionEntity {
	@Column()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "integer" })
	amount: number;

	@Column({
		type: "enum",
		enum: TransactionType,
	})
	type: TransactionType;

	@Column({
		type: "enum",
		enum: TransactionStatus,
	})
	status: TransactionStatus;

	@Column({ name: "source_wallet_id", type: "uuid", nullable: true })
	sourceWalletId: string | null;

	@Column({ name: "destination_wallet_id", type: "uuid", nullable: true })
	destinationWalletId: string | null;

	@Column({
		name: "created_at",
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt: Date;

	@Column({
		name: "updated_at",
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP",
	})
	updatedAt: Date;

	@ManyToOne(
		() => WalletEntity,
		(wallet) => wallet.sentTransactions,
	)
	@JoinColumn({ name: "source_wallet_id" })
	sourceWallet?: WalletEntity;

	@ManyToOne(
		() => WalletEntity,
		(wallet) => wallet.receivedTransactions,
	)
	@JoinColumn({ name: "destination_wallet_id" })
	destinationWallet?: WalletEntity;

	constructor(data: Partial<TransactionEntity>) {
		Object.assign(this, data);
	}
}
