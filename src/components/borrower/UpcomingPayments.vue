<template>
  <!--begin::List Widget 5-->
  <div class="card card-xl-stretch mb-xl-8">
    <!--begin::Header-->
    <div class="card-header align-items-center border-0 mt-4">
      <h3 class="card-title align-items-start flex-column">
        <span class="fw-bold mb-2 text-dark">Upcoming payments</span>
      </h3>

      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
            type="button"
            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >
          <KTIcon icon-name="category" icon-class="fs-2"/>
        </button>
        <Dropdown1></Dropdown1>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-5">
      <!--begin::Timeline-->
      <div class="timeline-label">
        <!--begin::Item-->
        <div v-for="(p, i) in paymentData" class="timeline-item">
          <!--begin::Label-->
          <div class="timeline-label fw-bold text-gray-800 fs-6">{{ p.date }}</div>
          <!--end::Label-->

          <!--begin::Badge-->
          <div class="timeline-badge">
            <i class="fa fa-genderless fs-1"
               :class="p.overdue === -1 && 'text-danger'
               || p.overdue === 0 && 'text-warning'
               || p.overdue === 1 && 'text-success'"></i>
          </div>
          <!--end::Badge-->

          <!--begin::Text-->
          <div class="timeline-content ps-3">
            <span class=" text-gray-800 "
                  :class="p.overdue === -1 ? 'fw-bold ':'fw-normal'"> {{ p.lender }}</span>
            <span  v-if="p.isAutoPayEnabled" class="ms-4 badge badge-light-success">Auto pay enabled</span>
          </div>
          <!--end::Text-->
          <button class="btn btn-sm btn-light btn-active-light-primary">
            Pay {{ p.installment }}
          </button>
        </div>
        <!--end::Item-->
      </div>
      <!--end::Timeline-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end: List Widget 5-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import {isBefore, isToday, parse} from "date-fns";
import type {Overdue, Payment} from "@/models/Payment";
import type {PropType} from "vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "UpcomingPayments",
  props: {
    payments: {type: Array as PropType<Payment[]>, required: true}
  },
  components: {
    Dropdown1,
  },
  setup(props) {
    const today = new Date();
    const paymentData: Payment[] = props.payments.map((p: Payment) => {
      const date = parse(p.date, 'yyyy-MM-dd', today);
      let overdue: Overdue;
      if (isToday(date)) {
        overdue = 0;
      } else if (isBefore(date, today)) {
        overdue = -1;
      } else {
        overdue = 1;
      }
      return {
        ...p,
        overdue
      }
    });
    return {
      paymentData,
      getAssetPath,
    };
  },
});
</script>
