import { Hero } from '../components/hero/Hero'
import { ProjectsGrid } from '../components/projects/ProjectsGrid'
import { TerminadosSection } from '../components/projects/TerminadosSection'

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

// TODO: reemplazar por los proyectos terminados traídos de Cloudinary / API
const mockTerminados = [
  { id: 't1', titulo: 'Casas del Río', ciudad: 'Salta', anio: 2023, imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' },
  { id: 't2', titulo: 'Proyecto Osadía', ciudad: 'Salta', anio: 2022, imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef1d39b68?auto=format&fit=crop&w=800&q=80' },
  { id: 't3', titulo: 'Torre Central', ciudad: 'Salta', anio: 2021, imagen: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80' },
  { id: 't4', titulo: 'Edificio Alvarado', ciudad: 'Salta', anio: 2021, imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  { id: 't5', titulo: 'Complejo Los Álamos', ciudad: 'Salta', anio: 2020, imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { id: 't6', titulo: 'Oficinas Belgrano', ciudad: 'Salta', anio: 2019, imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 't7', titulo: 'Barrio Las Lomas', ciudad: 'Salta', anio: 2019, imagen: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80' },
]

export const Home = () => {
  return (
    <div className="relative z-10">
      <Hero />
      <ProjectsGrid projects={mockProjects} />
      <TerminadosSection projects={mockTerminados} />
    </div>
  )
}

export default Home
