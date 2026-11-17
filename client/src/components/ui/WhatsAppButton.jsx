import { ArrowRight } from 'lucide-react'

export const WhatsAppButton = ({ projectId, type = 'general', label = 'WhatsApp' }) => {
  const handleClick = () => {
    fetch('http://localhost:3001/api/whatsapp/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, type }),
    }).catch(console.error)
    window.open(`https://wa.me/543871234567?text=Hola MOLCA, me interesa${projectId ? ` el proyecto ${projectId}` : ''}`, '_blank')
  }

  return (
    <button onClick={handleClick} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 6c0-4.4-3.6-8-8-8-1.7 0-3.2.5-4.5 1.3L2 23l4.1-1.3c.8-1.3 1.3-2.8 1.3-4.5 0-4.4-3.6-8-8-8S2 1.6 2 6c0 3.9 2.8 7.1 6.5 7.9l.1-.1c1.5-.2 3-.5 4.3-1.4 2.2-1.5 3.2-3.9 2.3-6.2-.2-.8-.2-1.7 0-2.5.2-.6.4-1.2.8-1.7 1-1.4 2.5-1.9 4.1-1.4 2.4.7 4.2 2.8 4.2 5.3 0 .6-.1 1.2-.1 1.8 0 2.8 2.2 5.1 5 5.1 1.4 0 2.7-.4 3.8-1.1 1.6-1 2.5-2.6 2.3-4.2-.2-.7-.7-1.4-1.3-2z"/></svg>
      {label}
    </button>
  )
}

export default WhatsAppButton
