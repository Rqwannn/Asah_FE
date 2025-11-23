import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import bgAuth from "@/assets/bg-auth.svg";
import { Link } from "react-router-dom";
import RecomendationCard from "../../Components/RecomendationCard";
import { SignUpRequestDTO } from "@/Data/DTOs/AuthDTO";
import { useAuthFactory } from "@/App/Factories/useAuthFactory";

const SKILLS = [
	{
		id: 1,
		icon: '<i class="ri-brain-fill"></i>',
		title: "Programming",
		description:
			"Learn how to build apps, websites, and solve problems through code.",
	},
	{
		id: 2,
		icon: '<i class="ri-lightbulb-fill"></i>',
		title: "Design Thinking",
		description:
			"Discover creative ways to solve real-world challenges with user-centered design.",
	},
	{
		id: 3,
		icon: '<i class="ri-palette-fill"></i>',
		title: "Graphic Design",
		description:
			"Master visual storytelling through colors, typography, and layout.",
	},
	{
		id: 4,
		icon: '<i class="ri-bar-chart-2-fill"></i>',
		title: "Data Science",
		description:
			"Explore how to analyze data and turn insights into smart decisions.",
	},
	{
		id: 5,
		icon: '<i class="ri-discuss-fill"></i>',
		title: "Communication Skills",
		description:
			"Improve how you express ideas clearly and connect with others effectively.",
	},
	{
		id: 6,
		icon: '<i class="ri-megaphone-fill"></i>',
		title: "Digital Marketing",
		description:
			"Learn to grow brands and reach audiences using online strategies and analytics.",
	},
];

const DISCOVERS = [
	{
		id: 1,
		icon: '<i class="ri-global-fill"></i>',
		title: "Search Engine (Google, Bing, etc.)",
	},
	{
		id: 2,
		icon: '<i class="ri-instagram-line"></i>',
		title: "Social Media (Instagram, TikTok, Twitter, etc.)",
	},
	{
		id: 3,
		icon: '<i class="ri-group-fill"></i>',
		title: "Friend or Colleague Recommendation",
	},
	{
		id: 4,
		icon: '<i class="ri-mail-fill"></i>',
		title: "Email or Newsletter",
	},
	{
		id: 5,
		icon: '<i class="ri-smartphone-fill"></i>',
		title: "Online Advertisement",
	},
	{
		id: 6,
		icon: '<i class="ri-book-fill"></i>',
		title: "Blog or Article",
	},
	{
		id: 7,
		icon: '<i class="ri-graduation-cap-fill"></i>',
		title: "School or University",
	},
	{
		id: 8,
		icon: '<i class="ri-more-fill"></i>',
		title: "Other",
	},
];

