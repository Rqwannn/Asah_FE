import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember me:", rememberMe);
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-4">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-28 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] opacity-70" />
        <div className="absolute -left-[18%] top-[22%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_55%)] opacity-60" />
        <div className="absolute right-[-6%] top-[18%] h-[640px] w-[640px] rotate-[12deg] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.12)_0,rgba(0,0,0,0.09)_38%,transparent_60%)] opacity-[0.32]" />
        <div className="absolute right-[6%] bottom-[-18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.05)_42%,transparent_65%)] opacity-60" />
      </div>

      <div className="absolute right-10 top-8 z-20 flex items-center gap-3 text-white">
        <span className="text-sm">No Account yet?</span>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-sm bg-[#c06836] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#c77540] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-primary"
        >
          Sign Up
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[540px] rounded-card bg-white px-10 pb-12 pt-16 shadow-card">
        <div className="absolute left-1/2 top-6 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl bg-primary text-white shadow-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-9 0l3-3m0 0l3-3m-3 3h8.25"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="font-baloo text-[28px] font-bold text-[#111827]">
            Welcome Back!
          </h1>
          <p className="mt-2 text-base font-medium text-slateMuted">
            Access your learning journey anytime, anywhere.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-inputBorder bg-white px-3 py-[10px] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(31,104,74,0.08)]">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-white shadow-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.01 1.874l-6.591 4.194a2.25 2.25 0 01-2.438 0L3.26 8.867a2.25 2.25 0 01-1.01-1.874V6.75"
                />
              </svg>
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-none bg-transparent text-base text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-inputBorder bg-white px-3 py-[10px] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(31,104,74,0.08)]">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-white shadow-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5m-.75 9.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-none bg-transparent text-base text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-[#9ca3af] transition hover:text-primary focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M9.88 9.88a3 3 0 014.24 4.24M9.88 9.88L6.1 6.1M14.12 14.12L17.9 17.9M6.1 6.1A10.45 10.45 0 003 12c1.274 4.057 5.064 7 9.542 7 .986 0 1.94-.141 2.842-.404M17.9 17.9A10.45 10.45 0 0021 12c-1.274-4.057-5.064-7-9.542-7-.987 0-1.94.141-2.842.404"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-slateMuted">
            <label className="inline-flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                className="h-4 w-4 rounded border border-[#cfcfcf] accent-primary/70"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="font-semibold text-[#4b5563] transition hover:text-primary"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="mt-4 h-12 w-full rounded-xl bg-[#1f684a] text-base font-semibold text-white shadow-[0_10px_18px_rgba(10,73,46,0.35)] transition hover:bg-[#1b5a3e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
