import { Reveal } from '../ui/Reveal'
import CoverflowCarousel from './CoverflowCarousel'

export const TerminadosSection = ({ projects, className }) => {
  return (
    <section className={className} id="terminados">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="section-title">Proyectos Terminados</h2>
            <p className="section-subtitle !mb-0">
              Obras entregadas que ya forman parte de la ciudad.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <CoverflowCarousel projects={projects} />
        </Reveal>
      </div>
    </section>
  )
}

export default TerminadosSection
