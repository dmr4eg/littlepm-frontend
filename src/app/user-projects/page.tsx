'use client';

import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useRouter} from 'next/navigation';

const UserProjectsPage = () => {
  const router = useRouter();

  const projects = [
    {
      id: 1,
      name: 'Project A',
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'Project B',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Project C',
      status: 'Pending',
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Projects</h1>
        <Button onClick={() => router.push('/create-project')}>Create Project</Button>
      </div>

      <Table>
        <TableCaption>A list of your projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(project => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserProjectsPage;
