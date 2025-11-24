import { AuthRepository } from "@/Domain/Auth/Repositories/AuthRepository";
import { AuthDataSource } from "../DataSources/Auth/AuthDataSource";
import { AuthSessionModel } from "@/Domain/Auth/Models/AuthSession";
import { SignInRequestDTO, SignUpRequestDTO } from "../DTOs/AuthDTO";
import { UserModel } from "@/Domain/Auth/Models/User";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
	id: string;
	role: string;
	username: string;
	email: string;
	skills: string[];
	discovers: string[];
	exp: number;
	iat: number;
}

export class AuthRepositoryImpl implements AuthRepository {
	datasource: AuthDataSource;

	constructor(datasource: AuthDataSource) {
		this.datasource = datasource;
	}

	async signIn(data: SignInRequestDTO): Promise<AuthSessionModel> {
		const res = await this.datasource.signIn(data);
		const decoded = jwtDecode<JwtPayload>(res.data);

		const user = new UserModel(
			decoded.id,
			decoded.username,
			decoded.email,
			decoded.skills,
			decoded.discovers
		);

		return new AuthSessionModel(res.data, user);
	}

	async signUp(data: SignUpRequestDTO): Promise<AuthSessionModel> {
		const res = await this.datasource.signUp(data);

		return new AuthSessionModel(res.data.accessToken, res.data.result);
	}

	async logout(): Promise<void> {
		await this.datasource.logout();
	}

	async getCurrentSession(): Promise<AuthSessionModel | null> {
		return null;
	}
}
