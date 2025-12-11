import { JourneyTrackingResponseDTO } from "@/Data/DTOs/JourneyTrackingDTO";
import { JourneyRepository } from "@/Domain/Journey/Repositories/JourneyRepository";

export class GetJourneyTrackingsUseCase {
	constructor(private journeyRepository: JourneyRepository) {}

	async execute(id: string): Promise<JourneyTrackingResponseDTO[]> {
		return this.journeyRepository.getJourneyTrackings(id);
	}
}
