<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-10">
    <!--begin::Col-->
    <div class="col-xl-6">
      <StatChart
          chart-height="100"
          widget-classes="card-xxl-stretch mb-5 mb-xl-8"
          widget-color="#50cd89"
      ></StatChart>
    </div>
    <!--end::Col-->
    <div class="col-xl-2 col">
      <Statistics
          color="danger"
          description="Current Outstanding"
          icon-color="white"
          icon-name="information-5"
          title="700$"
          widget-classes="card-xl-stretch mb-xl-8"
      ></Statistics>
    </div>
    <div class="col-xl-2 col">
      <Statistics
          color="primary"
          description="Amount paid"
          icon-color="white"
          icon-name="wallet"
          title="200$"
          widget-classes="card-xl-stretch mb-xl-8"
      ></Statistics>
    </div>
    <div class="col-xl-2 col">
      <Statistics
          color="info"
          description="Installments Due"
          icon-color="white"
          icon-name="time"
          title="5"
          widget-classes="card-xl-stretch mb-xl-8"
      ></Statistics>
    </div>
  </div>
  <!--end::Row-->

  <!--begin::Row-->
  <div class="row g-5 g-xl-10">
    <!--begin::Col-->
    <div class="col">
      <UpcomingPayments :payments="upcomingPayments"/>
    </div>
    <!--end::Col-->
    <!--begin::Col-->
    <div class="col">
      <Notifications/>
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
import LoanSummary from "@/components/borrower/LoanSummaryOld.vue";
import UpcomingPayments from "@/components/borrower/UpcomingPayments.vue";
import LoanHistory from "@/components/borrower/LoanHistory.vue";
import LoanRequests from "@/components/borrower/LoanRequests.vue";
import Notifications from "@/components/borrower/Notifications.vue";
import Statistics from "@/components/borrower/Statistics.vue";
import StatChart from "@/components/borrower/StatChart.vue";

export default defineComponent({
  name: "borrower-dashboard",
  components: {
    StatChart,
    Statistics,
    Notifications,
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
  data() {
    return {
      upcomingPayments: [
        {
          lender: "#23423",
          date: "2023-11-01",
          installment: "78.34$",
          loanId: 1123,
          isAutoPayEnabled: false,
        },
        {
          lender: "#13244",
          date: "2023-11-19",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: true,
        },
        {
          lender: "#75356",
          date: "2023-12-01",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: true,
        },
        {
          lender: "#62454",
          date: "2023-12-05",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: false,
        },
        {
          lender: "#64572",
          date: "2023-12-20",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: false,
        },
        {
          lender: "#17834",
          date: "2023-12-22",
          installment: "63.83$",
          loanId: 2387,
          isAutoPayEnabled: true,
        },
        {
          lender: "#09874",
          date: "2023-12-29",
          installment: "63.83$",
          loanId: 31245,
          isAutoPayEnabled: true,
        },
        {
          lender: "#23423",
          date: "2023-11-01",
          installment: "78.34$",
          loanId: 1123,
          isAutoPayEnabled: false,
        },
        {
          lender: "#13244",
          date: "2023-11-19",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: true,
        },
        {
          lender: "#75356",
          date: "2023-12-01",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: true,
        },
        {
          lender: "#62454",
          date: "2023-12-05",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: false,
        },
        {
          lender: "#64572",
          date: "2023-12-20",
          installment: "63.83$",
          loanId: 1123,
          isAutoPayEnabled: false,
        },
        {
          lender: "#17834",
          date: "2023-12-22",
          installment: "63.83$",
          loanId: 2387,
          isAutoPayEnabled: true,
        },
        {
          lender: "#09874",
          date: "2023-12-29",
          installment: "63.83$",
          loanId: 31245,
          isAutoPayEnabled: true,
        },
      ],
      loanSummary: {active: 3, approved: 1, pending: 2},
      creditScore: 97,
      loanRequests: [
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
