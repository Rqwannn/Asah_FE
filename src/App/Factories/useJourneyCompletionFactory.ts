import { useQuery } from "@tanstack/react-query";
import { JourneyCompletionDataSource } from "../../Data/DataSources/JourneyCompletionDataSource";
import { JourneyCompletionRepositoryImpl } from "../../Data/Repositories/JourneyCompletionRepositoryImpl";
import { GetJourneyCompletion } from "../../Domain/Journey/UseCase/GetJourneyCompletion";
import { JourneyCompletionModel } from "../../Domain/Journey/Models/JourneyCompletion";

export const useJourneyCompletionFactory = (journeyId: string) => {
	const dataSource = new JourneyCompletionDataSource();
	const repository = new JourneyCompletionRepositoryImpl(dataSource);
	const getCompletion = new GetJourneyCompletion(repository);

	return useQuery<JourneyCompletionModel | null>({
		queryKey: ["journeyCompletion", journeyId],
		queryFn: () => getCompletion.execute(journeyId),
		enabled: !!journeyId,
	});
};
