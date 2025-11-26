import { DailyCheckinAPIDataSource } from "@/Data/DataSources/DailyCheckin/DailyCheckinAPIDataSource";
import { DailyCheckinRepositoryImpl } from "@/Data/Repositories/DailyCheckinRepositoryImpl";
import { CreateDailyCheckinUseCase } from "@/Domain/DailyCheckin/UseCases/CreateDailyCheckinUseCase";
import { GetDailyCheckinsUseCase } from "@/Domain/DailyCheckin/UseCases/GetDailyCheckinsUseCase";
import { useDailyCheckin } from "@/Presentation/Hooks/useDailyCheckin";

export const useDailyCheckinFactory = () => {
	const dataSource = new DailyCheckinAPIDataSource();
	const repository = new DailyCheckinRepositoryImpl(dataSource);

	const getUseCase = new GetDailyCheckinsUseCase(repository);
	const createUseCase = new CreateDailyCheckinUseCase(repository);

	return useDailyCheckin(getUseCase, createUseCase);
};
