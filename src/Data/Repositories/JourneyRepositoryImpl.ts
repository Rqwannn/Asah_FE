import { ApiResponseDTO } from "@/Data/DTOs/ApiResponseDTO";
import { JourneyDTO } from "@/Data/DTOs/JourneyDTO";
import { JourneyRepository } from "@/Domain/Journey/Repositories/JourneyRepository";
import { AxiosInstance } from "axios";

export class JourneyRepositoryImpl implements JourneyRepository {
    constructor(private http: AxiosInstance) {}

    async getJourneys(): Promise<JourneyDTO[]> {
        const response = await this.http.get<ApiResponseDTO<{ journeys: JourneyDTO[] }>>("/journeys");
        return response.data.data.journeys;
    }

    async getJourney(id: string): Promise<JourneyDTO> {
        const response = await this.http.get<ApiResponseDTO<{ journey: JourneyDTO }>>(`/journeys/${id}`);
        return response.data.data.journey;
    }
}
