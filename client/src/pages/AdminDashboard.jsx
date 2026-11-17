import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { metricService } from '../services/api'
import { BarChart3, Users, Phone, Shield, Clock } from 'lucide-react'

export const AdminDashboard = () => {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await metricService.getAll()
        setMetrics(response.data)
      } catch (err) {
        setMetrics({ constructora: 0, desarrollos: 0, porProyecto: [], totalLeads: 0 })
      } finally {
        setLoading(false)
      }
    }
    loadMetrics()
  }, [])

  const logout = () => {
    localStorage.removeItem('molca_token')
    navigate('/admin/login')
  }

  const statCards = [
    { label: 'Total Leads', value: metrics?.totalLeads || 0, icon: <Users className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Consultas Constructora', value: metrics?.constructora || 0, icon: <Shield className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
    { label: 'Consultas Desarrollos', value: metrics?.desarrollos || 0, icon: <BarChart3 className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
    { label: 'Clics WhatsApp', value: metrics?.whatsapp || 0, icon: <Phone className="w-5 h-5" />, color: 'bg-emerald-100 text-emerald-600' },
  ]

  return (
    <section className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-molca-primary" />
            <span className="font-bold text-xl text-molca-dark">Admin MOLCA</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/proyectos" className="text-gray-600 hover:text-molca-primary font-medium">Gestión de Obras</Link>
            <Link to="/leads" className="text-gray-600 hover:text-molca-primary font-medium">Leads</Link>
            <button onClick={logout} className="text-gray-600 hover:text-red-600 font-medium">Cerrar sesión</button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.label}</p>
                  <p className="text-3xl font-bold text-molca-dark mt-1">{card.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-molca-dark mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-molca-primary" /> Métricas de Tráfico
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-800">Constructora</span>
                  </div>
                  <span className="font-bold text-molca-dark">{metrics?.constructora || 0}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-800">Desarrollos</span>
                  </div>
                  <span className="font-bold text-molca-dark">{metrics?.desarrollos || 0}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-molca-dark mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-molca-primary" /> Gestión Rápida
              </h3>
              <div className="space-y-3">
                <Link to="/admin/proyectos" className="block p-4 bg-gray-50 rounded-lg hover:bg-molca-primary/5 hover:border-molca-primary border border-transparent transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Gestionar Obras</span>
                    <span className="text-sm text-gray-400">Activar / Pausar visibilidad</span>
                  </div>
                </Link>
                <Link to="/admin/leads" className="block p-4 bg-gray-50 rounded-lg hover:bg-molca-primary/5 hover:border-molca-primary border border-transparent transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Ver Leads</span>
                    <span className="text-sm text-gray-400">Consultas de formularios</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
