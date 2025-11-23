import {
	SignInRequestDTO,
	SignInResponseDTO,
	SignUpRequestDTO,
	SignUpResponseDTO,
} from "@/Data/DTOs/AuthDTO";

export interface AuthDataSource {
	signIn(data: SignInRequestDTO): Promise<SignInResponseDTO>;
	signUp(data: SignUpRequestDTO): Promise<SignUpResponseDTO>;
	logout(): Promise<void>;
}
