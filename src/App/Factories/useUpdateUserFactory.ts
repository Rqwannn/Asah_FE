import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDataSourceImpl } from "@/Data/DataSources/User/UserAPIDataSource";
import { UserRepositoryImpl } from "@/Data/Repositories/UserRepositoryImpl";
import { UpdateMyProfile } from "@/Domain/Auth/UseCases/UpdateMyProfile";
import { UpdateMyPrediction } from "@/Domain/Auth/UseCases/UpdateMyPrediction";

export const useUpdateUserFactory = () => {
  const dataSource = new UserDataSourceImpl();
  const repository = new UserRepositoryImpl(dataSource);
  const updateMyProfile = new UpdateMyProfile(repository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateMyProfile.execute(data),
    onSuccess: (data) => {
      // Update local storage to keep state consistent with legacy implementation
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...data };

      // Specifically ensure the prediction fields are saved if they are in the response
      if (data.predicted_label)
        updatedUser.predicted_label = data.predicted_label;
      if (data.lime_visualization)
        updatedUser.lime_visualization = data.lime_visualization;
      if (data.confidence_visualization)
        updatedUser.confidence_visualization = data.confidence_visualization;

      localStorage.setItem("user", JSON.stringify(updatedUser)); // Update user object

      // Also update standalone items if they were used individually (legacy support)
      // modifying ProfileSidebar to use user object is planned, but keeping this safe
      if (data.predicted_label)
        localStorage.setItem("learning_analysis_label", data.predicted_label);

      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};

export const useUpdateUserPredictionFactory = () => {
  const dataSource = new UserDataSourceImpl();
  const repository = new UserRepositoryImpl(dataSource);
  const updateMyPrediction = new UpdateMyPrediction(repository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateMyPrediction.execute(data),
    onSuccess: (data) => {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...data };

      if (data.predicted_label)
        updatedUser.predicted_label = data.predicted_label;
      if (data.lime_visualization)
        updatedUser.lime_visualization = data.lime_visualization;
      if (data.confidence_visualization)
        updatedUser.confidence_visualization = data.confidence_visualization;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      if (data.predicted_label)
        localStorage.setItem("learning_analysis_label", data.predicted_label);
      if (data.lime_visualization)
        localStorage.setItem("lime_visualization", data.lime_visualization);
      if (data.confidence_visualization)
        localStorage.setItem(
          "confidence_visualization",
          data.confidence_visualization,
        );

      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};
