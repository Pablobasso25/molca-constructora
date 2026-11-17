import { Link } from 'react-router-dom'

const emprendimientos = [
  {
    id: 201,
    titulo: 'Casas del Río',
    tipo: 'barrio privado',
    ciudad: 'Salta',
    estado: 'entregado',
    descripcion: 'Barrio privado de casas individuales con pileta y áreas comunes. Ideal para vivir en familia.',
    imagen: 'https://images.unsplash.com/photo-1564013799919-ab6000027ffc6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 202,
    titulo: 'Dúplex Ventus',
    tipo: 'dúplex',
    ciudad: 'Salta',
    estado: 'preventa',
    descripcion: 'Dúplex modernos de 2 ambientes con terraza y cochera. Oportunidad de inversión.',
    imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 203,
    titulo: 'Proyecto Osadía',
    tipo: 'departamentos',
    ciudad: 'Salta',
    estado: 'entregado',
    descripcion: 'Departamentos de 1 y 2 ambientes con amenities.',
    imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef1d39b68?auto=format&fit=crop&w=600&q=80',
  },
]

export const Desarrollos = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="section-title">Unidad de Negocio — Desarrollos</h2>
          <p className="section-subtitle">
            Sección comercial orientada a inversores, preventa y venta de emprendimientos inmobiliarios.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {emprendimientos.map((emp) => (
            <div key={emp.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img
                  src={emp.imagen}
                  alt={emp.titulo}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560184897-6187b9a94050?auto=format&fit=crop&w=600&q=80' }}
                />
                <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                  {emp.estado}
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-molca-primary uppercase tracking-wider">{emp.tipo}</span>
                <h3 className="text-lg font-bold text-molca-dark mb-2">{emp.titulo}</h3>
                <p className="text-gray-600 text-sm mb-4">{emp.descripcion}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{emp.ciudad}</span>
                  <Link to={`/proyecto/${emp.id}`} className="text-molca-primary font-semibold hover:underline">Ver detalles →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a href="/contacto" className="btn-primary">
            Consultar por un emprendimiento
          </a>
        </div>
      </div>
    </section>
  )
}

export default Desarrollos
