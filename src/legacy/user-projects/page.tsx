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

export default function UserProjectsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10 rounded-3xl">
          <h1 className="text-2xl font-semibold mb-4">Your Projects In Progress</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Link href="/project-dashboard" key={project.id}>
                <ProjectCard
                  title={project.name}
                  description={project.status}
                  imageUrl={project.imageUrl}
                />
              </Link>
            ))}
          </div>
           <div className="flex justify-center mt-6">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


