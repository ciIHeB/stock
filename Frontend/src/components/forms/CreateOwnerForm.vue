<template>
  <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
    <div class="mt-8 px-4">
      <div class="flex justify-between lg:flex-row flex-col">
        <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
          <div class="text-lg">Owner Details</div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company (*)</label>
            <select v-model="formData.companyID" class="form-select flex-1">
              <option v-for="Company in company" :key="Company.CompanyID" :value="Company.CompanyID">
                {{ Company.CompanyDescLan1 }}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch (*)</label>
            <select v-model="formData.BranchID" class="form-select flex-1">
              <option v-for="Branch in branch" :key="Branch.BranchID" :value="Branch.BranchID">
                {{ Branch.BranchDescLan1 }}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Supervisor (*)</label>
            <select v-model="formData.SupervisorID" class="form-select flex-1">
              <option v-for="Supervisor in supervisor" :key="Supervisor.SupervisorID" :value="Supervisor.SupervisorID">
                {{ Supervisor.SupervisorNameLan1}}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Default Warehouse (*)</label>
            <select v-model="formData.OwnerDefaultWHID" class="form-select flex-1">
              <option v-for="Warehouse in warehouse" :key="Warehouse.StoreID" :value="Warehouse.StoreID">
                {{ Warehouse.StoreDescLan1}}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Store (*)</label>
            <select v-model="formData.StoreID" class="form-select flex-1">
              <option v-for="Store in store" :key="Store.StoreID" :value="Store.StoreID">
                {{ Store.StoreDescLan1}}
              </option>
            </select>
          </div>
          <div class="mt-4 flex items-center">
            <label for="receiver-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Owner Name (*)</label>
            <input v-model="formData.OwnerDescLan1" type="text" placeholder="Owner Name" class="form-input flex-1" required />
          </div>
          <div class="mt-4 flex items-center">
            <label for="receiver-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">User Name </label>
            <input v-model="formData.HHUserName" type="text" placeholder="User Name " class="form-input flex-1" />
          </div>
          <div class="mt-4 flex items-center">
            <label for="Barcode" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Password</label>
            <input v-model="formData.HHUserPassword" type="password" placeholder="Password" class="form-input flex-1" />
          </div>
          <div class="text-lg"></div>
          
        </div>

        <div class="lg:w-1/2 w-full">
          <div class="text-lg"> Owner Settings</div>
          <div class="mt-4 flex items-center">
            <label for="receiver-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Owner Max Stock (*)</label>
            <input v-model="formData.OwnerMaxStockVal" type="number" placeholder=" Max Stock" class="form-input flex-1" required />
          </div>
          <div class="mt-4 flex items-center">
            <label for="receiver-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Owner Credit Limit (*)</label>
            <input v-model="formData.OwnerCreditLimitValue" type="number" placeholder=" Credit limit " class="form-input flex-1" required />
          </div>
          <div class="flex items-center mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Auto Sync Mode (*)</label>
            <label for="Production" class="inline-flex">
              <input v-model="formData.OwnerAutoSynchMode" type="radio" name="Production" :value="true" class="form-radio text-info peer" checked/>
              <span class="peer-checked:text-info">YES</span>
            </label>
            <label class="inline-flex ml-11">
              <input v-model="formData.OwnerAutoSynchMode" type="radio" name="Production" :value="false" class="form-radio text-danger peer" />
              <span class="peer-checked:text-danger">NO</span>
            </label>
          </div>
          <div class="flex items-center mt-4">
            
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Owner Status (*)</label>
            <label for="volume" class="inline-flex">
              <input v-model="formData.OwnerIsActive" type="radio" name="volume" :value="true" class="form-radio text-success peer" checked/>
              <span class="peer-checked:text-success">Active</span>
            </label>
            <label class="inline-flex ml-11">
              <input v-model="formData.OwnerIsActive" type="radio" name="volume" :value="false" class="form-radio text-danger peer" />
              <span class="peer-checked:text-danger">Inactive</span>
            </label>
          </div>
       
</div>

      </div>
    </div>
    <button type="submit" class="btn btn btn-primary mt-6 float-right">Create Owner</button>
  </form>
</template>


