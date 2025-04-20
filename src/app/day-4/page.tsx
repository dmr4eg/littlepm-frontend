'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Checkbox} from "@/components/ui/checkbox"
import React, {useState} from 'react';
import {Play} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DayFourPage = () => {
  const router = useRouter();
  const [allReady, setAllReady] = useState(false);
  const [assembleFirstToy, setAssembleFirstToy] = useState(false);
  const [testForQuality, setTestForQuality] = useState(false);

  const allChecked = allReady && assembleFirstToy && testForQuality;

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
              const isActive = day === 4;
              const isCompleted = day < 4;
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
            You planned to make &quot;10&quot; DIY toys from own items.
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="items-ready">
              <AccordionTrigger className="flex justify-between items-center">
                <div className="flex items-center">
                  <Checkbox id="all-items" checked={allReady} onCheckedChange={setAllReady}/>
                  <label htmlFor="all-items" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    All items are ready
                  </label>
                </div>
                <Button variant="ghost" size="icon">
                  <Play className="h-4 w-4"/>
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 mt-2">
                  <li>Stick - &quot;10&quot; pieces</li>
                  <li>Feathers - 5-7 pieces per 1 toy</li>
                  <li>Pompon - big size &quot;10&quot; pieces</li>
                  <li>Rope - 50 cm per 1 toy</li>
                  <li>Hot glue</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center">
            <Checkbox id="assemble-first-toy" checked={assembleFirstToy} onCheckedChange={setAssembleFirstToy}/>
            <label htmlFor="assemble-first-toy" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Assemble first toy
            </label>
          </div>

          <div className="flex items-center">
            <Checkbox id="test-for-quality" checked={testForQuality} onCheckedChange={setTestForQuality}/>
            <label htmlFor="test-for-quality" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Test it for quality
            </label>
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
              <div className="text-sm">About day 4</div>
            </video>
          </div>

          <div className="flex justify-center">
            <Link href="/day-completed?day=4">
              <Button disabled={!allChecked}>
                Complete Day 4 →
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-xs mt-4">
          Email: info@little.pm Privacy Policy Terms of Use
          <div className="flex items-center justify-center gap-4 mt-2">
            Connect with us
            <span>Y</span>
            <span>I</span>
            <span>in</span>
            <span>f</span>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default DayFourPage;
