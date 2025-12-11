import { useQuery } from "@tanstack/react-query";
import { JourneyCompletionDataSource } from "../../Data/DataSources/JourneyCompletionDataSource";
import { JourneyCompletionRepositoryImpl } from "../../Data/Repositories/JourneyCompletionRepositoryImpl";
import { GetJourneyCompletion } from "../../Domain/Journey/UseCase/GetJourneyCompletion";
import { PostJourneyCompletion } from "../../Domain/Journey/UseCase/PostJourneyCompletion";
import { JourneyCompletionModel } from "../../Domain/Journey/Models/JourneyCompletion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const usePostJourneyCompletionFactory = () => {
  const dataSource = new JourneyCompletionDataSource();
  const repository = new JourneyCompletionRepositoryImpl(dataSource);
  const postCompletion = new PostJourneyCompletion(repository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      journeyId,
      rating,
      duration,
    }: {
      journeyId: number;
      rating: number;
      duration: number;
    }) => postCompletion.execute(journeyId, rating, duration),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["journeyCompletion", String(data.journey_id)],
      });
      queryClient.invalidateQueries({
        queryKey: ["journeys"],
      });
    },
  });
};

import { GetUserCompletions } from "../../Domain/Journey/UseCase/GetUserCompletions";

export const useUserCompletionsFactory = () => {
  const dataSource = new JourneyCompletionDataSource();
  const repository = new JourneyCompletionRepositoryImpl(dataSource);
  const getUserCompletions = new GetUserCompletions(repository);

  return useQuery<JourneyCompletionModel[]>({
    queryKey: ["userCompletions"],
    queryFn: () => getUserCompletions.execute(),
  });
};
