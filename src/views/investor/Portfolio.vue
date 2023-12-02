<template>
    <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <a
              class="nav-link active" data-bs-toggle="tab" href="#" @click="loadInvestments('pending')"
            >
              Pending
          </a>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <a
              class="nav-link" data-bs-toggle="tab" href="#" @click="loadInvestments('approved')"
            >
              Approved
            </a>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <a
              class="nav-link" data-bs-toggle="tab" href="#" @click="loadInvestments('rejected')"
            >
              Rejected
            </a>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <a
              class="nav-link" data-bs-toggle="tab" href="#" @click="loadInvestments('paid')"
            >
              Completed
            </a>
          </li>
          <!--end::Nav item-->
        </ul>
    </div>
    <!--begin::Tables Widget 13-->
    <div :class="widgetClasses" class="card">

        <div class="card-header border-0 pt-6">
            <!--begin::Card title-->
            <h3 class="card-title flex-column">
                <span class="card-label fw-bold fs-3 mb-1">Investment Requests</span>

                <span class="text-muted mt-1 fw-semobold fs-7">List of investment requests waiting for borrower's response</span>
            </h3>
            <!--end::Card title-->
            <!--begin::Card toolbar-->
            <div class="card-toolbar">
                <!--begin::Search-->
                <div class="d-flex align-items-center my-1">
                    <KTIcon
                        icon-name="magnifier"
                        icon-class="fs-1 position-absolute ms-6"
                    />
                    <input
                        type="text"
                        v-model="search"
                        @input="searchItems()"
                        class="form-control form-control-solid w-250px ps-15"
                        placeholder="Search Investments"
                    />
                </div>
                <!--end::Search-->
                <!--begin::Group actions-->
                <div v-if="selectedIds.length > 0"
                    class="d-flex justify-content-end align-items-center"
                    data-kt-loan-table-toolbar="selected"
                >
                    <div class="fw-bold me-5">
                        <span class="me-2">{{ selectedIds.length }}</span
                        >Selected
                    </div>
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteFewCustomers()"
                    >
                        Delete Selected
                    </button>
                </div>
                <!--end::Group actions-->
            </div>
            <!--end::Card toolbar-->
        </div>

        <!--begin::Body-->
        <div class="card-body py-3">
            <Datatable
                @on-sort="sort"
                @on-items-select="onItemSelect"
                :data="list"
                :header="tableHeader"
                :enable-items-per-page-dropdown="true"
                :checkbox-enabled="true"
                checkbox-label="investmentId"
            >
                <template v-slot:investmentId="{ row: investment }">
                    {{ investment.investmentId }}
                </template>
                <template v-slot:loanId="{ row: investment }">
                    {{ investment.loanId }}
                </template>
                <template v-slot:grade="{ row: investment }">
                    <span class="symbol symbol-50px">
                        <span
                            :class="`bg-light-${investment.grade?.color} text-${investment.grade?.color}`"
                            class="symbol-label fs-5 fw-bold"
                        >{{ investment.grade?.value }}</span>
                    </span>
                </template>
                <template v-slot:purpose="{ row: investment }">
                    {{ investment.purpose }}
                </template>
                <template v-slot:amount="{ row: investment }">
                    {{ investment.amount}}
                </template>
                <template v-slot:term="{ row: investment }">
                    {{ investment.term }}
                </template>
                <template v-slot:actions="{ row: investment }">
                    <button  
                        type="button"
                        class="btn btn-light-danger"
                        @click="showInvest(investment)"
                        >Cancel
                    </button>
                </template>
            </Datatable>
        </div>
        <!--begin::Body-->
        

        
    </div>
    <!--end::Tables Widget 13-->
    <!-- <NewInvestModal :loanData="selectedItem" @modal-closed="handleModalClosed"></NewInvestModal> -->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onActivated, onMounted, ref } from "vue";
