import {ref} from "vue";
import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import type {InvestorAccount, Loan} from "@/core/services/Models";

export const useInvestorStore = defineStore("investorStore", () => {
    const errors = ref({});
    const investor = ref<InvestorAccount>({} as InvestorAccount);
    const loanRequests = ref<Loan[]>({} as Loan[]);

    function setError(error: any) {
        errors.value = { ...error };
    }

    async function getAccount(userId: string) {
        try {
            const { data } = await ApiService.get("investor/myAccount", userId);
            investor.value = data;
        } catch ({ error }) {
            setError(error.message);
        }
    }

    async function getActiveLoanRequests() {
        try {
            const { data } = await ApiService.get("investor/getActiveLoanRequests");
            loanRequests.value = data;
        } catch ({ error }) {
            setError(error.message);
        }
    }


    return {
        getAccount,
        getActiveLoanRequests,
        loanRequests
    };


});

