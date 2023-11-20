<template>
    <!--begin::Layout-->
    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Content-->
      <div class="flex-lg-row-fluid order-2 order-lg-1 mb-10 mb-lg-0">
        <ViewDetails></ViewDetails>
  
        <Invoices></Invoices>
      </div>
      <!--end::Content-->
    </div>
    <!--end::Layout-->
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ViewDetails from "@/components/subscriptions/view/Details.vue";
  import Invoices from "@/components/subscriptions/view/Invoices.vue";
  
  export default defineComponent({
    name: "kt-view-subscription",
    components: {
      ViewDetails,
      Invoices,
    },
  });
  </script>
  