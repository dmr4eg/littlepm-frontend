'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import Link from 'next/link';
import {Loader2} from "lucide-react";

const DaySixPage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF0E6] font-sans flex flex-col">
      <Header/>

      <main className="flex-grow p-8">
        <div className="bg-[#FAF0E6] rounded-3xl p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Little Project Manager</h1>
            <Button variant="outline">LOGOUT</Button>
          </div>

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
                  {isCompleted ? (
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Check_green_icon.svg/1200px-Check_green_icon.svg.png"
                      alt={`Day ${day}`}
                      width={32}
                      height={32}
                      className="opacity-100"
                    />
                  ) : isActive ? (
                    <Image
                      src="https://clipart-library.com/images_k/star-clipart-transparent/star-clipart-transparent-12.png"
                      alt={`Day ${day}`}
                      width={48}
                      height={48}
                      className="w-12 h-12"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                Upload the photo of the ready toy
                <label htmlFor="imageUpload" className="cursor-pointer flex items-center">
                  <Button variant="outline" component="span">
                    UPLOAD
                    <input
                      id="imageUpload"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </Button>
                  {isUploading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                </label>
                {selectedImage && (
                  <div className="mt-2">
                    <Image
                      src={selectedImage}
                      alt="Uploaded Toy"
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>

              <div>
                Recommended price
                <Input type="text" placeholder="Enter Name"/>
              </div>

              <div>
                Where do you plan to sell?
                <Input type="text" placeholder="Write address"/>
              </div>

              <div>
                When do you plan to sell?
                <Input type="text" placeholder="DD/MM/YYYY"/>
              </div>

              <div>
                How to contact you?
                <Input type="text" placeholder="Contact number or email"/>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <video
                controls
                className="w-full rounded-md"
                style={{height: '200px'}}>
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
                <div className="text-sm">About day 6</div>
              </video>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/day-7">
              <Button>Proceed →</Button>
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

export default DaySixPage;