import { useInvestorStore } from "@/stores/investor";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import arraySort from "array-sort";
import NewInvestModal from "@/components/modals/forms/NewInvestModal.vue";
import { Modal } from "bootstrap";
import type { Investment, InvestmentItem, LoanItem } from "@/core/services/Models";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
    name: "kt-widget-12",
    components: {
        Datatable,
        NewInvestModal
    },
    props: {
        widgetClasses: String,
    },
    setup() {
        const checkedRows = ref<Array<number>>([]);
        const store = useInvestorStore();
        const authStore = useAuthStore();
        const list = ref<InvestmentItem[]>([]);
        const selectedIds = ref<Array<number>>([]);
        const initInvestments = ref<Array<InvestmentItem>>([]);
        const search = ref<string>("");
        const selectedItem = ref<InvestmentItem>();

        onMounted(async () => {
            await store.getAccount(authStore.user.id.toString());
            loadInvestments('pending');
            initInvestments.value.splice(0, list.value.length, ...list.value);
        });

        const handleModalClosed = () => {
            // loadLoans();
        };

        const tableHeader = ref([
            {
                columnName: "Investment Id",
                columnLabel: "investmentId",
                sortEnabled: true,
                // columnWidth: 175,
            },
            {
                columnName: "Loan Id",
                columnLabel: "loanId",
                sortEnabled: true,
                // columnWidth: 175,
            },
            {
                columnName: "Grade",
                columnLabel: "grade",
                sortEnabled: false,
                // columnWidth: 135,
            },
            {
                columnName: "Purpose",
                columnLabel: "purpose",
                sortEnabled: true,
                // columnWidth: 175,
            },
            {
                columnName: "Amount",
                columnLabel: "amount",
                sortEnabled: true,
                // columnWidth: 175,
            },
            {
                columnName: "Term",
                columnLabel: "term",
                sortEnabled: true,
                // columnWidth: 135,
            },
            {
                columnName: "Actions",
                columnLabel: "actions",
                sortEnabled: false,
                // columnWidth: 135,
            },
        ]);

        const loadInvestments = async(status: String) => {
            await store.getInvestmentsByInvestor({investorId: store.investor.id.toString(), status: status});
            
            list.value = store.portfolio.map(investment => {
                return {
                    investmentId: investment.id,
                    loanId: investment.loan_request.id,
                    grade: {
                        color: (investment.loan_request.borrower_account.credit_grade.grade === 'A') ? 'success' : 
                            (investment.loan_request.borrower_account.credit_grade.grade === 'B') ? 'primary' :
                            (investment.loan_request.borrower_account.credit_grade.grade === 'C') ? 'info' :
                            (investment.loan_request.borrower_account.credit_grade.grade === 'A') ? 'warning' : 'danger',
                        value: investment.loan_request.borrower_account.credit_grade.grade,
                    },
                    purpose: investment.loan_request.purpose,
                    amount: "$"+investment.loan_request.amount ,
                    term: investment.loan_request.loan_period+" months",
                }
            });
            console.log(list.value);
        }

        const searchItems = () => {
            list.value.splice(0, list.value.length, ...initLoans.value);
            if (search.value !== "") {
                let results: Array<LoanItem> = [];
                for (let j = 0; j < list.value.length; j++) {
                    if (searchingFunc(list.value[j], search.value)) {
                        results.push(list.value[j]);
                    }
                }
                list.value.splice(0, list.value.length, ...results);
            }
            // MenuComponent.reinitialization();
        };

        const searchingFunc = (obj: any, value: string): boolean => {
            for (let key in obj) {
                if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
                    if (obj[key].indexOf(value) != -1) {
                        return true;
                    }
                }
            }
            return false;
        };

        const sort = (sort: Sort) => {
            const reverse: boolean = sort.order === "asc";
            if (sort.label) {
                arraySort(list.value, sort.label, { reverse });
            }
        };
        const onItemSelect = (selectedItems: Array<number>) => {
            selectedIds.value = selectedItems;
        };

        const showInvest = (_loan: LoanItem) => {
            selectedItem.value = _loan;
            const modal = new Modal(document.getElementById("kt_modal_new_invest"));
            modal.show();
        }

        return {
            list,
            checkedRows,
            getAssetPath,
            tableHeader,
            search,
            searchItems,
            selectedIds,
            sort,
            onItemSelect,
            showInvest,
            selectedItem,
            loadInvestments,
            handleModalClosed
        };
    },
});
</script>
