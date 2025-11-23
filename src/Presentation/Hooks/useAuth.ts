import { useMutation } from "@tanstack/react-query";
import { SignInRequestDTO, SignUpRequestDTO } from "@/Data/DTOs/AuthDTO";
import { SignInUseCase } from "@/Domain/Auth/UseCases/SignInUseCase";
import { SignUpUseCase } from "@/Domain/Auth/UseCases/SignUpUseCase";

export const useSignIn = (signInUseCase: SignInUseCase) => {
	const mutation = useMutation({
		mutationFn: async (data: SignInRequestDTO) => {
			const res = await signInUseCase.execute(data);

			if (res.token) localStorage.setItem("accessToken", res.token);
			if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

			return res;
		},
	});

	return {
		signIn: mutation.mutateAsync,
		loading: mutation.isPending,
		error: mutation.error,
	};
};

export const useSignUp = (signUpUseCase: SignUpUseCase) => {
	const mutation = useMutation({
		mutationFn: async (data: SignUpRequestDTO) => {
			const res = await signUpUseCase.execute(data);

			if (res.token) localStorage.setItem("accessToken", res.token);
			if (res.user) localStorage.setItem("user", JSON.stringify(res.user));

			return res;
		},
	});

	return {
		signUp: mutation.mutateAsync,
		loading: mutation.isPending,
		error: mutation.error,
	};
};
