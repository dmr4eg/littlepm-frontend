'use client';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';

const DIYItemsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))] font-sans flex flex-col">
      <Header />

      <main className="flex-grow p-8">
        <div className="bg-[hsl(var(--secondary))] rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn3.iconfinder.com/data/icons/education-2-58/48/107-48.png"
              alt="DIY Icon"
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
              const isActive = day === 1; // Day 1 is active
              return (
                <div key={index} className="relative z-10">
                  {isActive ? (
                    <img
                      src="https://clipart-library.com/images_k/star-clipart-transparent/star-clipart-transparent-12.png"
                      alt={`Day ${day}`}
                      className="w-12 h-12"
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

          <div className="flex items-center justify-center gap-4">
            <div>How many toys you want to sell</div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="10 Boxes" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map(boxes => (
                  <SelectItem key={boxes} value={`${boxes} Boxes`}>
                    {boxes} Boxes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              {/* Replace with appropriate icon if needed */}
              <span>▶</span>
            </Button>
          </div>

          <div>
            <div className="font-bold">List of Items you need:</div>
            <ul className="list-none pl-0">
              <li className="flex justify-between items-center py-2">
                <span>• Stick: 10 pieces</span>
                <span className="bg-background p-2 rounded-md">2.5 CZK</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span>• Feathers: 5-7 pieces per 1 toy</span>
                <span className="bg-background p-2 rounded-md">3 CZK</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span>• Pompon: big size 10 pieces</span>
                <span className="bg-background p-2 rounded-md">4 CZK</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span>• Rope: 50 cm per 1 toy</span>
                <span className="bg-background p-2 rounded-md">2 CZK</span>
              </li>
              <li className="flex justify-between items-center py-2">
                <span>• Hot glue</span>
                <span></span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Link href="/project-details">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                BACK
              </Button>
            </Link>
            <Button onClick={() => router.push('/day-completed?day=1')}>COMPLETE DAY 1 →</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DIYItemsPage;

