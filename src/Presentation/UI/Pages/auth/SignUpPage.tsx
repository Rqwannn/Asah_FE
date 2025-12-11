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
import { Link, useNavigate } from "react-router-dom";
import RecomendationCard from "../../Components/RecomendationCard";
import { SignUpRequestDTO } from "@/Data/DTOs/AuthDTO";
import { useAuthFactory } from "@/App/Factories/useAuthFactory";
import { useToast } from "@/components/ui/use-toast";

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

  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (values: SignUpRequestDTO) => {
    try {
      const res = await signUp(values);
      if (res) {
        toast("Account created successfully! Welcome aboard.", "success");
        navigate("/");
      }
    } catch (error) {
      toast("Registration failed. Please try again.", "error");
    }
  };

  useEffect(() => {
    form.setValue("role", "user");
  }, []);
  return (
    <main
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#285F3E] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgAuth})` }}
    >
      <div className="absolute top-4 right-4 flex items-center gap-2 sm:top-8 sm:right-8 lg:top-[50px] lg:right-[100px]">
        <p className="font-regular text-[16px] text-white">
          Already have an account?{" "}
        </p>
        <Link to="/signin">
          <Button className="cursor-pointer rounded-none bg-[#C34F21] hover:bg-[#C34F21]/90">
            Sign In
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-[90%] overflow-x-hidden rounded-lg bg-[#FFFFFF] py-4 sm:max-w-md sm:rounded-xl sm:py-5 lg:max-w-lg">
        <div
          className={`flex h-[430px] min-h-0 w-[300%] transition-transform duration-500 ease-in-out sm:h-[480px] lg:h-[500px] ${
            step === 1
              ? "translate-x-0"
              : step === 2
                ? "-translate-x-[33.3333%]"
                : "-translate-x-[66.6667%]"
          }`}
        >
          <div
            className={`flex h-full min-h-0 w-1/3 shrink-0 flex-col`}
            id="section1"
          >
            <div className="flex flex-col items-center justify-center border-b-2 pb-4 sm:pb-5">
              <h1 className="pb-1 text-2xl font-bold sm:text-3xl lg:text-[32px]">
                Create Your Account
              </h1>
              <p className="px-4 text-center text-sm font-normal sm:text-base lg:text-[18px]">
                Start learning and growing with us today.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
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
                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                          >
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
                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                          >
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
            className="flex h-full min-h-0 w-1/3 shrink-0 flex-col flex-nowrap"
          >
            <div className="flex flex-col items-start justify-center border-b-2 px-4 pb-4 sm:px-6 sm:pb-5 lg:px-7">
              <h1 className="pb-1 text-2xl font-bold sm:text-3xl lg:text-[32px]">
                Tell us more about you ✨
              </h1>
              <p className="text-sm font-normal sm:text-base lg:text-[18px]">
                What subjects or skills are you interested in learning?
              </p>
            </div>

            <div
              className={`grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto p-4 sm:grid-cols-2 sm:gap-3 sm:p-6 lg:p-7`}
            >
              {SKILLS.map((skill, ii) => {
                return (
                  <RecomendationCard
                    key={ii}
                    data={skill}
                    onChange={handleSkillSelect}
                    isChecked={selectedSkills.includes(skill.title)}
                  ></RecomendationCard>
                );
              })}
            </div>
          </div>

          <div
            id="section3"
            className="flex h-full min-h-0 w-1/3 shrink-0 flex-col"
          >
            <div className="flex flex-col items-start justify-center border-b-2 px-7 pb-5">
              <h1 className="pb-1 text-[32px] font-bold">
                Tell us more about you ✨
              </h1>
              <p className="text-sm font-normal sm:text-base lg:text-[18px]">
                How did you discover this website?
              </p>
            </div>

            <div
              className={`grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-y-auto p-4 sm:grid-cols-2 sm:gap-3 sm:p-6 lg:p-7`}
            >
              {DISCOVERS.map((discover, ii) => {
                return (
                  <RecomendationCard
                    key={ii}
                    data={discover}
                    onChange={handleDiscoverSelect}
                    isChecked={selectedDiscovers.includes(discover.title)}
                  ></RecomendationCard>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-3 border-t-2 px-4 pt-5 lg:px-7">
          {/* Step Indicator */}
          <div
            className="flex items-center gap-2"
            aria-label="Step indicator"
            role="status"
          >
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`${
                  i === step ? "h-3 w-10 bg-[#285F3E]" : "h-3 w-3 bg-gray-300"
                } inline-block rounded-full transition-all duration-300 ease-in-out`}
              />
            ))}
          </div>
          <div className="flex w-full gap-3">
            <Button
              type="button"
              onClick={async () => {
                setStep(step - 1);
              }}
              className={`h-12 cursor-pointer rounded-lg border border-[#285F3E] bg-[#FFFFFF] px-4 text-sm font-medium text-[#285F3E] hover:bg-[#F5F5F5] sm:h-14 sm:rounded-xl sm:px-6 sm:text-base lg:h-[57px] lg:text-[18px] ${
                step > 1 ? "flex-1" : "hidden"
              }`}
            >
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
              className="h-12 flex-1 cursor-pointer rounded-lg bg-[#285F3E] px-4 text-sm font-medium hover:bg-[#285F3E]/90 disabled:cursor-not-allowed disabled:bg-[#285F3E]/40 disabled:text-white/70 disabled:opacity-60 disabled:hover:bg-[#285F3E]/40 sm:h-14 sm:rounded-xl sm:px-6 sm:text-base lg:h-[57px] lg:text-[18px]"
            >
              {step < 3 ? "Next" : "Sign Up"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
