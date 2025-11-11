import {
	Field,
	FieldDescription,
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
import { Link } from "react-router-dom";

const schema = z
	.object({
		username: z.string().min(3, "Username minimal 3 karakter"),
		email: z.string().email("Email tidak valid"),
		password: z.string().min(6, "Password minimal 6 karakter"),
		confirm_password: z.string().min(6, "Password minimal 6 karakter"),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Konfirmasi password harus sama",
		path: ["confirm_password"],
	});

type SignUpForm = z.infer<typeof schema>;

const SignUpPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const form = useForm<SignUpForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirm_password: "",
		},
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const onSubmit = (values: SignUpForm) => {
		// Integrasikan ke API/UseCase pendaftaran di sini
		console.log("SignUp submit:", values);
	};

	return (
		<main
			className="min-h-screen bg-[#285F3E] w-full flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center relative"
			style={{ backgroundImage: `url(${bgAuth})` }}>
			<div className="absolute right-[100px] top-[50px] flex gap-2 items-center">
				<p className="text-[16px] text-white font-regular">
					Already have an account?{" "}
				</p>
				<Link to="/signin">
					<Button className="rounded-none bg-[#C34F21] hover:bg-[#C34F21]/90 cursor-pointer">
						Sign In
					</Button>
				</Link>
			</div>
			<div className="w-[564px] bg-[#FFFFFF] rounded-xl">
				<div className="py-14 px-8">
					<div className="flex flex-col items-center justify-center pb-8">
						<h1 className="text-[32px] font-bold pb-1">Create Your Account</h1>
						<p className="text-[18px] font-normal">
							Start learning and growing with us today.
						</p>
					</div>

					<div>
						<form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
							<FieldGroup>
								<Controller
									name="username"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="signup-username">
												Username
											</FieldLabel>
											<Input
												{...field}
												id="signup-username"
												placeholder="yourname"
												aria-invalid={fieldState.invalid}
											/>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>

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

								<Controller
									name="confirm_password"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="signup-confirm-password">
												Confirm Password
											</FieldLabel>
											<div className="relative">
												<Input
													{...field}
													id="signup-confirm-password"
													type={showConfirmPassword ? "text" : "password"}
													placeholder="••••••••"
													aria-invalid={fieldState.invalid}
													className="pr-10"
												/>
												<button
													type="button"
													aria-label={
														showConfirmPassword
															? "Hide confirm password"
															: "Show confirm password"
													}
													onClick={() => setShowConfirmPassword((v) => !v)}
													className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
													<i
														className={
															showConfirmPassword
																? "ri-eye-off-line"
																: "ri-eye-line"
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

							<div className="pt-8">
								<Button
									type="submit"
									className="w-full h-[57px] bg-[#285F3E] hover:bg-[#285F3E]/90 text-[18px] font-medium rounded-xl cursor-pointer">
									Next
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SignUpPage;
