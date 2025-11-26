import { JourneyDTO } from "@/Data/DTOs/JourneyDTO";

export interface JourneyRepository {
    getJourneys(): Promise<JourneyDTO[]>;
    getJourney(id: string): Promise<JourneyDTO>;
}
