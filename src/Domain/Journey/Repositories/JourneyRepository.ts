import { JourneyDTO } from "@/Data/DTOs/JourneyDTO";
import { JourneyTrackingResponseDTO } from "@/Data/DTOs/JourneyTrackingDTO";

export interface JourneyRepository {
	getJourneys(): Promise<JourneyDTO[]>;
	getJourney(id: string): Promise<JourneyDTO>;
	getJourneyTrackings(id: string): Promise<JourneyTrackingResponseDTO[]>;
}
