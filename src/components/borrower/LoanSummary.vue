<template>
  <!--begin::List Widget 1-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Header-->
      <div
          :class="`bg-${widgetColor}`"
          class="px-9 pt-7 card-rounded h-275px w-100"
      >
        <!--begin::Heading-->
        <div class="d-flex flex-stack">
          <h3 class="m-0 text-white fw-bold fs-3">Loan Summary</h3>
        </div>
        <!--end::Heading-->

        <!--begin::Balance-->
        <div class="d-flex text-center flex-column text-white pt-8">
          <span class="fw-semobold fs-7">Amount</span>
          <span class="fw-bold fs-2x pt-1">$37,562.00</span>
        </div>
        <!--end::Balance-->
      </div>
      <!--end::Header-->

      <!--begin::Items-->
      <div
          class="bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1"
          style="margin-top: -100px"
      >
        <template v-for="(item, index) in items" :key="index">
          <!--begin::Item-->
          <div
              :class="[index !== items.length && 'mb-7']"
              class="d-flex align-items-center"
          >
            <!--begin::Symbol-->
            <div class="symbol symbol-45px w-40px me-5">
              <span class="symbol-label bg-lighten">
                <KTIcon :icon-name="item.icon" icon-class="fs-1"/>
              </span>
            </div>
            <!--end::Symbol-->

            <!--begin::Description-->
            <div class="d-flex align-items-center flex-wrap w-100">
              <!--begin::Title-->
              <div class="mb-1 pe-3 flex-grow-1">
                <a
                    class="fs-5 text-gray-800 text-hover-primary fw-bold"
                    href="#"
                >{{ item.title }}</a
                >
                <div class="text-gray-400 fw-semobold fs-7">
                  {{ item.description }}
                </div>
              </div>
              <!--end::Title-->

              <!--begin::Label-->
              <div class="d-flex align-items-center">
                <div class="fw-bold fs-5 text-gray-800 pe-1">
                  {{ item.stats }}
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Description-->
          </div>
          <!--end::Item-->
        </template>
      </div>
      <!--end::Items-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 1-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";

export default defineComponent({
  name: "LoanSummary",
  components: {
    Dropdown3,
  },
  props: {
    widgetClasses: String,
    widgetColor: String,
    chartHeight: Number,
  },
  setup() {
    const items = [
      {
        icon: "percentage",
        title: "Interest rate",
        description: "",
        stats: "2.5%",
      },
      {
        icon: "calendar",
        title: "Period",
        stats: "2 Years",
      },
      {
        icon: "finance-calculator",
        title: "Installment",
        description: "Bi-Weekly",
        stats: "$200",
      },
      {
        icon: "bank",
        title: "Payment method",
        description: "Auto pay enabled",
        stats: "TD Bank",
      },
    ];

    return {
      items,
      getAssetPath,
    };
  },
});
</script>
