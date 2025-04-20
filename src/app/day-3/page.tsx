'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import {ChevronLeft, Share2, X} from 'lucide-react';
import Link from 'next/link';
import React, {useState, useRef} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const DayThreePage = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false)
  const [toyCount, setToyCount] = useState('');
  const [expense, setExpense] = useState('');
  const [returnPercentage, setReturnPercentage] = useState('');
  const [amountToReturn, setAmountToReturn] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const calculateAmount = () => {
    const calculatedAmount = parseFloat(expense || '0') + (parseFloat(expense || '0') * parseFloat(returnPercentage || '0') / 100);
    setAmountToReturn(calculatedAmount.toFixed(2));
  };

  const handleShare = async () => {
    if (!reportRef.current) return;

    try {
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
      pdf.save("pitch_deck.pdf");

      setOpen(false);
      router.push('/day-3-completion');
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
      // Optionally, display an error message to the user.
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))] font-sans flex flex-col">
      <Header />

      <main className="flex-grow p-8">
        <div className="bg-[hsl(var(--secondary))] rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/3d-element-icon/cube-48.png"
              alt="Cat Toy"
              className="h-6 w-6"
            />
            <div className="text-xl">You are doing a &quot;Cat Toy&quot; project with the DIY</div>
          </div>

          <div className="flex justify-center relative">
            {/* Timeline */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border z-0" />
            {/* Stars */}
            {Array.from({length: 7}).map((_, index) => {
              const day = index + 1;
              const isActive = day === 3; // Day 3 is active
              const isCompleted = day < 3;
              return (
                <div key={index} className="relative z-10">
                  {isActive ? (
                    <img
                      src="https://clipart-library.com/images_k/star-clipart-transparent/star-clipart-transparent-12.png"
                      alt={`Day ${day}`}
                      className="w-12 h-12"
                    />
                  ) : isCompleted ? (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                      alt={`Day ${day}`}
                      className="w-8 h-8 opacity-100"
                    />
                  ) : (
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/009/734/993/original/cute-star-clipart-design-free-png.png"
                      alt={`Day ${day}`}
                      className="w-12 h-12 opacity-50"
                    />
                  )}
                  <div className="text-center text-sm">Day {day}</div>
                </div>
              );
            })}
          </div>

          <div className="text-center">What other items you might need.</div>

          <div>
            <div className="font-bold"></div>
            <ul className="list-none pl-0">
              <li className="flex justify-between items-center py-2">
                <span>1. Predefined role</span>
                <input type="text" placeholder="Enter product name" className="border rounded p-1" />
                <input type="text" placeholder="Enter link" className="border rounded p-1" />
              </li>
              <li className="flex justify-between items-center py-2">
                <span>2. Predefined role</span>
                <input type="text" placeholder="Enter product name" className="border rounded p-1" />
                <input type="text" placeholder="Enter link" className="border rounded p-1" />
              </li>
              <li className="flex justify-between items-center py-2">
                <span>3. Predefined role</span>
                <input type="text" placeholder="Enter product name" className="border rounded p-1" />
                <input type="text" placeholder="Enter link" className="border rounded p-1" />
              </li>
              <li className="flex justify-between items-center py-2">
                <span>4. Predefined role</span>
                <input type="text" placeholder="Enter product name" className="border rounded p-1" />
                <input type="text" placeholder="Enter link" className="border rounded p-1" />
              </li>
              <li className="flex justify-between items-center py-2">
                <span>5. Predefined role</span>
                 <input type="text" placeholder="Enter product name" className="border rounded p-1" />
                <input type="text" placeholder="Enter link" className="border rounded p-1" />
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-4">
            <video
              controls
              className="w-full rounded-md"
              style={{height: '200px'}}>
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              <div className="text-sm">About day 3</div>
            </video>
          </div>

          <div className="flex justify-between">
            <Link href="/day-2">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                BACK
              </Button>
            </Link>
            <Button onClick={() => setOpen(true)}>GENERATE PITCH DECK</Button>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-center">
              Pitch Deck
              <br />
              Cat Toy Project
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
            Dear investor,
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </DialogDescription>

          <div ref={reportRef} className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between items-center">
              <label>Number of planned toys to sell</label>
              <input
                type="number"
                placeholder="eg. 10"
                className="border rounded p-1 w-32 text-right"
                value={toyCount}
                onChange={(e) => setToyCount(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label>Expense</label>
              <input
                type="number"
                placeholder="00.00 CZK"
                className="border rounded p-1 w-32 text-right"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <label>Return(%)</label>
              <input
                type="number"
                placeholder="00.00 CZK"
                className="border rounded p-1 w-32 text-right"
                value={returnPercentage}
                onChange={(e) => setReturnPercentage(e.target.value)}
                onBlur={calculateAmount}
              />
            </div>
            <div className="flex justify-between items-center">
              <label>Amount to return to investor</label>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Expense"
                  className="border rounded p-1 w-32 text-right"
                  value={amountToReturn}
                  readOnly
                />
                <span className="mx-2">+</span>
                <span className="bg-secondary p-1 rounded">Calculated Amount</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            Robin Razska
            <br />
            Founder of the &quot;Cat Toy&quot; Business
            <br />
            28 March, 2025
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
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

export default DayThreePage;

