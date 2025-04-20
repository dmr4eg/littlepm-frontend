'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import React, {useState, useRef, useEffect} from 'react';
import {Input} from "@/components/ui/input";
import {Loader2, Share2, X} from "lucide-react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {CheckCircle} from 'lucide-react';
import Link from 'next/link';

const DaySixPage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [open, setOpen] = React.useState(false)
  const reportRef = useRef<HTMLDivElement>(null);

  const [recommendedPrice, setRecommendedPrice] = useState('');
  const [sellingPlace, setSellingPlace] = useState('');
  const [sellingDate, setSellingDate] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  useEffect(() => {
    // Ensure window is defined before using it
    if (typeof window !== 'undefined') {
      // Check if there's a stored image URL in localStorage
      const storedImage = localStorage.getItem('uploadedImage');
      if (storedImage) {
        setSelectedImage(storedImage);
      }
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
        setIsUploading(false);
        // Store the image URL in localStorage
        localStorage.setItem('uploadedImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    if (!reportRef.current) return;

    try {
      setIsGenerating(true);
      const canvas = await html2canvas(reportRef.current, {
          scale: 2, // Increase resolution
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps= pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Download the PDF
      pdf.save("promotional_material.pdf");
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
      // Optionally, display an error message to the user.
    } finally {
      setIsGenerating(false);
      setOpen(false);
       router.push('/day-7');
    }
  };

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
              const isCompleted = day &lt; 6;
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
                <Input
                  type="text"
                  placeholder="Enter Price"
                  value={recommendedPrice}
                  onChange={(e) => setRecommendedPrice(e.target.value)}
                />
              </div>

              <div>
                Where do you plan to sell?
                <Input
                  type="text"
                  placeholder="Write address"
                  value={sellingPlace}
                  onChange={(e) => setSellingPlace(e.target.value)}
                />
              </div>

              <div>
                When do you plan to sell?
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={sellingDate}
                  onChange={(e) => setSellingDate(e.target.value)}
                />
              </div>

              <div>
                How to contact you?
                <Input
                  type="text"
                  placeholder="Contact number or email"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
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
            <Button onClick={() => setOpen(true)}>Proceed →</Button>
          </div>
        </div>
      </main>

      <Footer/>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-[hsl(var(--secondary))]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Promotional Materials
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
             {/* Description */}
          </DialogDescription>

          <div ref={reportRef} className="flex flex-col gap-4 mt-4 items-center">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Uploaded Toy"
                width={200}
                height={200}
                className="rounded-md"
              />
            )}
            <div className="text-center">
              The cost is only &quot;{recommendedPrice}&quot; CZK
              <br />
              Come to &quot;{sellingPlace}&quot;, Prague, on &quot;{sellingDate}&quot;
              <br />
              For any questions, contact: &quot;{contactInfo}&quot;
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={handleShare} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Share2 className="mr-2 h-4 w-4" />}
              Share
            </Button>
          </div>
          <div className="absolute top-4 right-4">
             <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-4 w-4"/>
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DaySixPage;
