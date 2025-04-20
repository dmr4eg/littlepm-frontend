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
      </main>

      <Footer/>
    </div>
  );
};

export default DaySixPage;

