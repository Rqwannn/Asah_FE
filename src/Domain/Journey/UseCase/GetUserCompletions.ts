import { JourneyCompletionModel } from "../Models/JourneyCompletion";
import { JourneyCompletionRepository } from "../Repository/JourneyCompletionRepository";

export class GetUserCompletions {
  constructor(private repository: JourneyCompletionRepository) {}

  async execute(): Promise<JourneyCompletionModel[]> {
    return this.repository.getUserCompletions();
  }
}
