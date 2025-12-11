import { JourneyRepositoryImpl } from "@/Data/Repositories/JourneyRepositoryImpl";
import { GetJourneyDetailUseCase } from "@/Domain/Journey/UseCases/GetJourneyDetailUseCase";
import { GetJourneysUseCase } from "@/Domain/Journey/UseCases/GetJourneysUseCase";
import { GetJourneyTrackingsUseCase } from "@/Domain/Journey/UseCases/GetJourneyTrackingsUseCase";
import {
	useJourneyDetail,
	useJourneys,
	useJourneyTrackings,
} from "@/Presentation/Hooks/useJourney";
import { axiosInstance } from "@/Services/Http";

const journeyRepository = new JourneyRepositoryImpl(axiosInstance);
const getJourneysUseCase = new GetJourneysUseCase(journeyRepository);

const getJourneyDetailUseCase = new GetJourneyDetailUseCase(journeyRepository);
const getJourneyTrackingsUseCase = new GetJourneyTrackingsUseCase(
	journeyRepository
);

export const useJourneysFactory = () => {
	return useJourneys(getJourneysUseCase);
};

export const useJourneyDetailFactory = (id: string) => {
	return useJourneyDetail(getJourneyDetailUseCase, id);
};

export const useJourneyTrackingsFactory = (id: string) => {
	return useJourneyTrackings(getJourneyTrackingsUseCase, id);
};
