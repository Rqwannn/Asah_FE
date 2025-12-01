import { TutorialModel } from "../Models/Tutorial";
import { TutorialRepository } from "../Repository/TutorialRepository";

export class GetTutorials {
	constructor(private repository: TutorialRepository) {}

	async execute(journeyId: string): Promise<TutorialModel[]> {
		return this.repository.getTutorials(journeyId);
	}
}
