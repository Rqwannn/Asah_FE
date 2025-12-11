import {
	CreateDailyCheckinRequestDTO,
	DailyCheckinResponseDTO,
	GetDailyCheckinsResponseDTO,
} from "@/Data/DTOs/DailyCheckinDTO";
import { DailyCheckinDataSource } from "./DailyCheckinDataSource";
import { Http } from "@/Services/Http";

export class DailyCheckinAPIDataSource implements DailyCheckinDataSource {
	async createDailyCheckin(
		data: CreateDailyCheckinRequestDTO
	): Promise<DailyCheckinResponseDTO> {
		const res = await Http.post<DailyCheckinResponseDTO>(
			"/daily-check-ins",
			data
		);
		return res.data;
	}

	async getDailyCheckins(): Promise<GetDailyCheckinsResponseDTO> {
		const res = await Http.get<GetDailyCheckinsResponseDTO>("/daily-check-ins");
		return res.data;
	}
}
