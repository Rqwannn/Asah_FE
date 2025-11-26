import { DailyCheckinDTO } from "@/Data/DTOs/DailyCheckinDTO";
import { DailyCheckinRepository } from "../Repositories/DailyCheckinRepository";

export class GetDailyCheckinsUseCase {
	private repository: DailyCheckinRepository;

	constructor(repository: DailyCheckinRepository) {
		this.repository = repository;
	}

	async execute(): Promise<DailyCheckinDTO[]> {
		return this.repository.getDailyCheckins();
	}
}
