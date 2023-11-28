<template>
  <!--begin::List Widget 6-->
  <div class="card card-xl-stretch mb-5 mb-xl-8">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bold text-dark">Notifications</h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-0">
      <div class="mh-375px scroll-y me-n7 pe-7">
        <template v-for="(item, index) in list" :key="index">
          <!--begin::Item-->
          <div
              :class="[
            'mb-7' && list.length - 1 !== index,
            `bg-light-${item.color}`,
          ]"
              class="d-flex align-items-center rounded p-5 mb-7"
          >
            <!--begin::Icon-->
            <KTIcon
                :icon-class="`text-${item.color} fs-1 me-5`"
                icon-name="abstract-26"
            />
            <!--end::Icon-->

            <!--begin::Title-->
            <div class="flex-grow-1 me-2">
              <a class="fw-bold text-gray-800 text-hover-primary fs-6" href="#">{{
                  item.title
                }}</a>

              <span class="text-muted fw-semobold d-block">{{ item.text }}</span>
            </div>
            <!--end::Title-->

            <!--begin::Lable-->
            <span :class="`text-${item.color}`" class="fw-bold py-1">{{
                item.number
              }}</span>
            <!--end::Lable-->
          </div>
          <!--end::Item-->
        </template>
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 6-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "Notifications",
  components: {
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const list = ref([
      {
        color: "warning",
        icon: getAssetPath("media/icons/duotune/abstract/abs027.svg"),
        title: "A credit card is reaching the limit",
      },
      {
        color: "success",
        icon: getAssetPath("media/icons/duotune/art/art005.svg"),
        title: "Your loan request for $2000 is approved",
        text: "Accept within 3 Days",
      },
      {
        color: "danger",
        icon: getAssetPath("media/icons/duotune/communication/com012.svg"),
        title: "Loan #524353: Payment is in due",
        text: "Make the payment immediately",
      },
      {
        color: "info",
        icon: getAssetPath("media/icons/duotune/communication/com012.svg"),
        title: "Your credit grade has been changed",
      },
      {
        color: "warning",
        icon: getAssetPath("media/icons/duotune/abstract/abs027.svg"),
        title: "Loan request #4324523 is not accepted yet",
        text: "Due in tomorrow",
      },
      {
        color: "success",
        icon: getAssetPath("media/icons/duotune/art/art005.svg"),
        title: "Your loan request #4324523 for $5000 is approved",
      },
      {
        color: "danger",
        icon: getAssetPath("media/icons/duotune/communication/com012.svg"),
        title: "Update/Confirm your contact information, if not the profile will be deactivated",
        text: "Due in 5 Days",
      },
      {
        color: "warning",
        icon: getAssetPath("media/icons/duotune/abstract/abs027.svg"),
        title: "Update bank information",
        text: "Due in 2 Days",
      },
    ]);

    return {
      list,
      getAssetPath,
    };
  },
});
</script>
