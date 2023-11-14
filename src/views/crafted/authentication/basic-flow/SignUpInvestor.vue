<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Sign Up as an Investor</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Already have an account?

          <router-link to="/sign-in" class="link-primary fw-bold">
            Sign in here
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Separator-->
      <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>
      <!--end::Separator-->

      <div v-show="step === 1">
        <!--begin::Input group-->
        <div class="row fv-row mb-7">
          <!--begin::Col-->
          <div class="col-xl-6">
            <label class="form-label fw-bold text-dark fs-6">First Name</label>
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="first_name"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="first_name" />
              </div>
            </div>
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col-xl-6">
            <label class="form-label fw-bold text-dark fs-6">Last Name</label>
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="last_name"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="last_name" />
              </div>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row fv-row mb-7">
          <!--begin::Col-->
          <div class="col-xl-6">
            <label class="form-label fw-bold text-dark fs-6">Date of Birth</label>
            <el-date-picker
              v-model="dateOfBirth"
              type="date"
              placeholder="Select a date"
              :teleported="false"
              popper-class="override-styles"
              name="dob"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="dob" />
              </div>
            </div>
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col-xl-6">
            <label class="form-label fw-bold text-dark fs-6">Phone</label>
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="phone"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="phone" />
              </div>
            </div>
          </div>
          <!--end::Col-->
          
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="fv-row mb-7">
          <label class="form-label fw-bold text-dark fs-6">Email</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="email"
            placeholder=""
            name="email"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="mb-10 fv-row" data-kt-password-meter="true">
          <!--begin::Wrapper-->
          <div class="mb-1">
            <!--begin::Label-->
            <label class="form-label fw-bold text-dark fs-6"> Password </label>
            <!--end::Label-->

            <!--begin::Input wrapper-->
            <div class="position-relative mb-3">
              <Field
                class="form-control form-control-lg form-control-solid"
                type="password"
                placeholder=""
                name="password"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <!--end::Input wrapper-->
            <!--begin::Meter-->
            <div
              class="d-flex align-items-center mb-3"
              data-kt-password-meter-control="highlight"
            >
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
              ></div>
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
              ></div>
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
              ></div>
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
              ></div>
            </div>
            <!--end::Meter-->
          </div>
          <!--end::Wrapper-->
          <!--begin::Hint-->
          <div class="text-muted">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </div>
          <!--end::Hint-->
        </div>
        <!--end::Input group--->

        <!--begin::Input group-->
        <div class="fv-row mb-5">
          <label class="form-label fw-bold text-dark fs-6"
            >Confirm Password</label
          >
          <Field
            class="form-control form-control-lg form-control-solid"
            type="password"
            placeholder=""
            name="password_confirmation"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="password_confirmation" />
            </div>
          </div>
        </div>
        <!--end::Input group-->
      </div>

      <div v-show="step === 2">
        <!--begin::Input group-->
        <div class="row fv-row mb-7">
          <!--begin::Col-->
          <div class="col-xl-6">
            <label class="form-label fw-bold text-dark fs-6"></label>
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="first_name"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="first_name" />
              </div>
            </div>
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col-xl-6">
            <label class="form-label fw-bold text-dark fs-6">Last Name</label>
            <Field
              class="form-control form-control-lg form-control-solid"
              type="text"
              placeholder=""
              name="last_name"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="last_name" />
              </div>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->
      </div>
      

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-check form-check-custom form-check-solid">
          <Field
            class="form-check-input"
            type="checkbox"
            name="toc"
            value="1"
          />
          <span class="form-check-label fw-semobold text-gray-700 fs-6">
            I Agree &
            <a href="#" class="ms-1 link-primary">Terms and conditions</a>.
          </span>
        </label>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          class="btn btn-lg btn-primary"
          type="button"
          v-on:click="nextStep"
          v-show="step !== 2"
        >
          <span class="indicator-label"> Continue </span>
        </button>
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
          v-show="step === 2"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/core/services/Models";
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { format } from 'date-fns';

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },

  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const step = ref(1);
    const dateOfBirth = ref(new Date());

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      first_name: Yup.string().required().label("First name"),
      last_name: Yup.string().required().label("Last name"),
      dob: Yup.date().label("Date of Birth"),
      email: Yup.string().min(4).required().email().label("Email"),
      phone: Yup.string().min(10).max(10).required().label("Phone"),
      password: Yup.string().required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .label("Password Confirmation"),
    });

    const nextStep = () => {
      step.value += 1;
      console.log('stepp ', step.value);
    }

    const backStep = () => {
      step.value -= 1;
    }

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const onSubmitRegister = async (values: any) => {
      values.dob = format(dateOfBirth.value, 'yyyy-MM-dd');
      values = values as User;
      console.log(values);

      // Clear existing errors
      store.logout();

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      await store.register(values);

      const error = Object.values(store.errors);

      if (!error) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
          router.push({ name: "dashboard" });
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

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
      getAssetPath,
      step,
      nextStep,
      dateOfBirth,
    };
  },
});
</script>
