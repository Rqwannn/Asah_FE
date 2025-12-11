import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SettingsCard from "./SettingsCard";

const ProfileTab = () => {
	const [photoPreview, setPhotoPreview] = useState<string | null>(null);
	const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
	const [cropModalOpen, setCropModalOpen] = useState(false);
	const [zoom, setZoom] = useState(1.2);
	const [readonlyEmail, setReadonlyEmail] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const nextUrl = URL.createObjectURL(file);
		setTempImageUrl((prev) => {
			if (prev) URL.revokeObjectURL(prev);
			return nextUrl;
		});
		setZoom(1.2);
		setCropModalOpen(true);
		event.target.value = ""; // izinkan pilih file yang sama untuk recrop
	};

	const handleConfirmCrop = () => {
		if (!tempImageUrl) return;
		const img = new Image();
		img.onload = () => {
			const canvasSize = 400;
			const canvas = document.createElement("canvas");
			canvas.width = canvasSize;
			canvas.height = canvasSize;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const side = Math.min(img.naturalWidth, img.naturalHeight) / zoom;
			const sx = (img.naturalWidth - side) / 2;
			const sy = (img.naturalHeight - side) / 2;

			ctx.drawImage(img, sx, sy, side, side, 0, 0, canvasSize, canvasSize);
			const dataUrl = canvas.toDataURL("image/png");

			setPhotoPreview((prev) => {
				if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
				return dataUrl;
			});

			setCropModalOpen(false);
			setTempImageUrl((prev) => {
				if (prev) URL.revokeObjectURL(prev);
				return null;
			});
		};
		img.src = tempImageUrl;
	};

	const handleCloseCrop = () => {
		setCropModalOpen(false);
		setTempImageUrl((prev) => {
			if (prev) URL.revokeObjectURL(prev);
			return null;
		});
	};

	useEffect(() => {
		const loadEmail = () => {
			const stored = localStorage.getItem("accountEmail");
			if (stored !== null) {
				setReadonlyEmail(stored);
			}
		};
		loadEmail();
		const onEmailUpdated = () => loadEmail();
		window.addEventListener("accountEmailUpdated", onEmailUpdated);

		return () => {
			if (photoPreview && photoPreview.startsWith("blob:")) {
				URL.revokeObjectURL(photoPreview);
			}
			if (tempImageUrl) URL.revokeObjectURL(tempImageUrl);
			window.removeEventListener("accountEmailUpdated", onEmailUpdated);
		};
	}, [photoPreview, tempImageUrl]);

	return (
		<>
			<SettingsCard>
				<div className="p-8 flex flex-col gap-8">
					{/* Header */}
					<div className="flex flex-col gap-3">
						<h2 className="text-xl font-bold text-[#111827]">User Profile</h2>
						<div className="h-px w-full bg-[#D1D5DB]"></div>
					</div>

					{/* Photo uploader */}
					<form className="flex flex-col gap-4 text-[#111827]"> {}
						<div className="flex flex-col gap-3">
							<span className="text-[13px] font-semibold">Your Photo</span>
							<div className="flex items-start gap-4">
								<div className="w-[88px] h-[88px] border border-[#C9C9C9] rounded-[4px] bg-white overflow-hidden flex items-center justify-center">
									{photoPreview && (
										<img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
									)}
								</div>
								<div className="flex flex-col gap-1">
									<label
										htmlFor="profile-upload"
											onClick={() => {
												if (fileInputRef.current) fileInputRef.current.value = "";
											}}
											className="inline-flex items-center justify-center px-3 py-1 text-[12px] font-semibold text-white bg-[#2E6A46] rounded-sm cursor-pointer hover:bg-[#25543a] w-[120px]"
										>
											Choose File
										</label>
									<input
										id="profile-upload"
										ref={fileInputRef}
										type="file"
										accept="image/*"
											className="hidden"
											onChange={handleFileChange}
										/>
									<p className="text-[10px] text-[#C34F21] max-w-[260px] leading-tight">
										*Your profile picture should be 1:1 ratio and under 2MB. {}
									</p>
								</div>
							</div>
						</div>

						{/* Form fields */}
						<label className="flex flex-col gap-1 text-[13px] font-semibold">
							<span>Full Name</span>
							<input
								type="text"
								className="h-[36px] border border-[#D1D5DB] rounded-[4px] px-3 text-[13px] font-normal focus:outline-none" 
							/>
						</label>

						<label className="flex flex-col gap-1 text-[13px] font-semibold">
							<span>Username</span>
							<input
								type="text"
								className="h-[36px] border border-[#D1D5DB] rounded-[4px] px-3 text-[13px] font-normal focus:outline-none" 
							/>
						</label>

						<label className="flex flex-col gap-1 text-[13px] font-semibold">
							<span>Email</span>
							<input
								type="email"
								pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
								className="h-[36px] border border-[#D1D5DB] rounded-[4px] px-3 text-[13px] font-normal focus:outline-none bg-[#F8F8F8] text-gray-700" 
								placeholder="you@example.com"
								value={readonlyEmail}
								readOnly
							/>
						</label>

						<label className="flex flex-col gap-1 text-[13px] font-semibold">
							<span>Headline</span>
							<input
								type="text"
								className="h-[36px] border border-[#D1D5DB] rounded-[4px] px-3 text-[13px] font-normal focus:outline-none" 
							/>
						</label>

						<label className="flex flex-col gap-1 text-[13px] font-semibold">
							<span>About You</span>
							<textarea
								className="min-h-[110px] border border-[#D1D5DB] rounded-[4px] px-3 py-2 text-[13px] font-normal focus:outline-none resize-none" 
							/>
						</label>

						
						<div className="pt-2">
							<Button className="bg-[#C34F21] hover:bg-[#a4421c] text-white text-[13px] font-semibold px-4 py-2 h-10 cursor-pointer">
								Save Changes
							</Button>
						</div>
					</form>
				</div>
			</SettingsCard>

			{/* Modal crop foto */}
					<Dialog open={cropModalOpen} onOpenChange={(open) => (!open ? handleCloseCrop() : setCropModalOpen(true))}>
				<DialogContent className="sm:max-w-[520px]">
					<DialogHeader>
						<DialogTitle>Adjust Photo (1:1)</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<div className="w-full flex justify-center">
							<div className="w-[320px] h-[320px] bg-[#F4F4F4] border border-[#E0E0E0] rounded-md overflow-hidden flex items-center justify-center">
								{tempImageUrl ? (
									<img
										src={tempImageUrl}
										alt="Crop Preview"
										className="select-none"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											transform: `scale(${zoom})`,
											transformOrigin: "center",
										}}
									/>
								) : (
									<span className="text-xs text-gray-500">Select an image first</span>
								)}
							</div>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-gray-600">Zoom</span>
							<input
								type="range"
								min={1}
								max={3}
								step={0.1}
								value={zoom}
								onChange={(e) => setZoom(Number(e.target.value))}
								className="flex-1 accent-[#2E6A46]"
							/>
						</div>
					</div>
					<DialogFooter className="mt-2">
						<Button variant="ghost" onClick={handleCloseCrop} className="cursor-pointer">
							Cancel
						</Button>
						<Button onClick={handleConfirmCrop} className="bg-[#2E6A46] hover:bg-[#25543a] cursor-pointer">
							OK
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProfileTab;
