<template>
    <div>
      <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
        <div class="datatable invoice-table">
          <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-semibold mb-4">Branch Details</h1>
            </div>
             <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
            <div v-if="branch" class="p-5 bg-white rounded shadow-md">
              <p class="mb-2"><strong>Branch Name:</strong> {{ branch.BranchDescLan1 }}</p>
              <p class="mb-2"><strong>Branch Tel:</strong> {{ branch.BranchTel }}</p>
              <p class="mb-2"><strong>Branch Vat Number:</strong> {{ branch.BranchVatNo }}</p>
              <p class="mb-2"><strong>Branch Address:</strong> {{ branch.BranchAddress }}</p>
              <p class="mb-2"><strong>Company:</strong> {{ company }}</p>
              <p class="mb-2"><strong>Last Update:</strong> {{ branch.LastUpdateDate }}</p>
            </div>
            <div v-else class="p-5 bg-white rounded shadow-md">
              <p>Loading...</p>
            </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts"  setup>
  import { ref, reactive,onMounted } from "vue";
  import { useRoute } from "vue-router";
  import branchService from '@/services/branchService';
  import companyService from "@/services/companyService";

      const route = useRoute();
      const company = ref('');
      const branch = reactive<{ BranchID: number, BranchDescLan1: string , BranchTel:number, BranchVatNo:string, BranchAddress: string, LastUpdateDate:string }>({ 
        BranchID: 0,
        BranchDescLan1: '',
        BranchTel: 0,
        BranchVatNo: '',
        BranchAddress: '',
        LastUpdateDate: ''
      });
  
      function extractBranchId(queryString: string): string {
        const params = new URLSearchParams(queryString.split('?')[1]);
        return params.get('branch_id') || '';
      }
  
      const branchId = extractBranchId(route.fullPath);
  
      async function fetchBranchDetails(id: string) {
        try {
          const branchDetails = await branchService.getBranchById(id);
          branch.BranchDescLan1 = branchDetails.BranchDescLan1;
          branch.BranchTel = branchDetails.BranchTel;
          branch.BranchVatNo = branchDetails.BranchVatNo;
          branch.BranchAddress = branchDetails.BranchAddress;
          branch.LastUpdateDate = formatDate(branchDetails.LastUpdateDate);

          company.value = await fetchCompany(branchDetails.CompanyID);
          
        } catch (error) {
          console.error('Error fetching Branch:', error);
        }
      };
  
      async function fetchCompany  (CompanyID: string)  {
    try {
        const company = await companyService.getCompanyById(CompanyID);
        console.log(company.CompanyDescLan1)
        return company.CompanyDescLan1;
    } catch (error) {
        console.error('Error fetching delegations:', error);
    }
};

      const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      };
  
      onMounted(() => {
        fetchBranchDetails(branchId);
      });
  
    
  </script>
  