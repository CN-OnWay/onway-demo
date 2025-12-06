import { Company, UpdateCompanyRequest, CompanyResponse } from './types';
import { mockCompany } from '../mocks/company.mock';

// Mock данные вместо реальных API запросов
let company = { ...mockCompany };

export const companyAPI = {
  // GET /company
  getCompanyData: async (): Promise<CompanyResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          companies: [company],
          total: 1,
          page: 1,
          limit: 10,
        });
      }, 300);
    });
  },

  // PUT /company
  updateCompanyData: async (data: UpdateCompanyRequest): Promise<Company> => {
    return new Promise(resolve => {
      setTimeout(() => {
        company = { ...company, ...data };
        resolve(company);
      }, 300);
    });
  },
};
