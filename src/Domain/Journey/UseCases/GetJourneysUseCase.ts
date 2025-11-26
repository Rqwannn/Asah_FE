import { JourneyRepository } from "@/Domain/Journey/Repositories/JourneyRepository";

export class GetJourneysUseCase {
    constructor(private repository: JourneyRepository) {}

    async execute() {
        return this.repository.getJourneys();
    }
}
