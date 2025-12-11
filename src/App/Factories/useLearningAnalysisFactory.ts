import { useMutation } from "@tanstack/react-query";
import { LearningAnalysisDataSource } from "@/Data/DataSources/LearningAnalysisDataSource";
import { LearningAnalysisRepositoryImpl } from "@/Data/Repositories/LearningAnalysisRepositoryImpl";
import { PostLearningAnalysis } from "@/Domain/Journey/UseCase/PostLearningAnalysis";
import { LearningAnalysisRequestDTO } from "@/Data/DTOs/LearningAnalysisDTO";

export const usePostLearningAnalysisFactory = () => {
	const dataSource = new LearningAnalysisDataSource();
	const repository = new LearningAnalysisRepositoryImpl(dataSource);
	const useCase = new PostLearningAnalysis(repository);

	return useMutation({
		mutationFn: (payload: LearningAnalysisRequestDTO) =>
			useCase.execute(payload),
	});
};
