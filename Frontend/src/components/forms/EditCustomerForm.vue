<template>
  <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
    <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
    <div class="mt-8 px-4">
      <div class="flex justify-between lg:flex-row flex-col">
        <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
          <div class="text-lg">Customer Details</div>
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
            <select v-model="formData.branchID" class="form-select flex-1">
              <option v-for="Branch in branch" :key="Branch.BranchID" :value="Branch.BranchID">
                {{ Branch.BranchDescLan1 }}
              </option>
            </select>
          </div>
          <div class="mt-4 flex items-center">
            <label for="Barcode" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Barcode</label>
            <input v-model="formData.CustomerBarcode" type="text" placeholder="Barcode" class="form-input flex-1" />
          </div>
          
          <div class="mt-4 flex items-center">
            <label for="receiver-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Customer Name (*)</label>
            <input v-model="formData.CustomerDescLan1" type="text" placeholder="Customer Name " class="form-input flex-1" required />
          </div>
          <div class="mt-4 flex items-center">
            <label for="receiver-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Customer Name 2</label>
            <input v-model="formData.CustomerDescLan2" type="text" placeholder="Customer Name " class="form-input flex-1" />
          </div>
          <div class="flex items-center mt-4">
            
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Class (*)</label>
            <label for="Class" class="inline-flex">
              <input v-model="formData.ClassID" type="radio" name="Class" :value="1" class="form-radio text-success peer" checked/>
              <span class="peer-checked:text-success">Normal </span>
            </label>
            <label class="inline-flex ml-11">
              <input v-model="formData.ClassID" type="radio" name="Class" :value="2" class="form-radio text-danger peer" />
              <span class="peer-checked:text-danger">Special</span>
            </label>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Category (*)</label>
            <select v-model="formData.HCategoryID" class="form-select flex-1">
              <option v-for="Category in category" :key="Category.HCategoryID" :value="Category.HCategoryID">
                {{ Category.HCategoryDescLan1}}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Cluster (*)</label>
            <select v-model="formData.ClusterID" class="form-select flex-1">
              <option v-for="Cluster in cluster" :key="Cluster.ClusterID" :value="Cluster.ClusterID">
                {{ Cluster.ClusterDescLan1}}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Payment Method (*)</label>
            <select v-model="formData.PaymentMethodID" class="form-select flex-1">
              <option v-for="PaymentMethod in paymentMethod" :key="PaymentMethod.PaymentMethodID" :value="PaymentMethod.PaymentMethodID">
                {{ PaymentMethod.PaymentMethodLan1}}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Payment Term (*)</label>
            <select v-model="formData.PaymentTermID" class="form-select flex-1">
              <option v-for="PaymentTerm in paymentTerm" :key="PaymentTerm.PaymentTermID" :value="PaymentTerm.PaymentTermID">
                {{ PaymentTerm.PaymentTermLan1}}
              </option>
            </select>
          </div>
          
          <div class="text-lg"></div>
          <div class="flex items-center mt-4">
            <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Commercial Registration Number</label>
            <input type="integer" v-model="formData.CommercialRegistrationNumber" placeholder="Commercial Number" class="form-input flex-1" />
          </div>
          
     
        </div>

        <div class="lg:w-1/2 w-full">
      <div class="text-lg"> &nbsp;</div>
      <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Salesman </label>
            <select v-model="formData.OwnerID" class="form-select flex-1">
              <option v-for="Owner in owner" :key="Owner.OwnerID" :value="Owner.OwnerID">
                {{ Owner.OwnerDescLan1}}
              </option>
            </select>
          </div>
          <div class="flex items-center mt-4">
            <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Sector </label>
            <select v-model="formData.GeoID" class="form-select flex-1">
              <option v-for="Geo in geo" :key="Geo.GeoID" :value="Geo.GeoID">
                {{ Geo.GeoDescLan1}}
              </option>
            </select>
          </div>
      <div class="flex items-center mt-4">
        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Contact Person (*)</label>
        <input type="text" v-model="formData.CustomerContactPerson" placeholder="Contact Person" class="form-input flex-1" />
      </div>
      <div class="flex items-center mt-4">
        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Customer Mobile (*)</label>
        <input type="text" v-model="formData.CustomerMobile" placeholder="Customer Mobile" class="form-input flex-1" />
      </div>
      <div class="flex items-center mt-4">
        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Customer Address (*)</label>
        <input type="text" v-model="formData.CustomerAddress" placeholder="Customer Address" class="form-input flex-1" />
      </div>
      <div class="flex items-center mt-4">
        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Customer Engagement Limit (*)</label>
        <input type="text" v-model="formData.CustomerEngagementLimit" placeholder="Customer Engagement Limit" class="form-input flex-1" />
      </div>
      <div class="flex items-center mt-4">
        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Latitude (*)</label>
        <input type="text" v-model="formData.Latitude" placeholder="Latitude" class="form-input flex-1" />
      </div>
      <div class="flex items-center mt-4">
        <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Longitude (*)</label>
        <input type="text" v-model="formData.Longitude" placeholder="Longitude" class="form-input flex-1" />
      </div>
      
      
    </div>
  </div>

      </div>
    
    <button type="submit" class="btn btn btn-primary mt-6 float-right">Update Customer</button>
  </form>
</template>

<script lang="ts" setup>
import { useRouter ,useRoute} from 'vue-router';
import { ref ,onMounted} from 'vue';
import { jwtDecode } from 'jwt-decode';
import companyService from '@/services/companyService'; 
import branchService from '@/services/branchService'; 
import customersCategoriesService from '@/services/customersCategoriesService';
import customerClusterService from '@/services/customerClusterService';
import customerService from '@/services/customerService';
import paymentMethodService from '@/services/paymentMethodService';
import paymentTermService from '@/services/paymentTermService';
import ownerService from '@/services/ownerService';
import geoService from '@/services/geoService';







const UserID = ref<Number>();
const branch = ref<any>();
const company= ref<any>();
const category= ref<any>();
const cluster= ref<any>();
const paymentTerm= ref<any>();
const paymentMethod= ref<any>();
const geo= ref<any>();
const owner= ref<any>();

const router = useRouter();
const route = useRoute();


const formData = ref<any>({
  companyID: 0,
  branchID: 0,
  CustomerBarcode: '',
  CustomerDescLan1: '',
  CustomerDescLan2: '',
  ClassID: 1,
  HCategoryID: 0,
  ClusterID: 0,
  PaymentMethodID: 0,
  PaymentTermID: 0,
  GeoID: 0,
  CommercialRegistrationNumber: 0,
  OwnerID: 0,
  CustomerContactPerson: '',
  CustomerMobile: '',
  CustomerAddress: '',
  CustomerEngagementLimit: 0,
  CustomerLatitude: '',
  CustomerLongitude: ''
});

const Customer_id = route.params.id;


