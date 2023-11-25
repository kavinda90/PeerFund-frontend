<template>
    <!--begin::Toolbar-->
    <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
      <!--begin::Toolbar container-->
      <div
        id="kt_app_toolbar_container"
        class="app-container d-flex flex-stack"
        :class="{
          'container-fluid': toolbarWidthFluid,
          'container-xxl': !toolbarWidthFluid,
        }"
      >
        <KTPageTitle />
        <!--begin::Actions-->
        <div class="d-flex align-items-center gap-2 gap-lg-3">
          <!--begin::Primary button-->
          <a class="btn btn-sm fw-bold btn-primary" data-bs-target="#b_loan_request_modal"
             data-bs-toggle="modal" href="#">New Loan</a>
          <!--end::Primary button-->
        </div>
        <!--end::Actions-->
      </div>
      <!--end::Toolbar container-->
    </div>
    <!--end::Toolbar-->
  <LoanRequestModal></LoanRequestModal>
  </template>

  <script lang="ts">
  import {defineComponent} from "vue";
  import {toolbarWidthFluid} from "@/core/helpers/config";
  import LoanRequestModal from "@/components/borrower/LoanRequestModal.vue";

  export default defineComponent({
    name: "borrower-layout-toolbar",
    components: {
      LoanRequestModal,
    },
    setup() {
      return {
        toolbarWidthFluid,
      };
    },
  });
  </script>
