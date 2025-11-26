import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import bgAuth from "@/assets/bg-auth.svg";
import { Link, useNavigate } from "react-router-dom";
import { SignInRequestDTO } from "@/Data/DTOs/AuthDTO";
import { useAuthFactory } from "@/App/Factories/useAuthFactory";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
	email: z.string().email("Email tidak valid"),
	password: z.string().min(6, "Password minimal 6 karakter"),
});

type SignUpForm = z.infer<typeof schema>;

const SignInPage = () => {

	const [showPassword, setShowPassword] = React.useState(false);
	const { useSignIn } = useAuthFactory();
	const { signIn, loading, error } = useSignIn();
	const form = useForm<SignUpForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onSubmit",
		reValidateMode: "onChange",
	});


	const navigate = useNavigate();
	const { toast } = useToast();

	const onSubmit = async (values: SignInRequestDTO) => {
		try {
			const res = await signIn(values);
			if (res) {
				toast("Login successful! Welcome back.", "success");
				navigate("/");
			}
		} catch (error) {
			toast("Login failed. Please check your credentials.", "error");
		}
	};

	return (
		<main
			className="min-h-screen bg-[#285F3E] w-full flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center relative"
			style={{ backgroundImage: `url(${bgAuth})` }}>
			<div className="absolute right-[100px] top-[50px] flex gap-2 items-center">
				<p className="text-[16px] text-white font-regular">No Account yet? </p>
				<Link to="/signup">
					<Button className="rounded-none bg-[#C34F21] hover:bg-[#C34F21]/90 cursor-pointer">
						Sign Up
					</Button>
				</Link>
			</div>
			<div className="w-[564px] bg-[#FFFFFF] rounded-xl">
				<div className="pb-7 px-7 pt-14">
					<div className="flex items-center justify-center size-16 mx-auto mb-7  bg-[#285F3E] rounded-xl text-white font-medium text-[36px]">
						<i className="ri-login-box-line"></i>
					</div>

					<div className="flex flex-col items-center justify-center pb-7">
						<h1 className="text-[32px] font-bold pb-1">Welcome Back!</h1>
						<p className="text-[18px] font-normal">
							Access your learning journey anytime, anywhere.
						</p>
					</div>

					<div>
						<form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
							<FieldGroup>
								<Controller
									name="email"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="signup-email">Email</FieldLabel>
											<Input
												{...field}
												id="signup-email"
												type="email"
												placeholder="you@example.com"
												aria-invalid={fieldState.invalid}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>

								<Controller
									name="password"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="signup-password">
												Password
											</FieldLabel>
											<div className="relative">
												<Input
													{...field}
													id="signup-password"
													type={showPassword ? "text" : "password"}
													placeholder="••••••••"
													aria-invalid={fieldState.invalid}
													className="pr-10"
												/>
												<button
													type="button"
													aria-label={
														showPassword ? "Hide password" : "Show password"
													}
													onClick={() => setShowPassword((v) => !v)}
													className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
													<i
														className={
															showPassword ? "ri-eye-off-line" : "ri-eye-line"
														}
													/>
												</button>
											</div>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</FieldGroup>

							<div className="py-5 text-right font-medium text-[18px]">
								<Link to="/forgot-password">
									<span>Forgot Password?</span>
								</Link>
							</div>

							<div className="">
								<Button
									type="submit"
									className="w-full h-[57px] bg-[#285F3E] hover:bg-[#285F3E]/90 text-[18px] font-medium rounded-xl cursor-pointer">
									Sign In
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SignInPage;
