import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity {
	@Column()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	fullname: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		name: "created_at",
		default: new Date(),
	})
	createdAt: Date;

	@Column({
		name: "updated_at",
		default: new Date(),
	})
	updatedAt: Date;
}
