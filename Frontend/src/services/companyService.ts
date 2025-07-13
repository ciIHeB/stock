import apiClient from './apiClient';

// apiImage axios instance and uploadImage function removed

export default {
    async getcompanies() {
        try {
            const response = await apiClient.get('company/'); // adjust the endpoint as needed
            return response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    },
    async getCompanyById(id) {
        try {
            const response = await apiClient.get(`company/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting company:', error);
            throw error;
        }
    },

    async createCompany(companyDataWithFile) {
        try {
            const formData = new FormData();

            // Append all fields from companyDataWithFile to formData
            // Assuming companyDataWithFile contains a 'logo' field for the file
            // and other fields for company data.
            for (const key in companyDataWithFile) {
                if (companyDataWithFile.hasOwnProperty(key)) {
                    if (key === 'logo' && companyDataWithFile[key] instanceof File) {
                        formData.append('logo', companyDataWithFile[key]);
                    } else {
                        formData.append(key, companyDataWithFile[key]);
                    }
                }
            }
            // Example:
            // formData.append('CompanyDescLan1', companyDataWithFile.CompanyDescLan1);
            // formData.append('CompanyLogo', companyDataWithFile.logo); // 'logo' is the field name expected by backend

            const response = await apiClient.post('company/', formData, {
                 headers: {
                     'Content-Type': 'multipart/form-data',
                 },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating company:', error);
            throw error;
        }
    },
      
    async updateCompany(id, updatedData) { // Assuming updateCompany might also need FormData if logo can be updated
        try {
            // If updatedData can contain a file, it should also be sent as FormData
            // For now, keeping it as is, assuming logo update is not part of this task for updateCompany
            const response = await apiClient.put(`company/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating company:', error);
            throw error;
        }
    },

    async deleteCompany(id) {
        try {
            const response = await apiClient.delete(`company/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting company:', error);
            throw error;
        }
    }
};
