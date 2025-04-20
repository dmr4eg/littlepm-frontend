'use client';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import {ChevronLeft, Play} from 'lucide-react';
import Link from 'next/link';

const BuyReadySetsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))] font-sans flex flex-col">
      <Header />

      <main className="flex-grow p-8">
        <div className="bg-[hsl(var(--secondary))] rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Little Project Manager</h1>
            <Button variant="outline">LOGOUT</Button>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/3d-element-icon/cube-48.png"
              alt="Cat Toy"
              className="h-6 w-6"
            />
            <div className="text-xl">You are doing a &quot;Cat Toy&quot; project from the ready sets</div>
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
            <div>I want to buy</div>
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
              <Play className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center">Note: to assemble the cat toy you need a hot glue.</div>

          <div className="flex justify-between">
            <Link href="/project-details">
              <Button variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" />
                BACK
              </Button>
            </Link>
            <Button>NEXT →</Button>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-xs mt-4">
          Email: info@little.pm Privacy Policy Terms of Use
          <div className="flex items-center justify-center gap-4 mt-2">
            Connect with us
            {/* Replace with actual social media icons and links */}
            <span>Y</span>
            <span>I</span>
            <span>in</span>
            <span>f</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyReadySetsPage;
