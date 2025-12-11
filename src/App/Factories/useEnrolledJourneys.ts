import { useQueries } from "@tanstack/react-query";
import { JourneyDTO } from "@/Data/DTOs/JourneyDTO";
import { GetJourneyCompletion } from "@/Domain/Journey/UseCase/GetJourneyCompletion";
import { JourneyCompletionRepositoryImpl } from "@/Data/Repositories/JourneyCompletionRepositoryImpl";
import { JourneyCompletionDataSource } from "@/Data/DataSources/JourneyCompletionDataSource";
import { axiosInstance } from "@/Services/Http";

// Setup dependencies manually since we are not in a full DI container environment in React components
// Ideally this should be imported from a centralized container/factory
const dataSource = new JourneyCompletionDataSource();
const repository = new JourneyCompletionRepositoryImpl(dataSource);
const getJourneyCompletion = new GetJourneyCompletion(repository);

export const useEnrolledJourneys = (journeys: JourneyDTO[] | undefined) => {
	const results = useQueries({
		queries: (journeys || []).map((journey) => ({
			queryKey: ["journeyCompletion", String(journey.id)],
			queryFn: () => getJourneyCompletion.execute(String(journey.id)),
			retry: false, // Don't retry if 404 or fails, just assume not enrolled
			staleTime: 1000 * 60 * 5, // Cache for 5 mins
		})),
	});

	if (!journeys) return [];

	// Filter journeys where the corresponding completion query was successful and returned data
	const enrolledJourneys = journeys.filter((journey, index) => {
		const queryResult = results[index];
		return queryResult.data && queryResult.isSuccess;
	});

	return enrolledJourneys;
};
