import React, { useState } from "react";
import SettingsCard from "./SettingsCard";
import { Button } from "@/components/ui/button";

const AccountTab = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [matchError, setMatchError] = useState("");

	const validateEmail = (value: string) => {
		if (!value) {
			setEmailError("");
			localStorage.removeItem("accountEmail");
			window.dispatchEvent(new Event("accountEmailUpdated"));
			return;
		}
		if (!value.includes("@")) {
			setEmailError("Not a correct email.");
		} else {
			setEmailError("");
		}
		localStorage.setItem("accountEmail", value);
		window.dispatchEvent(new Event("accountEmailUpdated"));
	};

	const validatePassword = (pwd: string, confirm: string) => {
		const policy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$/;
		if (!pwd && !confirm) {
			setPasswordError("");
			setMatchError("");
			return;
		}
		if (!pwd) {
			setPasswordError("");
		} else if (!policy.test(pwd)) {
			setPasswordError("Password must include uppercase, lowercase, number, symbol, and be at least 8 characters.");
		} else {
			setPasswordError("");
		}
		if (!confirm) {
			setMatchError("");
		} else if (pwd !== confirm) {
			setMatchError("Passwords do not match.");
		} else {
			setMatchError("");
		}
	};

	return (
		<SettingsCard>
			<div className="p-8 flex flex-col gap-6">
				
				<div className="flex flex-col gap-3">
					<h2 className="text-xl font-bold text-[#111827]">Account</h2>
					<div className="h-px w-full bg-[#D1D5DB]"></div>
				</div>

				
				<div className="bg-white border border-[#E7E6E0] rounded-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.08)] px-5 py-5 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<h3 className="text-[16px] font-semibold text-[#111827]">Change Email</h3>
						<div className="h-px w-full bg-[#E5E7EB]"></div>
					</div>
					<div className="flex flex-col gap-2 text-[#111827]">
						<label className="text-[13px] font-semibold">New Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								validateEmail(e.target.value);
							}}
							placeholder="email@domain.com"
							className="h-[36px] border border-[#D1D5DB] rounded-[4px] px-3 text-[13px] font-normal focus:outline-none"
						/>
						{emailError && <p className="text-[12px] text-red-600 font-normal">{emailError}</p>}
						<p className="text-[12px] text-gray-600 font-normal">
							Your email will change after you click the verification link sent to the new email.
						</p>
					</div>
					<Button className="w-fit bg-[#C34F21] hover:bg-[#a4421c] text-white text-[13px] font-semibold px-4 py-2 h-10 cursor-pointer">
						Change Email
					</Button>
				</div>

				
				<div className="bg-white border border-[#E7E6E0] rounded-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.08)] px-5 py-5 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<h3 className="text-[16px] font-semibold text-[#111827]">Change Password</h3>
						<div className="h-px w-full bg-[#E5E7EB]"></div>
					</div>

					<div className="bg-[#FFF2CC] text-[#6B5B28] text-[12px] font-normal px-3 py-2 rounded-[4px] border border-[#F0E0A6]">
						Fill this if you want to change your password.
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-[13px] font-semibold">
							New Password <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center border border-[#D1D5DB] rounded-[4px] overflow-hidden">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									validatePassword(e.target.value, confirmPassword);
								}}
								placeholder="Enter new password"
								className="flex-1 h-[36px] px-3 text-[13px] font-normal focus:outline-none"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="w-10 h-[36px] flex items-center justify-center text-gray-600"
							>
								<i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
							</button>
						</div>
						<p className="text-[12px] text-gray-600 font-normal">
							Use at least 8 characters with uppercase, lowercase, numbers, and symbols.
						</p>
						{passwordError && <p className="text-[12px] text-red-600 font-normal">{passwordError}</p>}
					</div>

					<div className="flex flex-col gap-2">
						<label className="text-[13px] font-semibold">
							Confirm New Password <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center border border-[#D1D5DB] rounded-[4px] overflow-hidden">
							<input
								type={showConfirmPassword ? "text" : "password"}
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
									validatePassword(password, e.target.value);
								}}
								placeholder="Confirm password"
								className="flex-1 h-[36px] px-3 text-[13px] font-normal focus:outline-none"
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword((prev) => !prev)}
								className="w-10 h-[36px] flex items-center justify-center text-gray-600"
							>
								<i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
							</button>
						</div>
						{matchError && <p className="text-[12px] text-red-600 font-normal">{matchError}</p>}
					</div>

					<Button className="w-fit bg-[#C34F21] hover:bg-[#a4421c] text-white text-[13px] font-semibold px-4 py-2 h-10 cursor-pointer">
						Save Password
					</Button>
				</div>
			</div>
		</SettingsCard>
	);
};

export default AccountTab;
