'use client';

import CourseCard from '@/components/CourseCard';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const UserProjectsPage = () => {
  const router = useRouter();

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Projects</h1>
        <Button onClick={() => router.push('/create-project')}>Create Project</Button>
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
  );
};

export default UserProjectsPage;
