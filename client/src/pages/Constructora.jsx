import { ProjectsGrid } from '../components/projects/ProjectsGrid'

const proyectosConstructora = [
  {
    id: 101,
    titulo: 'GPS - Edificio Comercial',
    tipo: 'comercial',
    ciudad: 'Salta',
    estado: 'en obra',
    descripcion: 'Edificio comercial de alta gama con locales y oficinas.',
    imagen: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 102,
    titulo: 'Mitre 2695',
    tipo: 'comercial',
    ciudad: 'Salta',
    estado: 'planeado',
    descripcion: 'Edificio de oficinas y departamentos en calle Mitre.',
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 103,
    titulo: 'GS01',
    tipo: 'industrial',
    ciudad: 'Salta',
    estado: 'en obra',
    descripcion: 'Nave industrial para logística y almacenamiento.',
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
]

export const Constructora = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title">Unidad de Negocio — Constructora</h2>
          <p className="section-subtitle">
            Servicios de obra civil, ejecución técnica y catálogo de proyectos de construcción.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ProjectsGrid projects={proyectosConstructora} />
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-molca-dark mb-4">Nuestros Servicios</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-molca-primary/10 rounded-full flex items-center justify-center text-molca-primary">✓</span>
                  Obra civil y ejecución técnica
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-molca-primary/10 rounded-full flex items-center justify-center text-molca-primary">✓</span>
                  Gestión de proyectos
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-molca-primary/10 rounded-full flex items-center justify-center text-molca-primary">✓</span>
                  Asesoría técnica integral
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-molca-primary/10 rounded-full flex items-center justify-center text-molca-primary">✓</span>
                  Control de calidad y plazos
                </li>
              </ul>
            </div>
            <div className="bg-molca-dark p-6 rounded-xl text-white">
              <h3 className="text-lg font-bold mb-4">¿Tenés un proyecto?</h3>
              <p className="text-gray-300 text-sm mb-6">Contactanos para asesoramiento personalizado.</p>
              <a href="/contacto" className="btn-secondary w-full">Solicitar contacto</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Constructora
