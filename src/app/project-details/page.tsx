'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';

const ProjectDetailsPage = () => {
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

          <div className="text-xl">"Cat Toy" in 7 days</div>

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

          <div className="flex gap-8">
            <div className="flex flex-col gap-4 w-1/2">
              <Button
                className="rounded-3xl text-2xl h-24 bg-background text-primary"
                onClick={() => router.push('/buy-ready-sets')}>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/3d-element-icon/cube-48.png"
                  alt="Buy Ready Sets"
                  className="mr-4"
                />
                BUY READY SETS
              </Button>
              <div className="text-center">OR</div>
              <Button
                className="rounded-3xl text-2xl h-24 bg-background text-primary"
                onClick={() => router.push('/diy-items')}>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/education-2-58/48/107-48.png"
                  alt="DIY from Own Items"
                  className="mr-4"
                />
                DIY FROM OWN ITEMS
              </Button>
            </div>

            <div className="w-1/2">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailsPage;

    