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
            
            <div class="text-lg"></div>
            <div class="flex items-center mt-4">
              <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Address</label>
              <input id="acno" type="text" v-model="formData.CompanyAddress" class="form-input flex-1" placeholder="Address" required />
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
                <input v-model="formData.taxApplicable" type="radio" name="volume" :value="true" class="form-radio text-success peer" checked/>
                <span class="peer-checked:text-success">YES</span>
              </label>
              <label class="inline-flex ml-11">
                <input v-model="formData.taxApplicable" type="radio" name="volume" :value="false" class="form-radio text-danger peer" />
                <span class="peer-checked:text-danger">NO</span>
              </label>
            </div>
          </div>


          <div class="lg:w-1/2 w-full">
          <div class="flex ">
              <label class=" rtl:ml-2 w-1/3 ">Logo (*)</label>
              <div class="flex items-center mt-4 custom-file-container" data-upload-id="image">
                <div class="label-container">
                  <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">x</a>
                </div>
                <label class="custom-file-container__custom-file">
                  <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" @change="handleFileChange" />
                  <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                  <span class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
                </label>
                <div class="custom-file-container__image-preview"></div>
              </div>
            </div>
</div>

        </div>
      </div>
      <button type="submit" class="btn btn btn-primary mt-6 float-right">Create Company</button>
    </form>
  </template>
  
  <script lang="ts" setup>
  import { ref ,onMounted} from 'vue';
  import companyService from '@/services/companyService'; 
  import { useRouter } from 'vue-router';
  import FileUploadWithPreview from 'file-upload-with-preview';
  import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
  import '@/assets/css/file-upload-with-preview.min.css';
  const router = useRouter();

  const formData = ref<any>({
    CompanyDescLan1: '',
    CompanyDescLan2: '',
    CompanyAddress: '',
    CompanyTel: '',
    CompanyVatNumber: '',
  });
  

  const image = ref<File | null>(null);
    const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      image.value = target.files[0];
    }
  };
  const handleSubmit = async () => {
    try {
      
      const companyData = {
        LastUpdateByUserID:UserID.value,
        CreatedByUserID: UserID.value,
        CompanyDescLan1: formData.value.CompanyDescLan1,
        CompanyDescLan2: formData.value.CompanyDescLan2,
        CompanyAddress: formData.value.CompanyAddress,
        CompanyTel: formData.value.CompanyTel,
        CompanyVatNumber: formData.value.CompanyVatNumber,
        TaxApplicable: formData.value.taxApplicable !== undefined ? formData.value.taxApplicable : true, // Use value from form, default true
        LastUpdateDate: new Date().toISOString(),
        CompanyCreationDate:new Date().toISOString(),
        logo: image.value // Add the image file here
      };
     
      // The TaxApplicable field is now directly assigned from formData.value.taxApplicable (with a default)
      // So, the conditional block below is no longer needed.

      const response = await companyService.createCompany(companyData);

      console.log('Company created:', response); // response from apiClient is already data

      // const responseImg = await companyService.uploadImage(image,formData.value.CompanyDescLan1); // Removed
      // console.log('Logo uploaded:', responseImg.data); // Removed
    
      await router.push('/apps/company/list');
    

    } catch (error: any) {
      console.error('Error creating Company:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
    }
  };
 

  onMounted(() => {
    decodeToken();
    // single image upload
    new FileUploadWithPreview('image', {
      images: {
        baseImage: '/assets/images/file-preview.svg',
        backgroundImage: '',
      },
    });

    
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
  