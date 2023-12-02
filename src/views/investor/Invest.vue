<template>
    <!--begin::Tables Widget 13-->
    <div :class="widgetClasses" class="card">

        <div class="card-header border-0 pt-6">
            <!--begin::Card title-->
            <h3 class="card-title flex-column">
                <span class="card-label fw-bold fs-3 mb-1">Loan Requests</span>

                <span class="text-muted mt-1 fw-semobold fs-7">Over 500 investment opportunities</span>
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
                        placeholder="Search Loans"
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
                checkbox-label="loanId"
            >
                <template v-slot:loanId="{ row: loan }">
                    {{ loan.loanId }}
                </template>
                <template v-slot:grade="{ row: loan }">
                    <span class="symbol symbol-50px">
                        <span
                            :class="`bg-light-${loan.grade?.color} text-${loan.grade?.color}`"
                            class="symbol-label fs-5 fw-bold"
                        >{{ loan.grade?.value }}</span>
                    </span>
                </template>
                <template v-slot:purpose="{ row: loan }">
                    {{ loan.purpose }}
                </template>
                <template v-slot:amount="{ row: loan }">
                    {{ loan.amount}}
                </template>
                <template v-slot:term="{ row: loan }">
                    {{ loan.term }}
                </template>
                <template v-slot:status="{ row: loan }">
                    <span
                        :class="`badge-light-${loan.status?.color}`"
                        class="badge"
                    >{{ loan.status?.label.toUpperCase() }}</span>
                </template>
                <template v-slot:actions="{ row: loan }">
                    <button  
                        type="button"
                        :class="'btn btn-light-' + (loan.invested ? 'secondary' : 'primary')"
                        @click="showInvest(loan)"
                        :disabled="loan.invested"
                        >Invest
                    </button>
                </template>
            </Datatable>
        </div>
        <!--begin::Body-->
    </div>
    <!--end::Tables Widget 13-->
    <NewInvestModal :loanData="selectedItem" @modal-closed="handleModalClosed"></NewInvestModal>
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
import type { LoanItem } from "@/core/services/Models";
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
        const list = ref<LoanItem[]>([]);
        const selectedIds = ref<Array<number>>([]);
        const initLoans = ref<Array<LoanItem>>([]);
        const search = ref<string>("");
        const selectedItem = ref<LoanItem>();

        onMounted(async () => {
            await store.getAccount(authStore.user.id.toString());
            loadLoans();
            initLoans.value.splice(0, list.value.length, ...list.value);
        });

        const handleModalClosed = () => {
            // Call the loadLoans function when the modal is closed
            loadLoans();
        };

        const tableHeader = ref([
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
                columnName: "Status",
                columnLabel: "status",
                sortEnabled: false,
                // columnWidth: 225,
            },
            {
                columnName: "Actions",
                columnLabel: "actions",
                sortEnabled: false,
                // columnWidth: 135,
            },
        ]);

        const loadLoans = async() => {
            await store.getActiveLoanRequests(store.investor.id.toString());
            list.value = store.loanRequests.map(loan => {
                return {
                    loanId: loan.id,
                    grade: {
                        color: (loan.borrower_account.credit_grade.grade === 'A') ? 'success' : 
                            (loan.borrower_account.credit_grade.grade === 'B') ? 'primary' :
                            (loan.borrower_account.credit_grade.grade === 'C') ? 'info' :
                            (loan.borrower_account.credit_grade.grade === 'A') ? 'warning' : 'danger',
                        value: loan.borrower_account.credit_grade.grade,
                    },
                    purpose: loan.purpose,
                    amount: "$"+loan.amount ,
                    term: loan.loan_period+" months",
                    status: {
                        label: loan.status,
                        color: (loan.status === 'new') ? 'info' :
                            (loan.status === 'approved') ? 'success' :
                            (loan.status === 'completed') ? 'primary' : 'danger',
                    },
                    invested: loan.investments.length > 0
                }
            })
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
            handleModalClosed
        };
    },
});
</script>
