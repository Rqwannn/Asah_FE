import { AuthAPIDataSource } from "@/Data/DataSources/Auth/AuthAPIDataSource";
import { AuthRepositoryImpl } from "@/Data/Repositories/AuthRepositoryImpl";
import { SignInUseCase } from "@/Domain/Auth/UseCases/SignInUseCase";
import { SignUpUseCase } from "@/Domain/Auth/UseCases/SignUpUseCase";
import { useSignIn, useSignUp } from "@/Presentation/Hooks/useAuth";

export const useAuthFactory = () => {
	const datasource = new AuthAPIDataSource();
	const repo = new AuthRepositoryImpl(datasource);

	return {
		useSignIn: () => useSignIn(new SignInUseCase(repo)),
		useSignUp: () => useSignUp(new SignUpUseCase(repo)),
	};
};
