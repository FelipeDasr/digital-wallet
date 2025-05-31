import { TransactionEntity } from "../entities/transaction.entity";

export type CreateTransactionDTO = Omit<
	TransactionEntity,
	"id" | "createdAt" | "updatedAt" | "sourceWallet" | "destinationWallet"
>;
