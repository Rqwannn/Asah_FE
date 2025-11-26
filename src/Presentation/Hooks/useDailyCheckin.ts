import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateDailyCheckinRequestDTO } from "@/Data/DTOs/DailyCheckinDTO";
import { CreateDailyCheckinUseCase } from "@/Domain/DailyCheckin/UseCases/CreateDailyCheckinUseCase";
import { GetDailyCheckinsUseCase } from "@/Domain/DailyCheckin/UseCases/GetDailyCheckinsUseCase";

export const useDailyCheckin = (
	getDailyCheckinsUseCase: GetDailyCheckinsUseCase,
	createDailyCheckinUseCase: CreateDailyCheckinUseCase
) => {
	const queryClient = useQueryClient();

	const { data: checkins, isLoading, error } = useQuery({
		queryKey: ["daily-checkins"],
		queryFn: async () => {
			return await getDailyCheckinsUseCase.execute();
		},
	});

	const createMutation = useMutation({
		mutationFn: async (data: CreateDailyCheckinRequestDTO) => {
			return await createDailyCheckinUseCase.execute(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["daily-checkins"] });
		},
	});

	return {
		checkins,
		isLoading,
		error,
		createCheckin: createMutation.mutateAsync,
		isCreating: createMutation.isPending,
		createError: createMutation.error,
	};
};
