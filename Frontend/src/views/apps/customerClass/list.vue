<template>
    <TabGroup as="div" class=" panel mb-5">
    <TabList class="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
      <Tab as="template" v-slot="{ selected }">
        <a
          href="javascript:;"
          class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
          :class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
          >Customer Class </a
        >
      </Tab>
      <Tab as="template" v-slot="{ selected }">
        <a
          href="javascript:;"
          class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
          :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
          >Customer Cluster</a
        >
      </Tab>
    </TabList>
    <TabPanels class="pt-5 flex-1 text-sm">
      <TabPanel>
        <!-- add panel-->
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModal">
              <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h2 class="text-lg font-semibold mb-4">Add New Customer Class </h2>
               <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataCustomerClass.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
              </div>
            <div class="mt-4">
              <label for="ClassDescLan1" class="block mb-2">Class Name (*):</label>
              <input v-model="formDataCustomerClass.ClassDescLan1" id="ClassDescLan1" type="text" class="form-input w-full"> 
            </div>
            <div class="mt-4">
          <label for="ClassDescLan2" class="block mb-2">Class Name 2 (*):</label>
          <input v-model="formDataCustomerClass.ClassDescLan2" id="ClassDescLan2" type="text" class="form-input w-full"> 
           </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataCustomerClass.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveCustomerClass()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalCustomerClass()">Cancel</button>
        </div>
      </div>
    </div>
         <!--edit panel-->
         <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Customer Class</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataCustomerClass.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ClassDescLan1" class="block mb-2">Customer Class Name (*):</label>
          <input v-model="formEditDataCustomerClass.ClassDescLan1" id="ClassDescLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ClassDescLan2" class="block mb-2">Customer Class Name 2 (*):</label>
          <input v-model="formEditDataCustomerClass.ClassDescLan2" id="ClassDescLan2" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataCustomerClass.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editCustomerClass(formEditDataCustomerClass.ClassID )">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalCustomerClass()">Cancel</button>
        </div>
      </div>
    </div>


        <div>
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
                    :rows="classes"
                    :columns="cols"
                    :totalRows="classes?.length"
                    :sortable="true"
                    :search="search"
                    skin="whitespace-nowrap table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                <template #IsActive="data">
                <span :class="getActiveClass(data.value.IsActive)">
                {{ data.value.IsActive ? 'Active' : 'Inactive' }}
                </span>
                </template>
                   
                    
                <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">
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
                           
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.ClassID }`)"> 
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
        <!-- add panel-->
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModalCustomerCluster">
              <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h2 class="text-lg font-semibold mb-4">Add New Item Category</h2>
               <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataCustomerCluster.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
              </div>
            <div class="mt-4">
              <label for="ClusterDescLan1" class="block mb-2">Customer Cluster Name (*):</label>
              <input v-model="formDataCustomerCluster.ClusterDescLan1" id="ClusterDescLan1" type="text" class="form-input w-full"> 
            </div>
            <div class="mt-4">
          <label for="ClusterDescLan2" class="block mb-2">Customer Cluster Name 2 (*):</label>
          <input v-model="formDataCustomerCluster.ClusterDescLan2" id="ClusterDescLan2" type="text" class="form-input w-full"> 
           </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataCustomerCluster.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveCustomerCluster()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalCustomerCluster()">Cancel</button>
        </div>
      </div>
    </div>
         <!--edit panel-->
         <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModalCustomerCluster">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Item Category</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataCustomerCluster.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ClusterDescLan1" class="block mb-2">Customer Cluster Name (*):</label>
          <input v-model="formEditDataCustomerCluster.ClusterDescLan1" id="ClusterDescLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ClusterDescLan2" class="block mb-2">Customer Cluster Name 2 (*):</label>
          <input v-model="formEditDataCustomerCluster.ClusterDescLan2" id="ClusterDescLan2" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataCustomerCluster.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editCustomerCluster(formEditDataCustomerCluster.ClusterID )">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalCustomerCluster()">Cancel</button>
        </div>
      </div>
    </div>
        <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                                   <button type="button" class="btn btn-primary" @click="showModalCustomerCluster = true">Add New</button>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="clusters"
                    :columns="cols2"
                    :totalRows="clusters?.length"
                    :sortable="true"
                    :search="search"
                    skin="whitespace-nowrap table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                <template #IsActive="data">
                <span :class="getActiveClass(data.value.IsActive)">
                {{ data.value.IsActive ? 'Active' : 'Inactive' }}
                </span>
                </template>
                    
                <template #actions="data">
                        <div class="flex gap-4 items-center justify-center">
                            <button type="button" @click="openeditModalCustomerCluster(data.value)">                        
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
                            
                            <button type="button" class="hover:text-danger" @click="deleteRow2(`${data.value.ClusterID}`)"> 
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

  <!-- script -->
  <script lang="ts" setup>
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    import { ref, onMounted } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Customer Class List' });
    import customerClassService from '@/services/customerClassService';
    import customerClusterService from '@/services/customerClusterService';
    import companyService from '@/services/companyService';
    import { jwtDecode } from 'jwt-decode';
    import backofficeUserService from '@/services/backofficeUserService';

    const UserID = ref<Number>();

    const classes = ref<any[]>([]);
    const clusters = ref<any[]>([]);


//------------------------categorie 1
 //ShowModal
 const showModal = ref(false);
    const companies = ref<any[]>([]);



    const formDataCustomerClass =ref<any>({
        CompanyID: 0,
        ClassDescLan1: '',
        ClassDescLan2:'',
        IsActive:false,
    });



    const saveCustomerClass = async () => {
    try {
        const ItemData = {
        CompanyID:formDataCustomerClass.value.CompanyID,
        ClassDescLan1:formDataCustomerClass.value.ClassDescLan1,
        ClassDescLan2:formDataCustomerClass.value.ClassDescLan2,
        LastUpdateDate:new Date,
        CategoryCreationDate:new Date,
        LastUpdateByUserID:UserID.value,
        CreatedByUserID:UserID.value,
        IsActive:formDataCustomerClass.value.IsActive,
        };
      const response = await customerClassService.createItem(ItemData);
  
      console.log('Item  created:', response.data);
      fetchItemsClasses()
      
    } catch (error: any) {
      console.error('Error creating Item :', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalCustomerClass(); 
  };

  const closeModalCustomerClass = () => {
    resetForm();
    showModal.value = false;
  };

  const resetForm = () => {
    formDataCustomerClass.ClassDescLan1= '';
    formDataCustomerClass.ClassDescLan2='';
    formDataCustomerClass.IsActive= false;
  };



  //edit modal
    const editModal = ref(false);

   

    const formEditDataCustomerClass =ref<any>({
      CompanyID :0,
      ClassDescLan1: '',
      ClassDescLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      IsActive:false,
    });
    const openEditModal = (classes: any) => {
        //console.log("data ItemCategory", classes)
      formEditDataCustomerClass.value.CompanyID = classes.CompanyID;
      formEditDataCustomerClass.value.ClassDescLan1 = classes.ClassDescLan1;
      formEditDataCustomerClass.value.ClassDescLan2 = classes.ClassDescLan2;
      formEditDataCustomerClass.IsActive = classes.IsActive;

      Object.assign(formEditDataCustomerClass.value, classes);
      editModal.value = true;
    };
    const closeEditModalCustomerClass = () => {
      editModal.value = false;
      formEditDataCustomerClass.CompanyID = null;
      formEditDataCustomerClass.ClassDescLan1 = '';
      formEditDataCustomerClass.ClassDescLan2 = '';
      formEditDataCustomerClass.IsActive = false;
    }
  



  const editCustomerClass = async (id) => {
   try {
        const ItemData = {
          CompanyID :formEditDataCustomerClass.value.CompanyID,
          ClassDescLan1:formEditDataCustomerClass.value.ClassDescLan1,
          ClassDescLan2:formEditDataCustomerClass.value.ClassDescLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataCustomerClass.value.IsActive,
        };
      const response = await customerClassService.updateItem(id,ItemData);
  
      console.log('Customer Class updated:', response.data);
      fetchItemsClasses()
    } catch (error: any) {
      console.error('Error updated Customer Class:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalCustomerClass(); 
  };

//--------------------------- categorie 2
 //ShowModal
 const showModalCustomerCluster = ref(false);




    const formDataCustomerCluster =ref<any>({
        CompanyID: 0,
        ClusterDescLan1: '',
        ClusterDescLan2:'',
        IsActive:false,
    });



    const saveCustomerCluster = async () => {
    try {
        const ItemData2 = {
        CompanyID:formDataCustomerCluster.value.CompanyID,
        ClusterDescLan1:formDataCustomerCluster.value.ClusterDescLan1,
        ClusterDescLan2:formDataCustomerCluster.value.ClusterDescLan2,
        LastUpdateDate:new Date,
        CategoryCreationDate:new Date,
        LastUpdateByUserID:UserID.value,
        CreatedByUserID:UserID.value,
        IsActive:formDataCustomerCluster.value.IsActive,
        };
      const response = await customerClusterService.createItem(ItemData2);
  
      console.log('Item  created:', response.data);
      fetchItemsClusters()
      
    } catch (error: any) {
      console.error('Error creating Item :', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalCustomerCluster(); 
  };

  const closeModalCustomerCluster = () => {
    resetForm2();
    showModalCustomerCluster.value = false;
  };

  const resetForm2 = () => {
    formDataCustomerCluster.ClusterDescLan1= '';
    formDataCustomerCluster.ClusterDescLan2='';
    formDataCustomerCluster.IsActive= false;
  };



  //edit modal
    const editModalCustomerCluster = ref(false);

   

    const formEditDataCustomerCluster =ref<any>({
      CompanyID :0,
      ClusterDescLan1: '',
      ClusterDescLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      IsActive:false,
    });
    const openeditModalCustomerCluster = (clusters: any) => {
        //console.log("data ItemCategory", classes)
      formEditDataCustomerCluster.value.CompanyID = clusters.CompanyID;
      formEditDataCustomerCluster.value.ClusterDescLan1 = clusters.ClusterDescLan1;
      formEditDataCustomerCluster.value.ClusterDescLan2 = clusters.ClusterDescLan2;
      formEditDataCustomerCluster.IsActive = clusters.IsActive;

      Object.assign(formEditDataCustomerCluster.value, clusters);
      editModalCustomerCluster.value = true;
    };
    const closeEditModalCustomerCluster = () => {
        editModalCustomerCluster.value = false;
      formEditDataCustomerCluster.CompanyID = null;
      formEditDataCustomerCluster.ClusterDescLan1 = '';
      formEditDataCustomerCluster.ClusterDescLan2 = '';
      formEditDataCustomerCluster.IsActive = false;
    }
  



  const editCustomerCluster = async (id) => {
   try {
        const ItemData2 = {
          CompanyID :formEditDataCustomerCluster.value.CompanyID,
          ClusterDescLan1:formEditDataCustomerCluster.value.ClusterDescLan1,
          ClusterDescLan2:formEditDataCustomerCluster.value.ClusterDescLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataCustomerCluster.value.IsActive,
        };
      const response = await customerClusterService.updateItem(id,ItemData2);
  
      console.log('Customer Cluster  updated:', response.data);
      fetchItemsClusters()
    } catch (error: any) {
      console.error('Error updated Customer Cluster:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalCustomerCluster(); 
  };




async function  fetchCompanies ()  {
    try {
        companies.value = await companyService.getcompanies();
           
    } catch (error) {
        console.error('Error fetching Companies:', error);
    }
};



    const datatable: any = ref(null);
    const search = ref('');
    const cols = ref([
        { field: 'Company', title: 'Company' },
        { field: 'ClassDescLan1', title: 'Class Name' },
        { field: 'IsActive', title: 'Status', template: 'IsActive' },
        { field: 'LastUpdateDate', title: 'Last Update Date' },
        { field: 'LastUpdateByUser', title: 'Updated By' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);

    const cols2 = ref([
        { field: 'Company', title: 'Company' },
        { field: 'ClusterDescLan1', title: 'Cluster Name' },
        { field: 'LastUpdateDate', title: 'Last Update Date' },
        { field: 'LastUpdateByUser', title: 'Updated By' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);


const fetchItemsClasses= async () => {
    try {
        const classesData = await customerClassService.getItems();


        const companyPromises = classesData.map(classesData => {
                    return fetchCompany(classesData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);
        const userPromises = classesData.map(classesData => {
                    return fetchUser(classesData.LastUpdateByUserID);
                });
        const resolvedUsers = await Promise.all(userPromises);

        classes.value = classesData.map((classesData , index)=> ({
            ...classesData ,
            LastUpdateDate: formatDate(classesData.LastUpdateDate),
            Company: resolvedCompanies[index], 
            LastUpdateByUser: resolvedUsers[index],
            }));
        console.log("classes", classes)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};

const fetchItemsClusters= async () => {
    try {
        const clustersData = await customerClusterService.getItems();


        const companyPromises = clustersData.map(clustersData => {
                    return fetchCompany(clustersData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);
        const userPromises = clustersData.map(clustersData => {
                    return fetchUser(clustersData.LastUpdateByUserID);
                });
        const resolvedUsers = await Promise.all(userPromises);

        clusters.value = clustersData.map((clustersData , index)=> ({
            ...clustersData ,
            LastUpdateDate: formatDate(clustersData.LastUpdateDate),
            LastUpdateByUser: resolvedUsers[index],
            Company: resolvedCompanies[index], 
            }));
        console.log("classes 2", clusters)
    } catch (error) {
        console.error('Error fetching classes 2:', error);
    }
};



const fetchCompany= async (CompanyID) => {
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
       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
       const year = String(date.getFullYear()); // Get last two digits of year
       const hours = String(date.getHours()).padStart(2, '0');
       const minutes = String(date.getMinutes()).padStart(2, '0');
       return `${day}/${month}/${year} ${hours}:${minutes}`;
   };
   const getActiveClass = (isActive) => {
    return isActive ? 'text-green-500' : 'text-red-500';
};

onMounted(() => {
  fetchItemsClasses();
  fetchItemsClusters();
    decodeToken();
    fetchCompanies();
});

const fetchUser= async (UserID) => {
    try {
        const user = await backofficeUserService.getUserById(UserID);
        console.log(user.UserName)
        return user.UserName;
    } catch (error) {
        console.error('Error fetching delegations:', error);
    }
};


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
        sortable: ['invoice', 'name', 'email', 'date', 'amount', 'Category'],
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
           await customerClassService.deleteItem(item);
           await fetchItemsClasses(); 
            alert('Item deleted successfully');
        } catch (err) {
            alert('Failed to delete Category');
            console.log(err)
     
        }
    }
    };
    const deleteRow2 = async (item: any = null) => {
    console.log("item: ", item)
        if (confirm('Are you sure want to delete selected row ?')) {
        try {
           await customerClusterService.deleteItem(item);
           await fetchItemsClusters(); 
            alert('Item deleted successfully');
        } catch (err) {
            alert('Failed to delete Category');
            console.log(err)
     
        }
    }
    };
    
</script>
