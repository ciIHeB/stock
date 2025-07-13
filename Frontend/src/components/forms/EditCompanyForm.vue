<template>
    <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
        <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
        <div class="mt-8 px-4">
            <div class="flex justify-between lg:flex-row flex-col">
                <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
                    <div class="text-lg">Company Details</div>
                    <div class="mt-4 flex items-center">
                        <label for="receiver-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company Name (*)</label>
                        <input v-model="formData.CompanyDescLan1" type="text" placeholder="Company Name" class="form-input flex-1" required />
                    </div>
                    <div class="mt-4 flex items-center">
                        <label for="receiver-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company Name 2</label>
                        <input v-model="formData.CompanyDescLan2" type="text" placeholder="Company Name 2" class="form-input flex-1" />
                    </div>
                    
                </div>
                <div class="lg:w-1/2 w-full">
                    <div class="text-lg"></div>
                    <div class="flex items-center mt-4">
                        <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Address</label>
                        <input id="acno" type="text" v-model="formData.CompanyAddress" class="form-input flex-1" placeholder="Nom de produit" required />
                    </div>
                    <div class="flex items-center mt-4">
                        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Tel (*)</label>
                        <input v-model="formData.CompanyTel" type="text" placeholder="Tel" class="form-input flex-1" required />
                    </div>
                    <div class="flex items-center mt-4">
                        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company Vat Number</label>
                        <input type="text" v-model="formData.CompanyVatNumber" placeholder="Company Vat Number" class="form-input flex-1" />
                    </div>
                    <div class="flex items-center mt-4">
                        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Tax Applicable (*)</label>
                        <label for="volume" class="inline-flex">
                            <input v-model="formData.TaxApplicable" type="radio" name="volume" :value="true" class="form-radio text-success peer" />
                            <span class="peer-checked:text-success">YES</span>
                        </label>
                        <label class="inline-flex ml-11">
                            <input v-model="formData.TaxApplicable" type="radio" name="volume" :value="false" class="form-radio text-danger peer" />
                            <span class="peer-checked:text-danger">NO</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn btn-primary mt-6 float-right">Edit Company</button>
    </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import companyService from '@/services/companyService'; 

const route = useRoute();
const router = useRouter();

// function extractCompanyId(queryString: string): string {
//     const params = new URLSearchParams(queryString.split('?')[1]);
//     return params.get('company_id') || '';
// }

// const companyId = extractCompanyId(route.fullPath);
const companyId= route.params.id;

const formData = ref<any>({}); 

const fetchCompanyDetails = async (id: any) => {
    try {
        const companyDetails = await companyService.getCompanyById(id);
        formData.value = companyDetails; // Update formData value
        formData.value.LastUpdateByUserID = UserID.value
        formData.value.LastUpdateDate = new Date().toISOString()
        console.log(companyDetails.TaxApplicable , "/", formData.value.TaxApplicable)
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};


const handleSubmit = async () => {
    try {
        
        const companyData = { ...formData.value }; 
        console.log("data", companyData)
        const response = await companyService.updateCompany(companyId, companyData);
        console.log('Company updated:', response.data);
        await router.push('/apps/company/list');
    } catch (error) {
        console.error('Error updating Company:', error);
      
    }
};

onMounted(() => {
    decodeToken()
    fetchCompanyDetails(companyId);
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
