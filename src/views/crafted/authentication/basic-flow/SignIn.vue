<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
      :initial-values="{ email: 'invest@demo.com', password: '1234' }"
      v-model="selectedOption"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Nav-->
        <ul class="nav nav-pills nav-pills-custom mb-10 justify-content-center">
          <template v-for="(item, i) in options" :key="i">
            <!--begin::Item-->
            <li class="nav-item mb-3 me-3 me-lg-6">
              <!--begin::Link-->
              <a
                class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-row overflow-hidden w-150px h-85px pt-2 pb-2 justify-content-center align-items-center"
                :class="[i === selectedOption && 'active']"
                :id="`kt_stats_widget_16_tab_link_${i}`"
                data-bs-toggle="pill"
                :href="`#kt_stats_widget_16_tab_${i}`"
                @click="handleNavLinkClick(i)"
              >
                <!--begin::Icon-->
                <div class="nav-icon me-3">
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

        <!--begin::Separator-->
        <div class="d-flex align-items-center mb-10">
          <div class="border-bottom border-gray-300 mw-50 w-100"></div>
          <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        </div>
        <!--end::Separator-->

        <!--begin::Title-->
        <h1 class="text-dark mb-3">Sign In As {{ selectedOption === 0 ? 'An Investor' : 'A Borrower' }}</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          New Here?

          <router-link to="/sign-up" class="link-primary fw-bold">
            Create an Account
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!-- <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info">
          Use account <strong>admin@demo.com</strong> and password
          <strong>demo</strong> to continue.
        </div>
      </div> -->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> Sign In </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore} from "@/stores/auth";
import type { User } from "@/core/services/Models";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    const options = [
      {
        title: "Investor",
        icon: "bank",
        index: "1"
      },
      {
        title: "Borrower",
        icon: "security-user",
        index: "2"
      }
    ];

    const selectedOption = ref(0); // Initialize with the default option

    // Define a method to handle nav-link clicks and update selectedOption
    const handleNavLinkClick = (index: number) => {
      selectedOption.value = index;
    };

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      values = values as User;
      // Clear existing errors
      store.logout();

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Set the "type" property in the values object based on the selectedOption.
      values.user_type = selectedOption.value === 0 ? 'investor' : 'borrower';

      // Send login request
      await store.login(values);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(() => {
          // Go to page after successfully login
          (values.user_type == 'investor') ?
            router.push({ name: "investor-dashboard" }):
            router.push({ name: "borrower-dashboard" })
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
        }).then(() => {
          store.errors = {};
        });
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };

    return {
      handleNavLinkClick,
      onSubmitLogin,
      login,
      submitButton,
      getAssetPath,
      options,
      selectedOption
    };
  },
});
</script>
