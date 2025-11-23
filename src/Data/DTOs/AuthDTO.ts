export interface SignInRequestDTO {
	email: string;
	password: string;
}

export interface SignUpRequestDTO {
	role: string;
	username: string;
	email: string;
	skills: string[];
	discovers: string[];
	password: string;
	confirmPassword: string;
}

export interface SignInResponseDTO {
	status: string;
	message: string;
	data: string;
}

export interface SignUpResponseDTO {
	status: string;
	message: string;
	data: {
		result: UserDTO;
		accessToken: string;
	};
}

export interface UserDTO {
	id: string;
	role: string;
	username: string;
	email: string;
	skills: string[];
	discovers: string[];
	updatedAt: string;
	createdAt: string;
}
