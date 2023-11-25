import {ref} from "vue";
import {defineStore} from "pinia";
import ApiService from "@/core/services/ApiService";
import type {Loan, LoanRequest} from "@/core/services/Models";

export const useBorrowerStore = defineStore("borrowerStore", () => {
    const errors = ref({});
    const loanRequests = ref<Loan[]>({} as Loan[]);

    function setError(error: any) {
        errors.value = {...error};
    }

    async function createLoanRequest(loanRequest: LoanRequest) {
        try {
            const {data} = await ApiService.post("borrower/new-loan", loanRequest);
            console.log(data);
        } catch ({error}) {
            setError(error.message);
        }
    }

    return {
        createLoanRequest,
        loanRequests
    };


});

