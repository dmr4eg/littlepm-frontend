'use client';


import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Plus} from "lucide-react";

const projects = [
  {
    id: 1,
    name: 'Cat Toy Business',
    status: 'In Progress',
    imageUrl: 'https://picsum.photos/id/237/300/200',
  },
  {
    id: 2,
    name: 'Another Project',
    status: 'Completed',
    imageUrl: 'https://picsum.photos/id/238/300/200',
  },
  {
    id: 3,
    name: 'Yet Another Project',
    status: 'Pending',
    imageUrl: 'https://picsum.photos/id/239/300/200',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow p-8 border-l border-r border-gray-200">
        <div className="container mx-auto py-10 rounded-3xl">
          <h1 className="text-2xl font-semibold mb-4">Welcome, Chris!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <Link href="/finished-projects" key="finished-projects">
              <ProjectCard
                title="Your Finished Project Results"
                description=""
                imageUrl="https://picsum.photos/id/242/300/200" // Replace with a relevant image
              />
            </Link>
              <Link href="/user-projects" key="user-projects">
                <ProjectCard
                  title="Your Projects In Progress"
                  description=""
                  imageUrl="https://picsum.photos/id/237/300/200"
                />
              </Link>
             <Link href="/project-blueprints" key="create-project">
              <ProjectCard
                title="Start new business project"
                description=""
                imageUrl="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E"
              />
            </Link>

            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

