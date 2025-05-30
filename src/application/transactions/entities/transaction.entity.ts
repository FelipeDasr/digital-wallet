import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TransactionStatus {
	COMPLETED = "COMPLETED",
	REFUNDED = "REFUNDED",
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
		enum: TransactionStatus,
	})
	status: TransactionStatus;

	@Column({ name: "source_wallet_id", type: "integer" })
	sourceWalletId: string;

	@Column({ name: "destination_wallet_id", type: "integer" })
	destinationWalletId: string;

	@Column({ name: "created_at", type: "timestamp", default: new Date() })
	createdAt: Date;

	@Column({ name: "updated_at", type: "timestamp", default: new Date() })
	updatedAt: Date;
}
