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
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "14 Dec 2020, 8:43 pm",
            },
            {
              id: 2,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "01 Dec 2020, 10:12 am",
            },
            {
              id: 3,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "12 Nov 2020, 2:01 pm",
            },
            {
              id: 4,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "21 Oct 2020, 5:54 pm",
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
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "19 Oct 2020, 7:32 am",
            },
            {
              id: 6,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "23 Sep 2020, 12:37 am",
            },
            {
              id: 7,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "11 Sep 2020, 3:15 pm",
            },
            {
              id: 8,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "03 Sep 2020, 1:08 am",
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
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "01 Sep 2020, 4:58 pm",
            },
            {
              id: 10,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "18 Aug 2020, 3:34 pm",
            },
            {
              id: 11,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "14 Aug 2020, 1:21 pm",
            },
            {
              id: 12,
              loanId: Math.floor(Math.random() * 100000 + 1),
              amount: (Math.floor(Math.random() * 1000) + 100) * 1000,
              date: "11 Aug 2020, 5:13 pm",
            },
          ],
        },
      ],
    }
  },
});
</script>
