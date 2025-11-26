import { useQuery } from "@tanstack/react-query";
import { GetJourneysUseCase } from "@/Domain/Journey/UseCases/GetJourneysUseCase";
import { GetJourneyDetailUseCase } from "@/Domain/Journey/UseCases/GetJourneyDetailUseCase";

export const useJourneys = (getJourneysUseCase: GetJourneysUseCase) => {
    return useQuery({
        queryKey: ["journeys"],
        queryFn: () => getJourneysUseCase.execute(),
    });
};

export const useJourneyDetail = (getJourneyDetailUseCase: GetJourneyDetailUseCase, id: string) => {
    return useQuery({
        queryKey: ["journey", id],
        queryFn: () => getJourneyDetailUseCase.execute(id),
        enabled: !!id,
    });
};
