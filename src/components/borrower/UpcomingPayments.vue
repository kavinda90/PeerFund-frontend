<template>
  <!--begin::Tables widget 16-->
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">Upcoming payments</span>
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-6">
      <!--begin::Tap pane-->
      <div class="tab-pane fade active show">
        <!--begin::Table container-->
        <div class="table-responsive">
          <!--begin::Table-->
          <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
            <!--begin::Table head-->
            <thead>
            <tr class="fs-7 fw-bold text-gray-400 border-bottom-0 text-uppercase">
              <th class="p-0 pb-3 min-w-150px text-start">Lender</th>
              <th class="p-0 pb-3 min-w-100px text-end pe-13">Installment</th>
              <th class="p-0 pb-3 w-125px text-start pe-7">Status</th>
              <th class="p-0 pb-3 w-50px text-end">Pay</th>
            </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
            <template v-for="(row, j) in payments" :key="j">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-50px me-3">
                      <img :src="row.agent.avatar" class="" alt=""/>
                    </div>

                    <div class="d-flex justify-content-start flex-column">
                      <router-link
                          to="/crafted/pages/profile/overview"
                          class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                      >{{ row.agent.name }}
                      </router-link
                      >
                      <span
                          class="text-gray-400 fw-semibold d-block fs-7"
                      >{{ row.agent.city }}</span
                      >
                    </div>
                  </div>
                </td>

                <td class="text-end pe-13">
                        <span class="text-gray-600 fw-bold fs-6"
                        >{{ row.price }}</span
                        >
                </td>

                <td class="text-start px-0">
                  <!--begin::Label-->
                  <span v-if="row.isOverDue" class="badge badge-light-danger py-3 px-4 fs-base">Overdue</span>
                  <!--end::Label-->
                  <!--begin::Label-->
                  <span v-else class="badge badge-light-success py-3 px-4 fs-base">Upcoming</span>
                  <!--end::Label-->
                </td>

                <td class="text-start">
                  <a
                      href="#"
                      class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                  >
                    <KTIcon
                        icon-name="black-right"
                        icon-class="fs-5 text-gray-700"
                    />
                  </a>
                </td>
              </tr>
            </template>
            </tbody>
            <!--end::Table body-->
          </table>
          <!--end::Table-->
        </div>
        <!--end::Table container-->
      </div>
      <!--end::Tap pane-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end::Tables widget 16-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "UpcomingPayments",
  components: {
    FontAwesomeIcon,
    KTIcon,
    Dropdown2,
  },
  props: {
    className: {type: String, required: false},
    payments: {type: Array, required: true}
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
