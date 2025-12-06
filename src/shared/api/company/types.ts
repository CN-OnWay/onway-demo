export interface Company {
  accessKey: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
}

export interface CreateCompanyRequest {
  companyName: string;
  contactEmail: string;
  contactName: string;
}

export interface UpdateCompanyRequest {
  companyName?: string;
  contactEmail?: string;
  contactName?: string;
}

export interface CompanyResponse {
  companies: Company[];
  total: number;
  page: number;
  limit: number;
}
