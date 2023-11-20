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
                    <th class="p-0 pb-3 min-w-150px text-start">Lender</th>
                    <th class="p-0 pb-3 min-w-100px text-end pe-13">CONV.</th>
                    <th class="p-0 pb-3 w-125px text-end pe-7">Status</th>
                    <th class="p-0 pb-3 w-50px text-end">Details</th>
                  </tr>
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->
                <tbody>
                  <template v-for="(row, j) in item.table" :key="j">
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-50px me-3">
                            <img :src="row.agent.avatar" class="" alt="" />
                          </div>

                          <div class="d-flex justify-content-start flex-column">
                            <router-link
                              to="/crafted/pages/profile/overview"
                              class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                              >{{ row.agent.name }}</router-link
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
                          >{{ row.price }}%</span
                        >
                      </td>

                      <td class="text-end pe-0">
                        <!--begin::Label-->
                        <span
                          v-if="row.icon"
                          class="badge badge-light-success fs-base"
                        >
                          <KTIcon
                            icon-name="arrow-up"
                            icon-class="fs-5 text-success ms-n1"
                          />
                          {{ row.statistics }} %
                        </span>
                        <!--end::Label-->
                        <!--begin::Label-->
                        <span v-else class="badge badge-light-danger fs-base">
                          <KTIcon
                            icon-name="arrow-down"
                            icon-class="fs-5 text-danger ms-n1"
                          />
                          {{ row.statistics }} %
                        </span>
                        <!--end::Label-->
                      </td>

                      <td class="text-end">
                        <router-link :to="`/borrower/loans/${row.id}`"
                          class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                        >
                          <KTIcon
                            icon-name="black-right"
                            icon-class="fs-5 text-gray-700"
                          />
                        </router-link>
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
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoanRequests",
  components: {
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
