'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {ChevronLeft, Play} from 'lucide-react';
import Link from 'next/link';
import React, {useState, useRef} from 'react';

const DayFivePage = () => {
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
              const isActive = day === 5;
              const isCompleted = day < 5;
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

          <div>
            Try to improve making toy and make it faster
          </div>

          <div>
            What went well
            <input
              type="text"
              placeholder="Type here"
              className="border rounded p-1 w-full"
            />
          </div>

          <div>
            What can be improved?
            <input
              type="text"
              placeholder="Type here"
              className="border rounded p-1 w-full"
            />
          </div>

          <div className="flex items-center justify-start gap-4">
            <div>Number of ready toys</div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="09"/>
              </SelectTrigger>
              <SelectContent>
                {[...Array(51).keys()].map(number => (
                  <SelectItem key={number} value={String(number).padStart(2, '0')}>
                    {String(number).padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <div className="text-sm">About day 5</div>
            </video>
          </div>

          <div className="flex justify-end">
            <Link href="/day-5-checklist">
              <Button>Proceed →</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default DayFivePage;

