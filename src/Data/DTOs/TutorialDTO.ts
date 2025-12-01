export interface TutorialDTO {
	id: number;
	developer_journey_id: number;
	title: string;
	type: string;
	content: string;
	requirements: string[];
	submit_only_requirements: boolean;
	position: number;
	status: string;
	trial: boolean;
	author_id: number;
	is_main_module: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface TutorialResponse {
	status: string;
	data: TutorialDTO[];
}
