export interface CreateDailyCheckinRequestDTO {
	mood: string;
	description: string;
}

export interface DailyCheckinDTO {
	id: string;
	userId: string;
	date: string;
	mood: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface DailyCheckinResponseDTO {
	status: string;
	data: DailyCheckinDTO;
}

export interface GetDailyCheckinsResponseDTO {
	status: string;
	results: number;
	data: DailyCheckinDTO[];
}
