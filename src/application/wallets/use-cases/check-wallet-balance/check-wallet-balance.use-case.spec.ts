import { DatabaseTransactionManager } from "@infra/database/types/transactions.props";
import { BadRequestException } from "@nestjs/common";
import { WalletsRepositoryMock } from "@test/mocks/repositories/wallets.repository.mock";
import { CheckWalletBalanceUseCase } from "./check-wallet-balance.use-case";

describe("CheckWalletBalanceUseCase", () => {
	const walletsRepository = new WalletsRepositoryMock();
	const useCase = new CheckWalletBalanceUseCase(walletsRepository);
	const mockTransaction = {} as DatabaseTransactionManager;

	const walletId = "wallet-id";

	it("should not throw if wallet has sufficient balance", async () => {
		jest.spyOn(walletsRepository, "getBalance").mockResolvedValueOnce(100);

		await expect(
			useCase.execute(walletId, 50, mockTransaction),
		).resolves.toBeUndefined();

		expect(walletsRepository.getBalance).toHaveBeenCalledWith(
			"wallet-id",
			mockTransaction,
		);
	});

	it("should throw BadRequestException if wallet has insufficient balance", async () => {
		jest.spyOn(walletsRepository, "getBalance").mockResolvedValueOnce(49);

		await expect(
			useCase.execute("wallet-id", 50, mockTransaction),
		).rejects.toThrow(BadRequestException);

		expect(walletsRepository.getBalance).toHaveBeenCalledWith(
			"wallet-id",
			mockTransaction,
		);
	});
});
