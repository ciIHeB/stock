<template>
  <TabGroup as="div" class=" panel mb-5">
  <TabList class="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
    <Tab as="template" v-slot="{ selected }">
      <a
        href="javascript:;"
        class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
        :class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
        >Payment Term </a
      >
    </Tab>
    <Tab as="template" v-slot="{ selected }">
      <a
        href="javascript:;"
        class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
        :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
        >Payment Method</a
      >
    </Tab>
</TabList>
    <TabPanels class="pt-5 flex-1 text-sm">
      <TabPanel>
    <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Add New Payment Term</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataPaymentTerm.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="PaymentTermLan1" class="block mb-2">PaymentTermLan1 (*):</label>
          <input v-model="formDataPaymentTerm.PaymentTermLan1" id="PaymentTermLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="PaymentTermLan2" class="block mb-2">Payment Term Name 2 (*):</label>
          <input v-model="formDataPaymentTerm.PaymentTermLan2" id="PaymentTermLan2" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="PaymentTermDueDays" class="block mb-2">Payment Term Due Days:</label>
          <input v-model="formDataPaymentTerm.PaymentTermDueDays" id="PaymentTermDueDays" type="text" class="form-input w-full">
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">PaymentTerm Has Allowance:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataPaymentTerm.PaymentTermHasAllowance" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">Check Allowance Policy:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataPaymentTerm.ApplyCheckAllowancePolicy" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="savePaymentTerm()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalPaymentTerm()">Cancel</button>
        </div>
      </div>
    </div>



<!--editModal-->

    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Payment Term</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataPaymentTerm.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="PaymentTermLan1" class="block mb-2">PaymentTermLan1 (*):</label>
          <input v-model="formEditDataPaymentTerm.PaymentTermLan1" id="PaymentTermLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="PaymentTermLan2" class="block mb-2">Payment Term Name 2 (*):</label>
          <input v-model="formEditDataPaymentTerm.PaymentTermLan2" id="PaymentTermLan2" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="PaymentTermDueDays" class="block mb-2">Payment Term Due Days:</label>
          <input v-model="formEditDataPaymentTerm.PaymentTermDueDays" id="PaymentTermDueDays" type="text" class="form-input w-full">
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">PaymentTerm Has Allowance:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataPaymentTerm.PaymentTermHasAllowance" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">Check Allowance Policy:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataPaymentTerm.ApplyCheckAllowancePolicy" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
<div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editPaymentTerm(formEditDataPaymentTerm.PaymentTermID )">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalPaymentTerm()">Cancel</button>
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
                    :rows="PaymentTerm"
                    :columns="cols"
                    :totalRows="PaymentTerm?.length"
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


                         
                            <button type="button" class="hover:text-danger" @click="deleteRowPaymentTerm(`${data.value.PaymentTermID}`)">
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
  </TabPanel>
  <TabPanel>
    <div>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModalPaymentMethod">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Add New Payment Method</h2>
        <div class="mt-4">
          <label for="PaymentMethodLan1" class="block mb-2">Payment Method Name (*):</label>
          <input v-model="formDataPaymentMethod.PaymentMethodLan1" id="PaymentMethodLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="PaymentMethodLan2" class="block mb-2">Payment Method Name 2 (*):</label>
          <input v-model="formDataPaymentMethod.PaymentMethodLan2" id="PaymentMethodLan2" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="savePaymentMethod()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalPaymentMethod()">Cancel</button>
        </div>
      </div>
    </div>



<!--editModal-->

    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModalPaymentMethod">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Payment Method </h2>
        <div class="mt-4">
          <label for="PaymentMethodLan1" class="block mb-2">Payment Method Name (*):</label>
          <input v-model="formEditDataPaymentMethod.PaymentMethodLan1" id="PaymentMethodLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="PaymentMethodLan2" class="block mb-2">Payment Method Name 2 (*):</label>
          <input v-model="formEditDataPaymentMethod.PaymentMethodLan2" id="PaymentMethodLan2" type="text" class="form-input w-full"> 
        </div>
