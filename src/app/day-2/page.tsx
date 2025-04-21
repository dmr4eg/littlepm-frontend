'use client';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import {ChevronLeft, Play} from 'lucide-react';
import Link from 'next/link';
import {Checkbox} from '@/components/ui/checkbox';
import Image from 'next/image';
import React from 'react';

const DayTwoPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))] font-sans flex flex-col">
      <Header />

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
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border z-0" />
            {/* Stars */}
            {Array.from({length: 7}).map((_, index) => {
              const day = index + 1;
              const isActive = day === 2; // Day 2 is active
              const isCompleted = day < 2;
              return (
                <div key={index} className="relative z-10">
                  {isActive ? (
                    <Image
                      src="https://clipart-library.com/images_k/star-clipart-transparent/star-clipart-transparent-12.png"
                      alt={`Day ${day}`}
                      width={48}
                      height={48}
                      className="w-12 h-12"
                    />
                  ) : isCompleted ? (
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
                      className="w-12 h-12 opacity-50"
                    />
                  )}
                  <div className="text-center text-sm">Day {day}</div>
                </div>
              );
            })}
          </div>

          <div className="text-center">You might want to hire helpers or do all yourself.</div>

          <div className="flex items-center justify-center gap-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tick if you want to share profit equally with your helpers or select their % from the profit below.
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul className="list-none pl-0">
                {Array.from({length: 5}).map((_, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span>{index + 1}. Predefined role</span>
                    <input type="text" placeholder="Enter Name" className="border rounded p-1" />
                    <Select>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="10%" />
                      </SelectTrigger>
                      <SelectContent>
                        {[10, 15, 20, 25, 30].map(percentage => (
                          <SelectItem key={percentage} value={`${percentage}%`}>
                            {percentage}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </li>
                ))}
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
                <div className="text-sm">About day 1</div>
              </video>
            </div>
          </div>

          <div className="flex justify-between">
            <Link href="/diy-items">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                BACK
              </Button>
            </Link>
            <Button onClick={() => router.push('/day-completed?day=2')}>COMPLETE DAY 2 →</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DayTwoPage;
