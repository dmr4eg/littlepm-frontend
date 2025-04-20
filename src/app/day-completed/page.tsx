'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import React, {useEffect} from 'react';
import {CheckCircle} from 'lucide-react';
import Image from 'next/image';

interface DayCompletedProps {
  searchParams: {
    day?: string;
  };
}

const DayCompletedPage: React.FC<DayCompletedProps> = ({searchParams}) => {
  const router = useRouter();
  const {day = '1'} = searchParams; // Default to day 1

  const nextDay = parseInt(day, 10) + 1;
  let nextDayPath = '';

  switch (nextDay) {
    case 2:
      nextDayPath = '/day-2';
      break;
    case 3:
      nextDayPath = '/day-3';
      break;
    case 4:
      nextDayPath = '/day-3-completion';
      break;
    case 5:
      nextDayPath = '/day-5';
      break;
    case 6:
      nextDayPath = '/day-6';
      break;
    default:
      nextDayPath = '/day-1';
  }

  const congratsMessage = `Yay, Day ${day} is completed, good job!`;
  const stickerImageUrl =
    'https://i.pinimg.com/originals/79/9f/9b/799f9ba5ca59f32e512c89151727204e.png';

  useEffect(() => {
    const createConfetti = () => {
      const confettiCount = 200;
      const colors = [
        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
        '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
        '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
        '#ff5722', '#795548', '#9e9e9e', '#607d8b'
      ];

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confetti.style.top = '-10px';
        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => confetti.remove());
      }
    };

    createConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF0E6] font-sans flex flex-col">
      <Header/>

      <main className="flex-grow p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {congratsMessage}
          </h1>
          <Image
            src={stickerImageUrl}
            alt="Funny Sticker"
            width={100}
            height={100}
            className="max-w-xs mx-auto mb-6"
          />
          <Button onClick={() => router.push(nextDayPath)}>
            Proceed to the next day
          </Button>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default DayCompletedPage;

