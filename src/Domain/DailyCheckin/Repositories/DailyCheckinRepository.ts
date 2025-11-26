import { CreateDailyCheckinRequestDTO, DailyCheckinDTO } from "@/Data/DTOs/DailyCheckinDTO";

export interface DailyCheckinRepository {
	createDailyCheckin(data: CreateDailyCheckinRequestDTO): Promise<DailyCheckinDTO>;
	getDailyCheckins(): Promise<DailyCheckinDTO[]>;
}
