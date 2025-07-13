<template>
    <TabGroup as="div" class=" panel mb-5">
    <TabList class="flex flex-wrap mt-3 border-b border-white-light dark:border-[#191e3a]">
      <Tab as="template" v-slot="{ selected }">
        <a
          href="javascript:;"
          class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
          :class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
          >Item Category</a
        >
      </Tab>
      <Tab as="template" v-slot="{ selected }">
        <a
          href="javascript:;"
          class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
          :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
          >Item Category 2</a
        >
      </Tab>
      <Tab as="template" v-slot="{ selected }">
        <a
          href="javascript:;"
          class="p-3.5 py-2 -mb-[1px] block border border-transparent hover:text-primary dark:hover:border-b-black !outline-none transition duration-300"
          :class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
          >Item Category 3</a
        >
      </Tab>
    </TabList>
    <TabPanels class="pt-5 flex-1 text-sm">
      <TabPanel>
        <!-- add panel-->
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModal">
              <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h2 class="text-lg font-semibold mb-4">Add New Item Category</h2>
               <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataItemCategory.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
              </div>
            <div class="mt-4">
              <label for="ItemCategoryLan1" class="block mb-2">Item Category Name (*):</label>
              <input v-model="formDataItemCategory.CategoryDescLan1" id="ItemCategoryLan1" type="text" class="form-input w-full"> 
            </div>
            <div class="mt-4">
          <label for="ItemCategoryLan2" class="block mb-2">Item Category Name 2 (*):</label>
          <input v-model="formDataItemCategory.CategoryDescLan2" id="ItemCategoryLan2" type="text" class="form-input w-full"> 
           </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataItemCategory.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveItemCategory()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalItemCategory()">Cancel</button>
        </div>
      </div>
    </div>
         <!--edit panel-->
         <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModal">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Item Category</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataItemCategory.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemCategoryLan1" class="block mb-2">Item  Category Name (*):</label>
          <input v-model="formEditDataItemCategory.ItemCategoryDescLan1" id="ItemCategoryLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemCategoryLan2" class="block mb-2">Item Category Name 2 (*):</label>
          <input v-model="formEditDataItemCategory.ItemCategoryDescLan2" id="ItemCategoryLan2" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataItemCategory.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editItemCategory(formEditDataItemCategory.ItemCategoryID)">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalItemCategory()">Cancel</button>
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
                    :rows="categories"
                    :columns="cols"
                    :totalRows="categories?.length"
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
                           
                            <button type="button" class="hover:text-danger" @click="deleteRow(`${data.value.ItemCategoryID}`)"> 
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
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModalCategory2">
              <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h2 class="text-lg font-semibold mb-4">Add New Item Category</h2>
               <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataItemCategory2.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
              </div>
            <div class="mt-4">
              <label for="ItemCategoryLan1" class="block mb-2">Item Category Name (*):</label>
              <input v-model="formDataItemCategory2.CategoryDescLan1" id="ItemCategoryLan1" type="text" class="form-input w-full"> 
            </div>
            <div class="mt-4">
          <label for="ItemCategoryLan2" class="block mb-2">Item Category Name 2 (*):</label>
          <input v-model="formDataItemCategory2.CategoryDescLan2" id="ItemCategoryLan2" type="text" class="form-input w-full"> 
           </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataItemCategory2.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveItemCategory2()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalItemCategory2()">Cancel</button>
        </div>
      </div>
    </div>
         <!--edit panel-->
         <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModalCategory2">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Item Category</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataItemCategory2.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemCategoryLan1" class="block mb-2">Item  Category Name (*):</label>
          <input v-model="formEditDataItemCategory2.ItemCategoryDescLan1" id="ItemCategoryLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemCategoryLan2" class="block mb-2">Item Category Name 2 (*):</label>
          <input v-model="formEditDataItemCategory2.ItemCategoryDescLan2" id="ItemCategoryLan2" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataItemCategory2.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editItemCategory2(formEditDataItemCategory2.ItemCategory2ID)">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalItemCategory2()">Cancel</button>
        </div>
      </div>
    </div>
        <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                                   <button type="button" class="btn btn-primary" @click="showModalCategory2 = true">Add New</button>
                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="categories2"
                    :columns="cols2"
                    :totalRows="categories2?.length"
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
                            <button type="button" @click="openEditModalCategory2(data.value)">                        
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
                            
                            <button type="button" class="hover:text-danger" @click="deleteRow2(`${data.value.ItemCategory2ID}`)"> 
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
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="showModalCategory3">
              <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
              <h2 class="text-lg font-semibold mb-4">Add New Item Category</h2>
               <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formDataItemCategory3.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
              </div>
            <div class="mt-4">
              <label for="ItemCategoryLan1" class="block mb-2">Item Category Name (*):</label>
              <input v-model="formDataItemCategory3.CategoryDescLan1" id="ItemCategoryLan1" type="text" class="form-input w-full"> 
            </div>
            <div class="mt-4">
          <label for="ItemCategoryLan2" class="block mb-2">Item Category Name 2 (*):</label>
          <input v-model="formDataItemCategory3.CategoryDescLan2" id="ItemCategoryLan2" type="text" class="form-input w-full"> 
           </div>
        
        <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formDataItemCategory3.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="saveItemCategory3()">Save</button>
          <button type="button" class="btn btn-danger" @click="closeModalItemCategory3()">Cancel</button>
        </div>
      </div>
    </div>
         <!--edit panel-->
         <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" v-if="editModalCategory3">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md">
        <h2 class="text-lg font-semibold mb-4">Edit Item Category</h2>
        <div class=" mt-4">
              <label class="block mb-2">Company (*):</label>
              <select v-model="formEditDataItemCategory3.CompanyID" class="form-select flex-1">
                <option v-for="company in companies" :key="company.CompanyID" :value="company.CompanyID">
                  {{ company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
        <div class="mt-4">
          <label for="ItemCategoryLan1" class="block mb-2">Item  Category Name (*):</label>
          <input v-model="formEditDataItemCategory3.ItemCategoryDescLan1" id="ItemCategoryLan1" type="text" class="form-input w-full"> 
        </div>
        <div class="mt-4">
          <label for="ItemCategoryLan2" class="block mb-2">Item Category Name 2 (*):</label>
          <input v-model="formEditDataItemCategory3.ItemCategoryDescLan2" id="ItemCategoryLan2" type="text" class="form-input w-full"> 
        </div>
        
       <div class="mt-4 flex items-center">
       <label for="IsActive" class="block mb-2  mr-2">IS Active:</label>
        <label class="w-12 h-6 relative" >
        <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" v-model="formEditDataItemCategory3.IsActive" id="IsActive" />
        <span for="custom_switch_checkbox2" class="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
        </label>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="btn btn-primary mr-2" @click="editItemCategory3(formEditDataItemCategory3.ItemCategory3ID)">Save</button>
          <button type="button" class="btn btn-danger" @click="closeEditModalItemCategory3()">Cancel</button>
        </div>
      </div>
    </div>

        <div>
        <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div class="datatable invoice-table">
                <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div class="flex items-center gap-2">
                        <button type="button" class="btn btn-primary" @click="showModalCategory3 = true">Add New</button>

                    </div>
                    <div class="ltr:ml-auto rtl:mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <vue3-datatable
                    ref="datatable"
                    :rows="categories3"
                    :columns="cols3"
                    :totalRows="categories3?.length"
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
                            <button type="button" @click="openEditModalCategory3(data.value)">    
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
                            
                            <button type="button" class="hover:text-danger" @click="deleteRow3(`${data.value.ItemCategory3ID}`)"> 
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
    useMeta({ title: 'Item List' });
    import itemsCategories2Service from '@/services/itemsCategories2Service';
    import itemsCategories3Service from '@/services/itemsCategories3Service';
    import itemsCategoriesService from '@/services/itemsCategoriesService';
    import companyService from '@/services/companyService';
    import { jwtDecode } from 'jwt-decode';
    const UserID = ref<Number>();

    const categories = ref<any[]>([]);
    const categories2 = ref<any[]>([]);
    const categories3 = ref<any[]>([]);


//------------------------categorie 1
 //ShowModal
 const showModal = ref(false);
    const companies = ref<any[]>([]);



    const formDataItemCategory =ref<any>({
        CompanyID: 0,
        ItemCategoryDescLan1: '',
        ItemCategoryDescLan2:'',
        IsActive:false,
    });



    const saveItemCategory = async () => {
    try {
        const ItemData = {
        CompanyID:formDataItemCategory.value.CompanyID,
        CategoryDescLan1:formDataItemCategory.value.CategoryDescLan1,
        CategoryDescLan2:formDataItemCategory.value.CategoryDescLan2,
        LastUpdateDate:new Date,
        CategoryCreationDate:new Date,
        LastUpdateByUserID:UserID.value,
        CreatedByUserID:UserID.value,
        IsActive:formDataItemCategory.value.IsActive,
        };
      const response = await itemsCategoriesService.createItem(ItemData);
  
      console.log('Item  created:', response.data);
      fetchItemsCategories()
      
    } catch (error: any) {
      console.error('Error creating Item :', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalItemCategory(); 
  };

  const closeModalItemCategory = () => {
    resetForm();
    showModal.value = false;
  };

  const resetForm = () => {
    formDataItemCategory.ItemCategoryLan1= '';
    formDataItemCategory.ItemCategoryLan2='';
    formDataItemCategory.IsActive= false;
  };



  //edit modal
    const editModal = ref(false);

   

    const formEditDataItemCategory =ref<any>({
      CompanyID :0,
      ItemCategoryDescLan1: '',
      ItemCategoryDescLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      IsActive:false,
    });
    const openEditModal = (categories: any) => {
        //console.log("data ItemCategory", categories)
      formEditDataItemCategory.value.CompanyID = categories.CompanyID;
      formEditDataItemCategory.value.ItemCategoryDescLan1 = categories.CategoryDescLan1;
      formEditDataItemCategory.value.ItemCategoryDescLan2 = categories.CategoryDescLan2;
      formEditDataItemCategory.IsActive = categories.IsActive;

      Object.assign(formEditDataItemCategory.value, categories);
      editModal.value = true;
    };
    const closeEditModalItemCategory = () => {
      editModal.value = false;
      formEditDataItemCategory.CompanyID = null;
      formEditDataItemCategory.ItemCategoryLan1 = '';
      formEditDataItemCategory.ItemCategoryLan2 = '';
      formEditDataItemCategory.IsActive = false;
    }
  



  const editItemCategory = async (id) => {
   try {
        const ItemCategoryData = {
          CompanyID :formEditDataItemCategory.value.CompanyID,
          CategoryDescLan1:formEditDataItemCategory.value.ItemCategoryDescLan1,
          CategoryDescLan2:formEditDataItemCategory.value.ItemCategoryDescLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataItemCategory.value.IsActive,
        };
      const response = await itemsCategoriesService.updateItem(id,ItemCategoryData);
  
      console.log('Item Category updated:', response.data);
      fetchItemsCategories()
    } catch (error: any) {
      console.error('Error updated Item Category:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalItemCategory(); 
  };

//--------------------------- categorie 2
 //ShowModal
 const showModalCategory2 = ref(false);




    const formDataItemCategory2 =ref<any>({
        CompanyID: 0,
        ItemCategoryDescLan1: '',
        ItemCategoryDescLan2:'',
        IsActive:false,
    });



    const saveItemCategory2 = async () => {
    try {
        const ItemData2 = {
        CompanyID:formDataItemCategory2.value.CompanyID,
        CategoryDescLan1:formDataItemCategory2.value.CategoryDescLan1,
        CategoryDescLan2:formDataItemCategory2.value.CategoryDescLan2,
        LastUpdateDate:new Date,
        CategoryCreationDate:new Date,
        LastUpdateByUserID:UserID.value,
        CreatedByUserID:UserID.value,
        IsActive:formDataItemCategory2.value.IsActive,
        };
      const response = await itemsCategories2Service.createItem(ItemData2);
  
      console.log('Item  created:', response.data);
      fetchItemsCategories2()
      
    } catch (error: any) {
      console.error('Error creating Item :', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalItemCategory2(); 
  };

  const closeModalItemCategory2 = () => {
    resetForm2();
    showModalCategory2.value = false;
  };

  const resetForm2 = () => {
    formDataItemCategory2.ItemCategoryLan1= '';
    formDataItemCategory2.ItemCategoryLan2='';
    formDataItemCategory2.IsActive= false;
  };



  //edit modal
    const editModalCategory2 = ref(false);

   

    const formEditDataItemCategory2 =ref<any>({
      CompanyID :0,
      ItemCategoryDescLan1: '',
      ItemCategoryDescLan2:'',
      LastUpdateDate:new Date,
      LastUpdateByUserID: 0,
      IsActive:false,
    });
    const openEditModalCategory2 = (categories2: any) => {
        //console.log("data ItemCategory", categories)
      formEditDataItemCategory2.value.CompanyID = categories2.CompanyID;
      formEditDataItemCategory2.value.ItemCategoryDescLan1 = categories2.CategoryDescLan1;
      formEditDataItemCategory2.value.ItemCategoryDescLan2 = categories2.CategoryDescLan2;
      formEditDataItemCategory2.IsActive = categories2.IsActive;

      Object.assign(formEditDataItemCategory2.value, categories2);
      editModalCategory2.value = true;
    };
    const closeEditModalItemCategory2 = () => {
        editModalCategory2.value = false;
      formEditDataItemCategory2.CompanyID = null;
      formEditDataItemCategory2.ItemCategoryLan1 = '';
      formEditDataItemCategory2.ItemCategoryLan2 = '';
      formEditDataItemCategory2.IsActive = false;
    }
  



  const editItemCategory2 = async (id) => {
   try {
        const ItemCategoryData2 = {
          CompanyID :formEditDataItemCategory2.value.CompanyID,
          CategoryDescLan1:formEditDataItemCategory2.value.ItemCategoryDescLan1,
          CategoryDescLan2:formEditDataItemCategory2.value.ItemCategoryDescLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataItemCategory2.value.IsActive,
        };
      const response = await itemsCategories2Service.updateItem(id,ItemCategoryData2);
  
      console.log('Item Category updated:', response.data);
      fetchItemsCategories2()
    } catch (error: any) {
      console.error('Error updated Item Category:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalItemCategory2(); 
  };

//-------------------------------category 3
 //ShowModal
 const showModalCategory3 = ref(false);



    const formDataItemCategory3 =ref<any>({
        CompanyID: 0,
        ItemCategoryDescLan1: '',
        ItemCategoryDescLan2:'',
        IsActive:false,
    });



    const saveItemCategory3 = async () => {
    try {
        const ItemData3 = {
        CompanyID:formDataItemCategory3.value.CompanyID,
        CategoryDescLan1:formDataItemCategory3.value.CategoryDescLan1,
        CategoryDescLan2:formDataItemCategory3.value.CategoryDescLan2,
        LastUpdateDate:new Date,
        CategoryCreationDate:new Date,
        LastUpdateByUserID:UserID.value,
        CreatedByUserID:UserID.value,
        IsActive:formDataItemCategory3.value.IsActive,
        };
      const response = await itemsCategories3Service.createItem(ItemData3);
  
      console.log('Item  created:', response.data);
      fetchItemsCategories3()
      
    } catch (error: any) {
      console.error('Error creating Item :', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeModalItemCategory3(); 
  };

  const closeModalItemCategory3 = () => {
    resetForm3();
    showModalCategory3.value = false;
  };

  const resetForm3 = () => {
    formDataItemCategory3.ItemCategoryLan1= '';
    formDataItemCategory3.ItemCategoryLan2='';
    formDataItemCategory3.IsActive= false;
  };



  //edit modal
    const editModalCategory3 = ref(false);

   

    const formEditDataItemCategory3 =ref<any>({
      CompanyID :0,
      ItemCategoryDescLan1: '',
      ItemCategoryDescLan2:'',
      IsActive:false,
    });
    const openEditModalCategory3 = (categories3: any) => {
        //console.log("data ItemCategory", categories)
      formEditDataItemCategory3.value.CompanyID = categories3.CompanyID;
      formEditDataItemCategory3.value.ItemCategoryDescLan1 = categories3.CategoryDescLan1;
      formEditDataItemCategory3.value.ItemCategoryDescLan2 = categories3.CategoryDescLan2;
      formEditDataItemCategory3.IsActive = categories3.IsActive;

      Object.assign(formEditDataItemCategory3.value, categories3);
      editModalCategory3.value = true;
    };
    const closeEditModalItemCategory3 = () => {
      editModalCategory3.value = false;
      formEditDataItemCategory3.CompanyID = null;
      formEditDataItemCategory3.ItemCategoryLan1 = '';
      formEditDataItemCategory3.ItemCategoryLan2 = '';
      formEditDataItemCategory3.IsActive = false;
    }
  



  const editItemCategory3 = async (id) => {
   try {
        const ItemCategoryData3 = {
          CompanyID :formEditDataItemCategory3.value.CompanyID,
          CategoryDescLan1:formEditDataItemCategory3.value.ItemCategoryDescLan1,
          CategoryDescLan2:formEditDataItemCategory3.value.ItemCategoryDescLan2,
          LastUpdateDate:new Date,
          LastUpdateByUserID:UserID.value,
          IsActive:formEditDataItemCategory3.value.IsActive,
        };
      const response = await itemsCategories3Service.updateItem(id,ItemCategoryData3);
  
      console.log('Item Category updated:', response.data);
      fetchItemsCategories3()
    } catch (error: any) {
      console.error('Error updated Item Category:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
    closeEditModalItemCategory3(); 
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
        { field: 'CategoryDescLan1', title: 'Category Name' },
        { field: 'IsActive', title: 'Category', template: 'IsActive' },
        { field: 'LastUpdateDate', title: 'Last Update Date' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);

    const cols2 = ref([
        { field: 'Company', title: 'Company' },
        { field: 'CategoryDescLan1', title: 'Category Name' },
        { field: 'IsActive', title: 'Category' , template: 'IsActive'},
        { field: 'LastUpdateDate', title: 'Last Update Date' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);


    const cols3 = ref([
        { field: 'Company', title: 'Company' },
        { field: 'CategoryDescLan1', title: 'Category Name' },
        { field: 'IsActive', title: 'Category', template: 'IsActive' },
        { field: 'LastUpdateDate', title: 'Last Update Date' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);
const fetchItemsCategories= async () => {
    try {
        const categoriesData = await itemsCategoriesService.getItems();


        const companyPromises = categoriesData.map(categoriesData => {
                    return fetchCompany(categoriesData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);


        categories.value = categoriesData.map((categoriesData , index)=> ({
            ...categoriesData ,
            ItemCategoryID: categoriesData.ItemCategoryID ,
            CategoryDescLan1: categoriesData.CategoryDescLan1,
            IsActive: categoriesData.IsActive,
            LastUpdateDate: formatDate(categoriesData.LastUpdateDate),
            Company: resolvedCompanies[index], 
            }));
        console.log("Categories", categories)
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};

const fetchItemsCategories2= async () => {
    try {
        const categoriesData = await itemsCategories2Service.getItems();


        const companyPromises = categoriesData.map(categoriesData => {
                    return fetchCompany(categoriesData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);


        categories2.value = categoriesData.map((categoriesData , index)=> ({
            ...categoriesData ,
            ItemCategoryID: categoriesData.ItemCategory2ID ,
                CategoryDescLan1: categoriesData.CategoryDescLan1,
                IsActive: categoriesData.IsActive,
                LastUpdateDate: formatDate(categoriesData.LastUpdateDate),
                Company: resolvedCompanies[index], 
            }));
        console.log("Categories 2", categories2)
    } catch (error) {
        console.error('Error fetching Categories 2:', error);
    }
};

const fetchItemsCategories3= async () => {
    try {
        const categoriesData = await itemsCategories3Service.getItems();


        const companyPromises = categoriesData.map(categoriesData => {
                    return fetchCompany(categoriesData.CompanyID);
                });
        const resolvedCompanies = await Promise.all(companyPromises);


        categories3.value = categoriesData.map((categoriesData , index)=> ({
            ...categoriesData ,
            ItemCategoryID: categoriesData.ItemCategory3ID ,
                CategoryDescLan1: categoriesData.CategoryDescLan1,
                IsActive: categoriesData.IsActive,
                LastUpdateDate: formatDate(categoriesData.LastUpdateDate),
                Company: resolvedCompanies[index], 
            }));
        console.log("Categories", categories3)
    } catch (error) {
        console.error('Error fetching Categories 3:', error);
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
    fetchItemsCategories();
    fetchItemsCategories2();
    fetchItemsCategories3();
    decodeToken();
    fetchCompanies();
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
           await itemsCategoriesService.deleteItem(item);
           await fetchItemsCategories(); 
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
           await itemsCategories2Service.deleteItem(item);
           await fetchItemsCategories2(); 
            alert('Item deleted successfully');
        } catch (err) {
            alert('Failed to delete Category');
            console.log(err)
     
        }
    }
    };
    const deleteRow3 = async (item: any = null) => {
    console.log("item: ", item)
        if (confirm('Are you sure want to delete selected row ?')) {
        try {
           await itemsCategories3Service.deleteItem(item);
           await fetchItemsCategories3(); 
            alert('Item deleted successfully');
        } catch (err) {
            alert('Failed to delete Category');
            console.log(err)
     
        }
    }
    };
</script>
