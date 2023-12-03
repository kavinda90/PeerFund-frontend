<template>
  <!--begin::Modal - New Target-->
  <div
      id="b_loan_request_modal"
      ref="newTargetModalRef"
      aria-hidden="true"
      class="modal fade"
      tabindex="-1"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
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
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <!--begin:Form-->
          <el-form
              id="kt_modal_new_target_form"
              ref="formRef"
              :model="loanRequest"
              :rules="rules"
              class="form"
              @submit.prevent="submit(loanRequest)"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Request a loan</h1>
              <!--end::Title-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
                <span class="required">Amount to borrow</span>
                <i
                    class="fas fa-exclamation-circle ms-2 fs-7"
                    data-bs-toggle="tooltip"
                    title="How much would you like to borrow"
                ></i>
              </label>
              <!--end::Label-->

              <el-form-item prop="amount">
                <el-input
                    v-model="loanRequest.amount"
                    name="amount"
                    placeholder="Amount in dollars"
                    type="number"
                ></el-input>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-9 mb-8">
              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Expected by</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <!--begin::Datepicker-->
                  <el-form-item prop="preferredDate">
                    <el-date-picker
                        v-model="loanRequest.preferredDate"
                        :teleported="false"
                        name="preferredDate"
                        placeholder="When do you want the loan?"
                        popper-class="override-styles"
                        type="date"
                    />
                  </el-form-item>
                  <!--end::Datepicker-->
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Pay off by</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <!--begin::Datepicker-->
                  <el-form-item prop="payOffDate">
                    <el-date-picker
                        v-model="loanRequest.payOffDate"
                        :teleported="false"
                        name="payOffDate"
                        placeholder="When do you pay off the loan?"
                        popper-class="override-styles"
                        type="date"
                    />
                  </el-form-item>
                  <!--end::Datepicker-->
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-9 mb-8">
              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Payment term</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <!--begin::Drop down-->
                  <el-form-item prop="paymentTerm">
                    <el-select
                        v-model="loanRequest.paymentTerm"
                        as="select"
                        name="paymentTerm"
                        placeholder="Payment term"
                    >
                      <el-option value="">Select a purpose...</el-option>
                      <el-option label="Weekly" value="weekly">Weekly</el-option>
                      <el-option label="Bi-weekly" value="biweekly">Bi-weekly</el-option>
                      <el-option label="Monthly" value="monthly">Monthly</el-option>
                    </el-select>
                  </el-form-item>
                  <!--end::Drop down-->
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-md-6 fv-row">
                <label class="fs-6 fw-semobold mb-2">Estimated base installment</label>

                <!--begin::Input-->
                <div v-if="estimatedInstallment" class="position-relative align-items-center py-2">
                  <span>${{ estimatedInstallment }}</span><span
                    class="ms-2 fs-7 fw-bold text-gray-400">Without interest + fees</span>
                </div>
                <!--end::Input-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="required fs-6 fw-semibold mb-2">Purpose</label>

              <el-form-item prop="purpose">
                <el-select
                    v-model="loanRequest.purpose"
                    as="select"
                    name="purpose"
                    placeholder="Purpose of the loan"
                >
                  <el-option value="">Select a purpose...</el-option>
                  <el-option label="Consolidate debt" value="debt">Consolidate debt</el-option>
                  <el-option label="Credit card" value="creditcard">Credit card</el-option>
                  <el-option label="Car" value="car">Car</el-option>
                  <el-option label="Home improvement / Moving out" value="home">Home improvement /
                    Moving out
                  </el-option>
                  <el-option label="Bills" value="bills">Bills</el-option>
                  <el-option label="Celebration / Vacation" value="wedding">Celebration / Vacation
                  </el-option>
                  <el-option label="Education" value="education">Education</el-option>
                  <el-option label="Other" value="other">Other</el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8">
              <label class="fs-6 fw-semobold mb-2">Details of the purpose</label>

              <el-form-item prop="description">
                <el-input
                    v-model="loanRequest.description"
                    name="description"
                    placeholder="Let us know more details, it will help us to approve the loan faster"
                    rows="3"
                    type="textarea"
                />
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-stack mb-8">
              <!--begin::Label-->
              <div class="me-5">
                <label class="fs-6 fw-semobold"
                >Prefer urgent approval</label
                >

                <div class="fs-7 fw-semibold text-gray-400">
                  Enabling this doesn't guarantee faster approval, But we will do our best to look
                  at your requested as soon as possible
                </div>
              </div>
              <!--end::Label-->

              <!--begin::Switch-->
              <label
                  class="form-check form-switch form-check-custom form-check-solid"
              >
                <el-form-item prop="isUrgent">
                  <el-switch
                      v-model="loanRequest.isUrgent"
                      active-text="Urgent"
                      class="form-check-label fw-semobold text-gray-400"
                      inactive-text=""
                      size="large"
                  />
                </el-form-item>
                <span>

                </span>
              </label>
              <!--end::Switch-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="mb-15 fv-row">
              <!--begin::Wrapper-->
              <div class="d-flex flex-stack">
                <!--begin::Label-->
                <div class="fw-semobold me-5">
                  <label class="fs-6">Notifications</label>

                  <div class="fs-7 text-gray-400">
                    Allow Notifications by Phone or Email
                  </div>
                </div>
                <!--end::Label-->

                <!--begin::Checkboxes-->
                <div class="d-flex align-items-center">
                  <el-form-item prop="notifications">
                    <el-checkbox-group v-model="loanRequest.notifications">
                      <el-checkbox label="Email"/>
                      <el-checkbox label="Phone"/>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
                <!--end::Checkboxes-->
              </div>
              <!--end::Wrapper-->
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center">
              <button
                  id="kt_modal_new_target_cancel"
                  class="btn btn-light me-3"
                  type="reset"
              >
                Cancel
              </button>

              <!--begin::Button-->
              <button
                  :data-kt-indicator="loading ? 'on' : null"
                  class="btn btn-lg btn-primary"
                  type="submit"
              >
                <span v-if="!loading" class="indicator-label">
                  Submit
                  <KTIcon icon-class="fs-3 ms-2 me-0" icon-name="arrow-right"/>
                </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Actions-->
          </el-form>
          <!--end:Form-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - New Target-->
