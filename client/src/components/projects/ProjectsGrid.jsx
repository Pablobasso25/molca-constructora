import ProjectCard from './ProjectCard'

export const ProjectsGrid = ({ projects, className }) => {
  return (
    <section className={className} id="proyectos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="section-title">Nuestras Obras</h2>
          <p className="section-subtitle">
            Conocé nuestros proyectos en construcción y desarrollos inmobiliarios entregados.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsGrid
