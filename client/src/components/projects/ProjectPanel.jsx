import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../ui/Reveal'

const progressSegments = 10

const statusStyles = {
  'en obra': { label: 'En obra', dot: 'bg-molca-accent', pulse: true },
  entregado: { label: 'Entregado', dot: 'bg-emerald-400', pulse: false },
  planeado: { label: 'En proyecto', dot: 'bg-molca-secondary', pulse: false },
}

const StatusTag = ({ status }) => (
  <span className="inline-flex items-center gap-2 bg-molca-dark/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
    <span className="relative flex h-2 w-2">
      {status.pulse && (
        <span className={`absolute inline-flex h-full w-full animate-ping ${status.dot} opacity-70`} />
      )}
      <span className={`relative inline-flex h-2 w-2 ${status.dot}`} />
    </span>
    {status.label}
  </span>
)

const ProgressBar = ({ percentage }) => {
  const filledSegments = Math.round((percentage / 100) * progressSegments)
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex justify-between text-[11px] uppercase tracking-widest text-white/60">
        <span>Avance de obra</span>
        <span className="font-semibold text-white">{percentage}%</span>
      </div>
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Avance de obra"
      >
        {Array.from({ length: progressSegments }, (_, segmentIndex) => (
          <span
            key={segmentIndex}
            className={`h-1 flex-1 ${segmentIndex < filledSegments ? 'bg-molca-accent' : 'bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  )
}

const SpecStrip = ({ project }) => (
  <dl className="grid grid-cols-3 gap-4 border-t border-white/25 pt-4">
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-white/55">Superficie</dt>
      <dd className="mt-0.5 font-display text-base font-semibold text-white">
        {project.superficie.toLocaleString('es-AR')} m²
      </dd>
    </div>
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-white/55">Unidades</dt>
      <dd className="mt-0.5 font-display text-base font-semibold text-white">{project.unidades}</dd>
    </div>
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-white/55">
        {project.estado === 'entregado' ? 'Entrega' : 'Plazo'}
      </dt>
      <dd className="mt-0.5 font-display text-base font-semibold text-white">{project.anio}</dd>
    </div>
  </dl>
)

export const ProjectPanel = ({ project, index, featured = false }) => {
  const status = statusStyles[project.estado] || statusStyles.planeado
  const orderNumber = String(index + 1).padStart(2, '0')
  const shape = featured ? 'aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/5]'

  return (
    <Reveal delay={featured ? 0 : (index % 3) * 0.08}>
      <Link
        to={`/proyecto/${project.id}`}
        aria-label={`Ver ${project.titulo}`}
        className={`group relative block w-full overflow-hidden bg-molca-dark ${shape}`}
      >
        <img
          src={project.imagen}
          alt={project.titulo}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-molca-dark via-molca-dark/45 to-molca-dark/5 transition-opacity duration-500 group-hover:from-molca-dark/95" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          <span className="font-display text-xl font-bold tracking-wider text-white/90">{orderNumber}</span>
          <StatusTag status={status} />
        </div>

        <div className={`absolute inset-x-0 bottom-0 p-5 sm:p-6 ${featured ? 'lg:grid lg:grid-cols-2 lg:items-end lg:gap-12 lg:p-10' : ''}`}>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-molca-accent">
              {project.tipo} · {project.ciudad}
            </span>
            <h3
              className={`mt-2 font-display font-extrabold leading-tight text-white ${
                featured ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl'
              }`}
            >
              {project.titulo}
            </h3>
            <p
              className={`mt-3 max-w-md text-sm leading-relaxed text-white/75 ${
                featured ? 'hidden sm:block' : 'line-clamp-2 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:mb-1 sm:group-hover:max-h-20 sm:group-hover:opacity-100'
              }`}
            >
              {project.descripcion}
            </p>
          </div>

          <div className="mt-5 lg:mt-0">
            {project.estado === 'en obra' && <ProgressBar percentage={project.avance} />}
            <SpecStrip project={project} />
          </div>
        </div>

        <ArrowUpRight
          aria-hidden
          size={22}
          className="absolute bottom-5 right-5 hidden text-molca-accent opacity-0 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 sm:block lg:hidden"
        />
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-1 w-0 bg-molca-accent transition-all duration-500 group-hover:w-full"
        />
      </Link>
    </Reveal>
  )
}

export default ProjectPanel
