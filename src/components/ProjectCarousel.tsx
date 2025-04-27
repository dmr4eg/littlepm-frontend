import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectCard from '@/components/ProjectCard';
import type { ProjectDTO } from '@/api-course';

interface ProjectCarouselProps {
    title: string;
    projects: ProjectDTO[];
    onProjectClick?: (projectId: string) => void;
    className?: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
    title,
    projects,
    onProjectClick,
    className
}) => {
    return (
        <div className={`space-y-4 ${className || ''}`}>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <ScrollArea className="w-full">
                <div className="flex gap-4 pb-4">
                    {projects.map(project => (
                        <div
                            key={project.instance.id.projectBlueprintUuid}
                            className="w-[300px] flex-shrink-0 cursor-pointer"
                            onClick={() => onProjectClick?.(project.instance.id.projectBlueprintUuid)}
                        >
                            <ProjectCard
                                title={project.blueprint.title}
                                description={project.blueprint.description || ''}
                                imageUrl={project.blueprint.posterUrl || ''}
                            />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ProjectCarousel;
