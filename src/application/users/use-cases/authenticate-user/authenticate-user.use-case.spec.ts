import { UserEntity } from "@application/users/entities/user.entity";
import { HashProviderImplementation } from "@common/providers/hash/hash.provider";
import { AuthService } from "@infra/auth/auth.service";
import { UsersRepositoryMock } from "@test/mocks/repositories/users.repository.mock";
import { AuthenticateUserUseCase } from "./authenticate-user.use-case";

jest.mock("@infra/auth/auth.service", () => ({
	AuthService: jest.fn().mockImplementation(() => ({
		createAccessToken: jest.fn().mockResolvedValue("access_token"),
		createRefreshToken: jest.fn().mockResolvedValue("refresh_token"),
	})),
}));

describe("AuthenticateUserUseCase", () => {
	const userRepository = new UsersRepositoryMock();
	const hashProvider = new HashProviderImplementation();
	const authService = new AuthService(userRepository);

	const authenticateUserUseCase = new AuthenticateUserUseCase(
		userRepository,
		hashProvider,
		authService,
	);

	it("should authenticate user with correct credentials", async () => {
		const user = {
			id: "1",
			fullname: "John Doe",
			email: "john@example.com",
			password: "hashedpassword",
			createdAt: new Date(),
			updatedAt: new Date(),
		} as UserEntity;

		jest.spyOn(userRepository, "findByEmail").mockResolvedValue(user);
		jest.spyOn(hashProvider, "compare").mockResolvedValue(true);

		const result = await authenticateUserUseCase.execute({
			email: "john@example.com",
			password: "password123",
		});

		expect(userRepository.findByEmail).toHaveBeenCalledWith("john@example.com");
		expect(hashProvider.compare).toHaveBeenCalledWith(
			"password123",
			user.password,
		);
		expect(result).toHaveProperty("user");
		expect(result.user.email).toBe("john@example.com");
	});

	it("should throw error if user does not exist", async () => {
		jest.spyOn(userRepository, "findByEmail").mockResolvedValue(null);

		await expect(
			authenticateUserUseCase.execute({
				email: "notfound@example.com",
				password: "password123",
			}),
		).rejects.toThrow("User not found");
	});

	it("should throw error if password is incorrect", async () => {
		const user = {
			id: "1",
			fullname: "John Doe",
			email: "john@example.com",
			password: "hashedpassword",
			createdAt: new Date(),
			updatedAt: new Date(),
		} as UserEntity;

		jest.spyOn(userRepository, "findByEmail").mockResolvedValue(user);
		jest.spyOn(hashProvider, "compare").mockResolvedValue(false);

		await expect(
			authenticateUserUseCase.execute({
				email: "john@example.com",
				password: "wrongpassword",
			}),
		).rejects.toThrow("E-mail or password is incorrect.");
	});
});
