import { CreateDailyCheckinRequestDTO, DailyCheckinResponseDTO, GetDailyCheckinsResponseDTO } from "@/Data/DTOs/DailyCheckinDTO";

export interface DailyCheckinDataSource {
	createDailyCheckin(data: CreateDailyCheckinRequestDTO): Promise<DailyCheckinResponseDTO>;
	getDailyCheckins(): Promise<GetDailyCheckinsResponseDTO>;
}