</template>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

<script lang="ts">
import {getAssetPath} from "@/core/helpers/assets";
import {computed, defineComponent, ref} from "vue";
import {hideModal} from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import {Notifications, PaymentTerms} from "@/core/utils/enums";
import {addDays, addYears, differenceInDays} from "date-fns";
import type {LoanRequest} from "@/core/services/Models";
import {useBorrowerStore} from "@/stores/borrower";
import {useAuthStore} from "@/stores/auth";

export default defineComponent({
  name: "LoanRequestModal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const tomorrow = addDays(new Date(), 1);
    const user = useAuthStore().user;
    console.log('userrrr', user);
    const loanRequest = ref<LoanRequest>({
      amount: 0.0,
      accountId: user.borrower_account.id,
      preferredDate: tomorrow,
      description: null,
      loanPeriod: -1,
      paymentTerm: "",
      purpose: "",
      isUrgent: false,
      payOffDate: addYears(tomorrow, 1),
      notifications: [Notifications.Email]
    });

    const rules = ref({
      amount: [
        {
          required: true,
          message: "Please fill amount",
          trigger: "blur",
        },
      ],
      accountId: [
        {
          required: true,
          message: "form error",
          trigger: "change",
        },
      ],
      preferredDate: [
        {
          required: true,
          message: "Please select preferred date",
          trigger: "change",
        },
      ],
      description: [
        {
          required: false,
        },
      ],
      loanPeriod: [
        {
          required: true,
          message: "form error",
          trigger: "change",
        },
      ],
      paymentTerm: [
        {
          required: true,
          message: "Please select preferred payment term",
          trigger: "change",
        },],
      purpose: [
        {
          required: true,
          message: "Please select purpose of the loan",
          trigger: "change",
        },
      ],
      isUrgent: [
        {
          required: false,
        },
      ],
      notifications: [
        {
          required: false,
        },
      ],
    });

    const processResponse = (isSuccess: boolean) => {

      loading.value = false;

      Swal.fire({
        text: isSuccess ? "Form has been successfully submitted!" : "Request failed, Please try again later",
        icon: isSuccess ? "success" : "danger",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then(() => {
        hideModal(newTargetModalRef.value);
      });
    };
    const submit = (t: any) => {
      if (!formRef.value) {
        return;
      }

      t.loanPeriod = loanPeriods.value;

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          await useBorrowerStore().createLoanRequest(t).then(() => {
            processResponse(true);
          })
          .catch(() => {
            processResponse(false);
          })

        } else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    const paymentTermDays = computed(() => {
      switch (loanRequest.value.paymentTerm) {
        case PaymentTerms.biweekly:
          return 14;
        case PaymentTerms.monthly:
          return 30;
        case PaymentTerms.weekly:
          return 7;
        default:
          return null;
      }
    });

    const loanPeriods = computed(() => {
      if (!loanRequest.value.payOffDate || !loanRequest.value.preferredDate || !paymentTermDays.value) {
        return null;
      } else {
        const dayDiff = differenceInDays(loanRequest.value.payOffDate, loanRequest.value.preferredDate);
        return Math.floor(dayDiff / paymentTermDays.value);
      }
    });

    const estimatedInstallment = computed(() => {
      if (!loanPeriods.value || !loanRequest.value.amount) {
        return null;
      } else {
        return Number(loanRequest.value.amount / loanPeriods.value).toFixed(2);
      }
    });

    return {
      loanRequest,
      submit,
      loading,
      formRef,
      rules,
      newTargetModalRef,
      getAssetPath,
      estimatedInstallment,
    };
  },
});
</script>

<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>
