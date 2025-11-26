import { JourneyRepository } from "@/Domain/Journey/Repositories/JourneyRepository";

export class GetJourneyDetailUseCase {
    constructor(private repository: JourneyRepository) {}

    async execute(id: string) {
        return this.repository.getJourney(id);
    }
}
