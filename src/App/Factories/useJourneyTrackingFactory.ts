import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { JourneyTrackingDataSource } from "../../Data/DataSources/JourneyTrackingDataSource";
import { JourneyTrackingRepositoryImpl } from "../../Data/Repositories/JourneyTrackingRepositoryImpl";
import { GetJourneyTrackings } from "../../Domain/Journey/UseCase/GetJourneyTrackings";
import { PostJourneyTracking } from "../../Domain/Journey/UseCase/PostJourneyTracking";
import { JourneyTrackingModel } from "../../Domain/Journey/Models/JourneyTracking";

const dataSource = new JourneyTrackingDataSource();
const repository = new JourneyTrackingRepositoryImpl(dataSource);
const getTrackings = new GetJourneyTrackings(repository);
const postTracking = new PostJourneyTracking(repository);

export const useJourneyTrackingsFactory = (journeyId: string) => {
	return useQuery<JourneyTrackingModel[]>({
		queryKey: ["journeyTrackings", journeyId],
		queryFn: () => getTrackings.execute(journeyId),
		enabled: !!journeyId,
	});
};

export const usePostJourneyTrackingFactory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			journeyId,
			tutorialId,
			status,
		}: {
			journeyId: number;
			tutorialId: number;
			status: number;
		}) => postTracking.execute(journeyId, tutorialId, status),
		onSuccess: (data) => {
			// Invalidate queries to refresh data
			queryClient.invalidateQueries({
				queryKey: ["journeyTrackings", String(data.journeyId)],
			});
			queryClient.invalidateQueries({
				queryKey: ["journeyDetail", String(data.journeyId)], // Ideally this should also be invalidated if progress is computed server side or if we want to re-trigger calculations
			});
		},
	});
};
