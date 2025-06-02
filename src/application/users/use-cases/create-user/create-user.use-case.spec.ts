import { UserEntity } from "@application/users/entities/user.entity";
import { HashProviderImplementation } from "@common/providers/hash/hash.provider";
import { BadRequestException } from "@nestjs/common";
import { UsersRepositoryMock } from "@test/mocks/repositories/users.repository.mock";
import { CreateUserUseCase } from "./create-user.use-case";

describe("CreateUserUseCase", () => {
	const userRepository = new UsersRepositoryMock();
	const hashProvider = new HashProviderImplementation();
	const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);

	jest.spyOn(hashProvider, "hash").mockResolvedValue("password123");

	const existingUser = {
		id: "1",
		fullname: "Existing User",
		email: "existing@email.com",
		password: "hashedpassword123",
		createdAt: new Date(),
		updatedAt: new Date(),
	} as UserEntity;

	it("should create a new user when email does not exist", async () => {
		const input = {
			fullname: "John Doe",
			email: "john@example.com",
			password: "password123",
		};

		jest.spyOn(userRepository, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(userRepository, "create").mockResolvedValue({
			id: "1",
			...input,
		} as unknown as UserEntity);

		await createUserUseCase.execute({
			email: input.email,
			fullname: input.fullname,
			password: input.password,
			initialBalance: 1000,
		});

		expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
		expect(userRepository.create).toHaveBeenCalledWith(
			expect.objectContaining(input),
		);
	});

	it("should throw an error if email already exists", async () => {
		const input = {
			name: "Jane Doe",
			email: "jane@example.com",
			password: "password123",
		};

		jest.spyOn(userRepository, "findByEmail").mockResolvedValue(existingUser);

		try {
			await createUserUseCase.execute({
				email: "existing__123@email.com",
				fullname: input.name,
				password: input.password,
				initialBalance: 1000,
			});
		} catch (error) {
			expect(error).toBeInstanceOf(BadRequestException);
			expect(error.message).toBe("User already exists with this email");
		}
	});
});
