<template>
  <form @submit.prevent="submitInvoice">
    <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
      <div class="datatable invoice-table">
        <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">

          <div>
            <button type="submit" class="btn btn-primary gap-2">Save</button>
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
          firstArrow="‹"
          lastArrow="›"
          previousArrow="«"
          nextArrow="»"
        >
          <!-- Quantity input slot -->
          <template #requestedQty="data">
            <input
              type="number"
              class="form-input w-24"
              v-model="data.value.requestedQty"
              min="0"
              placeholder="Enter qty"
            />
          </template>
        </vue3-datatable>
      </div>
    </div>
  </form>
</template>


<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'Approve Van Load' });

import invAutoSRHeaderService from '@/services/invAutoSRHeaderService';
import ownerService from '@/services/ownerService';
import { jwtDecode } from 'jwt-decode';
import itemsService from '@/services/itemsService';
import invStoreTransactionService from '@/services/invStoreTransactionService';
import router from '@/router';

// interface DisplayItem {
//     ItemID: number;
//     ItemNameLan1: string;
//     ownerStoreQty?: number;
//     availableQuantity?: number;
//     requestedQty: number;
// }

const route = useRoute();
const items = ref<any[]>([]);
const search = ref('');
const datatable = ref(null);
const loadId = ref<String[]>([]);
const UserID = ref<number | undefined>();

const cols = ref([
    { field: 'ItemNameLan1', title: 'Item Name' },
    { field: 'ownerStoreQty', title: 'Owner Store Qty' },
    { field: 'availableQuantity', title: 'Warehouse Available Qty' },
    { field: 'requestedQty', title: 'Requested Qty', slotName: 'requestedQty' },
]);


const fetchLoadDetails = async () => {
  const SRNumber = route.params.SRNumber;
  
    try {
        const itemsData = await invAutoSRHeaderService.getloadItemsDetails(SRNumber);
        const HeaderData = await invAutoSRHeaderService.getItemById(SRNumber);

        const itemDetailsPromises = itemsData.map(async (itemData) => {
            const itemName = await fetchItemName(itemData.ItemID);
            const ownerStoreId = await fetchOwnerStore(HeaderData.OwnerID);
            const ownerStock = await fetchOwnerStock(ownerStoreId, itemData.ItemID);
            const ownerwarehouseId = await fetchOwnerwarehouse(HeaderData.OwnerID);
            const warehouseStock = await fetchwarehouseStock (ownerwarehouseId, itemData.ItemID);
          //console.log("ownerStock", ownerStock);
          //console.log("ownerStoreId", ownerStoreId);
            return {
                ...itemData,
                ItemNameLan1: itemName,
                requestedQty: itemData.AutoSRQty,
                ownerStoreQty: ownerStock,
                availableQuantity: warehouseStock,
            };
        });

        items.value = await Promise.all(itemDetailsPromises);
        console.log("item", items)
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};
const fetchItemName = async (itemId: number) => {
    try {
        const item = await itemsService.getItemById(itemId);
        return item.ItemNameLan1;
    } catch (error) {
        console.error('Error fetching item name:', error);
        return '';
    }
};
const fetchOwnerStore = async (ownerId: number) => {
    try {
        const owner = await ownerService.getOwnerById(ownerId);
        return owner.StoreID;
    } catch (error) {
        console.error('Error fetching owner store:', error);
        return 0;
    }
};

const fetchOwnerStock = async (storeId: number, itemId: number) => {
  try {
    const stock = await invStoreTransactionService.getStock(storeId, itemId);
    return stock.data; 
  } catch (error) {
    console.error('Error fetching owner stock:', error);
    return 0;
  }
};
const fetchOwnerwarehouse = async (ownerId: number) => {
    try {
        const owner = await ownerService.getOwnerById(ownerId);
        return owner.OwnerDefaultWHID;
    } catch (error) {
        console.error('Error fetching owner warehouse:', error);
        return 0;
    }
};
const fetchwarehouseStock = async (warehouseId: number, itemId: number) => {
  try {
    const stock = await invStoreTransactionService.getStock(warehouseId, itemId);
    return stock.data; 
  } catch (error) {
    console.error('Error fetching warehouse stock:', error);
    return 0;
  }
};

function decodeToken() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<{ data: { UserID: number } }>(token);
      UserID.value = decoded.data.UserID;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}

onMounted(() => {
    decodeToken();
    fetchLoadDetails();
});
//const loadId = route.params.SRNumber;
const submitInvoice = async () => {
    if (route.params.SRNumber=== null ) {
        alert('Load ID is missing.');
        return;
    }

    const updatedItems = items.value.map(item => ({
        ItemID: item.ItemID,
        AutoSRLoadQty: item.requestedQty,
    }));

    const payload = {
        items: updatedItems,
    };

   try {
    await invAutoSRHeaderService.updateItem(route.params.SRNumber, payload);
    alert('Van load approved successfully!');
    router.push('/apps/vload/list');
  } catch (error: any) {
    // Extract and show backend message if status is 400
    if (error.response && error.response.status === 400 && error.response.data?.error) {
      alert(`Error: ${error.response.data.error}`);
    } else {
      console.error('Error approving van load:', error);
      alert('Failed to approve van load.');
    }
  }
};
</script>
