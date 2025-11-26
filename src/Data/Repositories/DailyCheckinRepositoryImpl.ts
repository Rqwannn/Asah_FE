import { CreateDailyCheckinRequestDTO, DailyCheckinDTO } from "@/Data/DTOs/DailyCheckinDTO";
import { DailyCheckinDataSource } from "@/Data/DataSources/DailyCheckin/DailyCheckinDataSource";
import { DailyCheckinRepository } from "@/Domain/DailyCheckin/Repositories/DailyCheckinRepository";

export class DailyCheckinRepositoryImpl implements DailyCheckinRepository {
	private dataSource: DailyCheckinDataSource;

	constructor(dataSource: DailyCheckinDataSource) {
		this.dataSource = dataSource;
	}

	async createDailyCheckin(data: CreateDailyCheckinRequestDTO): Promise<DailyCheckinDTO> {
		const res = await this.dataSource.createDailyCheckin(data);
		return res.data;
	}

	async getDailyCheckins(): Promise<DailyCheckinDTO[]> {
		const res = await this.dataSource.getDailyCheckins();
		return res.data;
	}
}
