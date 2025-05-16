import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2, Share2, Download, X } from 'lucide-react';
import Image from 'next/image';
import { computeFinances, FinancesPrimitives } from '@/lib/finances';
import type { Finances } from '@/api/api-course/models/Finances';

interface FinancesReportGeneratorProps {
    financesData: FinancesPrimitives;
    dayId: string;
}

export const FinancesReportGenerator: React.FC<FinancesReportGeneratorProps> = ({ financesData, dayId }) => {
    const [open, setOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    let finances: Finances;
    try {
        finances = computeFinances(financesData);
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
    }

    const handleGeneratePDF = async () => {
        if (!reportRef.current) return;

        try {
            setIsGenerating(true);
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`finances_report_day_${dayId}.pdf`);
        } catch (error) {
            console.error("Error generating or downloading PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadImage = async () => {
        if (!reportRef.current) return;

        try {
            setIsGenerating(true);
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
            });

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `finances_report_day_${dayId}.png`;
            link.click();
        } catch (error) {
            console.error("Error generating or downloading image:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)} className="mt-4">
                Generate Financial Report
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-[hsl(var(--secondary))]">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Financial Report
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-center">
                        Overview of your project finances
                    </DialogDescription>

                    <div ref={reportRef} className="flex flex-col gap-4 mt-4 p-6 bg-white rounded-lg">
                        <div className="flex items-center justify-center mb-4">
                            <Image
                                src="https://icons.veryicon.com/png/o/miscellaneous/3d-element-icon/cube-48.png"
                                alt="Project Financial Report"
                                width={48}
                                height={48}
                            />
                            <h2 className="text-xl font-bold ml-2">Financial Report</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-semibold">Spent Budget:</div>
                            <div>{finances.spentBudget}</div>

                            <div className="font-semibold">Expense Amount:</div>
                            <div>{finances.expenseAmount}</div>

                            <div className="font-semibold">Investor Gave:</div>
                            <div>{finances.investorGave}</div>

                            <div className="font-semibold">Toys Planned:</div>
                            <div>{finances.toysPlanned}</div>

                            <div className="font-semibold">Toys Sold:</div>
                            <div>{finances.toysSold}</div>

                            <div className="font-semibold">Toys Left:</div>
                            <div>{finances.toysLeft}</div>
                        </div>

                        <div className="border-t border-gray-200 my-2"></div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-semibold">Calculated Budget:</div>
                            <div>{finances.calculatedBudget}</div>

                            <div className="font-semibold">Investor Return:</div>
                            <div>{finances.investorReturn}</div>

                            <div className="font-semibold">Items Cost:</div>
                            <div>{finances.itemsCost}</div>

                            <div className="font-semibold">Price Per Item:</div>
                            <div>{finances.pricePerItem}</div>

                            <div className="font-semibold">Recommended Price:</div>
                            <div className="font-bold">{finances.recommendedPrice}</div>

                            <div className="font-semibold">Sold Price:</div>
                            <div>{finances.soldPrice}</div>

                            <div className="font-semibold">Members Budget:</div>
                            <div>{finances.membersBudget}</div>

                            <div className="font-semibold">Profit:</div>
                            <div className="font-bold text-green-600">{finances.profit}</div>
                        </div>

                        <div className="border-t border-gray-200 my-2"></div>

                        <div className="mt-2 text-xs text-center text-gray-500">
                            Generated on {new Date().toLocaleDateString()}
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                        <Button variant="outline" onClick={handleDownloadImage} disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                            Download PNG
                        </Button>
                        <Button variant="outline" onClick={handleGeneratePDF} disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Share2 className="mr-2 h-4 w-4" />}
                            Download PDF
                        </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}; 