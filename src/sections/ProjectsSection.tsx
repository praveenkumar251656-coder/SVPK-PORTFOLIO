import React, { useState } from "react";
import { projectsData, ProjectItem } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { FadeIn } from "../components/FadeIn";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      className="py-20 md:py-32 bg-[#F7F5F0] text-[#151515] border-b border-[rgba(21,21,21,0.10)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#686868] mb-3">
            <span className="text-[#4263EB] font-bold">03 //</span>
            <span>EXPERIMENTS & PROTOTYPES</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#151515]">
                SELECTED PROJECTS
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#686868] max-w-md">
              Experiments, prototypes, and ideas I'm developing into practical digital solutions. All projects are labeled with truthful implementation statuses.
            </p>
          </div>
        </FadeIn>

        {/* Stacked Project Cards */}
        <div className="relative">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projectsData.length}
              onExplore={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
