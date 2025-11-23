import { SignInRequestDTO, SignUpRequestDTO } from "@/Data/DTOs/AuthDTO";
import { AuthSessionModel } from "../Models/AuthSession";

export interface AuthRepository {
	signIn(data: SignInRequestDTO): Promise<AuthSessionModel>;
	signUp(data: SignUpRequestDTO): Promise<AuthSessionModel>;
	logout(): Promise<void>;
	getCurrentSession(): Promise<AuthSessionModel | null>;
}
