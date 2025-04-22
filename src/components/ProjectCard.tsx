import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500">
          Status: {project.status}
          {project.currentDay && ` | Day ${project.currentDay} of ${project.days.length}`}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
