import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export const Footer = () => {
  const contactInfo = {
    phone: '+54 387 123-4567',
    email: 'info@molcaconstructora.com.ar',
    address: 'Av. Principal 123, Salta, Argentina',
  }

  const socials = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
  ]

  return (
    <footer className="bg-molca-dark text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/img/logo.png"
                alt="MOLCA"
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x50?text=MOLCA'
                }}
              />
              <span className="font-bold text-xl text-white tracking-tight">MOLCA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Constructora y Desarrolladora inmobiliaria. Obras de calidad, entregas en plazo y compromiso con cada cliente.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-molca-secondary" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-molca-secondary" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-molca-secondary" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociales</h4>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="text-gray-400 hover:text-white transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-xs text-gray-500 text-center">
            © 2026 MOLCA Constructora y Desarrolladora. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
