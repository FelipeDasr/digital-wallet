import {
	DatabaseTransaction,
	DatabaseTransactionCallback,
} from "@infra/database/types/transactions.props";

export class DatabaseTransactionMock implements DatabaseTransaction {
	public start<T>(callback: DatabaseTransactionCallback<T>): Promise<T> {
		throw new Error("Method not implemented.");
	}
}
