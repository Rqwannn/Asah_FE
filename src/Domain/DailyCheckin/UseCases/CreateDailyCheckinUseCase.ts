import { CreateDailyCheckinRequestDTO, DailyCheckinDTO } from "@/Data/DTOs/DailyCheckinDTO";
import { DailyCheckinRepository } from "../Repositories/DailyCheckinRepository";

export class CreateDailyCheckinUseCase {
	private repository: DailyCheckinRepository;

	constructor(repository: DailyCheckinRepository) {
		this.repository = repository;
	}

	async execute(data: CreateDailyCheckinRequestDTO): Promise<DailyCheckinDTO> {
		return this.repository.createDailyCheckin(data);
	}
}
