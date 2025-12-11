export interface LearningAnalysisRequestDTO {
  tracking_status: number;
  tracking_first_opened_at: string;
  tracking_completed_at: string;
  completion_created_at: string;
  completion_enrolling_times: number;
  completion_study_duration: number;
  completion_avg_submission_rating: number;
  submission_status: number;
  submission_created_at: string;
  submission_duration: number;
  submission_ended_review_at: string;
  submission_rating: number;
}

export interface LearningAnalysisResponseDTO {
  status: number;
  message: string;
  result: {
    predicted_label: string;
    raw_output: number;
    processed_features: any;
    lime_visualization?: string;
    confidence_visualization?: string;
  };
}
