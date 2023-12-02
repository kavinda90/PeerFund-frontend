<template>
    <div
      class="modal fade"
      id="kt_modal_new_invest"
      ref="newInvestModalRef"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header" id="kt_modal_add_customer_header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">New Investment - Loan Id - {{ loanData?.loanId }}</h2>
            <!--end::Modal title-->
  
            <!--begin::Close-->
            <div
              id="kt_modal_add_customer_close"
              class="btn btn-icon btn-sm btn-active-icon-primary"
              @click="closeModal"
            >
              <KTIcon icon-name="cross" icon-class="fs-1" />
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->
          <!--begin::Form-->
          <el-form
            @submit.prevent="submit()"
            :model="formData"
            :rules="rules"
            ref="formRef"
          >
            <!--begin::Modal body-->
            <div class="modal-body py-10 px-lg-17">
              <!--begin::Scroll-->
              <div
                class="scroll-y me-n7 pe-7"
                id="kt_modal_add_customer_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-max-height="auto"
                data-kt-scroll-dependencies="#kt_modal_add_customer_header"
                data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
                data-kt-scroll-offset="300px"
              >
                <div class="row mb-7">
                  <div class="col-6">
                    <h5>Purpose</h5>
                    <h6 class="text-muted">{{ loanData?.purpose.toUpperCase() }}</h6>
                  </div>
                  <div class="col-6">
                    <h5>Grade</h5>
                    <h6 class="text-muted">{{ loanData?.grade.value }}</h6>
                  </div>
                </div>
                <div class="row mb-7">
                  <div class="col-6">
                    <h5>Amount</h5>
                    <h6 class="text-muted">{{ loanData?.amount }}</h6>
                  </div>
                  <div class="col-6">
                    <h5>Term</h5>
                    <h6 class="text-muted">{{ loanData?.term }}</h6>
                  </div>
                </div>
                <div class="card">
                  <div class="card-body">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="required fs-6 fw-semobold mb-2">Your Interest Rate (%)</label>
                      <!--end::Label-->
      
                      <!--begin::Input-->
                      <el-form-item prop="interestRate">
                        <el-input-number
                          v-model="formData.interestRate"
                          placeholder=""
                          @keyup="onPressRate"
                          :step="0.01"
                        />
                      </el-form-item>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
      
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-semobold mb-2">
                        Monthly Payment
                      </label>
                      <!--end::Label-->
                      <h2>$ {{ monthlyPayment }}</h2>
      
                      <!--begin::Input-->
                      <!-- <el-form-item>
                        <el-input type="number" v-model="monthlyPayment" disabled />
                      </el-form-item> -->
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-semobold mb-2">
                        Total Payment
                      </label>
                      <!--end::Label-->
                      <h2>$ {{ totalPayment }}</h2>
      
                      <!--begin::Input-->
                      <!-- <el-form-item>
                        <el-input type="number" v-model="totalPayment" disabled />
                      </el-form-item> -->
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                      <!--begin::Label-->
                      <label class="fs-6 fw-semobold mb-2">
                        Total Interest
                      </label>
                      <!--end::Label-->
                      <h2>$ {{ totalInterest }}</h2>
      
                      <!--begin::Input-->
                      <!-- <el-form-item>
                        <el-input type="number" v-model="totalInterest" disabled />
                      </el-form-item> -->
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->
      
                    
                  </div>
                  
                </div>
                
              </div>
              <!--end::Scroll-->
            </div>
            <!--end::Modal body-->
  
            <!--begin::Modal footer-->
            <div class="modal-footer flex-center">
              <!--begin::Button-->
              <button
                type="button"
                id="kt_modal_add_customer_cancel"
                class="btn btn-light me-3"
                @click="closeModal"
              >
                Discard
              </button>
              <!--end::Button-->
  
              <!--begin::Button-->
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loading" class="indicator-label">
                  Submit
                  <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
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
            <!--end::Modal footer-->
          </el-form>
          <!--end::Form-->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, onMounted, ref, type PropType } from "vue";
  import { hideModal } from "@/core/helpers/dom";
  import { countries } from "@/core/data/countries";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import type { LoanItem } from "@/core/services/Models";
  import {onClickOutside} from '@vueuse/core'
  import { useInvestorStore } from "@/stores/investor";
  import { useAuthStore } from "@/stores/auth";
  
  export default defineComponent({
    name: "add-customer-modal",
    components: {},
    props: {
      loanData: {} as LoanItem
    },
    setup(props, {emit}) {
      console.log('ropss', props);
      const formRef = ref<null | HTMLFormElement>(null);
      const newInvestModalRef = ref<null | HTMLElement>(null);
      const loading = ref<boolean>(false);
      const store = useInvestorStore();
      const authStore = useAuthStore();
      const formData = ref({
        loanId: "",
        interestRate: "",
        investorId: "",
      });
      let monthlyPayment = ref<number>(0);
      let totalInterest = ref<number>(0);
      let totalPayment = ref<number>(0);

      onMounted(() => {
        store.getAccount(authStore.user.id.toString());
      })
  
      const rules = ref({
        interestRate: [
          {
            required: true,
            message: "Interest rate is required",
            trigger: "change",
            // ty
          },
        ],
        
      });

      const resetValues = () => {
        formData.value.loanId = '';
        formData.value.interestRate = '';
        formData.value.investorId = '';
        monthlyPayment.value = 0;
        totalInterest.value = 0;
        totalPayment.value = 0;
      }

      const onPressRate = (e) =>{
        const amount = parseFloat(props?.loanData?.amount.substring(1));
        const terms = parseInt(props?.loanData?.term.split(" ")[0]);
        const rate = parseFloat(e.target.value);
        console.log(amount + ' - ' + rate);
        monthlyPayment.value = parseFloat(calculateMonthlyPayment(amount, rate, terms)).toFixed(2);
        totalPayment.value = (monthlyPayment.value * terms).toFixed(2);
        totalInterest.value = (totalPayment.value - amount).toFixed(2);

      }

      const calculateMonthlyPayment = (principal, annualInterestRate, loanTermInMonths) => {
        // Convert annual interest rate to monthly and express as a decimal
        const monthlyInterestRate = annualInterestRate / 12 / 100;

        // Calculate the monthly payment using the formula
        const monthlyPayment =
          (principal * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -loanTermInMonths));

        return monthlyPayment.toFixed(2); // Round to two decimal places
      }

      const closeModal = () => {
        resetValues();
        hideModal(newInvestModalRef.value);
      }

      onClickOutside(newInvestModalRef, () => closeModal());
  
      const submit = () => {
        if (!formRef.value) {
          return;
        }
  
        formRef.value.validate(async (valid: boolean) => {
          if (valid) {
            loading.value = true;

            formData.value.loanId = props.loanData?.loanId;
            formData.value.investorId = store.investor.id.toString();

            await store.submitInvestment(formData.value);

            const error = Object.values(store.errors);

            if(!error[0]) {
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
                hideModal(newInvestModalRef.value);
                emit('modal-closed');
              });
            } else {
              Swal.fire({
                text: error[0] as string,
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Try again!",
                heightAuto: false,
                customClass: {
                  confirmButton: "btn fw-semobold btn-light-danger",
                },
              });
            }
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
        formData,
        rules,
        submit,
        formRef,
        loading,
        newInvestModalRef,
        getAssetPath,
        countries,
        onPressRate,
        monthlyPayment,
        totalInterest,
        totalPayment,
        closeModal,
      };
    },
  });
  </script>
  