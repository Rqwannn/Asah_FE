import { TutorialModel } from "../Models/Tutorial";

export interface TutorialRepository {
	getTutorials(journeyId: string): Promise<TutorialModel[]>;
}
