import { useQuery } from "@tanstack/react-query";
import { TutorialDataSource } from "../../Data/DataSources/TutorialDataSource";
import { TutorialRepositoryImpl } from "../../Data/Repositories/TutorialRepositoryImpl";
import { GetTutorials } from "../../Domain/Tutorial/UseCase/GetTutorials";
import { TutorialModel } from "../../Domain/Tutorial/Models/Tutorial";

export const useTutorialFactory = (journeyId: string) => {
	const dataSource = new TutorialDataSource();
	const repository = new TutorialRepositoryImpl(dataSource);
	const getTutorials = new GetTutorials(repository);

	return useQuery<TutorialModel[]>({
		queryKey: ["tutorials", journeyId],
		queryFn: () => getTutorials.execute(journeyId),
		enabled: !!journeyId,
	});
};
