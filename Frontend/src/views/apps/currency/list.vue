<template>
    <div>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModal">
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
    <h2 class="text-lg font-semibold mb-4">Add New Currency</h2>
    <div class="mt-4">
      <label for="CurrencyNameLan1" class="block mb-2">Currency Name (*):</label>
      <input v-model="formData.CurrencyNameLan1" id="CurrencyNameLan1" type="text" class="form-input w-full"> 
    </div>
    <div class="mt-4">
      <label for="CurrencyNameLan2" class="block mb-2">Currency Name 2 (*):</label>
      <input v-model="formData.CurrencyNameLan2" id="CurrencyNameLan2" type="text" class="form-input w-full"> 
    </div>
    <div class="mt-4">
      <label for="CurrencySymbol" class="block mb-2">Currency Symbol:</label>
      <input v-model="formData.CurrencySymbol" id="CurrencySymbol" type="text" class="form-input w-full">
    </div>
    <div class="mt-4">
      <label for="CurrencyLastConvRate" class="block mb-2">Currency Conv Rate:</label>
      <input v-model="formData.CurrencyLastConvRate" id="CurrencyLastConvRate" type="text" class="form-input w-full">
    </div>
   <div class="mt-4 flex items-center">
   <label for="IsActive" class="block mb-2  mr-2">Active:</label>
    <label class="w-12 h-6 relative" >
<input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formData.IsActive" id="IsActive" />
<span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>
    </div>
    <div class="mt-6 flex justify-end">
      <button type="button" class="btn btn-primary mr-2" @click="saveCurrency()">Save</button>
      <button type="button" class="btn btn-danger" @click="closeModal()">Cancel</button>
    </div>
  </div>
</div>
<!-- edit model-->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Currency</h2>
        <div class="mt-4">
          <label for="CurrencyNameLan1" class="block mb-2">Currency Name (*):</label>
          <input v-model="formEditData.CurrencyNameLan1" id="CurrencyNameLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="CurrencyNameLan2" class="block mb-2">Currency Name 2 (*):</label>
          <input v-model="formEditData.CurrencyNameLan2" id="CurrencyNameLan2" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="CurrencySymbol" class="block mb-2">Currency Symbol:</label>
          <input v-model="formEditData.CurrencySymbol" id="CurrencySymbol" type="text" class="form-input w-full">
        </div>
        <div class="mt-4">
          <label for="CurrencyLastConvRate" class="block mb-2">Currency Conv Rate:</label>
          <input v-model="formEditData.CurrencyLastConvRate" id="CurrencyLastConvRate" type="text" class="form-input w-full">
        </div>
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">Active:</label>
        <label class="w-12 h-6 relative" >
    <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditData.IsActive" id="IsActive" />
    <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
</label>
        </div> 
<div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editCurrency(formEditData.CurrencyID)">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModal()">Cancel</button>
        </div>
      </div>
    </div>

    
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-primary" @click="showModal = true">Add New</button>
                    </div>
                    
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="currency"
                    :columns="cols"
                    :totalRows="currency?.length"
                    :sortable="true"
                    :search="search"
                    skin="whitespace-nowrap table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                <template #id="data">
                        <input
                            type="checkbox"
                            class="form-checkbox mt-1"
                            :id="`chk${data.value.id}`"
                            :value="`${data.value.id}`"
                            x-model.number="selectedRows"
                        />
                    </template>
                    
                    <template #IsActive="data">
                        <span :class="getActiveClass(data.value.IsActive)">
                            {{ data.value.IsActive ? 'Active' : 'Inactive' }}
                        </span>
                    </template>

                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">

                            <div class="flex items-center gap-2">
                                <button type="button" @click="openEditModal(data.value)">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
        <path
            opacity="0.5"
            d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
        ></path>
        <path
            d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z"
            stroke="currentColor"
            stroke-width="1.5"
        ></path>
        <path
            opacity="0.5"
            d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9"
            stroke="currentColor"
            stroke-width="1.5"
        ></path>
    </svg>
