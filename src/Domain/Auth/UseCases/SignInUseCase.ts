import { SignInRequestDTO, SignInResponseDTO } from "@/Data/DTOs/AuthDTO";
import { AuthRepository } from "../Repositories/AuthRepository";
import { AuthSessionModel } from "../Models/AuthSession";

export class SignInUseCase {
	constructor(private repository: AuthRepository) {}

	async execute(data: SignInRequestDTO): Promise<AuthSessionModel> {
		return await this.repository.signIn(data);
	}
}
