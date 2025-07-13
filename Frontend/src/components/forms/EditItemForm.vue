<template>
    <form @submit.prevent="handleSubmit" class="mt-8 px-4 w-full">
      <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
      <div class="mt-8 px-4">
        <div class="flex justify-between lg:flex-row flex-col">
          <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
            <div class="text-lg">Item Details</div>
            <div class="flex items-center mt-4">
              <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Company (*)</label>
              <select v-model="formData.companyID" class="form-select flex-1">
                <option v-for="Company in company" :key="Company.CompanyID" :value="Company.CompanyID">
                  {{ Company.CompanyDescLan1 }}
                </option>
              </select>
            </div>
            <div class="mt-4 flex items-center">
              <label for="receiver-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Name (*)</label>
              <input v-model="formData.ItemNameLan1" type="text" placeholder="Item Name" class="form-input flex-1" required />
            </div>
            <div class="mt-4 flex items-center">
              <label for="receiver-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Name 2</label>
              <input v-model="formData.ItemNameLan2" type="text" placeholder="Item Name 2" class="form-input flex-1" />
            </div>
            <div class="mt-4 flex items-center">
              <label for="Barcode" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Barcode</label>
              <input v-model="formData.ItemBarcode" type="text" placeholder="Barcode" class="form-input flex-1" />
            </div>
            
            <div class="text-lg"></div>
            <div class="flex items-center mt-4">
              <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Kind (*)</label>
              <select v-model="formData.ItemKindID" class="form-select flex-1">
               <option v-for="itemKinds in itemKind" :key="itemKinds.ItemKindID " :value="itemKinds.ItemKindID ">
                  {{ itemKinds.ItemKindLan1 }}
                </option>
              </select>
            </div>
            <!-- <div class="flex items-center mt-4">
              <label for="acno" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Unit (*)</label>
              <select v-model="formData.ItemUnitID" class="form-select flex-1">
               // <option v-for="item in itemUnit" :key="item.ItemUnitID" :value="item.ItemUnitID">
                  {{ item.ItemUnitDescLan1 }}
                </option>
              </select>
            </div> -->
            <div class=" flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Unit List  (*)</label>
              <select v-model="formData.ItemUnitListID" class="form-select flex-1">
                <option v-for="itemUnitList in itemUnitList" :key="itemUnitList.ItemUnitListID" :value="itemUnitList.ItemUnitListID">
                  {{ itemUnitList.ItemUnitListDescLan1 }}
                </option>
              </select>
            </div>
            <div class=" flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Category  (*)</label>
              <select v-model="formData.ItemCategoryID" class="form-select flex-1">
                <option v-for="itemcategory in itemCategory" :key="itemcategory.ItemCategoryID" :value="itemcategory.ItemCategoryID">
                  {{ itemcategory.CategoryDescLan1 }}
                </option>
              </select>
            </div>
            <div class=" flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Category 2 (*)</label>
              <select v-model="formData.ItemCategory2ID" class="form-select flex-1">
                <option v-for="itemcategory2 in itemCategory2" :key="itemcategory2.ItemCategory2ID" :value="itemcategory2.ItemCategory2ID">
                  {{ itemcategory2.CategoryDescLan1 }}
                </option>
              </select>
            </div>
            <div class=" flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Category 3 (*)</label>
              <select v-model="formData.ItemCategory3ID" class="form-select flex-1">
                <option v-for="itemcategory3 in itemCategory3" :key="itemcategory3.ItemCategory3ID" :value="itemcategory3.ItemCategory3ID">
                  {{ itemcategory3.CategoryDescLan1 }}
                </option>
              </select>
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Expiry Period</label>
              <input type="integer" v-model="formData.ExpiryPeriod" placeholder="Expiry Period" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Production Item (*)</label>
              <label for="Production" class="inline-flex">
                <input v-model="formData.IsProductionItem" type="radio" name="Production" :value="true" class="form-radio text-info peer" checked/>
                <span class="peer-checked:text-info">YES</span>
              </label>
              <label class="inline-flex ml-11">
                <input v-model="formData.IsProductionItem" type="radio" name="Production" :value="false" class="form-radio text-danger peer" />
                <span class="peer-checked:text-danger">NO</span>
              </label>
            </div>
            <div class="flex items-center mt-4">
              
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item Status (*)</label>
              <label for="volume" class="inline-flex">
                <input v-model="formData.ItemIsActive" type="radio" name="volume" :value="true" class="form-radio text-success peer" checked/>
                <span class="peer-checked:text-success">Active</span>
              </label>
              <label class="inline-flex ml-11">
                <input v-model="formData.ItemIsActive" type="radio" name="volume" :value="false" class="form-radio text-danger peer" />
                <span class="peer-checked:text-danger">Inactive</span>
              </label>
            </div>
          </div>

          <div class="lg:w-1/2 w-full">
            <div class="text-lg"> &nbsp;</div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Item cost (*)</label>
              <input type="text" v-model="formData.ItemCost" placeholder="Item cost" class="form-input flex-1" />
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
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Piece Price (*)</label>
              <input type="text" v-model="formData.PListSellPrice1" placeholder="Piece Price" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Box Price (*)</label>
              <input type="text" v-model="formData.PListSellPrice2" placeholder="Box Price" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Piece Return Price (*)</label>
              <input type="text" v-model="formData.PListReturnPrice1" placeholder="Return Piece" class="form-input flex-1" />
            </div>
            <div class="flex items-center mt-4">
              <label class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Box Return Price (*)</label>
              <input type="text" v-model="formData.PListReturnPrice2" placeholder="Return box" class="form-input flex-1" />
            </div>
           
          <div class="flex items-center mt-4">
              <label class=" rtl:ml-2 w-1/3 ">Image (*)</label>
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
      <button type="submit" class="btn btn btn-primary mt-6 float-right">Edit Item</button>
    </form>
  </template>
  
  <script lang="ts" setup>
  import { ref ,onMounted} from 'vue';
  import companyService from '@/services/companyService'; 
  import FileUploadWithPreview from 'file-upload-with-preview';
  import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
  import itemUnitService from '@/services/itemUnitService';
  import itemUnitListService from '@/services/itemUnitListService';
  import itemKindService from '@/services/itemKindService';
  import itemsCategoriesService from '@/services/itemsCategoriesService';
  import itemsCategories2Service from '@/services/itemsCategories2Service';
  import itemsCategories3Service from '@/services/itemsCategories3Service';
  import salPriceListService from '@/services/salPriceListService';
  import '@/assets/css/file-upload-with-preview.min.css';
  import { jwtDecode } from 'jwt-decode';
  import itemsService from '@/services/itemsService';
  import { useRoute,useRouter } from 'vue-router';




  const UserID = ref<Number>();
  // const itemUnit = ref<any>();
  const itemUnitList = ref<any>();
  const itemKind = ref<any>();
  const itemCategory= ref<any>();
  const itemCategory2= ref<any>();
  const itemCategory3= ref<any>();
  const company= ref<any>();


  const router = useRouter();
  const route = useRoute();

  let fileUploadPreviewInstance: any = null; // To store FileUploadWithPreview instance

  const formData = ref<any>({
    companyID : 0,
    ItemKindID : 0,
    ItemCategoryID : 0,
    ItemCategory2ID : 0,
    ItemCategory3ID : 0,
    ItemNameLan1 : '',
    ItemNameLan2 : '',
    ItemUnitListID  : 0,
    ItemBarcode : 0,
    ItemIsActive : false,
    ItemNearExpiryPeriod : 0,
    IsProductionItem : false,
    PListReturnPrice2: 0,
    PListSellPrice2: 0,
    ItemCost: 0,
    ClassID:1
  });
  

  const image = ref<File | null>(null);
    const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      image.value = target.files[0];
    }
  };
