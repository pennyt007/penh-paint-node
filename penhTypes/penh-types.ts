export interface EngageBehave {
  feedback: string;
  next_steps: string;
}

export interface PointOfProgress {
  point_of_progress_state_type_id: number;
}

export interface PointOfProgressEvidence {
  point_of_progress_summary_id: number;
  portfolio_item_id: number;
}

export interface PointOfProgressState {
  point_of_progress_id: number;
  point_of_progress_state_type_id: number;
  user_id: number;
}

export interface PopSummary {
  feedback: string;
  area_of_growth: string;
  next_steps: string;
  learning_area_id?: number;
  learning_area_proficiency_id?: number;
}

export interface PopDetail {
  point_of_progress_summary_id: number;
  curriculum_proficiency_id: number;
  curriculum_id: number;
}
export interface PortfolioItem {
  portfolio_id: number;
  title: string;
  description: string;
  feedback: string;
  area_of_growth: string;
  next_steps: string;
}


export interface PortfolioAttachment {
  title: string;
  description: string;
  feedback: string;
  area_of_growth: string;
  next_steps: string;
  portfolio_id: number;
  portfolio_file_type_id: number;
  file_type_id: number;
  file_path: string;
  completed: string;
}

// export interface PortfolioItem {
//   portfolio_id: number;
//   title: string;
//   description: string;
// }

export interface PopStateHistory {
  point_of_progress_id: number;
  grade_level_with_year: string;
  grade_level_code: string;
  number_of_absents: number;
  number_of_lates: number;
  reporting_period_title: string;
  reporting_period_description: string;
  current_state_type_id: number;
  draft?: string | null;
  revise?: string | null;
  posted?: string | null;
  approved?: string | null;
  processed?: string | null;
  accepted?: string | null;
}

export interface SchoolClassroom {
  class_id: number;
  staff_id: number;
  title: string;
  started: string;
  ended: string;
  grade_level_code: string;
  school_name: string;
  classroom: string;
  teacher: string;
  teacherImagePath: string;
  draft?: number;
  revise?: number;
  posted?: number;
  approved?: number;
  processed?: number;
  accepted?: number;
}

export interface upLoadFile {
  name: string;
  maxCount: number;
}

export interface UploadedFiles {
  [fieldname: string]: Express.Multer.File[] | undefined;
}
