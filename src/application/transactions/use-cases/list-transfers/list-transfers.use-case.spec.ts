import {
	ListTransactionDTO,
	TransactionListResponseDTO,
} from "@application/transactions/dtos/list-transactions.dto";
import { UserEntity } from "@application/users/entities/user.entity";
import { TransactionsRepositoryMock } from "@test/mocks/repositories/transactions.repository.mock";
import { ListTransfersUseCase } from "./list-transfers.use-case";

describe("ListTransfersUseCase", () => {
	const transactionsRepository = new TransactionsRepositoryMock();
	const useCase = new ListTransfersUseCase(transactionsRepository);

	it("should call findMany with the first wallet id and query", async () => {
		const user = {
			wallets: [{ id: "wallet-1" }],
		} as UserEntity;

		const query = { page: 1, limit: 10 } as ListTransactionDTO;
		const expectedResult = {
			total: 100,
			data: [
				{
					id: "123e4567-e89b-12d3-a456-426614174000",
					type: "TRANSFER",
					status: "COMPLETED",
					amount: 1050,
					sourceWallet: {
						id: "123e4567-e89b-12d3-a456-426614174000",
						owner: {
							id: "123e4567-e89b-12d3-a456-426614174000",
							fullname: "John Doe",
						},
					},
					destinationWallet: {
						id: "123e4567-e89b-12d3-a456-426614174000",
						owner: {
							id: "123e4567-e89b-12d3-a456-426614174000",
							fullname: "John Doe",
						},
					},
					createdAt: "2025-06-01T05:51:29.166Z",
					updatedAt: "2025-06-01T05:51:29.166Z",
				},
			],
		};

		jest
			.spyOn(transactionsRepository, "findMany")
			.mockResolvedValueOnce(
				expectedResult as unknown as TransactionListResponseDTO,
			);

		const result = await useCase.execute(user, query);

		expect(transactionsRepository.findMany).toHaveBeenCalledWith(
			"wallet-1",
			query,
		);
		expect(result).toBe(expectedResult);
	});
});
