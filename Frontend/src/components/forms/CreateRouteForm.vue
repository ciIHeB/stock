<template>
  <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
    <div class="mt-8 px-4">
      <div class="flex justify-between lg:flex-row flex-col">
        <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
          <div class="text-lg">Route Details</div>

          <!-- Company -->
          <div class="flex mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company (*):</label>
            <select v-model="formData.CompanyID" class="form-select flex-1" required>
              <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                {{ company.CompanyDescLan1 }}
              </option>
            </select>
          </div>

          <!-- Branch -->
          <div class="flex mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Branch (*):</label>
            <select v-model="formData.BranchID" class="form-select flex-1" required>
              <option v-for="branch in branches" :key="branch.BranchID" :value="branch.BranchID">
                {{ branch.BranchDescLan1 }}
              </option>
            </select>
          </div>

          <!-- Supervisor -->
          <div class="flex mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Supervisor (*):</label>
            <select v-model="formData.SupervisorID" class="form-select flex-1" required>
              <option v-for="Supervisor in supervisors" :key="Supervisor.SupervisorID" :value="Supervisor.SupervisorID">
                {{ Supervisor.SupervisorNameLan1 }}
              </option>
            </select>
          </div>

          <!-- Owner -->
          <div class="flex mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Owner (*):</label>
            <select v-model="formData.OwnerID" class="form-select flex-1" required>
              <option v-for="owner in owners" :key="owner.OwnerID" :value="owner.OwnerID">
                {{ owner.OwnerDescLan1 }}
              </option>
            </select>
          </div>

          <!-- Route Name -->
          <div class="flex mt-4">
            <label for="RouteDescLan1" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Route Name (*):</label>
            <input v-model="formData.RouteDescLan1" id="RouteDescLan1" type="text" class="form-input flex-1" required />
          </div>

          <!-- Status -->
          <div class="flex items-center mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Status (*)</label>
            <label class="inline-flex">
              <input v-model="formData.IsActive" type="radio" name="volume" :value="true" class="form-radio text-success peer" />
              <span class="peer-checked:text-success">Active </span>
            </label>
            <label class="inline-flex ml-11">
              <input v-model="formData.IsActive" type="radio" name="volume" :value="false" class="form-radio text-danger peer" />
              <span class="peer-checked:text-danger">Inactive</span>
            </label>
          </div>

          <!-- Customer List Button -->
          <button type="button" class="btn btn-success mt-4" @click="() => { showCustomerPopup = true; fetchCustomers(); }">
            Customer List
          </button>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary mt-6 float-right">Create Route</button>

    <!-- Customer List Popup Modal -->
    <div v-if="showCustomerPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-5xl">
        <div class="panel pb-0">
          <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
            <h5 class="font-semibold text-lg">Select Customers</h5>
            <div class="ltr:ml-auto rtl:mr-auto">
              <input v-model="customerSearch" type="text" class="form-input w-auto" placeholder="Search..." />
            </div>
          </div>

          <div class="datatable">
            <vue3-datatable
              :rows="filteredCustomers"
              :columns="cols"
              :totalRows="filteredCustomers.length"
              :hasCheckbox="true"
              :sortable="true"
              sortColumn="CustomerDescLan1"
              :search="customerSearch"
              skin="whitespace-nowrap table-hover"
              :selectedCheckbox="selectedCustomerIds"
              @rowSelect="onCheckboxChange"
              firstArrow="<<"
              lastArrow=">>"
              previousArrow="<"
              nextArrow=">"
            />
          </div>

          <div class="mt-4 flex justify-end">
            <button class="btn btn-danger mr-2" @click="showCustomerPopup = false">Cancel</button>
            <button class="btn btn-primary" @click="applySelectedCustomers">Add</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import '@bhplugin/vue3-datatable/dist/style.css';

import companyService from '@/services/companyService';
import branchService from '@/services/branchService';
import supervisorService from '@/services/supervisorService';
import ownerService from '@/services/ownerService';
import routeService from '@/services/routeService';
import customerService from '@/services/customerService';

const router = useRouter();

