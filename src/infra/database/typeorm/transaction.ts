import { Injectable } from "@nestjs/common";
import {
	DatabaseTransaction,
	DatabaseTransactionCallback,
} from "../types/transactions.props";
import { TypeORMService } from "./typeorm.service";

@Injectable()
export class TypeORMTransaction implements DatabaseTransaction {
	constructor(private readonly typeormService: TypeORMService) {}

	public async start<T>(callback: DatabaseTransactionCallback<T>): Promise<T> {
		const queryRunner = this.typeormService.createQueryRunner();

		try {
			await queryRunner.startTransaction();
			const result = await callback(queryRunner.manager);
			await queryRunner.commitTransaction();

			return result;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw error;
		} finally {
			await queryRunner.release();
		}
	}
}
