<template>
  <form @submit.prevent="submitUnload"> <!-- Changed method name -->
    <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
      <div class="datatable invoice-table"> <!-- Consider renaming CSS class if it affects styling -->
        <div class="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
          <div class="mt-4 flex items-center gap-2">
            <label class="block mb-2">Select a Warehouse (*):</label>
            <select v-model="formData.StoreID" class="form-select flex" required>
              <option v-for="store in stores" :key="store.StoreID" :value="store.StoreID">
                {{ store.StoreDescLan1 }}
              </option>
            </select>
          </div>

          <div>
            <button type="submit" class="btn btn-primary gap-2">Add Unload</button> <!-- Changed button text -->
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
          <template #quantity="data">
            <input
              type="number"
              class="form-input w-24"
              v-model="data.value.quantity"
              min="0"
              placeholder="Enter qty to unload"
            />
          </template>
        </vue3-datatable>
      </div>
    </div>
  </form>
</template>


<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'; // Added watch
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useMeta } from '@/composables/use-meta';
useMeta({ title: 'BO Store Unload' });

import itemsService from '@/services/itemsService';
import storeService from '@/services/storeService';
import invBOStoreUnloadService from '@/services/invBOStoreUnloadService';
import { jwtDecode } from 'jwt-decode';

// Define a more specific type for items if possible
interface DisplayItem {
    ItemID: number;
    ItemNameLan1: string;
    ItemQty?: number; // This was the old field, will be replaced by availableQuantity
    availableQuantity?: number; // New field for real-time stock
    quantity: number; // Quantity to unload/load
}

const items = ref<DisplayItem[]>([]); // Use the new interface
const stores = ref<any[]>([]);
const UserID = ref<number | undefined>();
const formData = ref<{ StoreID: number | null }>({
  StoreID: null,
});
const search = ref('');
const datatable = ref(null);

const cols = ref([
  { field: 'ItemNameLan1', title: 'Item Name' },
  { field: 'availableQuantity', title: 'Available Qty' }, // Changed field and title
  { field: 'quantity', title: 'Quantity to Unload', slotName: 'quantity' },
]);

// Function to fetch available quantity for all items
const fetchAvailableQuantitiesForAllItems = async () => {
    if (formData.value.StoreID === null) {
        // Clear available quantities if no store is selected
        items.value.forEach(item => item.availableQuantity = undefined);
        return;
    }
    // Create a copy of items to modify, or update directly if reactivity is handled
    const updatedItems = await Promise.all(
        items.value.map(async (item) => {
            try {
                if (formData.value.StoreID !== null) {
                    const qtyData = await itemsService.getItemAvailableQuantity(formData.value.StoreID, item.ItemID);
                    return { ...item, availableQuantity: qtyData.availableQuantity };
                }
                return { ...item, availableQuantity: undefined }; // Or some default like 0 or '-'
            } catch (error) {
                console.error(`Failed to fetch available quantity for item ${item.ItemID}`, error);
                return { ...item, availableQuantity: undefined }; // Or display 'Error'
            }
        })
    );
    items.value = updatedItems;
};


const fetchItems = async () => {
  try {
    const itemsData = await itemsService.getItems();
    if (Array.isArray(itemsData)) {
      items.value = itemsData.map((item) => ({
        ItemID: item.ItemID,
        ItemNameLan1: item.ItemNameLan1,
        // ItemQty: item.ItemQty, // Old ItemQty, remove if not used elsewhere
        availableQuantity: undefined, // Initialize, will be fetched
        quantity: 0,
      }));
      // After items are fetched, if a store is selected, fetch their quantities
      if (formData.value.StoreID !== null) {
          await fetchAvailableQuantitiesForAllItems();
      }
    } else {
      items.value = [];
      console.error('Error fetching items: itemsData is not an array or is empty.');
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    items.value = [];
  }
};

// Watch for changes in selected StoreID to re-fetch quantities
watch(() => formData.value.StoreID, async (newStoreId, oldStoreId) => {
    if (newStoreId !== null && newStoreId !== oldStoreId) {
        await fetchAvailableQuantitiesForAllItems();
    } else if (newStoreId === null) {
        // Clear quantities if store is deselected
        items.value.forEach(item => item.availableQuantity = undefined);
    }
}, { immediate: false }); // Set immediate to true if you want it to run on component mount after initial StoreID is set

const fetchStores = async () => {
  try {
    const storesData = await storeService.getStores();
    if (Array.isArray(storesData)) {
      stores.value = storesData
        .filter((store) => store.StoreTypeID === 1)
        .map((store) => ({
          StoreID: store.StoreID,
          StoreDescLan1: store.StoreDescLan1,
        }));
      // No default store selection unless specifically required
    } else {
      stores.value = [];
      console.error('Error fetching stores: storesData is not an array or is empty.');
    }
  } catch (error) {
    console.error('Error fetching Stores:', error);
    stores.value = [];
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
      UserID.value = undefined;
    }
  } else {
    console.warn('No token found in localStorage.');
    UserID.value = undefined;
  }
}

onMounted(() => {
  fetchItems();
  decodeToken();
  fetchStores();
});


const submitUnload = async () => { // Renamed from submitInvoice
  if (!UserID.value) {
    alert('User ID is missing. Please ensure you are logged in.');
    return;
  }
  if (formData.value.StoreID === null || formData.value.StoreID === 0) {
    alert('Please select a Warehouse.');
    return;
  }

  const selectedItems = items.value
    .filter((item) => Number(item.quantity) > 0)
    .map(({ ItemID, quantity }) => ({
      ItemID: ItemID,
      UnloadedQuantity: Number(quantity), // Changed from ReceivedQuantity to UnloadedQuantity
    }));

  if (selectedItems.length === 0) {
    alert('Please enter quantity for at least one item to unload.'); // Changed message
    return;
  }

  const payload = {
    UserID: UserID.value,
    StoreID: Number(formData.value.StoreID),
    items: selectedItems,
    // UnloadStatusID: 'U', // Optional: Default to 'Unloaded' if needed, or let backend handle
  };

  console.log('Submitting Unload Data:', payload); // Changed log message

  try {
    const response = await invBOStoreUnloadService.createStoreUnload(payload); // Changed service and method
    console.log('Unload submitted successfully:', response); // Changed log message
    // Assuming backend returns UnloadDocumentNumber for unloads
    alert(`Unload ${response.UnloadDocumentNumber || response.LoadDocumentNumber} created successfully!`); // Adjusted for potential response field name
    items.value.forEach(item => item.quantity = 0);
    // if (datatable.value) { // Optional: refresh datatable
    //   (datatable.value as any).refresh();
    // }
  } catch (error) {
    console.error('Error submitting unload:', error); // Changed error message
    alert('Failed to submit unload. Please check console for details.'); // Changed alert
  }
};
</script>