<div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editPaymentMethod(formEditDataPaymentMethod.PaymentMethodID  )">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalPaymentMethod()">Cancel</button>
        </div>
      </div>
    </div>
        
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-primary" @click="showModalPaymentMethod = true">Add New</button>
                    </div>
                    
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="PaymentMethod"
                    :columns="colsMethods"
                    :totalRows="PaymentMethod?.length"
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

                    <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">

                            <div class="flex items-center gap-2">
                                <button type="button" @click="openEditModalPaymentMethod(data.value)">
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


                         
                            <button type="button" class="hover:text-danger" @click="deleteRowPaymentMethod(`${data.value.PaymentMethodID}`)">
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
  </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script lang="ts" setup>
    import { ref,reactive, onMounted } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    useMeta({ title: 'Payment List' });
    import paymentTermService from '@/services/paymentTermService';
    import paymentMethodService from '@/services/paymentMethodService';
    import companyService from '@/services/companyService';
    import backofficeUserService from '@/services/backofficeUserService';


    //ShowModal
    const showModal = ref(false);
    const companies = ref<any[]>([]);



    const formDataPaymentTerm =ref<any>({
      PaymentTermLan1: '',
      PaymentTermLan2:'',
      PaymentTermDueDays: '',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      PaymentTermHasAllowance:false,
      ApplyCheckAllowancePolicy: false
    });



    const savePaymentTerm = async () => {
    try {
        const PaymentTermData = {
          CompanyID :formDataPaymentTerm.value.CompanyID,
          PaymentTermLan1:formDataPaymentTerm.value.PaymentTermLan1,
          PaymentTermLan2:formDataPaymentTerm.value.PaymentTermLan2,
          PaymentTermDueDays: parseInt(formDataPaymentTerm.value.PaymentTermDueDays,10),
          LastUpdateDate:new Date,
          PaymentTermCreationDate:new Date,
          LastUpdateByUserID:UserID.value,
          CreatedByUserID:UserID.value,
          ApplyCheckAllowancePolicy:formDataPaymentTerm.value.ApplyCheckAllowancePolicy,
          PaymentTermHasAllowance:formDataPaymentTerm.value.PaymentTermHasAllowance
        };
      const response = await paymentTermService.createPaymentTerm(PaymentTermData);
  
      console.log('Payment Term created:', response.data);
      fetchPaymentTerm()
      
    } catch (error: any) {
      console.error('Error creating Payment Term:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalPaymentTerm(); 
  };

  const closeModalPaymentTerm = () => {
    resetForm();
    showModal.value = false;
  };

  const resetForm = () => {
    formDataPaymentTerm.PaymentTermLan1= '';
    formDataPaymentTerm.PaymentTermLan2='';
    formDataPaymentTerm.PaymentTermDueDays='';
    formDataPaymentTerm.PaymentTermCreationDate='';
    formDataPaymentTerm.LastUpdateDate=new Date;
    formDataPaymentTerm.CurrencyCreationDate=new Date;
    formDataPaymentTerm.CreatedByUserID= 0;
    formDataPaymentTerm.LastUpdateByUserID= 0;
    formDataPaymentTerm.PaymentTermHasAllowance= false;
    formDataPaymentTerm.ApplyCheckAllowancePolicy= false;
  };

async function  fetchCompanies ()  {
    try {
        companies.value = await companyService.getcompanies();
           
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};

  //edit modal
    const editModal = ref(false);

   

    const formEditDataPaymentTerm =ref<any>({
      CompanyID :0,
      PaymentTermID :0,
      PaymentTermLan1: '',
      PaymentTermLan2:'',
      PaymentTermDueDays: '',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      PaymentTermHasAllowance:false,
      ApplyCheckAllowancePolicy: false
    });
    const openEditModal = (PaymentTerm: any) => {
        //console.log("data", Currency)
      formEditDataPaymentTerm.CompanyID = PaymentTerm.CompanyID;
      formEditDataPaymentTerm.PaymentTermID = PaymentTerm.PaymentTermID;
      formEditDataPaymentTerm.PaymentTermLan1 = PaymentTerm.PaymentTermLan1;
      formEditDataPaymentTerm.PaymentTermLan2 = PaymentTerm.PaymentTermLan2;
      formEditDataPaymentTerm.PaymentTermDueDays = PaymentTerm.PaymentTermDueDays;
      formEditDataPaymentTerm.PaymentTermHasAllowance = PaymentTerm.PaymentTermHasAllowance;
      formEditDataPaymentTerm.ApplyCheckAllowancePolicy = PaymentTerm.ApplyCheckAllowancePolicy;

      Object.assign(formEditDataPaymentTerm.value, PaymentTerm);
      editModal.value = true;
    };
    const closeEditModalPaymentTerm = () => {
      editModal.value = false;
      formEditDataPaymentTerm.CompanyID = null;
      formEditDataPaymentTerm.PaymentTermLan1 = '';
      formEditDataPaymentTerm.PaymentTermLan2 = '';
      formEditDataPaymentTerm.PaymentTermDueDays = 0;
      formEditDataPaymentTerm.PaymentTermHasAllowance = false;
      formEditDataPaymentTerm.ApplyCheckAllowancePolicy = false;
    }
  



  const editPaymentTerm = async (id) => {
   try {
        const PaymentTermData = {
          CompanyID :formEditDataPaymentTerm.value.CompanyID,
          PaymentTermLan1:formEditDataPaymentTerm.value.PaymentTermLan1,
          PaymentTermLan2:formEditDataPaymentTerm.value.PaymentTermLan2,
          PaymentTermDueDays: parseInt(formEditDataPaymentTerm.value.PaymentTermDueDays,10),
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          ApplyCheckAllowancePolicy:formEditDataPaymentTerm.value.ApplyCheckAllowancePolicy,
          PaymentTermHasAllowance:formEditDataPaymentTerm.value.PaymentTermHasAllowance
        };
      const response = await paymentTermService.updatePaymentTerm(id,PaymentTermData);
  
      console.log('Payment Term updated:', response.data);
      fetchPaymentTerm()
    } catch (error: any) {
      console.error('Error updated Payment Term:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalPaymentTerm(); 
  };
  //------------------------Payment Method-----------------------
//ShowModal
const showModalPaymentMethod = ref(false);



    const formDataPaymentMethod =ref<any>({
      PaymentMethodLan1: '',
      PaymentMethodLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,

    });



    const savePaymentMethod= async () => {
    try {
        const PaymentMethodData = {
          PaymentMethodLan1:formDataPaymentMethod.value.PaymentMethodLan1,
          PaymentMethodLan2:formDataPaymentMethod.value.PaymentMethodLan1,
          LastUpdateDate:new Date,
          PaymentMethodCreationDate:new Date,
          LastUpdateByUserID:UserID.value,
          CreatedByUserID:UserID.value
        };
      const response = await paymentMethodService.createPaymentMethod(PaymentMethodData);
  
      console.log('Payment Method created:', response.data);
      fetchPaymentMethod()
      
    } catch (error: any) {
      console.error('Error creating Payment Method:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalPaymentMethod(); 
  };

  const closeModalPaymentMethod = () => {
    resetFormPaymentMethod();
    showModalPaymentMethod.value = false;
  };

  const resetFormPaymentMethod = () => {
    formDataPaymentMethod.PaymentMethodLan1= '';
    formDataPaymentMethod.PaymentMethodLan2='';
  };



  //edit modal
    const editModalPaymentMethod = ref(false);

   

    const formEditDataPaymentMethod =ref<any>({
      PaymentMethodLan1: '',
      PaymentMethodLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0
    });
    const openEditModalPaymentMethod = (PaymentMethod: any) => {
        formEditDataPaymentMethod.value.PaymentMethodID  = PaymentMethod.PaymentMethodID 
        formEditDataPaymentMethod.PaymentMethodLan1 = PaymentMethod.PaymentMethodLan1;
        formEditDataPaymentMethod.PaymentMethodLan2 = PaymentMethod.PaymentMethodLan2;

      Object.assign(formEditDataPaymentMethod.value, PaymentMethod);
      editModalPaymentMethod.value = true;
    };
    const closeEditModalPaymentMethod = () => {
      editModalPaymentMethod.value = false;
      formEditDataPaymentMethod.PaymentMethodID = null;
      formEditDataPaymentMethod.PaymentMethodLan1 = '';
      formEditDataPaymentMethod.PaymentMethodLan2 = '';
    }
  



  const editPaymentMethod = async (id) => {
   try {
        const PaymentMethodData = {
          PaymentMethodLan1:formEditDataPaymentMethod.value.PaymentMethodLan1,
          PaymentMethodLan2:formEditDataPaymentMethod.value.PaymentMethodLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value
        };
      const response = await paymentMethodService.updatePaymentMethod(id,PaymentMethodData);
  
      console.log('Payment Method updated:', response.data);
      fetchPaymentMethod()
    } catch (error: any) {
      console.error('Error updated Payment Method:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalPaymentMethod(); 
  };



  //-----------------------------------------------------------------

 //list
    const PaymentTerm = ref<any[]>([]);
    const PaymentMethod = ref<any[]>([]);

    const datatable: any = ref(null);
    const search = ref('');
    const cols = ref([
        
        { field: 'PaymentTermLan1', title: 'Payment Term Name' },
        { field: 'LastUpdateDate', title: 'Last Update' },
        { field: 'LastUpdateByUser', title: 'Updated By' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);

    
    const colsMethods = ref([
        
        { field: 'PaymentMethodLan1', title: 'Payment Method Name' },
        { field: 'LastUpdateDate', title: 'Last Update' },
        { field: 'LastUpdateByUser', title: 'Updated By' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);



    const fetchPaymentTerm = async () => {
    try {
      const PaymentTermData = await paymentTermService.getPaymentTerms();
      const userPromises = PaymentTermData.map(PaymentTermData => {
                    return fetchUser(PaymentTermData.LastUpdateByUserID);
                });
        const resolvedUsers = await Promise.all(userPromises);
        
        PaymentTerm.value = PaymentTermData.map((PaymentTermData, index) => ({
                ...PaymentTermData,
                LastUpdateDate: formatDate(PaymentTermData.LastUpdateDate),
                LastUpdateByUser: resolvedUsers[index], 
            }));
    } catch (error) {
        console.error('Error fetching PaymentTerm:', error);
    }
};

const fetchPaymentMethod = async () => {
    try {
      const PaymentMethodData = await paymentMethodService.getPaymentMethods();
      const userPromises = PaymentMethodData.map(PaymentMethodData => {
                    return fetchUser(PaymentMethodData.LastUpdateByUserID);
                });
        const resolvedUsers = await Promise.all(userPromises);
        
        PaymentMethod.value = PaymentMethodData.map((PaymentMethodData, index) => ({
                ...PaymentMethodData,
                LastUpdateDate: formatDate(PaymentMethodData.LastUpdateDate),
                LastUpdateByUser: resolvedUsers[index], 
            }));
    } catch (error) {
        console.error('Error fetching PaymentMethod:', error);
    }
};


onMounted(() => {
  fetchPaymentTerm();
  fetchPaymentMethod();
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

const fetchUser= async (UserID) => {
    try {
        const user = await backofficeUserService.getUserById(UserID);
        console.log(user.UserName)
        return user.UserName;
    } catch (error) {
        console.error('Error fetching delegations:', error);
    }
};

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

   const deleteRowPaymentTerm = async (item: any = null) => {
    console.log("item: ", item)
        if (confirm('Are you sure want to delete selected row ?')) {
        try {
           await paymentTermService.deletePaymentTerm(item);
           await fetchPaymentTerm(); 
            alert('Payment Term deleted successfully');
        } catch (err) {
            alert('Failed to delete Payment Term');
            console.log(err)
     
        }
    }
    };
    const deleteRowPaymentMethod = async (item: any = null) => {
    console.log("item: ", item)
        if (confirm('Are you sure want to delete selected row ?')) {
        try {
           await paymentMethodService.deletePaymentMethod(item);
           await fetchPaymentMethod(); 
            alert('Payment Method deleted successfully');
        } catch (err) {
            alert('Failed to delete Payment Method');
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
