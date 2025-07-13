<template>
<TabGroup as="div" class=" panel mb-5">
  <TabList class="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
    <Tab as="template" v-slot="{ selected }">
      <a
        href="javascript:;"
        class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
        :class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
        >Item Unit</a
      >
    </Tab>
    <Tab as="template" v-slot="{ selected }">
      <a
        href="javascript:;"
        class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
        :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
        >Item Unit List</a
      >
    </Tab>
</TabList>
    <TabPanels class="pt-5 flex-1 text-sm">
      <TabPanel>

        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Add New Item Unit</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataItemUnit.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemUnitLan1" class="block mb-2">Item Unit Name (*):</label>
          <input v-model="formDataItemUnit.ItemUnitLan1" id="ItemUnitLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemUnitLan2" class="block mb-2">Item Unit Name 2 (*):</label>
          <input v-model="formDataItemUnit.ItemUnitLan2" id="ItemUnitLan2" type="text" class="form-input w-full"> 
        </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataItemUnit.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveItemUnit()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalItemUnit()">Cancel</button>
        </div>
      </div>
    </div>



<!--editModal-->

    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Item Unit</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataItemUnit.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemUnitLan1" class="block mb-2">Item  Status Name (*):</label>
          <input v-model="formEditDataItemUnit.ItemUnitDescLan1" id="ItemUnitLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemUnitLan2" class="block mb-2">Item Unit Name 2 (*):</label>
          <input v-model="formEditDataItemUnit.ItemUnitDescLan2" id="ItemUnitLan2" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataItemUnit.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editItemUnit(formEditDataItemUnit.ItemUnitID)">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalItemUnit()">Cancel</button>
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
                    :rows="items"
                    :columns="cols"
                    :totalRows="items?.length"
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
                            
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.ItemUnitID}`)"> 
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
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModalItemUnitList">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Add New Item Unit List</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataItemUnitList.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
            <div class=" mt-4">
              <label class="block mb-2">Item Unit  (*):</label>
              <select v-model="formDataItemUnitList.ItemUnitID" class="form-select flex-1">
                <option v-for="item in items" :key="item.ItemUnitID" :value="item.ItemUnitID">
                  {{ item.ItemUnitDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemUnitListLan1" class="block mb-2">Item Unit List  Name (*):</label>
          <input v-model="formDataItemUnitList.ItemUnitListLan1" id="ItemUnitListLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemUnitListLan2" class="block mb-2">Item Unit List Name 2 (*):</label>
          <input v-model="formDataItemUnitList.ItemUnitListLan2" id="ItemUnitListLan2" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemPackSize" class="block mb-2"> Pack Size (*):</label>
          <input v-model="formDataItemUnitList.ItemPackSize" id="ItemPackSize" type="text" class="form-input w-full"> 
        </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataItemUnitList.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveItemUnitList()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalItemUnitList()">Cancel</button>
        </div>
      </div>
    </div>



<!--editModal-->

    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModalItemUnitList">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Item Status</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataItemUnitList.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
            <div class=" mt-4">
              <label class="block mb-2">Item Unit  (*):</label>
              <select v-model="formEditDataItemUnitList.ItemUnitID" class="form-select flex-1">
                <option v-for="item in items" :key="item.ItemUnitID" :value="item.ItemUnitID">
                  {{ item.ItemUnitDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemUnitListLan1" class="block mb-2">Item  Unit List  Name (*):</label>
          <input v-model="formEditDataItemUnitList.ItemUnitListDescLan1" id="ItemUnitListLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemUnitListLan2" class="block mb-2">Item Unit List Name 2 (*):</label>
          <input v-model="formEditDataItemUnitList.ItemUnitListDescLan2" id="ItemUnitListLan2" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemPackSize" class="block mb-2"> Pack Size (*):</label>
          <input v-model="formEditDataItemUnitList.ItemPackSize" id="ItemPackSize" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataItemUnitList.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editItemUnitList(formEditDataItemUnitList.ItemUnitListID )">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalItemUnitList()">Cancel</button>
        </div>
      </div>
    </div>
    <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-primary" @click="showModalItemUnitList = true">Add New</button>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="itemslist"
                    :columns="cols1"
                    :totalRows="itemslist?.length"
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
                            <button type="button" @click="openEditModalItemUnitList(data.value)">
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
                            
                            <button type="button" class="hover:text-danger" @click="deleteRow1(`${data.value.ItemUnitListID}`)"> 
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
    import { ref, onMounted } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    useMeta({ title: 'Item Unit & List' });
    import itemUnitListService from '@/services/itemUnitListService';
    import itemUnitService from '@/services/itemUnitService';
    import companyService from '@/services/companyService';
    import { jwtDecode } from 'jwt-decode';




    const UserID = ref<Number>();

    const items = ref<any[]>([]);
    const itemslist = ref<any[]>([]);
    const showModal = ref(false);
    const companies = ref<any[]>([]);



    const formDataItemUnit =ref<any>({
      ItemUnitLan1: '',
      ItemUnitLan2:'',
      IsActive:false,
    });



    const saveItemUnit = async () => {
    try {
        const ItemUnitData = {
          CompanyID:formDataItemUnit.value.CompanyID,
          ItemUnitDescLan1:formDataItemUnit.value.ItemUnitLan1,
          ItemUnitDescLan2:formDataItemUnit.value.ItemUnitLan2,
          LastUpdateDate:new Date,
          ItemUnitCreationDate:new Date,
          LastUpdateByUserID:UserID.value,
          CreatedByUserID:UserID.value,
          IsActive:formDataItemUnit.value.IsActive,
        };
      const response = await itemUnitService.createItem(ItemUnitData);
  
      console.log('Item Unit created:', response.data);
      fetchItemsUnit()
      
    } catch (error: any) {
      console.error('Error creating Item Unit:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalItemUnit(); 
  };

  const closeModalItemUnit = () => {
    resetForm();
    showModal.value = false;
  };

  const resetForm = () => {
    formDataItemUnit.ItemUnitLan1= '';
    formDataItemUnit.ItemUnitLan2='';
    formDataItemUnit.IsActive= false;
  };



  //edit modal
    const editModal = ref(false);

   

    const formEditDataItemUnit =ref<any>({
        ItemUnitID: '',
      ItemUnitDescLan1: '',
      ItemUnitDescLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      IsActive:false,
    });
    const openEditModal = (items: any) => {
        console.log("data ItemUnit", items)
        formEditDataItemUnit.value.ItemUnitID = items.ItemUnitID;
      formEditDataItemUnit.value.CompanyID = items.CompanyID;
      formEditDataItemUnit.ItemUnitDescLan1 = items.ItemUnitDescLan1;
      formEditDataItemUnit.ItemUnitDescLan2 = items.ItemUnitDescLan2;
      formEditDataItemUnit.IsActive = items.IsActive;

      Object.assign(formEditDataItemUnit.value, items);
      editModal.value = true;
    };
    const closeEditModalItemUnit = () => {
      editModal.value = false;
      formEditDataItemUnit.CompanyID = null;
      formEditDataItemUnit.ItemUnitLan1 = '';
      formEditDataItemUnit.ItemUnitLan2 = '';
      formEditDataItemUnit.IsActive = false;
    }
  



  const editItemUnit = async (id) => {
   try {
        const ItemUnitData = {
          CompanyID :formEditDataItemUnit.value.CompanyID,
          ItemUnitDescLan1:formEditDataItemUnit.value.ItemUnitDescLan1,
          ItemUnitDescLan2:formEditDataItemUnit.value.ItemUnitDescLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataItemUnit.value.IsActive,
        };
      const response = await itemUnitService.updateItem(id,ItemUnitData);
  
      console.log('Item Unit updated:', response.data);
      fetchItemsUnit()
    } catch (error: any) {
      console.error('Error updated Item Unit:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalItemUnit(); 
  };
  //------------------------Item Unit list-----------------------
     //ShowModal
     const showModalItemUnitList = ref(false);



    const formDataItemUnitList =ref<any>({
      CompanyID:0,
      ItemUnitListLan1: '',
      ItemUnitListLan2:'',
      IsActive:false,
      ItemPackSize:null,
    });



    const saveItemUnitList = async () => {
    try {
        const ItemUnitListData = {
          CompanyID:parseInt(formDataItemUnitList.value.CompanyID),
          ItemUnitListDescLan1:formDataItemUnitList.value.ItemUnitListLan1,
          ItemUnitListDescLan2:formDataItemUnitList.value.ItemUnitListLan2,
          ItemUnitID:formDataItemUnitList.value.ItemUnitID,
          LastUpdateDate:new Date,
          ItemUnitListCreationDate:new Date,
          LastUpdateByUserID:UserID.value,
          CreatedByUserID:UserID.value,
          IsActive:formDataItemUnitList.value.IsActive,
          ItemPackSize:parseInt(formDataItemUnitList.value.ItemPackSize)
        };
      const response = await itemUnitListService.createItem(ItemUnitListData);
  
      console.log('Item Status created:', response.data);
      fetchItemsUnitList()
      
    } catch (error: any) {
      console.error('Error creating Item Status:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalItemUnitList(); 
  };

  const closeModalItemUnitList = () => {
    resetFormItemUnitList();
    showModalItemUnitList.value = false;
  };

  const resetFormItemUnitList = () => {
    formDataItemUnitList.ItemUnitListLan1= '';
    formDataItemUnitList.ItemUnitListLan2='';
    formDataItemUnitList.IsActive= false;
    formDataItemUnitList.ItemPackSize= 0;
    formDataItemUnitList.CompanyID= null;
  };



  //edit modal
    const editModalItemUnitList = ref(false);

   

    const formEditDataItemUnitList =ref<any>({
      CompanyID :0,
      ItemUnitListID :0,
      ItemUnitListDescLan1: '',
      ItemUnitListDescLan2:'',
      IsActive:false,
      ItemPackSize: 0
    });
    const openEditModalItemUnitList = (itemslist: any) => {
       // console.log("data ItemUnitList", itemslist)
      formEditDataItemUnitList.value.CompanyID = itemslist.CompanyID;
      formEditDataItemUnitList.ItemUnitListID = itemslist.ItemUnitListID;
      formEditDataItemUnitList.ItemUnitListDescLan1 = itemslist.ItemUnitListDescLan1;
      formEditDataItemUnitList.ItemUnitListDescLan2 = itemslist.ItemUnitListDescLan2;
      formEditDataItemUnitList.IsActive = itemslist.IsActive;
      formEditDataItemUnitList.ItemPackSize = itemslist.ItemPackSize;


      Object.assign(formEditDataItemUnitList.value, itemslist);
      editModalItemUnitList.value = true;
    };
    const closeEditModalItemUnitList = () => {
      editModalItemUnitList.value = false;
      formEditDataItemUnitList.CompanyID = null;
      formEditDataItemUnitList.ItemUnitListLan1 = '';
      formEditDataItemUnitList.ItemUnitListLan2 = '';
      formEditDataItemUnitList.IsActive = false;
      formEditDataItemUnitList.ItemPackSize = 0;
    }
  



  const editItemUnitList = async (id) => {
   try {
        const ItemUnitListData = {
          CompanyID :formEditDataItemUnitList.value.CompanyID,
          ItemUnitListDescLan1:formEditDataItemUnitList.value.ItemUnitListLan1,
          ItemUnitListDescLan2:formEditDataItemUnitList.value.ItemUnitListLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataItemUnitList.value.IsActive,
          ItemPackSize:formEditDataItemUnitList.value.ItemPackSize,
        };
      const response = await itemUnitListService.updateItem(id,ItemUnitListData);
  
      console.log('Item Status updated:', response.data);
      fetchItemsUnitList()
    } catch (error: any) {
      console.error('Error updated Item Status:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalItemUnitList(); 
  };

  //--------------------------------------------------

    const datatable: any = ref(null);
    const search = ref('');
    const cols = ref([
        { field: 'ItemUnitDescLan1', title: 'Item Unit Name' },
        { field: 'IsActive', title: 'Status', template: 'IsActive' },
        { field: 'LastUpdateDate', title: 'Last Update Date' },
        { field: 'Company', title: 'Company' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);
    const cols1 = ref([
        { field: 'ItemUnitListDescLan1', title: 'Item Unit List Name' },
        { field: 'IsActive', title: 'Status', template: 'IsActive' },
        { field: 'Company', title: 'Company' },
        { field: 'LastUpdateDate', title: 'Last Update' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);




    const fetchItemsUnit= async () => {
    try {
        const categoriesData = await itemUnitService.getItems();


        const companyPromises = categoriesData.map(categoriesData => {
                    return fetchCompany(categoriesData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);


        items.value = categoriesData.map((categoriesData , index)=> ({
            ...categoriesData,
            ItemUnitID: categoriesData.ItemUnitID ,
            ItemUnitDescLan1: categoriesData.ItemUnitDescLan1,
                IsActive: categoriesData.IsActive,
                LastUpdateDate: formatDate(categoriesData.LastUpdateDate),
                Company: resolvedCompanies[index], 
            }));
        console.log("Categories", items)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};
const fetchItemsUnitList= async () => {
    try {
        const categoriesData = await itemUnitListService.getItems();


        const companyPromises = categoriesData.map(categoriesData => {
                    return fetchCompany(categoriesData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);


        itemslist.value = categoriesData.map((categoriesData , index)=> ({
            ...categoriesData,
            ItemUnitListID : categoriesData.ItemUnitListID  ,
            ItemUnitListDescLan1: categoriesData.ItemUnitListDescLan1,
            IsActive: categoriesData.IsActive,
            LastUpdateDate: formatDate(categoriesData.LastUpdateDate),
            Company: resolvedCompanies[index], 
            }));
        console.log("Categories", itemslist)
    } catch (error) {
        console.error('Error fetching branches:', error);
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



const fetchCompany= async (CompanyID) => {
    try {
        const company = await companyService.getCompanyById(CompanyID);
        console.log(company.CompanyDescLan1)
        return company.CompanyDescLan1;
    } catch (error) {
        console.error('Error fetching delegations:', error);
    }
};

const getActiveClass = (isActive) => {
    return isActive ? 'text-green-500' : 'text-red-500';
};

async function  fetchCompanies ()  {
    try {
        companies.value = await companyService.getcompanies();
           
    } catch (error) {
        console.error('Error fetching Companies:', error);
    }
};


onMounted(() => {
    fetchItemsUnit();
    fetchItemsUnitList();
    fetchCompanies () ;
    decodeToken();

});

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
           await itemUnitService.deleteItem(item);
           await fetchItemsUnit(); 
            alert('Item deleted successfully');
        } catch (err) {
            alert('Failed to delete Item');
            console.log(err)
     
        }
    }
    };
    const deleteRow1 = async (item: any = null) => {
    console.log("item: ", item)
        if (confirm('Are you sure want to delete selected row ?')) {
        try {
           await itemUnitListService.deleteItem(item);
           await fetchItemsUnitList(); 
            alert('Item deleted successfully');
        } catch (err) {
            alert('Failed to delete Item');
            console.log(err)
     
        }
    }
    };
</script>
