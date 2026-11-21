import { TeamScroll } from '../components/team/TeamScroll'

export const Nosotros = () => {
  return (
    <section className="py-20 bg-molca-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Quiénes Somos</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              MOLCA es una constructora y desarrolladora inmobiliaria con más de 15 años de trayectoria en Salta, Argentina.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Nos especializamos en la ejecución de obras de calidad, desarrollos inmobiliarios y la entrega de proyectos que superan las expectativas de nuestros clientes.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-molca-primary mt-1">✓</span>
                <span className="text-gray-300">Compromiso con los plazos de entrega</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-molca-primary mt-1">✓</span>
                <span className="text-gray-300">Calidad constructiva en cada detalle</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-molca-primary mt-1">✓</span>
                <span className="text-gray-300">Asesoría personalizada para inversores</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-molca-primary mt-1">✓</span>
                <span className="text-gray-300">Transparencia en cada etapa del proyecto</span>
              </div>
            </div>
          </div>
          <div className="relative h-64">
            <div className="absolute inset-0 bg-molca-secondary/20 rounded-2xl blur-md" />
            <div className="relative h-full w-full bg-gradient-to-br from-molca-dark/80 to-molca-dark rounded-2xl border border-molca-secondary/30 p-8">
              <h3 className="text-xl font-semibold mb-4">Nuestros Pilares</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-molca-primary rounded-full flex items-center justify-center text-white text-xs">1</span>
                  Calidad constructiva
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-molca-primary rounded-full flex items-center justify-center text-white text-xs">2</span>
                  Cumplimiento de plazos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-molca-primary rounded-full flex items-center justify-center text-white text-xs">3</span>
                  Innovación en diseño
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-molca-primary rounded-full flex items-center justify-center text-white text-xs">4</span>
                  Sostenibilidad
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-bold mb-4">Nuestro Equipo</h2>
          <p className="text-gray-300 text-lg">Las personas que hacen posible cada obra.</p>
          <TeamScroll />
        </div>
      </div>
    </section>
  )
}

export default Nosotros
