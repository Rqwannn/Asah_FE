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
    // res.data is now UserDTO & { accessToken: string }
    const { accessToken } = res.data;
    const decoded = jwtDecode<JwtPayload>(accessToken);

    const user = new UserModel(
      res.data.id,
      res.data.username,
      res.data.email,
      res.data.skills,
      res.data.discovers,
      res.data.role,
      decoded.iat,
      decoded.exp,
      res.data.predicted_label,
      res.data.lime_visualization,
      res.data.confidence_visualization,
    );

    return new AuthSessionModel(accessToken, user);
  }

  async signUp(data: SignUpRequestDTO): Promise<AuthSessionModel> {
    const res = await this.datasource.signUp(data);
    const decoded = jwtDecode<JwtPayload>(res.data.accessToken);

    const user = new UserModel(
      res.data.id,
      res.data.username,
      res.data.email,
      res.data.skills,
      res.data.discovers,
      res.data.role,
      decoded.iat,
      decoded.exp,
    );

    return new AuthSessionModel(res.data.accessToken, user);
  }

  async logout(): Promise<void> {
    await this.datasource.logout();
  }

  async getCurrentSession(): Promise<AuthSessionModel | null> {
    return null;
  }
}
