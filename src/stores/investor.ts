import {ref} from "vue";
import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type { Investment, InvestorAccount, LoanRequest, Loan } from "@/core/services/Models";

export const useInvestorStore = defineStore("investorStore", () => {
    const errors = ref({});
    const investor = ref<InvestorAccount>({} as InvestorAccount);
    const loanRequests = ref<LoanRequest[]>({} as LoanRequest[]);
    const investedList = ref<Investment[]>({} as Investment[]);
    const loanRequest = ref<LoanRequest>({} as LoanRequest);
    const investment = ref<Investment>({} as Investment);
    const portfolio = ref<Investment[]>({} as Investment[]);

    function setError(error: any) {
        errors.value = { ...error };
    }

    async function getAccount(userId: string) {
        try {
            const { data } = await ApiService.get("investor/myAccount", userId);
            investor.value = data;
            setError({});
        } catch ({ error }) {
            setError(error.response.data);
        }
    }

    async function getActiveLoanRequests(investorId: string) {
        try {
            const { data } = await ApiService.get("investor/getActiveLoanRequests", investorId);
            loanRequests.value = data;
            setError({});
        } catch ({ error }) {
            setError(error.response.data);
        }
    }

    async function getLoanRequest() {
        try {
            const { data } = await ApiService.get("investor/getLoanRequest");
            loanRequest.value = data;
            setError({});
        } catch ({ error }) {
            setError(error.response.data);
        }
    }

    async function submitInvestment(investData) {
        try {
            const { data } = await ApiService.post("investor/submitInvestment", investData);
            investment.value = data;
            setError({});
        } catch ({ error }) {
            setError(error.response.data);
        }
    }

    async function getInvestedList(investorId: string) {
        try {
            const { data } = await ApiService.get("investor/getInvestedList", investorId);
            investedList.value = data;
            setError({});
        } catch ({ error }) {
            setError(error.response.data);
        }
    }

    async function getInvestmentsByInvestor(reqData) {
        try {
            const { data } = await ApiService.post("investor/getInvestmentsByInvestor", reqData)
            portfolio.value = data;
        } catch ({ error }) {
            setError(error.response.data);
        }
    }


    return {
        getAccount,
        getActiveLoanRequests,
        loanRequests,
        getLoanRequest,
        loanRequest,
        submitInvestment,
        investor,
        errors,
        getInvestedList,
        getInvestmentsByInvestor,
        portfolio
    };


});

