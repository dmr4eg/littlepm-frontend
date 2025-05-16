import React, { useEffect, useState } from 'react';
import { computeFinances, validateFinances, FinancesPrimitives } from '@/lib/finances';
import type { Finances } from '@/api/api-course/models/Finances';
import { FinancesReportGenerator } from './FinancesReportGenerator';

interface FinancesComponentProps {
    dayId: string;
    initialValues?: FinancesPrimitives;
}

const FINANCES_STORAGE_KEY = (dayId: string) => `finances_day_${dayId}`;

export const FinancesComponent: React.FC<FinancesComponentProps> = ({ dayId, initialValues }) => {
    const [financesInput, setFinancesInput] = useState<FinancesPrimitives>({
        spentBudget: 0,
        expenseAmount: 0,
        investorGave: 0,
        toysPlanned: 1,
        toysSold: 0,
        ...initialValues,
    });
    const [helpersPercents, setHelpersPercents] = useState<number[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(FINANCES_STORAGE_KEY(dayId));
        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                setFinancesInput(parsedData);
            } catch (e) {
                console.error('Failed to parse finances data from localStorage', e);
            }
        }
    }, [dayId]);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem(FINANCES_STORAGE_KEY(dayId), JSON.stringify(financesInput));
    }, [financesInput, dayId]);

    let finances: Finances;
    let errors: string[] = [];
    let warnings: string[] = [];

    try {
        finances = computeFinances(financesInput);
        const validation = validateFinances(finances, helpersPercents);
        errors = validation.errors;
        warnings = validation.warnings;
    } catch (e: any) {
        finances = {
            id: { projectBlueprintUuid: '', userUuid: '' },
            spentBudget: 0,
            expenseAmount: 0,
            investorGave: 0,
            toysPlanned: 1,
            toysSold: 0,
            toysLeft: 0,
            calculatedBudget: 0,
            investorReturn: 0,
            itemsCost: 0,
            pricePerItem: 0,
            recommendedPrice: 0,
            soldPrice: 0,
            membersBudget: 0,
            profit: 0,
        };
        errors = [e.message];
        warnings = [];
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Financials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="number"
                    value={financesInput.spentBudget}
                    onChange={e => setFinancesInput(f => ({ ...f, spentBudget: Number(e.target.value) }))}
                    placeholder="Spent Budget"
                    className="border rounded px-2 py-1"
                />
                <input
                    type="number"
                    value={financesInput.expenseAmount}
                    onChange={e => setFinancesInput(f => ({ ...f, expenseAmount: Number(e.target.value) }))}
                    placeholder="Other Expenses"
                    className="border rounded px-2 py-1"
                />
                <input
                    type="number"
                    value={financesInput.investorGave}
                    onChange={e => setFinancesInput(f => ({ ...f, investorGave: Number(e.target.value) }))}
                    placeholder="Investor Gave"
                    className="border rounded px-2 py-1"
                />
                <input
                    type="number"
                    value={financesInput.toysPlanned}
                    onChange={e => setFinancesInput(f => ({ ...f, toysPlanned: Number(e.target.value) }))}
                    placeholder="Toys Planned"
                    className="border rounded px-2 py-1"
                />
                <input
                    type="number"
                    value={financesInput.toysSold}
                    onChange={e => setFinancesInput(f => ({ ...f, toysSold: Number(e.target.value) }))}
                    placeholder="Toys Sold"
                    className="border rounded px-2 py-1"
                />
            </div>
            <div className="mt-4">
                <label className="block font-medium">Helpers' % (comma separated):</label>
                <input
                    type="text"
                    value={helpersPercents.join(',')}
                    onChange={e => setHelpersPercents(
                        e.target.value
                            .split(',')
                            .map(s => parseFloat(s.trim()))
                            .filter(n => !isNaN(n))
                    )}
                    placeholder="e.g. 20,30"
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            {errors.length > 0 && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-2 mt-4">
                    {errors.map((err, i) => <div key={i}>{err}</div>)}
                </div>
            )}
            {warnings.length > 0 && (
                <div className="bg-yellow-100 text-yellow-700 p-2 rounded mb-2">
                    {warnings.map((warn, i) => <div key={i}>{warn}</div>)}
                </div>
            )}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>Calculated Budget: <b>{finances.calculatedBudget}</b></div>
                <div>Investor Return: <b>{finances.investorReturn}</b></div>
                <div>Items Cost: <b>{finances.itemsCost}</b></div>
                <div>Price Per Item: <b>{finances.pricePerItem}</b></div>
                <div>Recommended Price: <b>{finances.recommendedPrice}</b></div>
                <div>Sold Price: <b>{finances.soldPrice}</b></div>
                <div>Members Budget: <b>{finances.membersBudget}</b></div>
                <div>Profit: <b>{finances.profit}</b></div>
                <div>Toys Left: <b>{finances.toysLeft}</b></div>
            </div>

            <FinancesReportGenerator
                financesData={financesInput}
                dayId={dayId}
            />
        </div>
    );
}; 