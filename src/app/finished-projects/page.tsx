'use client';

import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {Plus} from "lucide-react";

const finishedProjects = [
  {
    id: 1,
    name: 'Completed Project 1',
    status: 'Successfully Launched',
    imageUrl: 'https://picsum.photos/id/243/300/200',
  },
  {
    id: 2,
    name: 'Completed Project 2',
    status: 'Achieved Goals',
    imageUrl: 'https://picsum.photos/id/244/300/200',
  },
  {
    id: 3,
    name: 'Completed Project 3',
    status: 'Exceeded Expectations',
    imageUrl: 'https://picsum.photos/id/245/300/200',
  },
];

export default function FinishedProjectsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-semibold mb-4">Finished Projects</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {finishedProjects.map(project => (
              <div key={project.id}>
                <ProjectCard
                  title={project.name}
                  description={project.status}
                  imageUrl={project.imageUrl}
                />
              </div>
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


