export type IProjectItem = {
  id: string;
  name: string;
  client_information: string;
  project_information: string;
  project_status: string;
  project_type: string;
  project_start_date: string;
  project_end_date: string;
  hourly_rate: number;
  project_budget: number;
  description: string;
  images: File[];
  created_at: string;
  updated_at: string;
};

export type IProjectTableFilters = {
  project_status: string[];
  project_type: string[];
};