const fetchCustomersDetails = async (id: any) => {
    try {
        const CustomerDetails = await customerService.getItemById(id);

        formData.value = CustomerDetails; // Update formData value
        formData.value.companyID=CustomerDetails.CompanyID;
        formData.value.branchID=CustomerDetails.BranchID;
        
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};



const handleSubmit = async () => {
try {

  // Prepare item data
  const itemData = {
    CompanyID: formData.value.companyID,
    BranchID: formData.value.branchID,
    CustomerBarcode: formData.value.CustomerBarcode,
    CustomerDescLan1: formData.value.CustomerDescLan1,
    CustomerDescLan2: formData.value.CustomerDescLan2,
    ClassID: formData.value.ClassID,
    GeoID: formData.value.GeoID,
    HCategoryID: formData.value.HCategoryID,
    ClusterID: formData.value.ClusterID,
    PaymentMethodID: formData.value.PaymentMethodID,
    PaymentTermID: formData.value.PaymentTermID,
    CommercialRegistrationNumber: formData.value.CommercialRegistrationNumber,
    OwnerID: formData.value.OwnerID,
    CustomerContactPerson: formData.value.CustomerContactPerson,
    CustomerMobile: formData.value.CustomerMobile,
    CustomerAddress: formData.value.CustomerAddress,
    CustomerEngagementLimit: formData.value.CustomerEngagementLimit,
    Latitude: formData.value.Latitude,
    Longitude: formData.value.Longitude,
    UpdateByUserID: UserID.value,
    CustomerLastUpdateTime: new Date().toISOString()
  };

  // Save item data
  const response = await customerService.updateItem(Customer_id,itemData);
  console.log('Customer updated:', response.data);


  // Redirect after success
  await router.push('/apps/customers/list');

} catch (error: any) {
  console.error('Error updating Item:', error);
  if (error.response) {
    console.error('Response Data:', error.response.data);
  }
}
};

const fetchPaymentTerms= async () => {
  try {
    const PaymentTermData = await paymentTermService.getPaymentTerms();

    paymentTerm.value = PaymentTermData.map((PaymentTermData )=> ({

          ...PaymentTermData,
        
          }));
      console.log("PaymentTerm", PaymentTermData)
  } catch (error) {
      console.error('Error fetching Payment Terms:', error);
  }
};

const fetchPaymentMethods= async () => {
  try {
    const PaymentMethodData = await paymentMethodService.getPaymentMethods();

    paymentMethod.value = PaymentMethodData.map((PaymentMethodData )=> ({

          ...PaymentMethodData,
        
          }));
      console.log("PaymentTerm", PaymentMethodData)
  } catch (error) {
      console.error('Error fetching Payment Terms:', error);
  }
};

const fetchOwners= async () => {
  try {
    const OwnerData = await ownerService.getOwners();

    owner.value = OwnerData.map((OwnerData )=> ({

          ...OwnerData,
        
          }));
      console.log("owner", OwnerData)
  } catch (error) {
      console.error('Error fetching Payment Terms:', error);
  }
};

const fetchGeos= async () => {
  try {
    const GeoData = await geoService.getGeos();

    geo.value = GeoData.map((GeoData )=> ({

          ...GeoData,
        
          }));
      console.log("geo", GeoData)
  } catch (error) {
      console.error('Error fetching geo:', error);
  }
};

const fetchCompanies= async () => {
  try {
    const CompanyData = await companyService.getcompanies();

    company.value = CompanyData.map((CompanyData )=> ({
          ...CompanyData,
        
          }));
      console.log("company", company)
  } catch (error) {
      console.error('Error fetching company:', error);
  }
};

const fetchBranches= async () => {
  try {
    const BranchData = await branchService.getbranches();

    branch.value = BranchData.map((BranchData )=> ({
          ...BranchData,
        
          }));
      console.log("branch", BranchData)
  } catch (error) {
      console.error('Error fetching branches:', error);
  }
};

const fetchCategories= async () => {
  try {
    const CategoryData = await customersCategoriesService.getCustomersCategories();

    category.value = CategoryData.map((CategoryData )=> ({
          ...CategoryData,
        
          }));
      console.log("branch", CategoryData)
  } catch (error) {
      console.error('Error fetching Customer Category:', error);
  }
};

const fetchClusters= async () => {
  try {
    const ClusterData = await customerClusterService.getItems();

    cluster.value = ClusterData.map((ClusterData )=> ({
          ...ClusterData,
        
          }));
      console.log("Cluster", ClusterData)
  } catch (error) {
      console.error('Error fetching Clusters:', error);
  }
};
onMounted(() => {
  decodeToken();


  fetchCompanies();
  fetchBranches();
  fetchClusters();
  fetchCategories();
  fetchPaymentTerms();
  fetchPaymentMethods();
  fetchOwners();
  fetchGeos();
  fetchCustomersDetails(Customer_id);

  
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
