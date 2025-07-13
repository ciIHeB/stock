<template>
    <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
      <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
      <div class="mt-8 px-4">
        <div class="flex justify-between lg:flex-row flex-col">
          <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
            <div class="text-lg">Branch Details</div>
            <div class="mt-4 flex items-center">
              <label for="branch-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Name (*)</label>
              <input v-model="formData.BranchDescLan1" type="text" class="form-input flex-1" required />
            </div>
            <div class="mt-4 flex items-center">
              <label for="branch-name-2" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Name 2</label>
              <input v-model="formData.BranchDescLan2" type="text" placeholder="Branch Name 2" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Address</label>
              <input type="text" v-model="formData.BranchAddress" class="form-input flex-1" placeholder="Branch Address" required />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Tel</label>
              <input v-model="formData.BranchTel" type="tel" placeholder="Branch Tel" class="form-input flex-1" required />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Fax</label>
              <input v-model="formData.BranchFax" type="tel" placeholder="Branch Fax" class="form-input flex-1" />
            </div>
          </div>
          <div class="lg:w-1/2 w-full">
            <div class="text-lg"></div>
            <div class="flex items-center mt-4">
              <label for="branch-vat" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Vat Number</label>
              <input v-model="formData.BranchVatNo" type="text" placeholder="Branch Vat Number" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label for="branch-longitude" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Longitude</label>
              <input v-model="formData.BranchLongitude" type="number" step="any" placeholder="Branch Longitude" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label for="branch-latitude" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Latitude</label>
              <input v-model="formData.BranchLatitude" type="number" step="any" placeholder="Branch Latitude" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company</label>
              <select v-model="formData.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn btn-primary mt-6 float-right">Edit Branch</button>
    </form>
  </template>
  

  <script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import branchService from '@/services/branchService'; 
import companyService from '@/services/companyService'; 

const route = useRoute();
const router = useRouter();

const formData = ref<any>({});
const companies = ref<any[]>([]);

async function  fetchCompanies ()  {
    try {
        companies.value = await companyService.getcompanies();
           
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};


// function extractBranchId(queryString: string): string {
//         const params = new URLSearchParams(queryString.split('?')[1]);
//         return params.get('branch_id') || '';
//       }
  
      const branchId = route.params.id;

  
      async function fetchBranchDetails(id: any ) {
        try {
            console.log('id',id)
          const branchDetails = await branchService.getBranchById(id);
          formData.value = branchDetails; 
          formData.value.LastUpdateByUserID = UserID.value
          formData.value.LastUpdateDate = new Date().toISOString()

        } catch (error) {
          console.error('Error fetching Branch:', error);
        }
      };
  
    



const handleSubmit = async () => {
  try {
    const branchData  = formData.value;
    const response = await branchService.updateBranch(branchId,branchData);
    console.log('Branch created:', response.data);
    await router.push('/apps/branch/list');
  } catch (error) {
    console.error('Error creating Branch:', error);
  }
};

onMounted(() => {
    fetchBranchDetails(branchId);
    fetchCompanies();
    decodeToken();
});


//user
import { jwtDecode } from 'jwt-decode';
const UserID = ref<Number>();

function decodeToken() {
  const token = localStorage.getItem('token'); // or wherever you store the token
  if (token) {
    const decoded = jwtDecode<{ data: { UserID: Number } }>(token);
    UserID.value = decoded.data.UserID;
    console.log('Decoded UserID:', UserID.value);
  }
}
</script>
