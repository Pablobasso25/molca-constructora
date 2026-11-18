import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/constructora', label: 'Constructora' },
  { to: '/desarrollos', label: 'Desarrollos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export const Navbar = () => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const dark = pathname === '/' || open 
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight * 0.3)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const hideBrand = pathname === '/' && atTop && !open
  const brandHidden = hideBrand ? 'opacity-0 !pointer-events-none' : 'opacity-100'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const tone = dark ? 'text-white' : 'text-molca-dark'
  const line = dark ? 'bg-white' : 'bg-molca-dark'

  return (
    <>
      <header className="intro-fade pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className={`pointer-events-auto flex items-center gap-5 ${tone}`}>
          <Link
            to="/contacto"
            className={`hidden rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all duration-500 sm:block ${brandHidden} ${
              dark ? 'bg-white/15 hover:bg-white hover:text-black' : 'bg-molca-dark/10 hover:bg-molca-dark hover:text-white'
            }`}
          >
            Contacto
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-end justify-center gap-2"
          >
            <span className={`h-px w-8 transition-transform duration-300 ${line} ${open ? 'translate-y-[4.5px] rotate-45' : ''}`} />
            <span className={`h-px w-8 transition-transform duration-300 ${line} ${open ? '-translate-y-[4.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#0a0a0a] px-8 sm:px-16"
          >
            <ul className="space-y-3">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    to={l.to}
                    className="font-display block text-4xl font-extralight uppercase tracking-wide text-white/80 transition-colors hover:text-white sm:text-6xl"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="absolute bottom-8 left-8 text-[11px] uppercase tracking-widest text-white/40 sm:left-16">
              Salta, Argentina
            </p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
