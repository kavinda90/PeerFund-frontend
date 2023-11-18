<template>
    <!--begin::Row-->
    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
        <CreditGrade
          className="h-md-50 mb-5 mb-xl-10"
          :score="creditScore"/>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
        <LoanSummary className="h-md-50 mb-5 mb-xl-10" :summary="loanSummary"/>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-xxl-6">
        <UpcomingPayments className="h-xl-100" :payments="upcomingPayments"/>
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->

    <!--begin::Row-->
    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <!--begin::Col-->
      <div class="col-xl">
        <LoanHistory className="h-md-100" />
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->
  </template>

  <script lang="ts">
  import {getAssetPath} from "@/core/helpers/assets";
  import {defineComponent} from "vue";
  import CreditGrade from "@/components/borrower/CreditGrade.vue";
  import LoanSummary from "@/components/borrower/LoanSummary.vue";
  import UpcomingPayments from "@/components/borrower/UpcomingPayments.vue";
  import LoanHistory from "@/components/borrower/LoanHistory.vue";

  export default defineComponent({
    name: "borrower-dashboard",
    components: {
      LoanHistory,
      UpcomingPayments,
      LoanSummary,
      CreditGrade,
    },
    setup() {
      return {
        getAssetPath,
      };
    },
    data(){
      return {
        upcomingPayments: [
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-3.jpg"),
              name: "Guy Hawkins",
              city: "Haiti",
            },
            price: "78.34",
            isOverDue: true
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-2.jpg"),
              name: "Jane Cooper",
              city: "Monaco",
            },
            price: "63.83",
            isOverDue: false
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-9.jpg"),
              name: "Jacob Jones",
              city: "Poland",
            },
            price: "92.56",
            isOverDue: true
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-7.jpg"),
              name: "Cody Fishers",
              city: "Mexico",
            },
            price: "63.08",
            isOverDue: false
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-3.jpg"),
              name: "Guy Hawkins",
              city: "Haiti",
            },
            price: "78.34",
            isOverDue: true
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-2.jpg"),
              name: "Jane Cooper",
              city: "Monaco",
            },
            price: "63.83",
            isOverDue: false
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-9.jpg"),
              name: "Jacob Jones",
              city: "Poland",
            },
            price: "92.56",
            isOverDue: true
          },
          {
            agent: {
              avatar: getAssetPath("media/avatars/300-7.jpg"),
              name: "Cody Fishers",
              city: "Mexico",
            },
            price: "63.08",
            isOverDue: false
          },
        ],
        loanSummary: {active: 3, approved: 1, pending: 2},
        creditScore: 97
      }
    },
  });
  </script>