<script lang="ts" setup>
  import { ref ,onMounted} from 'vue';
  import companyService from '@/services/companyService'; 
  import { useRouter } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';
  import ownerService from '@/services/ownerService';
  import branchService from '@/services/branchService';
  import supervisorService from '@/services/supervisorService';
  import storeService from '@/services/storeService';




  const UserID = ref<Number>();
  const company= ref<any>();
  const branch= ref<any>();
  const supervisor= ref<any>();
  const store= ref<any>();
  const warehouse= ref<any>();




  const router = useRouter();


  const formData = ref<any>({
        CompanyID: 0,
        BranchID: 0,
        SupervisorID: "",
        OwnerID: null,
        UserID: "",
        OwnerDescLan1: "",
        StoreID: 1,
        DefaultPrinterID: null,
        OwnerAutoSynchMode: 0,
        OwnerMaxStockVal: 0,
        OwnerIsActive: 1,
        OwnerCreationDate: "",
        OwnerDefaultWHID: null,
        OwnerCreditLimitValue: 0,
        OwnerACKey: null,
        OwnerImage: "",
        OwnerLastUpdateTime: "",
        CreatedByUserID: null,
        LastUpdatedByUserID: null,
  });
  

  
  const handleSubmit = async () => {
  try {

    // Prepare item data
    const itemData = {
        CompanyID:formData.value.companyID,
        HHUserName:formData.value.HHUserName,
        BranchID:formData.value.BranchID,
        SupervisorID:formData.value.SupervisorID,
        OwnerDescLan1:formData.value.OwnerDescLan1,
        OwnerDescLan2: formData.value.OwnerDescLan1,
        HHUserPassword: formData.value.HHUserPassword,
        StoreID: formData.value.StoreID,
        DefaultPrinterID: null,
        OwnerAutoSynchMode: formData.value.OwnerAutoSynchMode,
        OwnerMaxStockVal: formData.value.OwnerMaxStockVal,
        OwnerIsActive: formData.value.OwnerIsActive,
        OwnerDefaultWHID: formData.value.OwnerDefaultWHID,
        OwnerCreditLimitValue: formData.value.OwnerCreditLimitValue,
        OwnerACKey: null,
        OwnerImage: null,
        OwnerLastUpdateTime:new Date().toISOString(),
        CreatedByUserID: UserID.value,
        LastUpdatedByUserID: UserID.value,

    };

    // Save item data
    const response = await ownerService.createOwner(itemData);
    console.log('Item created:', response.data);


    // Redirect after success
    await router.push('/apps/owners/list');

  } catch (error: any) {
    console.error('Error creating Item:', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
};

const fetchBranches= async () => {
    try {
      const BranchesData = await branchService.getbranches();

      branch.value = BranchesData.map((BranchesData )=> ({
            ...BranchesData,
          
            }));
        console.log("Categories", branch)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};

const fetchStores= async () => {
    try {
      const StoreData = await storeService.getStores();

      store.value = StoreData.filter(storeItem => storeItem.StoreTypeID === 2).map(storeItem => ({
        ...storeItem,
          
            }));
        console.log("Categories", store)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};
const fetchWarehouse= async () => {
    try {
      const WareData = await storeService.getStores();

      warehouse.value = WareData.filter(storeItem => storeItem.StoreTypeID === 1).map(storeItem => ({
        ...storeItem,
          
            }));
        console.log("Categories", warehouse)
    } catch (error) {
        console.error('Error fetching warehouse:', error);
    }
};

const fetchSupervisors= async () => {
    try {
      const SupervisorData = await supervisorService.getItems();

      supervisor.value = SupervisorData.map((SupervisorData )=> ({
            ...SupervisorData,
          
            }));
        console.log("Categories", supervisor)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};


const fetchCompanies= async () => {
    try {
      const CompanyData = await companyService.getcompanies();

      company.value = CompanyData.map((CompanyData )=> ({
            ...CompanyData,
          
            }));
        console.log("Categories", company)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};

  onMounted(() => {
    decodeToken();
    fetchCompanies();
    fetchBranches();
    fetchSupervisors();
    fetchStores();
    fetchWarehouse();

    
  });

  
//user


function decodeToken() {
  const token = localStorage.getItem('token'); // or wherever you store the token
  if (token) {
    const decoded = jwtDecode<{ data: { UserID: Number } }>(token);
    UserID.value = decoded.data.UserID;
    console.log('Decoded UserID:', UserID.value);
  }
}
  </script>
  