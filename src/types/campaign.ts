export interface Question {
  id: string;
  label: string;
  type: 'dropdown' | 'mcq' | 'text' | 'textarea' | 'rating' ;
  required: boolean;
  options?: string[]; // For dropdown and mcq
  placeholder?: string; // For text and textarea
}

export interface Stage {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  video?: string; // For stage6 video
  stage6Image?: string; // For stage6 image
}

export interface Campaign {
  _id: string;
  title: string;
  category: string;
  startedAt: string;
  endingAt: string;
  overview: string;
  guidelines: string;
  imageUrl: string;
  stages: Stage[];
}

export interface StageAnswer {
  [questionId: string]: string;
}

export interface CampaignSubmission {
  campaignId: string;
  stageAnswers: StageAnswer[];
  video?: string; // For final video submission
  stageImage?: string; // For final stage image
}
