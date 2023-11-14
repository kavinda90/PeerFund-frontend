<template>
    <!--begin::Tables Widget 13-->
    <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
        <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Loan Requests</span>

        <span class="text-muted mt-1 fw-semobold fs-7">Over 500 investment opportunities</span>
        </h3>
        <div class="card-toolbar">
        <!--begin::Menu-->
        <button
            type="button"
            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >
            <KTIcon icon-name="category" icon-class="fs-2" />
        </button>
        <Dropdown2></Dropdown2>
        <!--end::Menu-->
        </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
        <!--begin::Table container-->
        <div class="table-responsive">
        <!--begin::Table-->
        <table
            class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3"
        >
            <!--begin::Table head-->
            <thead>
            <tr class="fw-bold text-muted">
                <th class="w-25px">
                <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                >
                    <input
                    class="form-check-input"
                    type="checkbox"
                    @change="
                        checkedRows.length === list.length
                        ? (checkedRows.length = 0)
                        : (checkedRows = [0, 1, 2, 3, 4, 5])
                    "
                    />
                </div>
                </th>
                <th class="min-w-150px">Request Id</th>
                <th class="min-w-140px">Grade</th>
                <th class="min-w-120px">Purpose</th>
                <th class="min-w-120px">Amount</th>
                <th class="min-w-120px">Term</th>
                <th class="min-w-120px">Status</th>
                <th class="min-w-100px text-end">Actions</th>
            </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
            <template v-for="(item, index) in list" :key="index">
                <tr>
                <td>
                    <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                    >
                    <input
                        class="form-check-input widget-13-check"
                        type="checkbox"
                        :value="index"
                        v-model="checkedRows"
                    />
                    </div>
                </td>

                <td>
                    <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary fs-6"
                    >{{ item.loanId }}</a
                    >
                </td>

                <td>
                    <span class="symbol symbol-50px">
                        <span
                            :class="`bg-light-${item.grade?.color} text-${item.grade?.color}`"
                            class="symbol-label fs-5 fw-bold"
                            >{{ item.grade?.value }}</span
                        >
                    </span>
                </td>

                <td>
                    <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.purpose }}</a
                    >
                </td>

                <td>
                    <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.amount }}</a
                    >
                </td>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                    {{ item.term }}
                </td>

                <td>
                    <span
                    :class="`badge-light-${item.status?.color}`"
                    class="badge"
                    >{{ item.status?.label }}</span
                    >
                </td>

                <td class="text-end">
                    <a
                        href="#"
                        class="btn btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                        <KTIcon icon-name="switch" icon-class="fs-3" />Invest
                    </a>
                </td>
                </tr>
            </template>
            </tbody>
            <!--end::Table body-->
        </table>
        <!--end::Table-->
        </div>
        <!--end::Table container-->
    </div>
    <!--begin::Body-->
    </div>
    <!--end::Tables Widget 13-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import { useInvestorStore } from "@/stores/investor";
import type { User } from "@/core/services/Models";

export default defineComponent({
    name: "kt-widget-12",
    components: {
        Dropdown2,
    },
    props: {
        widgetClasses: String,
    },
    setup() {
        const checkedRows = ref<Array<number>>([]);
        const store = useInvestorStore();
        const list = ref<LoanItem[]>([]);

        onMounted(() => {
            loadLoans();
        });

        interface LoanItem {
            loanId: number;
            grade: {
                color: string;
                value: string;
            };
            purpose: string;
            amount: string;
            term: string;
            status: {
                label: string;
                color: string;
            };
        }

        const loadLoans = async() => {
            await store.getActiveLoanRequests();
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
                    }
                }
            })
        }

        return {
            list,
            checkedRows,
            getAssetPath,
        };
    },
});
</script>
