import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";

export class ReallocateWalletBalancesDTO {
	sourceWalletId: string;
	destinationWalletId: string;
	amount: number;
	dbTransaction: DatabaseTransactionManager;
}
