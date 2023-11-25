<script lang="ts">
import {defineComponent} from 'vue'
import {getAssetPath} from "@/core/helpers/assets";
import EditProfileModal from "@/components/borrower/EditProfileModal.vue";

export default defineComponent({
  name: "BorrowerProfile",
  components: {EditProfileModal},
  setup() {
    return {
      getAssetPath,
    };
  },
})
</script>

<template>
  <!--begin::Sidebar-->
  <div class="flex-column flex-lg-row-auto w-100 mb-10">
    <!--begin::Card-->
    <div class="card mb-5 mb-xl-8">
      <!--begin::Card body-->
      <div class="card-body pt-15">
        <!--begin::Summary-->
        <div class="d-flex flex-center flex-column mb-5">
          <!--begin::Avatar-->
          <div class="symbol symbol-100px symbol-circle mb-7">
            <img :src="getAssetPath('media/avatars/300-1.jpg')" alt="image" />
          </div>
          <!--end::Avatar-->

          <!--begin::Name-->
          <span class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">Max Smith</span>
          <!--end::Name-->

          <!--begin::Position-->
          <div class="fs-5 fw-semobold text-muted mb-6">Software Engineer</div>
          <!--end::Position-->

          <!--begin::Info-->
          <div class="d-flex flex-wrap flex-center">
            <!--begin::Stats-->
            <div class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3 bg-danger">
              <div class="fs-4 fw-bold text-white">
                <span class="w-75px">E (Very Good)</span>
              </div>
              <div class="text-white text-center">Credit Grade</div>
            </div>
            <!--end::Stats-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Summary-->

        <!--begin::Details toggle-->
        <div class="d-flex flex-stack fs-4 py-3">
          <span class="fw-bold">Details</span>
          <router-link class="btn btn-sm btn-light-primary" to="/borrower/edit-profile">
            Edit profile and settings
          </router-link>
        </div>
        <!--end::Details toggle-->

        <div class="separator separator-dashed my-3"></div>

        <!--begin::Details content-->
        <div>
          <div class="py-5 fs-6">
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Account ID</div>
            <div class="text-gray-600">ID-45453423</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Billing Email</div>
            <div class="text-gray-600">
              <a href="#" class="text-gray-600 text-hover-primary"
              >info@keenthemes.com</a
              >
            </div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Billing Address</div>
            <div class="text-gray-600">
              101 Collin Street, <br />Melbourne 3000 VIC <br />Australia
            </div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Language</div>
            <div class="text-gray-600">English</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Upcoming Invoice</div>
            <div class="text-gray-600">54238-8693</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Tax ID</div>
            <div class="text-gray-600">TX-8674</div>
            <!--begin::Details item-->
          </div>
        </div>
        <!--end::Details content-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Card-->
  </div>
  <!--end::Sidebar-->
  <EditProfileModal></EditProfileModal>
</template>

<style scoped lang="scss">

</style>
