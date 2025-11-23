import { SignUpRequestDTO } from "@/Data/DTOs/AuthDTO";
import { AuthRepository } from "../Repositories/AuthRepository";
import { AuthSessionModel } from "../Models/AuthSession";

export class SignUpUseCase {
	constructor(private repository: AuthRepository) {}

	async execute(data: SignUpRequestDTO): Promise<AuthSessionModel> {
		return await this.repository.signUp(data);
	}
}
