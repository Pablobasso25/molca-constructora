import { useParams } from 'react-router-dom'
import { projectService } from '../services/api'
import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, ChevronLeft } from 'lucide-react'

export const ProyectoDetalle = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await projectService.getById(id)
        setProject(response.data)
      } catch (error) {
        setProject({
          id,
          titulo: 'Proyecto',
          tipo: 'vivienda',
          ciudad: 'Salta',
          estado: 'en obra',
          descripcion: 'Información del proyecto en actualización.',
          imagenes: [],
        })
      } finally {
        setLoading(false)
      }
    }
    loadProject()
  }, [id])

  if (loading) return (
    <section className="py-20 text-center">
      <div className="animate-spin inline-block h-8 w-8 border-4 border-molca-primary rounded-full" />
    </section>
  )

  return (
    <section className="py-20 bg-gray-50">
      <nav className="max-w-7xl mx-auto px-4 mb-8">
        <button className="flex items-center gap-2 text-molca-primary hover:text-molca-secondary font-medium">
          <ChevronLeft className="w-4 h-4" /> Volver a Obras
        </button>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative h-80 rounded-xl overflow-hidden mb-6">
              <img
                src={project.imagen || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80'}
                alt={project.titulo}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80' }}
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-molca-dark px-3 py-1 rounded font-semibold text-sm">
                {project.estado}
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={`https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=200&q=80&sig=${i}`}
                    alt={`Imagen ${i}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-molca-primary uppercase tracking-wider">{project.tipo}</span>
            <h1 className="text-3xl font-bold text-molca-dark mb-4">{project.titulo}</h1>
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span>{project.ciudad}</span>
              <span className="w-px h-4 bg-gray-300 mx-2"></span>
              <span>{project.descripcion.substring(0, 50)}...</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              {project.descripcion}
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-molca-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{project.ciudad}, Argentina</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-molca-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">+54 387 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-molca-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">info@molcaconstructora.com.ar</span>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={() => window.open('https://wa.me/543871234567', '_blank')}
                className="w-full flex items-center justify-center gap-2 bg-molca-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-molca-secondary transition-colors"
              >
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProyectoDetalle
