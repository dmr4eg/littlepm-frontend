'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import React, {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import {CheckCircle} from 'lucide-react';
import Link from 'next/link';
import {Checkbox} from "@/components/ui/checkbox";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {X} from "lucide-react";
import {Share2, Download} from "lucide-react";

const DaySevenPage = () => {
  const router = useRouter();
  const [soldPrices, setSoldPrices] = useState<{[key: string]: string}>({});
  const [checkboxStates, setCheckboxStates] = useState<{[key: string]: boolean}>({});
  const [open, setOpen] = React.useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // State variables for sales report data
  const [investorAmount, setInvestorAmount] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [totalSpent, setTotalSpent] = useState('');
  const [toysPrepared, setToysPrepared] = useState('');
  const [toysSold, setToysSold] = useState('');
  const [toysLeft, setToysLeft] = useState('');
  const [profitBeforeSharing, setProfitBeforeSharing] = useState('0.00');
  const [helperAmounts, setHelperAmounts] = useState(['0.00', '0.00', '0.00', '0.00', '0.00']);

  useEffect(() => {
    // Load data from local storage on component mount
    const storedSoldPrices = localStorage.getItem('soldPrices');
    const storedCheckboxStates = localStorage.getItem('checkboxStates');
    const investorMoney = localStorage.getItem('investorMoney');

    if (storedSoldPrices) {
      setSoldPrices(JSON.parse(storedSoldPrices));
    }
    if (storedCheckboxStates) {
      setCheckboxStates(JSON.parse(storedCheckboxStates));
    }
    if (investorMoney){
        setInvestorAmount(investorMoney);
    }
  }, []);

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem('soldPrices', JSON.stringify(soldPrices));
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
  }, [soldPrices, checkboxStates]);

  const handlePriceChange = (index: number, value: string) => {
    setSoldPrices(prev => ({
      ...prev,
      [`toy-${index}`]: value,
    }));
  };

  const handleCheckboxChange = (index: number) => {
    setCheckboxStates(prev => ({
      ...prev,
      [`toy-${index}`]: !prev[`toy-${index}`],
    }));
  };

  const calculateSalesReport = () => {
      let totalSold = 0;
      Object.keys(soldPrices).forEach(key => {
          if (checkboxStates[key]) {
              totalSold += parseFloat(soldPrices[key] || '0');
          }
      });
      setToysSold(totalSold.toFixed(2));

      // Calculate total spent (assuming a fixed expense per toy)
      const expensePerToy = 10; // Example expense, adjust as needed
      const totalExpense = expensePerToy * 12; //total expense for 12 planned toys
      setTotalSpent(totalExpense.toFixed(2));

      //Calculate toysPrepared =12

      const toyCount=12;
      setToysPrepared(toyCount.toString());

      const toysL=toyCount- Object.keys(soldPrices).length;
      setToysLeft(toysL.toString());

      // Example calculation for profit before sharing
      const profit = totalSold - totalExpense;
      setProfitBeforeSharing(profit.toFixed(2));

      // You'll need to fetch the investorAmount from wherever it's stored

      const toysLeftNum= parseInt(toysLeft);

      const returnAmountCalc = totalExpense - (toysLeftNum > 0 ? (toysLeftNum*expensePerToy) : 0);

      setReturnAmount(returnAmountCalc.toString());
  };

  const handleDownload = async () => {
        if (!reportRef.current) return;

        try {
          // Dynamically import html2canvas and jsPDF
          const html2canvas = (await import('html2canvas')).default;
          const { jsPDF } = await import('jspdf');

          const canvas = await html2canvas(reportRef.current, {
              scale: 2, // Increase resolution
          });

          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps= pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

          // Download the PDF
          pdf.save("sales_report.pdf");
        } catch (error) {
          console.error("Error generating or downloading PDF:", error);
          // Optionally, display an error message to the user.
        } finally {
          setOpen(false);
        }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))] font-sans flex flex-col">
      <Header/>

      <main className="flex-grow p-8">
        <div className="bg-[hsl(var(--secondary))] rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="https://icons.veryicon.com/png/o/miscellaneous/3d-element-icon/cube-48.png"
              alt="Cat Toy"
              width={24}
              height={24}
            />
            <div className="text-xl">You are doing a &quot;Cat Toy&quot; project with the DIY</div>
          </div>

          <div className="flex justify-center relative">
            {/* Timeline */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border z-0"/>
            {/* Stars */}
            {Array.from({length: 7}).map((_, index) => {
              const day = index + 1;
              const isCompleted = day <= 6;
              const isActive = day === 7;
              return (
                <div key={index} className="relative z-10">
                  {isCompleted ? (
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                      alt={`Day ${day}`}
                      width={32}
                      height={32}
                      className="opacity-100"
                    />
                  ) : isActive ? (
                    <Image
                      src="https://clipart-library.com/images_k/star-clipart-transparent/star-clipart-transparent-12.png"
                      alt={`Day ${day}`}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  ) : (
                    <Image
                      src="https://static.vecteezy.com/system/resources/previews/009/734/993/original/cute-star-clipart-design-free-png.png"
                      alt={`Day ${day}`}
                      width={48}
                      height={48}
                      className="w-12 h-12 opacity-50"
                    />
                  )}
                  <div className="text-center text-sm">Day {day}</div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            It is time to sell!
          </div>

          <div className="flex justify-between items-center">
            <label>Amount of money given by investor</label>
            <input
              type="number"
              placeholder="Calculated"
              className="border rounded p-1 w-32 text-right"
              readOnly
              value={investorAmount}
            />
          </div>

          <div>
            <div className="font-bold">Log here details of the sold toys</div>
            <ul className="list-none pl-0">
              {Array.from({length: 12}).map((_, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Checkbox
                      id={`toy-${index}`}
                      checked={checkboxStates[`toy-${index}`] || false}
                      onCheckedChange={() => handleCheckboxChange(index)}
                      disabled={checkboxStates[`toy-${index}`] || false}
                    />
                    <label htmlFor={`toy-${index}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Enter Sold Price (CZK)
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="00.00 CZK"
                    className="border rounded p-1 w-32 text-right"
                    value={soldPrices[`toy-${index}`] || ''}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    disabled={!checkboxStates[`toy-${index}`]}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => {
                calculateSalesReport();
                setOpen(true);
            }}>
              View sales report
            </Button>
            <Button onClick={() => router.push('/')}>
              Finish Selling
            </Button>
          </div>
        </div>
      </main>

      <Footer/>
       <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-[hsl(var(--secondary))]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Sales Report (P&L)
                <br />
                Cat Toy Project
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center">
               {/* Description */}
            </DialogDescription>

            <div ref={reportRef} className="flex flex-col gap-4 mt-4 items-center">
              <div className="flex justify-between items-center">
                  <label>Amount of money given by investor</label>
                  <input
                    type="text"
                    placeholder="Prefilled from DB"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={investorAmount}
                  />
              </div>
              <div className="flex justify-between items-center">
                  <label>How much you want to give back to investor</label>
                  <input
                    type="text"
                    placeholder="Prefilled from DB"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={returnAmount}
                  />
              </div>
              <div className="flex justify-between items-center">
                  <label>Spent in total</label>
                  <input
                    type="text"
                    placeholder="Prefilled from DB"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={totalSpent}
                  />
              </div>
              <div className="flex justify-between items-center">
                  <label>Number of toys prepared</label>
                  <input
                    type="text"
                    placeholder="Prefilled from DB"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={toysPrepared}
                  />
              </div>
              <div className="flex justify-between items-center">
                  <label>Number of sold toys</label>
                  <input
                    type="text"
                    placeholder="Prefilled from DB"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={toysSold}
                  />
              </div>
              <div className="flex justify-between items-center">
                  <label>Number of toys left</label>
                  <input
                    type="text"
                    placeholder="Prefilled from DB"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={toysLeft}
                  />
              </div>

              <div className="flex justify-between items-center">
                  <label>Profit before sharing with helpers</label>
                  <input
                    type="text"
                    placeholder="00.00 CZK"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={profitBeforeSharing}
                  />
              </div>

              <div className="flex flex-col gap-2">
                  {helperAmounts.map((amount, index) => (
                      <div className="flex justify-between items-center" key={index}>
                          <label>Helper #{index + 1}</label>
                          <input
                            type="text"
                            placeholder="00.00 CZK"
                            className="border rounded p-1 w-32 text-right"
                            readOnly
                            value={amount}
                          />
                      </div>
                  ))}
              </div>

              <div className="flex justify-between items-center">
                  <label>How much money you made</label>
                  <input
                    type="text"
                    placeholder="00.00 CZK"
                    className="border rounded p-1 w-32 text-right"
                    readOnly
                    value={profitBeforeSharing}
                  />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="absolute top-4 right-4">
               <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4"/>
                </Button>
              </div>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default DaySevenPage;
