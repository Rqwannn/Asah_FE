import { AuthRepository } from "../Repositories/AuthRepository";

export class SignUpUseCase {
	constructor(private repository: AuthRepository) {}

	async execute(): Promise<void> {
		return await this.repository.logout();
	}
}
