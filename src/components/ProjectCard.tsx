
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl }) => {
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

export default ProjectCard;
