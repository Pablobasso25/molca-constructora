import { useState } from 'react'
import { leadService, whatsappService } from '../services/api'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    proyecto: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await leadService.create(formData)
      setSent(true)
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '', proyecto: '' })
    } catch (error) {
      alert('Error al enviar el mensaje. Intentá de nuevo.')
    } finally {
      setSending(false)
    }
  }

  const trackWhatsApp = (projectId) => {
    whatsappService.trackClick({ projectId, type: 'specific' })
    window.open(`https://wa.me/543871234567?text=Hola MOLCA, me interesa el proyecto ${projectId}`, '_blank')
  }

  const contactoInfo = [
    { icon: <Phone className="w-5 h-5" />, label: 'Teléfono', value: '+54 387 123-4567', href: 'tel:+543871234567' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'info@molcaconstructora.com.ar', href: 'mailto:info@molcaconstructora.com.ar' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Dirección', value: 'Av. Principal 123, Salta, Argentina', href: '#' },
  ]

  if (sent) {
    return (
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-green-100 border border-green-200 text-green-800 px-6 py-8 rounded-xl inline-block">
            <Send className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Mensaje enviado</h3>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
          </div>
          <button onClick={() => setSent(false)} className="mt-6 text-molca-primary font-semibold hover:underline">
            Enviar otro mensaje
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Contactanos</h2>
          <p className="section-subtitle">
            Envíanos tu consulta y un asesor se pondrá en contacto contigo a la brevedad.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl font-bold text-molca-dark">Información de Contacto</h3>
            {contactoInfo.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-molca-primary/10 rounded-lg flex items-center justify-center text-molca-primary flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-molca-dark">{item.label}</p>
                  <a href={item.href} className="text-gray-600 hover:text-molca-primary transition-colors">{item.value}</a>
                </div>
              </div>
            ))}
            <div className="pt-6">
              <p className="font-semibold text-molca-dark mb-2">Seguinos</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-molca-primary">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-molca-primary">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-molca-primary">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Proyecto de interés</label>
                  <select
                    name="proyecto"
                    value={formData.proyecto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
                  >
                    <option value="">Seleccioná un proyecto</option>
                    <option value="GPS">GPS - Edificio Comercial</option>
                    <option value="Casas del Río">Casas del Río</option>
                    <option value="Dúplex Ventus">Dúplex Ventus</option>
                    <option value="Mitre 2695">Mitre 2695</option>
                    <option value="GS01">GS01</option>
                    <option value="Osadía">Proyecto Osadía</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full py-4"
              >
                {sending ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm mb-4">¿Prefieres escribirnos por WhatsApp?</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => trackWhatsApp('general')} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6c0-4.4-3.6-8-8-8-1.7 0-3.2.5-4.5 1.3L2 23l4.1-1.3c.8-1.3 1.3-2.8 1.3-4.5 0-4.4-3.6-8-8-8S2 1.6 2 6c0 3.9 2.8 7.1 6.5 7.9l.1-.1c1.5-.2 3-.5 4.3-1.4 2.2-1.5 3.2-3.9 2.3-6.2-.2-.8-.2-1.7 0-2.5.2-.6.4-1.2.8-1.7 1-1.4 2.5-1.9 4.1-1.4 2.4.7 4.2 2.8 4.2 5.3 0 .6-.1 1.2-.1 1.8 0 2.8 2.2 5.1 5 5.1 1.4 0 2.7-.4 3.8-1.1 1.6-1 2.5-2.6 2.3-4.2-.2-.7-.7-1.4-1.3-2z"/></svg>
              WhatsApp General
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
