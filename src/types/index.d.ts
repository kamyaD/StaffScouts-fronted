export interface IJobs {
	id: number;
	user_id: number;
	specialism_id: number;
	industry_id: number;
	contract_type_id: number;
	education_level_id: number;
	experience_id: number;
	jobs_title: string;
	search_and_listing: number;
	experience_length: string;
	experience_level: string;
	qualifications_competencies: string;
	duties_responsibilities: string;
	offered_salary: string;
	address: string;
	country: string;
	city: string;
	email: string;
	gender: number;
	languages: string;
	is_active: boolean;
	jobs_description: string;
	created_at: Date;
	updated_at: Date;
	application_deadline: Date;
	is_company_name_hidden: boolean;
}
