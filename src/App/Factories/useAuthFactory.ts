import { AuthAPIDataSource } from "@/Data/DataSources/Auth/AuthAPIDataSource";
import { AuthRepositoryImpl } from "@/Data/Repositories/AuthRepositoryImpl";
import { LogoutUseCase } from "@/Domain/Auth/UseCases/LogoutUseCase";
import { SignInUseCase } from "@/Domain/Auth/UseCases/SignInUseCase";
import { SignUpUseCase } from "@/Domain/Auth/UseCases/SignUpUseCase";
import { useSignIn, useSignUp, useLogout } from "@/Presentation/Hooks/useAuth";

export const useAuthFactory = () => {
	const datasource = new AuthAPIDataSource();
	const repo = new AuthRepositoryImpl(datasource);

	return {
		useSignIn: () => useSignIn(new SignInUseCase(repo)),
		useSignUp: () => useSignUp(new SignUpUseCase(repo)),
		useLogout: () => useLogout(new LogoutUseCase(repo)),
	};
};
