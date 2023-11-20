<script lang="ts">
import {defineComponent} from 'vue'
import {getAssetPath} from "@/core/helpers/assets";
import PaymentActions from "@/components/borrower/PaymentActions.vue";

export default defineComponent({
  name: "Payment",
  components: {PaymentActions},
  data() {
    const table = [
      {
        id: 1,
        img: getAssetPath("media/stock/600x600/img-49.jpg"),
        title: "Mivy App",
        name: "Jane Cooper",
        price: "32,400",
        isAutoPayEnabled: true,
        chartColor: "success",
        status: {
          label: "Active",
          state: "success",
        },
      },
      {
        id: 2,
        img: getAssetPath("media/stock/600x600/img-40.jpg"),
        title: "Avionica",
        name: "Esther Howard",
        price: "256,910",
        isAutoPayEnabled: false,
        status: {
          label: "On Hold",
          state: "warning",
        },
      },
      {
        id: 3,
        img: getAssetPath("media/stock/600x600/img-39.jpg"),
        title: "Charto CRM",
        name: "Jenny Wilson",
        price: "8,220",
        isAutoPayEnabled: true,
        status: {
          label: "Pending approval",
          state: "primary",
        },
      },
      {
        id: 4,
        img: getAssetPath("media/stock/600x600/img-47.jpg"),
        title: "Tower Hill",
        name: "Cody Fisher",
        price: "74,000",
        isAutoPayEnabled: true,
        status: {
          label: "Active",
          state: "success",
        },
      },
      {
        id: 5,
        img: getAssetPath("media/stock/600x600/img-48.jpg"),
        title: "9 Degree",
        name: "Savannah Nguyen",
        price: "183,300",
        isAutoPayEnabled: false,
        status: {
          label: "Pending approval",
          state: "primary",
        },
      },
    ];

    return {
      table
    }
  }
})
</script>

<template>
  <div class="card card-flush">
    <!--begin::Header-->
    <div class="card-header pt-7">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">Payment methods</span>
      </h3>
      <!--end::Title-->
      <!--begin::Toolbar-->
      <div class="card-toolbar">
        <a :href="`#/borrower/payment-method/new`" class="btn btn-sm btn-light">Add a payment method</a>
      </div>
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-6">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
          <!--begin::Table head-->
          <thead>
          <tr class="fs-7 fw-bold text-gray-400 border-bottom-0 text-uppercase">
            <th class="p-0 pb-3 min-w-175px text-start">Payment method</th>
            <th class="p-0 pb-3 min-w-100px text-end">Withdrawal limit</th>
            <th class="p-0 pb-3 text-start ps-10">Auto payment enabled</th>
            <th class="p-0 pb-3 text-start ps-10">Status</th>
            <th class="p-0 pb-3 min-w-100px text-center">Action</th>
          </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
          <template v-for="(row, i) in table" :key="i">
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-50px me-3">
                    <img :src="row.img" class="" alt=""/>
                  </div>

                  <div class="d-flex justify-content-start flex-column">
                    <a
                        href="#"
                        class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                    >{{ row.title }}</a
                    >
                    <span class="text-gray-400 fw-semibold d-block fs-7">{{
                        row.name
                      }}</span>
                  </div>
                </div>
              </td>

              <td class="text-end pe-0">
                  <span class="text-gray-600 fw-bold fs-6"
                  >$ {{ row.price }}</span
                  >
              </td>

              <td class="text-start ps-10">
                <!--begin::Label-->
                <span v-if="row.isAutoPayEnabled"
                      class="badge badge-light-success py-3 px-4 fs-base">Yes</span>
                <!--end::Label-->
                <!--begin::Label-->
                <span v-else class="badge badge-light-danger py-3 px-4 fs-base">No</span>
                <!--end::Label-->
              </td>

              <td class="text-start ps-10">
                  <span
                      :class="`badge py-3 px-4 fs-7 badge-light-${row.status.state}`"
                  >{{ row.status.label }}</span
                  >
              </td>

              <td class="text-center">
                <!--begin::Toolbar-->
                <div class="card-toolbar">
                  <!--begin::Menu-->
                  <button
                      class="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end"
                      data-kt-menu-trigger="click"
                      data-kt-menu-placement="bottom-end"
                      data-kt-menu-overflow="true"
                  >
                    <KTIcon
                        icon-name="dots-square"
                        icon-class="fs-1 text-gray-300 me-n1"
                    />
                  </button>

                  <PaymentActions/>
                  <!--end::Menu-->
                </div>
                <!--end::Toolbar-->
              </td>
            </tr>
          </template>
          </tbody>
          <!--end::Table body-->
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end: Card Body-->
  </div>
</template>

<style scoped lang="scss">

</style>
