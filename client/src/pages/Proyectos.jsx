import { useMemo, useState } from 'react'
import { Reveal } from '../components/ui/Reveal'
import ProjectPanel from '../components/projects/ProjectPanel'

// TODO: reemplazar por los proyectos traídos de la API / Cloudinary
const mockProyectos = [
  {
    id: 1,
    titulo: 'GPS - Edificio Comercial',
    tipo: 'Comercial',
    ciudad: 'Salta',
    estado: 'en obra',
    avance: 70,
    superficie: 6400,
    unidades: 24,
    anio: 2026,
    descripcion: 'Edificio de alta gama en zona céntrica, con locales comerciales en planta baja y oficinas en altura.',
    imagen: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    titulo: 'GS01',
    tipo: 'Industrial',
    ciudad: 'Salta',
    estado: 'en obra',
    avance: 40,
    superficie: 12000,
    unidades: 6,
    anio: 2027,
    descripcion: 'Nave industrial de última generación para logística y almacenamiento, con playa de maniobras.',
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    titulo: 'Dúplex Ventus',
    tipo: 'Vivienda',
    ciudad: 'Salta',
    estado: 'en obra',
    avance: 85,
    superficie: 1800,
    unidades: 12,
    anio: 2026,
    descripcion: 'Dúplex modernos de 2 ambientes con terraza propia y cochera cubierta.',
    imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    titulo: 'Casas del Río',
    tipo: 'Vivienda',
    ciudad: 'Salta',
    estado: 'entregado',
    superficie: 5200,
    unidades: 18,
    anio: 2023,
    descripcion: 'Barrio privado de casas individuales con pileta y áreas comunes.',
    imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    titulo: 'Proyecto Osadía',
    tipo: 'Vivienda',
    ciudad: 'Salta',
    estado: 'entregado',
    superficie: 3100,
    unidades: 30,
    anio: 2022,
    descripcion: 'Departamentos de 1 y 2 ambientes con amenities y terraza de uso común.',
    imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef1d39b68?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    titulo: 'Mitre 2695',
    tipo: 'Comercial',
    ciudad: 'Salta',
    estado: 'planeado',
    superficie: 4200,
    unidades: 28,
    anio: 2028,
    descripcion: 'Edificio de oficinas y departamentos sobre calle Mitre, actualmente en etapa de proyecto.',
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
]

const filters = [
  { value: 'todos', label: 'Todos' },
  { value: 'en obra', label: 'En obra' },
  { value: 'entregado', label: 'Entregados' },
  { value: 'planeado', label: 'En proyecto' },
]

export const Proyectos = () => {
  const [activeFilter, setActiveFilter] = useState('todos')

  const visibleProjects = useMemo(
    () =>
      activeFilter === 'todos'
        ? mockProyectos
        : mockProyectos.filter((project) => project.estado === activeFilter),
    [activeFilter],
  )

  const summaryStats = useMemo(
    () => [
      { value: mockProyectos.filter((project) => project.estado === 'en obra').length, label: 'Obras en curso' },
      { value: mockProyectos.filter((project) => project.estado === 'entregado').length, label: 'Obras entregadas' },
      {
        value: mockProyectos.reduce((total, project) => total + project.superficie, 0).toLocaleString('es-AR'),
        label: 'm² proyectados',
      },
    ],
    [],
  )

  return (
    <section className="bg-white pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-molca-primary">
                Portfolio de obras
              </span>
              <h1 className="mt-3 font-display text-5xl font-extrabold leading-none text-molca-dark md:text-7xl">
                Proyectos
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gray-600">
                Lo que construimos, lo que estamos construyendo y lo que viene.
              </p>
            </div>
            <dl className="grid grid-cols-3 border-l-2 border-molca-accent lg:col-span-5">
              {summaryStats.map((stat) => (
                <div key={stat.label} className="flex flex-col px-4 sm:px-6">
                  <dt className="order-2 text-[11px] uppercase tracking-widest text-molca-dark/50">{stat.label}</dt>
                  <dd className="font-display text-3xl font-extrabold text-molca-dark sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="mb-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-molca-dark/15" role="tablist" aria-label="Filtrar proyectos">
          {filters.map((filter) => {
            const isActive = filter.value === activeFilter
            return (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.value)}
                className={`-mb-px border-b-2 pb-3 text-sm font-semibold uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'border-molca-accent text-molca-dark'
                    : 'border-transparent text-molca-dark/45 hover:text-molca-dark'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div key={activeFilter} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <div key={project.id} className={index === 0 ? 'md:col-span-2 lg:col-span-3' : ''}>
              <ProjectPanel project={project} index={index} featured={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Proyectos
