import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import type { User } from "@/core/services/Models";
import JwtService from "@/core/services/JwtService";

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: any) {
    isAuthenticated.value = true;
    user.value = authUser.user;
    errors.value = {};
    JwtService.saveToken(authUser.api_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  async function login(credentials: User) {
    try {
      const { data } = await ApiService.post("users/login", credentials);
      setAuth(data);
    } catch (error) {
      setError(error.response.data);
    }
  }

  function logout() {
    purgeAuth();
  }

  async function register(credentials: User) {
    try {
      const { data } = await ApiService.post("users/sign-up", credentials);
      setAuth(data);
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function forgotPassword(email: string) {
    try {
      await ApiService.post("forgot_password", email);
      setError({});
    } catch (error) {
      setError(error.response.data);
    }
  }

  async function verifyAuth() {
    try {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        const { data } = await ApiService.post("users/verify_token", {
          api_token: JwtService.getToken(),
        });
        setAuth(data);
      } else {
        purgeAuth();
      }
    } catch (error) {
      if (error) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data);
      }
  
      // Always purge auth on error
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
