import { useQuery } from "@tanstack/react-query";
import { GetJourneysUseCase } from "@/Domain/Journey/UseCases/GetJourneysUseCase";
import { GetJourneyDetailUseCase } from "@/Domain/Journey/UseCases/GetJourneyDetailUseCase";
import { GetJourneyTrackingsUseCase } from "@/Domain/Journey/UseCases/GetJourneyTrackingsUseCase";

export const useJourneys = (getJourneysUseCase: GetJourneysUseCase) => {
	return useQuery({
		queryKey: ["journeys"],
		queryFn: () => getJourneysUseCase.execute(),
	});
};

export const useJourneyDetail = (
	getJourneyDetailUseCase: GetJourneyDetailUseCase,
	id: string
) => {
	return useQuery({
		queryKey: ["journey", id],
		queryFn: () => getJourneyDetailUseCase.execute(id),
		enabled: !!id,
	});
};

export const useJourneyTrackings = (
	getJourneyTrackingsUseCase: GetJourneyTrackingsUseCase,
	id: string
) => {
	return useQuery({
		queryKey: ["journey", id, "trackings"],
		queryFn: () => getJourneyTrackingsUseCase.execute(id),
		enabled: !!id,
	});
};
