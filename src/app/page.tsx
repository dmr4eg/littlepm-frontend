
import CourseCard from '@/components/CourseCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

const courses = [
  {
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first application.',
    imageUrl: 'https://picsum.photos/id/237/300/200',
  },
  {
    title: 'Advanced Node.js',
    description: 'Master advanced Node.js concepts and build scalable server-side applications.',
    imageUrl: 'https://picsum.photos/id/238/300/200',
  },
  {
    title: 'Python for Data Science',
    description: 'Explore data science with Python, covering data analysis, machine learning, and visualization.',
    imageUrl: 'https://picsum.photos/id/239/300/200',
  },
  {
    title: 'Web Development with Angular',
    description: 'Build modern web applications using Angular framework.',
    imageUrl: 'https://picsum.photos/id/240/300/200',
  },
  {
    title: 'Mobile App Development with Flutter',
    description: 'Create cross-platform mobile apps using Flutter framework.',
    imageUrl: 'https://picsum.photos/id/241/300/200',
  },
  {
    title: 'Data Structures and Algorithms',
    description: 'Learn fundamental data structures and algorithms to solve complex problems efficiently.',
    imageUrl: 'https://picsum.photos/id/242/300/200',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow">
        <Hero />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