const schema = z
	.object({
		role: z.string(),
		username: z.string().min(3, "Username minimal 3 karakter"),
		email: z.string().email("Email tidak valid"),
		password: z.string().min(6, "Password minimal 6 karakter"),
		confirmPassword: z.string().min(6, "Password minimal 6 karakter"),
		skills: z.array(z.string()).min(1, "Pilih maksimal 1 skill"),
		discovers: z.array(z.string()).min(1, "Pilih maksimal 1"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Konfirmasi password harus sama",
		path: ["confirmPassword"],
	});

type SignUpForm = z.infer<typeof schema>;

const SignUpPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [selectedDiscovers, setSelectedDiscovers] = useState<string[]>([]);
	const [step, setStep] = useState<number>(1);
	const form = useForm<SignUpForm>({
		resolver: zodResolver(schema),
		defaultValues: {
			role: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			skills: [],
			discovers: [],
		},
		mode: "onBlur",
		reValidateMode: "onChange",
	});
	// Penentuan disabled untuk tombol Next berdasarkan step saat ini
	const watched = form.watch();
	const isStep1Incomplete =
		!watched.username ||
		!watched.email ||
		!watched.password ||
		!watched.confirmPassword ||
		watched.password !== watched.confirmPassword ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watched.email);
	const isNextDisabled =
		step === 1
			? isStep1Incomplete
			: step === 2
			? selectedSkills.length === 0
			: selectedDiscovers.length === 0;

	const { useSignUp } = useAuthFactory();
	const { signUp, loading, error } = useSignUp();

	const handleSkillSelect = (title: string, checked: boolean) => {
		setSelectedSkills((prev) => {
			const updated = checked
				? [...prev, title]
				: prev.filter((item) => item !== title);
			form.setValue("skills", updated, { shouldValidate: true });
			return updated;
		});
	};

	const handleDiscoverSelect = (title: string, checked: boolean) => {
		setSelectedDiscovers((prev) => {
			const updated = checked
				? [...prev, title]
				: prev.filter((item) => item !== title);
			form.setValue("discovers", updated, { shouldValidate: true });
			return updated;
		});
	};

	const onSubmit = async (values: SignUpRequestDTO) => {
		// Integrasikan ke API/UseCase pendaftaran di sini
		console.log("SignUp submit:", values);
		const res = await signUp(values);
		console.log(res);
	};

	useEffect(() => {
		form.setValue("role", "user");
	}, []);
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
			<div className="w-[564px] bg-[#FFFFFF] rounded-xl overflow-x-hidden py-5">
				<div
					className={`flex w-[300%] h-[500px] min-h-0 transition-transform duration-500 ease-in-out ${
						step === 1
							? "translate-x-0"
							: step === 2
							? "-translate-x-[33.3333%]"
							: "-translate-x-[66.6667%]"
					}`}>
					<div
						className={`flex flex-col w-1/3 shrink-0 h-full min-h-0`}
						id="section1">
						<div className="flex flex-col items-center justify-center pb-5 border-b-2 ">
							<h1 className="text-[32px] font-bold pb-1">
								Create Your Account
							</h1>
							<p className="text-[18px] font-normal">
								Start learning and growing with us today.
							</p>
						</div>

						<div className="flex-1 p-7 overflow-y-auto">
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
										name="confirmPassword"
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
							</form>
						</div>
					</div>

					<div
						id="section2"
						className="flex flex-col w-1/3 shrink-0 h-full min-h-0 flex-nowrap">
						<div className="flex flex-col items-start justify-center px-7 pb-5 border-b-2">
							<h1 className="text-[32px] font-bold pb-1">
								Tell us more about you ✨
							</h1>
							<p className="text-[18px] font-normal">
								What subjects or skills are you interested in learning?
							</p>
						</div>

						<div
							className={`flex-1 min-h-0 grid grid-cols-2 gap-3 p-7 overflow-y-auto`}>
							{SKILLS.map((skill, ii) => {
								return (
									<RecomendationCard
										key={ii}
										data={skill}
										onChange={handleSkillSelect}
										isChecked={selectedSkills.includes(
											skill.title
										)}></RecomendationCard>
								);
							})}
						</div>
					</div>

					<div
						id="section3"
						className="flex flex-col w-1/3 shrink-0 h-full min-h-0">
						<div className="flex flex-col items-start justify-center px-7 pb-5 border-b-2">
							<h1 className="text-[32px] font-bold pb-1">
								Tell us more about you ✨
							</h1>
							<p className="text-[18px] font-normal">
								How did you discover this website?
							</p>
						</div>

						<div
							className={`flex-1 min-h-0 grid grid-cols-2 gap-3 p-7 overflow-y-auto`}>
							{DISCOVERS.map((discover, ii) => {
								return (
									<RecomendationCard
										key={ii}
										data={discover}
										onChange={handleDiscoverSelect}
										isChecked={selectedDiscovers.includes(
											discover.title
										)}></RecomendationCard>
								);
							})}
						</div>
					</div>
				</div>

				<div className="px-7 w-full pt-5 border-t-2 flex items-center justify-between gap-3">
					{/* Step Indicator */}
					<div
						className="flex items-center gap-2"
						aria-label="Step indicator"
						role="status">
						{[1, 2, 3].map((i) => (
							<span
								key={i}
								className={`${
									i === step ? "bg-[#285F3E] w-10 h-3" : "bg-gray-300 w-3 h-3"
								} rounded-full transition-all duration-300 ease-in-out inline-block`}
							/>
						))}
					</div>
					<div className="w-1/2 flex gap-3">
						<Button
							type="button"
							onClick={async () => {
								setStep(step - 1);
							}}
							className={`h-[57px] bg-[#FFFFFF] hover:bg-[#F5F5F5] text-[#285F3E] border border-[#285F3E] text-[18px] font-medium rounded-xl cursor-pointer px-6 ${
								step > 1 ? "flex-1" : "hidden"
							}`}>
							Previous
						</Button>
						<Button
							type="button"
							disabled={isNextDisabled}
							aria-disabled={isNextDisabled}
							onClick={async () => {
								if (step === 1) {
									const valid = await form.trigger([
										"username",
										"email",
										"password",
										"confirmPassword",
									]);
									if (valid) setStep(2);
								} else if (step === 2) {
									setStep(3);
								} else {
									// Submit seluruh form (termasuk validasi skills)
									form.handleSubmit(onSubmit)();
								}
							}}
							className="flex-1 h-[57px] bg-[#285F3E] hover:bg-[#285F3E]/90 disabled:bg-[#285F3E]/40 disabled:hover:bg-[#285F3E]/40 disabled:text-white/70 disabled:cursor-not-allowed disabled:opacity-60 text-[18px] font-medium rounded-xl cursor-pointer px-6">
							{step < 3 ? "Next" : "Sign Up"}
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SignUpPage;
