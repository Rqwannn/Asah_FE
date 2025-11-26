import {
	SignInRequestDTO,
	SignInResponseDTO,
	SignUpRequestDTO,
	SignUpResponseDTO,
} from "@/Data/DTOs/AuthDTO";
import { AuthDataSource } from "./AuthDataSource";
import { Http } from "@/Services/Http";

export class AuthAPIDataSource implements AuthDataSource {
	async signIn(data: SignInRequestDTO): Promise<SignInResponseDTO> {
		const res = await Http.post<SignInResponseDTO>("/api/auth/sign-in", data);
		return res.data;
	}

	async signUp(data: SignUpRequestDTO): Promise<SignUpResponseDTO> {
		const res = await Http.post<SignUpResponseDTO>("/api/auth/sign-up", data);
		return res.data;
	}

	async logout(): Promise<void> {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("user");
		return;
	}
}
