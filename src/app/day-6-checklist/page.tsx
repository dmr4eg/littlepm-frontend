'use client';

import {Button} from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import React, {useState} from 'react';
import {Checkbox} from "@/components/ui/checkbox";
import Link from 'next/link';

const DaySixChecklistPage = () => {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState('');
  const [potentialBuyers, setPotentialBuyers] = useState('');
  const [promotionalMaterialsCreated, setPromotionalMaterialsCreated] = useState(false);
  const [materialsDistributed, setMaterialsDistributed] = useState(false);

  const allChecked = promotionalMaterialsCreated && materialsDistributed;

  return (
    <div className="min-h-screen bg-[#FAF0E6] font-sans flex flex-col">
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
              const isActive = day === 6;
              const isCompleted = day < 6;
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
            Who can help you to recommend your toy to buy?
            <input
              type="text"
              placeholder="Type here"
              className="border rounded p-1 w-full"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type here"
              className="border rounded p-1 w-full mt-2"
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
            />
          </div>

          <div>
            Who do you think would want to buy these toys?
            <input
              type="text"
              placeholder="Type here"
              className="border rounded p-1 w-full"
              value={potentialBuyers}
              onChange={(e) => setPotentialBuyers(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type here"
              className="border rounded p-1 w-full mt-2"
              value={potentialBuyers}
              onChange={(e) => setPotentialBuyers(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Checkbox
                id="promotional-materials-created"
                checked={promotionalMaterialsCreated}
                onCheckedChange={setPromotionalMaterialsCreated}
              />
              <label
                htmlFor="promotional-materials-created"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Promotional materials created
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="materials-distributed"
                checked={materialsDistributed}
                onCheckedChange={setMaterialsDistributed}
              />
              <label
                htmlFor="materials-distributed"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Promotional materials have been distributed to recommenders and potential buyers
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/day-7">
              <Button disabled={!allChecked}>
                Complete Day 6 →
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default DaySixChecklistPage;
