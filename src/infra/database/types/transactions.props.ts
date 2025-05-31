export abstract class DatabaseTransaction {
	public abstract start<T>(
		callback: DatabaseTransactionCallback<T>,
	): Promise<T>;
}

// biome-ignore lint/suspicious/noExplicitAny: generic type is used for database transactions
export type DatabaseTransactionManager = any;

export type DatabaseTransactionCallback<T> = (
	transaction: DatabaseTransactionManager,
) => Promise<T>;
