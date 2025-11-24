import { AuthRepository } from "../Repositories/AuthRepository";

export class LogoutUseCase {
	constructor(private repository: AuthRepository) {}

	async execute(): Promise<void> {
		return await this.repository.logout();
	}
}
