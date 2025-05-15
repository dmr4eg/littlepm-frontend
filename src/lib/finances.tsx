import type { Finances } from '@/api/api-course/models/Finances';

export interface FinancesId {
    projectBlueprintUuid: string;
    userUuid: string;
}

export const RETURN = 0.10;   // 10 %
export const MARGIN = 0.20;   // 20 %
export const HELPERS = 2 / 3;  // 66%


export type FinancesPrimitives = Pick<
    Finances,
    | 'spentBudget'
    | 'expenseAmount'
    | 'investorGave'
    | 'toysPlanned'
    | 'toysSold'
> & Partial<Pick<Finances, 'soldPrice'>>;

export function computeFinances(raw: FinancesPrimitives): Finances {
    const spentBudget = +((raw.spentBudget ?? 0));
    const expenseAmount = +((raw.expenseAmount ?? 0));
    const investorGave = +((raw.investorGave ?? 0));
    const toysPlanned = Math.max(+((raw.toysPlanned ?? 1)), 1);
    const toysSold = Math.max(+((raw.toysSold ?? 0)), 0);
    const soldPriceIn = raw.soldPrice == null ? undefined : +raw.soldPrice;

    const calculatedBudget = spentBudget + expenseAmount; // total cost
    const investorReturn = calculatedBudget * RETURN;        // absolute interest
    const itemsCost = calculatedBudget / toysPlanned;   // unit cost
    const pricePerItem =
        (calculatedBudget + investorReturn + calculatedBudget * MARGIN) /
        toysPlanned;

    const recommendedPrice = Math.ceil(pricePerItem);
    const soldPrice = soldPriceIn ?? toysSold * recommendedPrice;
    const profitBeforeHelpers = soldPrice - (calculatedBudget + investorReturn);
    const membersBudget = profitBeforeHelpers * HELPERS;
    const profit = profitBeforeHelpers - membersBudget;
    const toysLeft = toysPlanned - toysSold;

    if (Number.isNaN(pricePerItem) || !Number.isFinite(pricePerItem)) {
        throw new Error('Computed pricePerItem is not a finite number – check inputs.');
    }
    if (investorGave && investorGave < calculatedBudget) {
        throw new Error(
            `Investor gave less (${investorGave}) than the calculated budget (${calculatedBudget}).`,
        );
    }
    return {
        id: {} as FinancesId,
        spentBudget,
        expenseAmount,
        investorGave,
        toysPlanned,
        toysSold,
        toysLeft,
        calculatedBudget,
        investorReturn,
        itemsCost,
        pricePerItem,
        recommendedPrice,
        soldPrice,
        membersBudget,
        profit,
    };
}

export interface FinanceValidationResult {
    errors: string[];
    warnings: string[];
}

export function validateFinances(
    fin: Finances,
    helpersPercents: number[] = [],
): FinanceValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const totalHelpersPercent = helpersPercents.reduce((s, p) => s + p, 0);
    if (totalHelpersPercent > 100) {
        errors.push('Helpers total percent cannot exceed 100 %.');
    } else if (totalHelpersPercent > 50) {
        warnings.push(
            'More than 50 % of the profit goes to helpers – you keep less than half.',
        );
    }
    if ((fin.investorGave ?? 0) < (fin.calculatedBudget ?? 0)) {
        errors.push('Investor gave less cash than the calculated budget requires.');
    }

    if ((fin.profit ?? 0) < 0) errors.push('Profit is negative.');
    if ((fin.toysLeft ?? 0) < 0) errors.push('Number of toys left is negative.');
    if ((fin.spentBudget ?? 0) === 0 && (fin.expenseAmount ?? 0) === 0) {
        errors.push('Fill in at least one cost (spentBudget or expenseAmount).');
    }
    return { errors, warnings };
}

export function calculateFinancesSummary(fin: Finances) {
    return {
        totalSpent: fin.calculatedBudget,
        grossRevenue: fin.soldPrice,
        netProfit: fin.profit,
    };
}
