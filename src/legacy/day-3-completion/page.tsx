'use client';

import {Button} from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {useRouter} from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import {CheckCircle} from 'lucide-react';
import Link from 'next/link';

const DayThreeCompletionPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FAF0E6] font-sans flex flex-col">
      <Header />

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
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border z-0" />
            {/* Stars */}
            {Array.from({length: 7}).map((_, index) => {
              const day = index + 1;
              const isCompleted = day <= 3;
              const isActive = day === 3;
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
                  ) : (
                    <Image
                      src="https://static.vecteezy.com/system/resources/previews/009/734/993/original/cute-star-clipart-design-free-png.png"
                      alt={`Day ${day}`}
                      width={48}
                      height={48}
                      className="opacity-50"
                    />
                  )}
                  <div className="text-center text-sm">Day {day}</div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            How much money investor gave you
            <input
              type="number"
              placeholder="1200 CZK"
              className="border rounded p-1 w-32 text-right"
            />
          </div>
          <div className="text-center">
            Congratulations!
            <Image
              src="https://i.pinimg.com/originals/79/9f/9b/799f9ba5ca59f32e512c89151727204e.png"
              alt="Congratulations"
              width={100}
              height={100}
            />

            <div>Investor gave you the money, now you can buy all items to make toys.</div>

          </div>

          <div className="flex justify-center">
            <Link href="/day-4">
              <Button variant="outline">Complete Day 3 →</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DayThreeCompletionPage;

