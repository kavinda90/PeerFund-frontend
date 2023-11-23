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
              :model="targetData"
              :rules="rules"
              class="form"
              @submit.prevent="submit()"
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

              <el-form-item prop="targetTitle">
                <el-input
                    v-model="targetData.targetTitle"
                    name="targetTitle"
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
                  <el-form-item prop="dueDate">
                    <el-date-picker
                        v-model="targetData.dueDate"
                        :teleported="false"
                        name="dueDate"
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
                  <el-form-item prop="dueDate">
                    <el-date-picker
                        v-model="targetData.dueDate"
                        :teleported="false"
                        name="dueDate"
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
            <div class="d-flex flex-column mb-8 fv-row">
              <label class="required fs-6 fw-semibold mb-2">Purpose</label>

              <el-form-item prop="assign">
                <el-select
                    v-model="targetData.assign"
                    as="select"
                    name="assign"
                    placeholder="Purpose of the loan"
                >
                  <el-option value="">Select a purpose...</el-option>
                  <el-option label="Karina Clark" value="1">Consolidate debt</el-option>
                  <el-option label="Robert Doe" value="2">Emergency</el-option>
                  <el-option label="Niel Owen" value="3">Personal</el-option>
                  <el-option label="Olivia Wild" value="4">Home improvement / Moving out</el-option>
                  <el-option label="Sean Bean" value="5">Education</el-option>
                  <el-option label="Sean Bean" value="6">Celebration / Vacation</el-option>
                  <el-option label="Sean Bean" value="7">Other</el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-8">
              <label class="fs-6 fw-semobold mb-2">Details of the purpose</label>

              <el-form-item prop="targetDetails">
                <el-input
                    v-model="targetData.targetDetails"
                    name="targetDetails"
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

                <div class="fs-7 fw-semobold text-gray-400">
                  Enabling this doesn't guarantee faster approval, But we will do our best to look
                  at your requested as soon as possible
                </div>
              </div>
              <!--end::Label-->

              <!--begin::Switch-->
              <label
                  class="form-check form-switch form-check-custom form-check-solid"
              >
                <input
                    checked
                    class="form-check-input"
                    type="checkbox"
                    value="1"
                />
                <span class="form-check-label fw-semobold text-gray-400">
                  Urgent
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
                  <!--begin::Checkbox-->
                  <label
                      class="form-check form-check-custom form-check-solid me-10"
                  >
                    <input
                        checked
                        class="form-check-input h-20px w-20px"
                        name="communication[]"
                        type="checkbox"
                        value="email"
                    />

                    <span class="form-check-label fw-semobold"> Email </span>
                  </label>
                  <!--end::Checkbox-->

                  <!--begin::Checkbox-->
                  <label class="form-check form-check-custom form-check-solid">
                    <input
                        class="form-check-input h-20px w-20px"
                        name="communication[]"
                        type="checkbox"
                        value="phone"
                    />

                    <span class="form-check-label fw-semobold"> Phone </span>
                  </label>
                  <!--end::Checkbox-->
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
import {defineComponent, ref} from "vue";
import {hideModal} from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

interface NewAddressData {
  targetTitle: string;
  assign: string;
  dueDate: string;
  targetDetails: string;
  tags: Array<string>;
}

export default defineComponent({
  name: "LoanRequestModal",
  components: {},
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const targetData = ref<NewAddressData>({
      targetTitle: "",
      assign: "",
      dueDate: "",
      targetDetails: "",
      tags: ["important", "urgent"],
    });

    const rules = ref({
      targetTitle: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
      assign: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      dueDate: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      tags: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true;

          setTimeout(() => {
            loading.value = false;

            Swal.fire({
              text: "Form has been successfully submitted!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              hideModal(newTargetModalRef.value);
            });
          }, 2000);
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

    return {
      targetData,
      submit,
      loading,
      formRef,
      rules,
      newTargetModalRef,
      getAssetPath,
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
