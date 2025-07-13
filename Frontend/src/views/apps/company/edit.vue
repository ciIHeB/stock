<template>
    <div>
        <div class="flex xl:flex-row flex-col gap-2.5">
            <div class="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                <div class="flex justify-between flex-wrap px-4" id="app">
                    <EditCompanyForm />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

    import { useMeta } from '@/composables/use-meta';
    import EditCompanyForm from '@/components/forms/EditCompanyForm.vue';
    useMeta({ title: 'Company Edit' });

</script>
