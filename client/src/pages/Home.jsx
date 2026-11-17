import { Hero } from '../components/hero/Hero'
import { ProjectsGrid } from '../components/projects/ProjectsGrid'

const mockProjects = [
  {
    id: 1,
    titulo: 'GPS - Edificio Comercial',
    tipo: 'comercial',
    ciudad: 'Salta',
    estado: 'en obra',
    descripcion: 'Edificio comercial de alta gama en zona céntrica, con locales comerciales y oficinas.',
    destacado: true,
    imagen: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    titulo: 'Casas del Río',
    tipo: 'vivienda',
    ciudad: 'Salta',
    estado: 'entregado',
    descripcion: 'Barrio privado de casas individuales con pileta y áreas comunes.',
    destacado: false,
    imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    titulo: 'Dúplex Ventus',
    tipo: 'vivienda',
    ciudad: 'Salta',
    estado: 'en obra',
    descripcion: 'Dúplex modernos de 2 ambientes con terraza y cochera.',
    destacado: false,
    imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    titulo: 'Mitre 2695',
    tipo: 'comercial',
    ciudad: 'Salta',
    estado: 'planeado',
    descripcion: 'Edificio de oficinas y departamentos en calle Mitre.',
    destacado: false,
    imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    titulo: 'GS01',
    tipo: 'industrial',
    ciudad: 'Salta',
    estado: 'en obra',
    descripcion: 'Nave industrial de última generación para logística y almacenamiento.',
    destacado: true,
    imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    titulo: 'Proyecto Osadía',
    tipo: 'vivienda',
    ciudad: 'Salta',
    estado: 'entregado',
    descripcion: 'Departamentos de 1 y 2 ambientes con amenities.',
    destacado: false,
    imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef1d39b68?auto=format&fit=crop&w=600&q=80',
  },
]

export const Home = () => {
  return (
    <div className="relative z-10">
      <Hero />
      <ProjectsGrid projects={mockProjects} />
    </div>
  )
}

export default Home
