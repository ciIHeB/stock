<template>
  <div>
    <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
      <div class="datatable invoice-table">
        <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-semibold mb-4">Company Details</h1>
          </div>
        </div>

        <div class="px-5 flex flex-wrap gap-5 items-start">
          <div class="-mt-70 mb-70 -mx-6 ml-5 rounded-tl rounded-tr h-[250px] w-[250px] overflow-hidden">
            <img :src="image" alt="" class="w-full h-full object-cover" />
          </div>

          <div v-if="company" class="flex-1 p-5  -md ml-5">
            <p class="mb-2"><strong>Company Name:</strong> {{ company.CompanyDescLan1 }}</p>
            <p class="mb-2"><strong>Company Vat Number:</strong> {{ company.CompanyVatNumber }}</p>
            <p class="mb-2"><strong>Company Address:</strong> {{ company.CompanyAddress }}</p>
            <p class="mb-2"><strong>Company Tel:</strong> {{ company.CompanyTel }}</p>
            <p class="mb-2"><strong>Tax Applicable:</strong> {{ company.TaxApplicable ? 'Yes' : 'No' }}</p>
            <p class="mb-2"><strong>Last Update:</strong> {{ company.LastUpdateDate }}</p>
          </div>

          <div v-else class="flex-1 p-5 bg-white rounded shadow-md">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  
  <script lang="ts" setup>
  import { ref, reactive, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import companyService from '@/services/companyService'; 
  
  const route = useRoute();
  const search = ref("");
  const company = reactive<{ CompanyID: number, CompanyDescLan1: string , CompanyVatNumber:string, CompanyAddress:string, CompanyTel: number, TaxApplicable:Boolean, LastUpdateDate:string }>({ CompanyID: 0,
  CompanyDescLan1: '',
  CompanyVatNumber: '',
  CompanyAddress: '',
  CompanyTel: 0,
  TaxApplicable: false,
  LastUpdateDate: ''
});

function extractCompanyId(queryString: string): string {
    const params = new URLSearchParams(queryString.split('?')[1]);
    return params.get('company_id') || '';
}

const companyId = extractCompanyId(route.fullPath);
const image = ref("");
const fetchCompanyDetails = async (id: string) => {
    try {
        const companyDetails = await companyService.getCompanyById(id);
        company.CompanyDescLan1 = companyDetails.CompanyDescLan1;
        company.CompanyVatNumber = companyDetails.CompanyVatNumber;
        company.CompanyAddress = companyDetails.CompanyAddress;
        company.CompanyTel = companyDetails.CompanyTel;
        company.TaxApplicable = companyDetails.TaxApplicable;
        company.LastUpdateDate = formatDate(companyDetails.LastUpdateDate);

        // Assuming companyDetails.CompanyLogo contains the path like '/public/uploads/company_logos/filename.jpg'
        if (companyDetails.CompanyLogo) {
            image.value = `http://localhost:3000${companyDetails.CompanyLogo}`;
        } else {
            image.value = '/assets/images/file-preview.svg'; // Default placeholder
        }
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};

const formatDate = (dateString: string): string => {
       
       const date = new Date(dateString);
       const day = String(date.getDate()).padStart(2, '0');
       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
       const year = String(date.getFullYear()); // Get last two digits of year
       const hours = String(date.getHours()).padStart(2, '0');
       const minutes = String(date.getMinutes()).padStart(2, '0');
       return `${day}/${month}/${year} ${hours}:${minutes}`;
   };
  
onMounted(() => {
    extractCompanyId(companyId)
    fetchCompanyDetails(companyId)
});
  </script>
 
  