<template>
  <form @submit.prevent="submitInvoice">
    <div class="panel px-0 pb-1.5 border-[#e0e6ed] dark:border-[#1b2e4b]">
      <div class="datatable invoice-table">
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
            <button type="submit" class="btn btn-primary gap-2">Add Invoice</button>
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
              placeholder="Enter qty"
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
useMeta({ title: 'BO Store Load' });

import itemsService from '@/services/itemsService';
import storeService from '@/services/storeService';
// import backofficeUserService from '@/services/backofficeUserService';
import invBOStoreLoadService from '@/services/invBOStoreLoadService';
import { jwtDecode } from 'jwt-decode';

// Define a more specific type for items
interface DisplayItem {
    ItemID: number;
    ItemNameLan1: string;
    availableQuantity?: number; // New field for real-time stock
    quantity: number; // Quantity to load
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
  { field: 'quantity', title: 'Quantity to Load', slotName: 'quantity' }, // Changed title for clarity
]);

// Function to fetch available quantity for all items
const fetchAvailableQuantitiesForAllItems = async () => {
    if (formData.value.StoreID === null) {
        items.value.forEach(item => item.availableQuantity = undefined);
        return;
    }
    const updatedItems = await Promise.all(
        items.value.map(async (item) => {
            try {
                if (formData.value.StoreID !== null) {
                    const qtyData = await itemsService.getItemAvailableQuantity(formData.value.StoreID, item.ItemID);
                    return { ...item, availableQuantity: qtyData.availableQuantity };
                }
                return { ...item, availableQuantity: undefined };
            } catch (error) {
                console.error(`Failed to fetch available quantity for item ${item.ItemID}`, error);
                return { ...item, availableQuantity: undefined };
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
        availableQuantity: undefined, // Initialize
        quantity: 0,
      }));
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
        items.value.forEach(item => item.availableQuantity = undefined);
    }
}, { immediate: false });

const fetchStores = async () => {
  try {
    const storesData = await storeService.getStores(); // Renamed for clarity
    if (Array.isArray(storesData)) {
      stores.value = storesData
        .filter((store) => store.StoreTypeID === 1) // Assuming StoreTypeID 1 is relevant
        .map((store) => ({
          StoreID: store.StoreID,
          StoreDescLan1: store.StoreDescLan1,
        }));
      if (stores.value.length > 0 && formData.value.StoreID === null) {
        // Optionally set a default store if none is selected
        // formData.value.StoreID = stores.value[0].StoreID;
      }
    } else {
      stores.value = [];
      console.error('Error fetching stores: storesData is not an array or is empty.');
    }
  } catch (error) {
    console.error('Error fetching Stores:', error);
    stores.value = []; // Ensure stores is an empty array on error
  }
};

// Removed fetchUser as UserID is obtained from token. If UserName display is needed elsewhere, it can be reinstated.

function decodeToken() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<{ data: { UserID: number } }>(token); // Specify type for UserID
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

// Removed the erroneous deleteRow function

const submitInvoice = async () => {
  if (!UserID.value) {
    alert('User ID is missing. Please ensure you are logged in.');
    return;
  }
  if (formData.value.StoreID === null || formData.value.StoreID === 0) {
    alert('Please select a Warehouse.');
    return;
  }

  const selectedItems = items.value
    .filter((item) => Number(item.quantity) > 0) // Ensure quantity is a number and positive
    .map(({ ItemID, quantity }) => ({
      ItemID: ItemID, // Ensure this matches the backend's expected `ItemID`
      ReceivedQuantity: Number(quantity), // Ensure this matches `ReceivedQuantity`
    }));

  if (selectedItems.length === 0) {
    alert('Please enter quantity for at least one item.');
    return;
  }

  const payload = {
    UserID: UserID.value,
    StoreID: Number(formData.value.StoreID),
    items: selectedItems,
    // LoadStatusID: 'L', // Optional: Default to 'Loaded' if needed, otherwise backend handles it
  };

  console.log('Submitting Invoice Data:', payload);

  try {
    const response = await invBOStoreLoadService.createStoreLoad(payload);
    console.log('Invoice submitted successfully:', response);
    alert(`Invoice ${response.LoadDocumentNumber} created successfully!`);
    // Optionally, reset form or redirect
    items.value.forEach(item => item.quantity = 0); // Reset quantities
    if (datatable.value) { // Refresh datatable if it has a method to do so or re-fetch items
      // (datatable.value as any).refresh(); // Example, actual method might vary
    }
  } catch (error) {
    console.error('Error submitting invoice:', error);
    alert('Failed to submit invoice. Please check console for details.');
  }
};
</script>
