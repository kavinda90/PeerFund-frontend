import type {Notifications, PaymentTerms, Purposes} from "@/core/utils/enums";
import type {NullableSting} from "@/core/utils/types";

export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    dob: string;
    user_type: string;
    status: boolean;
    phone: string;
    image_path: string;
    payment_method: string;
    investor_account: InvestorAccount,
    borrower_account: BorrowerAccount
};

export type UserDocument = {
    id: number;
    name: string;
    url: string;
    status: string;
    createdAt: string;
    user: User;
};

export type CreditGrade = {
    id: number;
    grade: string;
    limit_min: number;
    limit_max: number;
};

export type BorrowerAccount = {
    id: number;
    status: string;
    credit_score: string;
    createdAt: string;
    user: User;
    credit_grade: CreditGrade;
};

export type InvestorAccount = {
    id: number;
    subscription_status: string;
    account_balance: number;
    level: string;
    status: string;
    createdAt: string;
    user: User;
    investments: Investment[];
    investor_withdrawals: InvestorWithdrawal[];
    subscription_payments: SubscriptionPayment[];
};

export type Investment = {
    id: number;
    interest_rate: number;
    status: string;
    transaction_info: string;
    createdAt: string;
    investor_account: InvestorAccount;
    loan_request: Loan;
};

export type InvestorWithdrawal = {
    id: number;
    amount: number;
    method: string;
    status: string;
    transaction_info: string;
    investor_account: InvestorAccount;
};

export type Loan = {
    id: number,
    amount: number;
    expiry_date: string;
    purpose: string;
    description: string;
    loan_period: number;
    payment_term: string;
    status: string;
    investment_id: string;
    investments: Investment[];
    term_amount: number;
    assesment_fee: number;
    transaction_info: string;
    createdAt: string;
    borrower_account: BorrowerAccount;
};

export type LoanPayment = {
    id: number;
    term_number: number;
    amount: number;
    status: string;
    paid_at: string;
    payment_info: string;
    createdAt: string;
    loan_request: Loan;

};

export type SubscriptionPayment = {
    id: number;
    term_number: number;
    amount: number;
    status: string;
    paid_at: string;
    payment_info: string;
    createdAt: string;
    investor_account: InvestorAccount;
};

export type LoanItem = {
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

export type InvestmentItem = {
    investmentId: number;
    loanId: number;
    grade: {
        color: string;
        value: string;
    };
    purpose: string;
    amount: string;
    term: string;
}

export interface LoanRequest {
    accountId: number;
    amount: number;
    preferredDate: Date;
    purpose: Purposes | "";
    description: NullableSting,
    loanPeriod: number;
    paymentTerm: PaymentTerms | "";
    isUrgent: any;
    notifications?: Notifications[];
    payOffDate?: Date;
    estimatedInstallment?: number;
}
