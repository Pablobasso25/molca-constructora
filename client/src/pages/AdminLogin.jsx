import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../services/api'
import { Shield, Lock, Users, BarChart3 } from 'lucide-react'

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ usuario: '', clave: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await authService.login(credentials)
      localStorage.setItem('molca_token', response.data.token)
      window.location.href = '/admin'
    } catch (err) {
      setError('Usuario o clave incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-molca-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-molca-dark">Panel de Administración</h2>
          <p className="text-gray-600">Iniciá sesión para acceder al backoffice</p>
        </div>
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              name="usuario"
              value={credentials.usuario}
              onChange={(e) => setCredentials({ ...credentials, usuario: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clave</label>
            <input
              type="password"
              name="clave"
              value={credentials.clave}
              onChange={(e) => setCredentials({ ...credentials, clave: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-molca-primary focus:border-molca-primary outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            ¿No tenés credenciales? Contactá al administrador del sistema.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin
