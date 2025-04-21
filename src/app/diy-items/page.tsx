'use client';

import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import {Input} from "@/components/ui/input";

const DIYItemsPage = () => {
  const router = useRouter();
  const [stickPrice, setStickPrice] = useState('');
  const [feathersPrice, setFeathersPrice] = useState('');
  const [pomponPrice, setPomponPrice] = useState('');
  const [ropePrice, setRopePrice] = useState('');
  const [toyCount, setToyCount] = useState(10);

  useEffect(() => {
    // Load values from local storage on component mount
    const storedStickPrice = localStorage.getItem('stickPrice');
    const storedFeathersPrice = localStorage.getItem('feathersPrice');
    const storedPomponPrice = localStorage.getItem('pomponPrice');
    const storedRopePrice = localStorage.getItem('ropePrice');
    const storedToyCount = localStorage.getItem('toyCount');

    if (storedStickPrice) setStickPrice(storedStickPrice);
    if (storedFeathersPrice) setFeathersPrice(storedFeathersPrice);
    if (storedPomponPrice) setPomponPrice(storedPomponPrice);
    if (storedRopePrice) setRopePrice(storedRopePrice);
    if (storedToyCount) setToyCount(parseInt(storedToyCount, 10) || 10);
  }, []);

  // Function to handle changes in input fields and save to local storage
  const handlePriceChange = (setter: (value: string) => void, key: string, value: string) => {
    // Validate if the input is a number
    if (!isNaN(Number(value)) || value === '') {
      setter(value);
      localStorage.setItem(key, value);
    }
  };
  const handleToyCountChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setToyCount(parsedValue);
      localStorage.setItem('toyCount', parsedValue.toString());
    }
  };

  const items = [
    {name: 'Stick', quantity: '10 pieces', price: stickPrice, setPrice: setStickPrice, localStorageKey: 'stickPrice'},
    {name: 'Feathers', quantity: '5-7 pieces per 1 toy', price: feathersPrice, setPrice: setFeathersPrice, localStorageKey: 'feathersPrice'},
    {name: 'Pompon', quantity: 'big size 10 pieces', price: pomponPrice, setPrice: setPomponPrice, localStorageKey: 'pomponPrice'},
    {name: 'Rope', quantity: '50 cm per 1 toy', price: ropePrice, setPrice: setRopePrice, localStorageKey: 'ropePrice'},
    {name: 'Hot glue', quantity: '', price: '', setPrice: () => {}, localStorageKey: ''}, // Hot glue doesn't have a price
  ];

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
            <Select onValueChange={handleToyCountChange} value={toyCount.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="10 Boxes" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map(boxes => (
                  <SelectItem key={boxes} value={`${boxes}`}>
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
              {items.map((item, index) => (
                <li className="flex justify-between items-center py-2" key={index}>
                  <span>• {item.name}: {item.quantity}</span>
                  {item.name !== 'Hot glue' ? (
                    <Input
                      type="number"
                      placeholder="0.00 CZK"
                      className="w-32 text-right"
                      value={item.price}
                      onChange={(e) => item.setPrice(e.target.value)}
                    />
                  ) : (
                    <span></span> // No input for Hot glue
                  )}
                </li>
              ))}
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
