import { Link } from 'react-router-dom'
import { Maximize, Home as HomeIcon, Layers, MapPin } from 'lucide-react'

const ProjectCard = ({ project }) => {
  const icons = {
    'vivienda': <HomeIcon className="w-5 h-5" />,
    'comercial': <Layers className="w-5 h-5" />,
    'industrial': <Maximize className="w-5 h-5" />,
    'terreno': <MapPin className="w-5 h-5" />,
  }

  return (
    <Link to={`/proyecto/${project.id}`} className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-molca-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imagen || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80'}
          alt={project.titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(event) => {
            event.target.src = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80'
          }}
        />
        {project.destacado && (
          <div className="absolute top-4 left-4 bg-molca-primary text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
            Destacado
          </div>
        )}
        {project.estado === 'entregado' && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
            Entregado
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-molca-primary uppercase tracking-wider">{project.tipo}</span>
          {icons[project.tipo] || <span className="text-xs font-semibold text-molca-primary uppercase tracking-wider">{project.tipo}</span>}
        </div>
        <h3 className="text-xl font-bold text-molca-dark mb-2 group-hover:text-molca-primary transition-colors">{project.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.descripcion}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{project.ciudad}</span>
          <span>{project.estado}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
