<template>
  <!--begin::Modal - View Users-->
  <div
      id="b_modal_loan_details"
      aria-hidden="true"
      class="modal fade"
      tabindex="-1"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
          >
            <KTIcon icon-class="fs-1" icon-name="cross"/>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-5 pt-0">
          <!--begin::Row-->
          <div class="row g-5 g-xl-8">
            <!--begin::Col-->
            <div class="col-xl-4">
              <!--begin::Details content-->
              <div class="collapse show">
                <div class="py-5 fs-6">
                  <!--begin::Badge-->
                  <div class="badge badge-light-success d-inline">Perfect</div>
                  <!--begin::Badge-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Loan ID</div>
                  <div class="text-gray-600">45453423</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Platform fee</div>
                  <div class="text-gray-600">1.3%</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Lenders return</div>
                  <div class="text-gray-600">7.0%</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Installment type</div>
                  <div class="text-gray-600">Bi-Weekly</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Missed installments</div>
                  <div class="text-gray-600">0</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Total paid amount</div>
                  <div class="text-gray-600">$12,342.00</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Total due amount</div>
                  <div class="text-gray-600">$32,423.00</div>
                  <!--begin::Details item-->
                  <!--begin::Details item-->
                  <div class="fw-bold mt-5">Pending number of installments</div>
                  <div class="text-gray-600">32</div>
                  <!--begin::Details item-->
                </div>
              </div>
              <!--end::Details content-->
            </div>
            <!--end::Col-->
            <!--begin::Col-->
            <div class="col-xl-8">
              <LoanSummary
                  widget-classes="card-xl-stretch mb-xl-8"
                  widget-color="primary"
              ></LoanSummary>
            </div>
            <!--end::Col-->
          </div>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - View Users-->
</template>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {defineComponent} from "vue";
import LoanSummary from "@/components/borrower/LoanSummary.vue";

export default defineComponent({
  name: "LoanDetailsModal",
  components: {LoanSummary},
  setup() {
    const users = [
      {
        avatar: getAssetPath("media/avatars/300-6.jpg"),
        name: "Emma Smith",
        email: "e.smith@kpmg.com.au",
        position: "Art Director",
        sales: "23,000",
      },
      {
        state: "danger",
        name: "Melody Macy",
        email: "melody@altbox.com",
        position: "Marketing Analytic",
        sales: "50,500",
      },
      {
        avatar: getAssetPath("media/avatars/300-1.jpg"),
        name: "Max Smith",
        email: "max@kt.com",
        position: "Software Enginer",
        sales: "75,900",
      },
      {
        avatar: getAssetPath("media/avatars/300-1.jpg"),
        name: "Sean Bean",
        email: "sean@dellito.com",
        position: "Web Developer",
        sales: "10,500",
      },
      {
        avatar: getAssetPath("media/avatars/300-25.jpg"),
        name: "Brian Cox",
        email: "brian@exchange.com",
        position: "UI/UX Designer",
        sales: "20,000",
      },
      {
        state: "warning",
        name: "Mikaela Collins",
        email: "mikaela@pexcom.com",
        position: "Head Of Marketing",
        sales: "9,300",
      },
      {
        avatar: getAssetPath("media/avatars/300-9.jpg"),
        name: "Francis Mitcham",
        email: "f.mitcham@kpmg.com.au",
        position: "Software Arcitect",
        sales: "15,000",
      },
      {
        state: "danger",
        name: "Olivia Wild",
        email: "olivia@corpmail.com",
        position: "System Admin",
        sales: "23,000",
      },
      {
        state: "info",
        name: "Neil Owen",
        email: "owen.neil@gmail.com",
        position: "Account Manager",
        sales: "45,000",
      },
      {
        avatar: getAssetPath("media/avatars/300-23.jpg"),
        name: "Dan Wilson",
        email: "dam@consilting.com",
        position: "Web Desinger",
        sales: "90,500",
      },
      {
        state: "danger",
        name: "Emma Bold",
        email: "emma@intenso.com",
        position: "Corporate Finance",
        sales: "5,000",
      },
      {
        avatar: getAssetPath("media/avatars/300-12.jpg"),
        name: "Ana Crown",
        email: "ana.cf@limtel.com",
        position: "Customer Relationship",
        sales: "70,000",
      },
      {
        state: "primary",
        name: "Robert Doe",
        email: "robert@benko.com",
        position: "Marketing Executive",
        sales: "45,500",
      },
    ];

    return {
      users,
      getAssetPath,
    };
  },
});
</script>
