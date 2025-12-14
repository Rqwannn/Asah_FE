import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmissionDataSourceImpl } from "@/Data/DataSources/SubmissionDataSource";
import { SubmissionRepositoryImpl } from "@/Data/Repositories/SubmissionRepositoryImpl";
import { PostSubmission } from "@/Domain/Submission/UseCase/PostSubmission";
import { GetSubmissions } from "@/Domain/Submission/UseCase/GetSubmissions";
import { GetAllSubmissions } from "@/Domain/Submission/UseCase/GetAllSubmissions";
import { PutSubmission } from "@/Domain/Submission/UseCase/PutSubmission";
import {
  PostSubmissionRequest,
  PutSubmissionRequest,
} from "@/Data/DTOs/SubmissionDTO";

export const usePostSubmissionFactory = () => {
  const dataSource = new SubmissionDataSourceImpl();
  const repository = new SubmissionRepositoryImpl(dataSource);
  const postSubmission = new PostSubmission(repository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      journeyId,
      payload,
    }: {
      journeyId: number;
      payload: PostSubmissionRequest;
    }) => postSubmission.execute(journeyId, payload),
    onSuccess: () => {
      // Invalidate queries if necessary, e.g. if we fetched submissions
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};

export const useGetSubmissionsFactory = (journeyId: number, params?: any) => {
  const dataSource = new SubmissionDataSourceImpl();
  const repository = new SubmissionRepositoryImpl(dataSource);
  const getSubmissions = new GetSubmissions(repository);

  return useQuery({
    queryKey: ["submissions", journeyId, params],
    queryFn: () => getSubmissions.execute(journeyId, params),
    enabled: !!journeyId,
  });
};

export const useGetAllSubmissionsFactory = (params?: any) => {
  const dataSource = new SubmissionDataSourceImpl();
  const repository = new SubmissionRepositoryImpl(dataSource);
  const getAllSubmissions = new GetAllSubmissions(repository);

  return useQuery({
    queryKey: ["all-submissions", params],
    queryFn: () => getAllSubmissions.execute(params),
  });
};

export const usePutSubmissionFactory = () => {
  const dataSource = new SubmissionDataSourceImpl();
  const repository = new SubmissionRepositoryImpl(dataSource);
  const putSubmission = new PutSubmission(repository);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      journeyId,
      submissionId,
      payload,
    }: {
      journeyId: number;
      submissionId: number;
      payload: PutSubmissionRequest;
    }) => putSubmission.execute(journeyId, submissionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["all-submissions"] });
    },
  });
};