//   function extractCompanyId(queryString: string): string {
//     const params = new URLSearchParams(queryString.split('?')[1]);
//     return params.get('item_id') || '';
// }

// const item_id = extractCompanyId(route.fullPath);
// console.log(item_id)



const item_id = route.params.id;


const fetchItemsDetails = async (id: any) => {
    try {
        const ItemsDetails = await itemsService.getItemById(id);
        const SalpriceDetails = await salPriceListService.getPriceListById(id);

        formData.value = ItemsDetails; // Update formData value
        formData.value.companyID=ItemsDetails.CompanyID,
        formData.value.ItemUnitListID=ItemsDetails.ItemUnitListID,
        formData.value.ClassID=SalpriceDetails.ClassID,
        formData.value.ItemCost=SalpriceDetails.ItemCost,
        formData.value.PListSellPrice1=SalpriceDetails.PListSellPrice1,
        formData.value.PListSellPrice2=SalpriceDetails.PListSellPrice2,
        formData.value.PListReturnPrice1=SalpriceDetails.PListReturnPrice1,
        formData.value.PListReturnPrice2=SalpriceDetails.PListReturnPrice2,
        formData.value.ExpiryPeriod=ItemsDetails.ItemNearExpiryPeriod,


        formData.value.LastUpdateByUserID = UserID.value
        formData.value.LastUpdateDate = new Date().toISOString()
        console.log(ItemsDetails.TaxApplicable , "/", formData.value.TaxApplicable)
    } catch (error) {
        console.error('Error fetching Company:', error);
    }
};




  const handleSubmit = async () => {
  try {

    const itemPayload: any = {
      CompanyID: formData.value.companyID,
      ItemKindID: formData.value.ItemKindID,
      ItemCategoryID: formData.value.ItemCategoryID,
      ItemCategory2ID: formData.value.ItemCategory2ID,
      ItemCategory3ID: formData.value.ItemCategory3ID,
      ItemNameLan1: formData.value.ItemNameLan1,
      ItemNameLan2: formData.value.ItemNameLan2,
      ItemUnitListID: formData.value.ItemUnitListID,
      ItemBarcode: formData.value.ItemBarcode,
      ItemIsActive: formData.value.ItemIsActive,
      ItemNearExpiryPeriod: formData.value.ExpiryPeriod, // Ensure this is the correct field from formData
      IsProductionItem: formData.value.IsProductionItem,
      ItemImage: image.value,
      CreatedByUserID: UserID.value,
      LastUpdateByUserID: UserID.value,
      // Price list related fields
      ClassID: formData.value.ClassID,
      ItemCost: formData.value.ItemCost,
      PListSellPrice1: formData.value.PListSellPrice1,
      PListSellPrice2: formData.value.PListSellPrice2,
      PListReturnPrice1: formData.value.PListReturnPrice1,
      PListReturnPrice2: formData.value.PListReturnPrice2,
      PListSellingDefaultUnit: formData.value.ItemUnitListID,
      // PListCreationDate and PListCreatedByUserID are typically not sent on update for pricelist
      // unless it's a create-or-update scenario for price list entries. Assuming update here.
    };

    if (image.value instanceof File) {
      // New image selected
      itemPayload.ItemImage = image.value;
    } else if (formData.value.ItemImage === null || formData.value.ItemImage === '') {
      // Explicitly removing image (if a remove button sets formData.value.ItemImage to null)
      itemPayload.ItemImage = null;
    } else {
      // Keep existing image or no image was there initially
      itemPayload.ItemImage = formData.value.ItemImage; // This will be the string path or null
    }

    // Log the payload to check before sending
    console.log("Item Update Payload:", itemPayload);

    // Save item data
    const response = await itemsService.updateItem(item_id, itemPayload); // Use itemPayload here
    console.log('Item updated:', response.data); // Changed log message to 'updated'


    // Redirect after success
    await router.push('/apps/items/list');

  } catch (error: any) {
    console.error('Error creating Item:', error);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
};


//   const fetchItemsUnit= async () => {
//     try {
//       const itemUnitData = await itemUnitService.getItems();

//       itemUnit.value = itemUnitData.map((itemUnitData )=> ({
//             ...itemUnitData,
          
//             }));
//         console.log("Categories", itemUnit)
//     } catch (error) {
//         console.error('Error fetching branches:', error);
//     }
// };
const fetchItemsUnitList= async () => {
    try {
      const itemUnitListData = await itemUnitListService.getItems();

      itemUnitList.value = itemUnitListData.map((itemUnitListData )=> ({
            ...itemUnitListData,
          
            }));
        console.log("Categories", itemUnitList)
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
};
const fetchItemsCategorie= async () => {
    try {
      const itemCategoryData = await itemsCategoriesService.getItems();

      itemCategory.value = itemCategoryData.map((itemCategoryData )=> ({
            ...itemCategoryData,
          
            }));
        console.log("Categories", itemCategory)
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
};
const fetchItemsCategorie2= async () => {
    try {
      const itemCategory2Data = await itemsCategories2Service.getItems();

      itemCategory2.value = itemCategory2Data.map((itemCategory2Data )=> ({
            ...itemCategory2Data,
          
            }));
        console.log("Categories", itemCategory2Data)
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
};
const fetchItemsCategorie3= async () => {
    try {
      const itemCategory3Data = await itemsCategories3Service.getItems();

      itemCategory3.value = itemCategory3Data.map((itemCategory3Data )=> ({
            ...itemCategory3Data,
          
            }));
        console.log("Categories", itemCategory3Data)
    } catch (error) {
        console.error('Error fetching Items:', error);
    }
};
const fetchItemsKind= async () => {
    try {
      const itemKindData = await itemKindService.getItemsKinds();

      itemKind.value = itemKindData.map((itemKindData )=> ({
            ...itemKindData,
          
            }));
        console.log("Categories", itemKind)
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

  onMounted(async () => { // Make the onMounted callback async
    decodeToken();
    // fetchItemsUnit();
    fetchItemsUnitList();
    fetchItemsKind();
    fetchItemsCategorie();
    fetchItemsCategorie2();
    fetchItemsCategorie3();
    fetchCompanies();
    fetchItemsDetails(item_id); // Ensure details are fetched before initializing preview
    
    let existingImageSrc = '/assets/images/file-preview.svg';
    if (formData.value && formData.value.ItemImage) {
        existingImageSrc = `http://localhost:3000${formData.value.ItemImage}`;
    }

    // single image upload
    fileUploadPreviewInstance = new FileUploadWithPreview('image', {
      images: {
        baseImage: existingImageSrc, // Use fetched image if available
        backgroundImage: '',
      },
    });

    
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
  