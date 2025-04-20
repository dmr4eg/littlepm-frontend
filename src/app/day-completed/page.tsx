'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import React, {useEffect} from 'react';

interface DayCompletedProps {
  searchParams: {
    day: string;
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
    default:
      nextDayPath = '/day-1';
  }

  const congratsMessage = `Yay, Day ${day} is completed, good job!`;
  const stickerImageUrl =
    'https://i.pinimg.com/originals/79/9f/9b/799f9ba5ca59f32e512c89151727204e.png';

  useEffect(() => {
    // Function to start the confetti animation
    const startConfetti = () => {
      const confettiContainer = document.getElementById('confetti-container');
      if (!confettiContainer) return;

      const confettiCount = 200;
      const confettiColors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
      ];

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor =
          confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confettiContainer.appendChild(confetti);

        // Remove confetti after animation completes
        confetti.addEventListener('animationend', () => confetti.remove());
      }
    };

    startConfetti();

    // Cleanup function to remove all confetti elements
    return () => {
      const confettiContainer = document.getElementById('confetti-container');
      if (confettiContainer) {
        while (confettiContainer.firstChild) {
          confettiContainer.removeChild(confettiContainer.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(var(--secondary))] font-sans flex flex-col">
      <Header />

      <main className="flex-grow p-8 flex flex-col items-center justify-center">
        <div
          id="confetti-container"
          className="fixed top-0 left-0 w-full h-full pointer-events-none"></div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {congratsMessage}
          </h1>
          <img
            src={stickerImageUrl}
            alt="Funny Sticker"
            className="max-w-xs mx-auto mb-6"
          />
          <Button onClick={() => router.push(nextDayPath)}>
            Proceed to the next day
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DayCompletedPage;

