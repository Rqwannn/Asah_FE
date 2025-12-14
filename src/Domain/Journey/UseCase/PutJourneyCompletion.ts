import { JourneyCompletionRepository } from "../Repository/JourneyCompletionRepository";
import { JourneyCompletionModel } from "../Models/JourneyCompletion";

export class PutJourneyCompletion {
  private repository: JourneyCompletionRepository;

  constructor(repository: JourneyCompletionRepository) {
    this.repository = repository;
  }

  async execute(
    journeyId: number,
    payload: {
      enrollments_at?: string;
      last_enrolled_at: string;
      study_duration?: number;
    },
  ): Promise<JourneyCompletionModel> {
    return this.repository.putCompletion(journeyId, payload);
  }
}
