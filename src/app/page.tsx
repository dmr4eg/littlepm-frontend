'use client';


import CourseCard from '@/components/CourseCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

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
    <main className="flex-grow">
        <div className="container mx-auto py-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">My Projects</h1>
            <Button onClick={() => router.push('/project-dashboard')}>Create Project</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Link href="/project-dashboard" key={project.id}>
                <CourseCard
                  title={project.name}
                  description={project.status}
                  imageUrl={project.imageUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

