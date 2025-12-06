import { Company, CompanyResponse } from '../company/types';

export const mockCompany: Company = {
  accessKey: 'company-access-key-001',
  companyName: 'OnWay Transport Services',
  contactEmail: 'info@onway-transport.com',
  contactName: 'Alexander Volkov',
};

export const mockCompanyResponse: CompanyResponse = {
  companies: [mockCompany],
  total: 1,
  page: 1,
  limit: 10,
};
