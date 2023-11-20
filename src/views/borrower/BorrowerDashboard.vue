<template>
    <!--begin::Row-->
    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
        <CreditGrade
          className="h-100"
          :score="creditScore"/>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
        <LoanSummary className="h-100" :summary="loanSummary"/>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-xxl-6">
        <UpcomingPayments className="h-100" :payments="upcomingPayments"/>
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->

    <!--begin::Row-->
    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <!--begin::Col-->
      <div class="col-xl">
        <LoanRequests className="h-md-100" :loanRequests="loanRequests"/>
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
  import LoanRequests from "@/components/borrower/LoanRequests.vue";

  export default defineComponent({
    name: "borrower-dashboard",
    components: {
      LoanRequests,
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
        ],
        loanSummary: {active: 3, approved: 1, pending: 2},
        creditScore: 97,
        loanRequests : [
          {
            title: "Approved",
            icon: "check-circle",
            index: "1",
            table: [
              {
                id: 1,
                agent: {
                  avatar: getAssetPath("media/avatars/300-3.jpg"),
                  name: "Guy Hawkins",
                  city: "Haiti",
                },
                price: "78.34",
                icon: true,
                statistics: 5,
                chartColor: "success",
              },
              {
                id: 2,
                agent: {
                  avatar: getAssetPath("media/avatars/300-2.jpg"),
                  name: "Jane Cooper",
                  city: "Monaco",
                },
                price: "63.83",
                icon: false,
                statistics: 10,
                chartColor: "danger",
              },
              {
                id: 3,
                agent: {
                  avatar: getAssetPath("media/avatars/300-9.jpg"),
                  name: "Jacob Jones",
                  city: "Poland",
                },
                price: "92.56",
                icon: true,
                statistics: 9,
                chartColor: "success",
              },
              {
                id: 4,
                agent: {
                  avatar: getAssetPath("media/avatars/300-7.jpg"),
                  name: "Cody Fishers",
                  city: "Mexico",
                },
                price: "63.08",
                icon: false,
                statistics: 9.5,
                chartColor: "success",
              },
            ],
          },
          {
            title: "Pending",
            icon: "dots-circle",
            index: "2",
            table: [
              {
                id: 5,
                agent: {
                  avatar: getAssetPath("media/avatars/300-25.jpg"),
                  name: "Brooklyn Simmons",
                  city: "Poland",
                },
                price: "85.23",
                icon: true,
                statistics: 9.5,
                chartCcolor: "success",
              },
              {
                id: 6,
                agent: {
                  avatar: getAssetPath("media/avatars/300-24.jpg"),
                  name: "Esther Howard",
                  city: "Mexico",
                },
                price: "74.83",
                icon: false,
                statistics: 10,
                chartCcolor: "danger",
              },
              {
                id: 7,
                agent: {
                  avatar: getAssetPath("media/avatars/300-20.jpg"),
                  name: "Annette Black",
                  city: "Haiti",
                },
                price: "90.06",
                icon: true,
                statistics: 3,
                chartCcolor: "success",
              },
              {
                id: 8,
                agent: {
                  avatar: getAssetPath("media/avatars/300-17.jpg"),
                  name: "Marvin McKinney",
                  city: "Monaco",
                },
                price: "54.08",
                icon: false,
                statistics: 9.5,
                chartCcolor: "success",
              },
            ],
          },
          {
            title: "Rejected",
            icon: "cross-circle",
            index: "3",
            table: [
              {
                id: 9,
                agent: {
                  avatar: getAssetPath("media/avatars/300-11.jpg"),
                  name: "Jacob Jones",
                  city: "New York",
                },
                price: "52.34",
                icon: true,
                statistics: 10.5,
                chartCcolor: "success",
              },
              {
                id: 10,
                agent: {
                  avatar: getAssetPath("media/avatars/300-23.jpg"),
                  name: "Ronald Richards",
                  city: "Madrid",
                },
                price: "77.65",
                icon: true,
                statistics: 9.5,
                chartCcolor: "danger",
              },
              {
                id: 11,
                agent: {
                  avatar: getAssetPath("media/avatars/300-4.jpg"),
                  name: "Leslie Alexander",
                  city: "Pune",
                },
                price: "82.47",
                icon: false,
                statistics: 10.5,
                chartCcolor: "success",
              },
              {
                id: 12,
                agent: {
                  avatar: getAssetPath("media/avatars/300-1.jpg"),
                  name: "Courtney Henry",
                  city: "Mexico",
                },
                price: "67.84",
                icon: true,
                statistics: 11.5,
                chartCcolor: "success",
              },
            ],
          },
        ],
      }
    },
  });
  </script>