const UserID = ref<number>();
const companies = ref<any[]>([]);
const branches = ref<any[]>([]);
const supervisors = ref<any[]>([]);
const owners = ref<any[]>([]);
const customers = ref<any[]>([]);

const formData = ref<any>({
  CompanyID: 0,
  BranchID: 0,
  SupervisorID: '',
  IsActive: false,
  OwnerID: 0,
  RouteDescLan1: '',
  customerIds: [],
});

const showCustomerPopup = ref(false);
const customerSearch = ref('');
const selectedCustomerMap = ref<Record<number, boolean>>({});
const selectedCustomerIds = computed(() =>
  Object.keys(selectedCustomerMap.value)
    .filter(id => selectedCustomerMap.value[+id])
    .map(Number)
);

const cols = ref([
  { field: 'CustomerID', title: 'ID', isUnique: true },
  { field: 'CustomerDescLan1', title: 'Customer Name' },
]);

const filteredCustomers = computed(() =>
  customers.value.filter(c =>
    c.CustomerDescLan1.toLowerCase().includes(customerSearch.value.toLowerCase()) ||
    c.CustomerID.toString().includes(customerSearch.value)
  )
);

// ⬇️ Called when checkbox selection changes
const onCheckboxChange = (selectedRows: any[]) => { // Assume selectedRows is an array of objects
  console.log('[CreateRouteForm] onCheckboxChange - selectedRows:', selectedRows);
  const map: Record<number, boolean> = {};
  selectedRows.forEach(row => {
    if (row && typeof row.CustomerID === 'number') { // Check if row and CustomerID exist and CustomerID is a number
      map[row.CustomerID] = true;
    }
  });
  selectedCustomerMap.value = map;
 // console.log('[CreateRouteForm] onCheckboxChange - selectedCustomerMap updated:', selectedCustomerMap.value);
};

const applySelectedCustomers = () => {
  //console.log('[CreateRouteForm] applySelectedCustomers - selectedCustomerIds.value:', selectedCustomerIds.value);
  formData.value.customerIds = [...selectedCustomerIds.value];
 // console.log('[CreateRouteForm] applySelectedCustomers - formData.value.customerIds updated:', formData.value.customerIds);
  showCustomerPopup.value = false;
};

const handleSubmit = async () => {
  //console.log('[CreateRouteForm] handleSubmit - Initial formData.value.customerIds:', formData.value.customerIds);
  try {
    const routeData = {
      CompanyID: formData.value.CompanyID,
      BranchID: formData.value.BranchID,
      SupervisorID: formData.value.SupervisorID,
      IsActive: formData.value.IsActive,
      OwnerID: formData.value.OwnerID,
      RouteDescLan1: formData.value.RouteDescLan1,
      RouteCreatedByUserID: UserID.value,
      LastUpdateByUserID: UserID.value,
      customerIds: formData.value.customerIds,
    };
    console.log('[CreateRouteForm] handleSubmit - routeData being sent:', routeData);

    const response = await routeService.createRoute(routeData);
    console.log('Route created:', response);
    await router.push('/apps/ownersRoutes/list');
  } catch (error: any) {
    console.error('Error creating route:', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
};

const decodeToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode<{ data: { UserID: number } }>(token);
    UserID.value = decoded.data.UserID;
  }
};

const fetchCompanies = async () => {
  try {
    companies.value = await companyService.getcompanies();
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

const fetchBranches = async () => {
  try {
    branches.value = await branchService.getbranches();
  } catch (error) {
    console.error('Error fetching branches:', error);
  }
};

const fetchSupervisors = async () => {
  try {
    supervisors.value = await supervisorService.getSupervisors();
  } catch (error) {
    console.error('Error fetching supervisors:', error);
  }
};

const fetchOwners = async () => {
  try {
    owners.value = await ownerService.getOwners();
  } catch (error) {
    console.error('Error fetching owners:', error);
  }
};

const fetchCustomers = async () => {
  try {
    customers.value = await customerService.getItems();
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};

onMounted(() => {
  decodeToken();
  fetchCompanies();
  fetchBranches();
  fetchSupervisors();
  fetchOwners();
});
</script>