</button>

                        </div>
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.CurrencyID}`)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path
                                        d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    ></path>
                                    <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path
                                        opacity="0.5"
                                        d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </template>
                </vue3-datatable>


               
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref,reactive, onMounted } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Currency List' });
    import currencyService from '@/services/currencyService';
    import backofficeUserService from '@/services/backofficeUserService';

    


    //ShowModal
    const showModal = ref(false);


    const formData =ref<any>({
        CurrencyNameLan1: '',
        CurrencyNameLan2:'',
        CurrencySymbol: '',
        CurrencyLastConvRate:'',
        LastUpdateDate:new Date,
        LastUpdateByUserID: 0,
        IsActive: false
    });



    const saveCurrency = async () => {
    try {
        const CurrencyData = {
            CurrencyNameLan1:formData.value.CurrencyNameLan1,
            CurrencyNameLan2:formData.value.CurrencyNameLan2,
            CurrencySymbol:formData.value.CurrencySymbol,
            CurrencyLastConvRate: parseInt(formData.value.CurrencyLastConvRate, 10), // Convert string to int
            LastUpdateDate:new Date,
            CurrencyCreationDate:new Date,
            LastUpdateByUserID:UserID.value,
            CreatedByUserID:UserID.value,
            IsActive:formData.value.IsActive
        };
      const response = await currencyService.createcurrency(CurrencyData);
  
      console.log('Currency created:', response.data);
      fetchCrurrency()
      
    } catch (error: any) {
      console.error('Error creating Currency:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModal(); 
  };

  const closeModal = () => {
    resetForm();
    showModal.value = false;
  };

  const resetForm = () => {
      formData.CurrencyNameLan1= '';
      formData.CurrencyNameLan2='';
      formData.CurrencySymbol='';
      formData.CurrencyLastConvRate='';
      formData.LastUpdateDate=new Date;
      formData.CurrencyCreationDate=new Date;
      formData.CreatedByUserID= 0;
      formData.LastUpdateByUserID= 0;
      formData.IsActive= false;
  };

  //edit modal
    const editModal = ref(false);

   

    const formEditData =ref<any>({
        CurrencyID:0,
        CurrencyNameLan1: '',
        CurrencyNameLan2:'',
        CurrencySymbol: '',
        CurrencyLastConvRate:'',
        LastUpdateDate:new Date,
        LastUpdateByUserID: 0,
        IsActive: false
    });
    const openEditModal = (currency: any) => {
        //console.log("data", Currency)
      formEditData.CurrencyID = currency.CurrencyID;
      formEditData.CurrencyNameLan1 = currency.CurrencyNameLan1;
      formEditData.CurrencyNameLan2 = currency.CurrencyNameLan2;
      formEditData.CurrencySymbol = currency.CurrencySymbol;
      formEditData.CurrencyLastConvRate = currency.CurrencyLastConvRate;
      formEditData.IsActive = currency.IsActive;

      Object.assign(formEditData.value, currency);
      editModal.value = true;
    };
    const closeEditModal = () => {
      editModal.value = false;
      formEditData.CurrencyID = null;
      formEditData.CurrencyNameLan1 = '';
      formEditData.CurrencyNameLan2 = '';
      formEditData.CurrencySymbol = '';
      formEditData.CurrencyLastConvRate = '';
      formEditData.IsActive = false;
    }
  



  const editCurrency = async (id) => {
   try {
        const CurrencyData = {
          CurrencyNameLan1: formEditData.value.CurrencyNameLan1,
          CurrencyNameLan2: formEditData.value.CurrencyNameLan2,
          CurrencySymbol: formEditData.value.CurrencySymbol,
          LastUpdateByUserID: UserID.value,
          CurrencyLastConvRate: formEditData.value.CurrencyLastConvRate,
          LastUpdateDate:new Date,
          IsActive : formEditData.value.IsActive
        };
      const response = await currencyService.updatecurrency(id,CurrencyData);
  
      console.log('Currency updated:', response.data);
      fetchCrurrency()
    } catch (error: any) {
      console.error('Error updated currency:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModal(); 
  };


 //list
    const currency = ref<any[]>([]);

    const datatable: any = ref(null);
    const search = ref('');
    const cols = ref([
        
        { field: 'CurrencyNameLan1', title: 'Currency Name' },
        { field: 'CurrencySymbol', title: 'Currency Symbol' },
        { title: 'Status', field: 'IsActive', template: 'IsActive' },
        { field: 'LastUpdateDate', title: 'Last Update' },
        { field: 'LastUpdateByUser', title: 'Updated By' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);

    const getActiveClass = (isActive) => {
    return isActive ? 'text-green-500' : 'text-red-500';
};
const fetchUser= async (UserID) => {
    try {
        const user = await backofficeUserService.getUserById(UserID);
        console.log(user.UserName)
        return user.UserName;
    } catch (error) {
        console.error('Error fetching delegations:', error);
    }
};


    const fetchCrurrency = async () => {
    try {
        const currencyData = await currencyService.getCurrencies();
        const userPromises = currencyData.map(currencyData => {
                    return fetchUser(currencyData.LastUpdateByUserID);
                });
        const resolvedUsers = await Promise.all(userPromises);
        currency.value = currencyData.map((currencyData,index) => ({
                ...currencyData,
                LastUpdateDate: formatDate(currencyData.LastUpdateDate),
                LastUpdateByUser: resolvedUsers[index], 
            }));
    } catch (error) {
        console.error('Error fetching currency:', error);
    }
};


onMounted(() => {
    fetchCrurrency();
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



    const searchText = ref('');
    const tableOption = ref({
        headings: {
            id: (h: any, row: any, index: number) => {
                return '#';
            },
        },
        perPage: 10,
        perPageValues: [10, 20, 30, 50, 100],
        skin: 'table-hover',
        columnsClasses: { actions: 'actions !text-center w-1' },
        pagination: { show: true, nav: 'scroll', chunk: 10 },
        texts: {
            count: 'Showing {from} to {to} of {count} entries',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: '',
        },
        resizableColumns: false,
        sortable: ['invoice', 'name', 'email', 'date', 'amount', 'status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc',
        },
    });

   const deleteRow = async (item: any = null) => {
    console.log("item: ", item)
        if (confirm('Are you sure want to delete selected row ?')) {
        try {
           await currencyService.deletecurrency(item);
           await fetchCrurrency(); 
            alert('Currency deleted successfully');
        } catch (err) {
            alert('Failed to delete Currency');
            console.log(err)
     
        }
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

</script>
