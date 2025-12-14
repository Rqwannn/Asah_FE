export interface PostSubmissionRequest {
  quiz_id: number;
  app_link: string;
  app_comment: string;
  submission_duration?: number;
}

export interface PutSubmissionRequest {
  status: "passed" | "failed";
  rating: number;
  note: string;
  admin_comment: string;
}

export interface SubmissionDTO {
  id: number;
  journey_id: number;
  quiz_id: number;
  submitter_id: string;
  version_id: number;
  app_link: string;
  app_comment: string;
  status: "submitted" | "passed" | "failed";
  admin_comment: string | null;
  reviewer_id: string | null;
  current_reviewer: string | null;
  started_review_at: string | null;
  ended_review_at: string | null;
  rating: number | null;
  note: string | null;
  first_opened_at: string | null;
  submission_duration: number | null;
  created_at: string;
  updated_at: string;
  as_trial_subscriber: boolean;
  pass_auto_checker: boolean;
}

export interface PostSubmissionResponse {
  status: string;
  message: string;
  data: SubmissionDTO;
}

export interface GetSubmissionsResponse {
  status: string;
  message: string;
  data: {
    data: SubmissionDTO[];
    page: number;
    total_pages: number;
    data_count: number;
    limit: number;
  };
}
