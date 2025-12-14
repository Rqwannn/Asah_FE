import { Http } from "@/Services/Http";
import {
  PostSubmissionRequest,
  PostSubmissionResponse,
  PutSubmissionRequest,
  GetSubmissionsResponse,
  SubmissionDTO,
} from "../DTOs/SubmissionDTO";
import { SubmissionModel } from "@/Domain/Submission/Models/Submission";

export interface SubmissionDataSource {
  postSubmission(
    journeyId: number,
    payload: PostSubmissionRequest,
  ): Promise<SubmissionModel>;
  getSubmissions(
    journeyId: number,
    params?: any,
  ): Promise<GetSubmissionsResponse>;
  getAllSubmissions(params?: any): Promise<GetSubmissionsResponse>;
  updateSubmission(
    journeyId: number,
    submissionId: number,
    payload: PutSubmissionRequest,
  ): Promise<SubmissionModel>;
}

export class SubmissionDataSourceImpl implements SubmissionDataSource {
  async postSubmission(
    journeyId: number,
    payload: PostSubmissionRequest,
  ): Promise<SubmissionModel> {
    const response = await Http.post<PostSubmissionResponse>(
      `/journeys/${journeyId}/submission`,
      payload,
    );
    return this.mapToModel(response.data.data);
  }

  async getSubmissions(
    journeyId: number,
    params?: any,
  ): Promise<GetSubmissionsResponse> {
    const response = await Http.get<GetSubmissionsResponse>(
      `/journeys/${journeyId}/submission`,
      { params },
    );
    return response.data;
  }

  async getAllSubmissions(params?: any): Promise<GetSubmissionsResponse> {
    const response = await Http.get<GetSubmissionsResponse>(`/submissions`, {
      params,
    });
    return response.data;
  }

  async updateSubmission(
    journeyId: number,
    submissionId: number,
    payload: PutSubmissionRequest,
  ): Promise<SubmissionModel> {
    const response = await Http.put<{ data: SubmissionDTO }>(
      `/journeys/${journeyId}/submissions/${submissionId}`,
      payload,
    );
    return this.mapToModel(response.data.data);
  }

  private mapToModel(dto: SubmissionDTO): SubmissionModel {
    return new SubmissionModel(
      dto.id,
      dto.journey_id,
      dto.quiz_id,
      dto.submitter_id,
      dto.app_link,
      dto.app_comment,
      dto.status,
      dto.created_at,
      dto.updated_at,
      dto.admin_comment,
      dto.reviewer_id,
      dto.rating,
      dto.note,
    );
  }
}
