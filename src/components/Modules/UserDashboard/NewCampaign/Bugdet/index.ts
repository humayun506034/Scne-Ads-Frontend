export interface BudgetType {
    id: "hourly" | "daily"
    label: string
    description: string
}

export interface PaymentMethod {
    id: string
    type: "mastercard" | "visa" | "amex" | "paypal"
    lastFour: string
    isDefault: boolean
}

export interface BudgetState {
    budgetType: "hourly" | "daily"
    budgetAmount: number
    hasSpendLimit: boolean
    spendLimitAmount: number
    selectedPaymentMethod: string
}


export const budgetTypes: BudgetType[] = [
    {
        id: "hourly",
        label: "Hourly Budget",
        description: "Set budget per hour",
    },
    {
        id: "daily",
        label: "Daily Target",
        description: "Set daily spending target",
    },
]

export const paymentMethods: PaymentMethod[] = [
    {
        id: "1",
        type: "mastercard",
        lastFour: "5630",
        isDefault: true,
    },
    {
        id: "2",
        type: "visa",
        lastFour: "4521",
        isDefault: false,
    },
    {
        id: "3",
        type: "amex",
        lastFour: "1234",
        isDefault: false,
    },
    {
        id: "4",
        type: "paypal",
        lastFour: "1234",
        isDefault: false,
    },
]

export const budgetConfig = {
    minBudget: 3,
    maxBudget: 500,
    defaultBudget: 325,
    step: 1,
};
