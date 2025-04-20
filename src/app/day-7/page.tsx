'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import {CheckCircle} from 'lucide-react';
import Link from 'next/link';
import {Checkbox} from "@/components/ui/checkbox";

const DaySevenPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF0E6] font-sans flex flex-col">
      <Header/>

      <main className="flex-grow p-8">
        <div className="bg-[#FAF0E6] rounded-3xl p-8 flex flex-col gap-6">
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
            <label>Recommended minimum number of toys and cost to sell</label>
            <input
              type="number"
              placeholder="Calculated"
              className="border rounded p-1 w-32 text-right"
              readOnly
            />
          </div>

          <div>
            <div className="font-bold">Log here details of the sold toys</div>
            <ul className="list-none pl-0">
              {Array.from({length: 12}).map((_, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Checkbox id={`toy-${index}`} />
                    <label htmlFor={`toy-${index}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Enter Sold Price (CZK)
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="00.00 CZK"
                    className="border rounded p-1 w-32 text-right"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">
              View sales report
            </Button>
            <Button onClick={() => router.push('/')}>
              Finish Selling
            </Button>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default DaySevenPage;
