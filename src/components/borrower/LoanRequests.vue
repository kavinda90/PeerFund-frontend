<template>
  <!--begin::Tables widget 16-->
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800"
          >Loan requests</span
        >
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-6">
      <!--begin::Nav-->
      <ul class="nav nav-pills nav-pills-custom mb-3">
        <template v-for="(item, i) in loanRequests" :key="i">
          <!--begin::Item-->
          <li class="nav-item mb-3 me-3 me-lg-6">
            <!--begin::Link-->
            <a
              class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-80px h-85px pt-5 pb-2"
              :class="[i === 0 && 'active']"
              :id="`kt_stats_widget_16_tab_link_${i}`"
              data-bs-toggle="pill"
              :href="`#kt_stats_widget_16_tab_${i}`"
            >
              <!--begin::Icon-->
              <div class="nav-icon mb-3">
                <KTIcon :icon-name="item.icon" icon-class="fs-1 p-0" />
              </div>
              <!--end::Icon-->

              <!--begin::Title-->
              <span class="nav-text text-gray-800 fw-bold fs-6 lh-1">
                {{ item.title }}
              </span>
              <!--end::Title-->

              <!--begin::Bullet-->
              <span
                class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"
              ></span>
              <!--end::Bullet-->
            </a>
            <!--end::Link-->
          </li>
          <!--end::Item-->
        </template>
      </ul>
      <!--end::Nav-->

      <!--begin::Tab Content-->
      <div class="tab-content">
        <template v-for="(item, i) in loanRequests" :key="i">
          <!--begin::Tap pane-->
          <div
            class="tab-pane fade"
            :class="[i === 0 && 'active show']"
            :id="`kt_stats_widget_16_tab_${i}`"
          >
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                <!--begin::Table head-->
                <thead>
                  <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                    <th class="p-0 pb-3 min-w-150px text-start">Loan request id</th>
                    <th class="p-0 pb-3 min-w-100px text-end pe-13">Amount</th>
                    <th class="p-0 pb-3 text-start ps-10 pe-7">Requested date</th>
                    <th class="p-0 pb-3 text-end">Details</th>
                  </tr>
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->
                <tbody>
                  <template v-for="(row, j) in item.table" :key="j">
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="d-flex justify-content-start flex-column">
                            <span class="fw-bold text-gray-800 mb-1 fs-6">{{ row.loanId }}</span>
                          </div>
                        </div>
                      </td>

                      <td class="text-end pe-13">
                        <span class="text-gray-600 fs-6">${{ row.amount }}</span>
                      </td>

                      <td class="text-start ps-10">
                        <span class="text-gray-600 fs-6">{{ row.date }}</span>
                      </td>

                      <td class="text-end">
                        <button
                            class="btn btn-sm btn-light btn-active-light-primary"
                            data-bs-target="#b_modal_loan_details"
                            data-bs-toggle="modal"
                            type="button"
                        >
                          View
                          <KTIcon icon-class="fs-5 ms-2" icon-name="exit-right-corner"/>
                        </button>
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
        </template>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end::Tables widget 16-->
  <LoanDetailsModal></LoanDetailsModal>
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import LoanDetailsModal from "@/components/borrower/LoanDetailsModal.vue";

export default defineComponent({
  name: "LoanRequests",
  components: {
    LoanDetailsModal
  },
  props: {
    className: { type: String, required: false },
    loanRequests: {type: Array, required: true},
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
