<template>
    <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
      <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
      <div class="mt-8 px-4">
        <div class="text-lg">Branch Details</div>
        <div class="flex justify-between lg:flex-row flex-col">
          <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
            <div class="mt-4 flex items-center">
              <label for="branch-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Name (*)</label>
              <input v-model="formData.BranchDescLan1" type="text"  class="form-input flex-1" required />
            </div>
            <div class="mt-4 flex items-center">
              <label for="branch-name-2" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Name 2</label>
              <input v-model="formData.BranchDescLan2" type="text"  class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Address</label>
              <input type="text" v-model="formData.BranchAddress" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Tel</label>
              <input v-model="formData.BranchTel" type="tel"  class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Fax</label>
              <input v-model="formData.BranchFax" type="tel"  class="form-input flex-1" />
            </div>
          </div>
          <div class="lg:w-1/2 w-full">
            <div class="mt-4 flex items-center">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Vat Number</label>
              <input v-model="formData.BranchVatNo" type="text"  class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Longitude</label>
              <input v-model="formData.BranchLongitude" type="number" step="any" class="form-input flex-1" />
            </div>
           <div class="flex items-center mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch Latitude</label>
            <input v-model="formData.BranchLatitude" type="number" step="any" class="form-input flex-1" />
          </div>
          <div class="flex items-center mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Companies</label>
            <select v-model="formData.CompanyID" class="form-select flex-1">
              <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                {{ company.CompanyDescLan1 }}
              </option>
            </select>
          </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn btn-primary mt-6 float-right">Create Branch</button>
    </form>
  </template>
  
  <script lang="ts" setup>
  import { ref,onMounted } from 'vue';
  import branchService from '@/services/branchService'; 
  import companyService from '@/services/companyService';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const companies = ref<any[]>([]);

  const formData = ref<any>({
    BranchDescLan1: '',
    BranchDescLan2: '',
    BranchAddress: '',
    BranchTel: '',
    BranchFax: '',
    BranchVatNo: '',
    BranchLongitude: 0.0,
    BranchLatitude: 0.0,
    CompanyID:0
  });
  


  const fetchCompany = async () => {
    try {
        companies.value = await companyService.getcompanies();
           
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};



  const handleSubmit = async () => {
    console.log('f', formData)
    try {
      const branchData = {
        BranchDescLan1: formData.value.BranchDescLan1,
    BranchDescLan2: formData.value.BranchDescLan2,
    BranchAddress: formData.value.BranchAddress,
    BranchTel: formData.value.BranchTel,
    BranchFax: formData.value.BranchFax,
    BranchVatNo: formData.value.BranchVatNo,
    BranchLongitude: formData.value.BranchLongitude,
    BranchLatitude: formData.value.BranchLatitude,
    LastUpdateDate: new Date().toISOString(),
    BranchCreationDate: new Date().toISOString(),
    LastUpdateByUserID: UserID.value,
    CreatedByUserID: UserID.value,
    CompanyID: formData.value.CompanyID
        };
      const response = await branchService.createBranch(branchData);
  
      console.log('Branch created:', response.data);
      await router.push('/apps/branch/list');
    } catch (error: any) {
      console.error('Error creating Branch:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
  };


  onMounted(() => {
    decodeToken()
    fetchCompany();
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
  