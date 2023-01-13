interface IJobs {
	results: Array<Job>;
	count: string | number;
	next: string | null;
	previous: string | null;
}

interface ICandidates {
	id: number;
	user_id: number;
	specialism_id: string;
	experiences_id: number;
	education_levels_id: number;
	job_title: string;
	personal_statement: string;
	personal: string;
	biography: string;
	education: string;
	experience: string;
	portfolio: string;
	skills: string;
	honors?: any;
	availability_status: number;
	metadata?: any;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date;
}

interface Job {
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

interface ContractType {
	id: number | string;
	contract_types_name: string;
	created_at: Date;
	updated_at: Date;
}

interface PaginatedResults {
	count: number;
	next: string | null;
	previous: string | null;
}

export { IJobs, Job, ICandidates, PaginatedResults, ContractType };
