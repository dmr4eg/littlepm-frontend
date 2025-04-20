
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, imageUrl }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={imageUrl}
          alt={title}
          className="rounded-md mb-4"
          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        />
      </CardContent>
    </Card>
  );
};

export default CourseCard;
