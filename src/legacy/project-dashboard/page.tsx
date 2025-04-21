'use client';

import {Button} from '@/components/ui/button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';

const ProjectDashboard = () => {
  const router = useRouter();

  const handleStartNowClick = () => {
    router.push('/project-details');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow p-6 rounded-md">
        <section className="bg-secondary p-8 rounded-md shadow-md">
          <p className="text-lg mb-6">
            You are doing a project of launching a &quot;Cat Toy&quot; business in
            7 days
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-primary">
                Welcome Video
              </h3>
              <p className="text-md mb-6">
                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.&quot;
              </p>
              <Button variant="outline" className="rounded-full" onClick={handleStartNowClick}>
                Start Now
              </Button>
            </div>
            <div>
              <video
                controls
                className="w-full rounded-md"
                style={{height: '200px'}}>
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDashboard;

