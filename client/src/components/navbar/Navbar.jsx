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
const desktopLinks = links.filter((link) => link.to !== '/contacto')

export const Navbar = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Si se agranda la ventana a escritorio con el menú móvil abierto, lo cerramos.
  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => event.matches && setOpen(false)
    desktopQuery.addEventListener('change', onChange)
    return () => desktopQuery.removeEventListener('change', onChange)
  }, [])

  const viewportHeight = typeof window === 'undefined' ? 800 : window.innerHeight
  // El hero de la home mide 500vh: mientras está en pantalla el header es
  // transparente sobre las imágenes; después (y en el resto de páginas) tiene fondo sólido.
  const inHero = isHome && scrollY < viewportHeight * 4
  const onImage = inHero || open
  const hideBrand = inHero && scrollY < viewportHeight * 0.3 && !open

  const tone = onImage ? 'text-white' : 'text-molca-dark'
  const line = onImage ? 'bg-white' : 'bg-molca-dark'
  const surface = open
    ? ''
    : inHero
      ? 'bg-gradient-to-b from-black/60 to-transparent'
      : 'bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md'

  const linkBase = 'relative py-1 text-[12px] font-semibold uppercase tracking-widest transition-opacity'
  const pill = onImage
    ? 'bg-white text-black hover:bg-white/85'
    : 'bg-molca-dark text-white hover:bg-black'

  return (
    <>
      <header
        className={`intro-fade fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-300 sm:px-8 ${tone} ${surface}`}
      >
        <Link
          to="/"
          aria-label="MOLCA, ir al inicio"
          tabIndex={hideBrand ? -1 : 0}
          className={`font-display text-2xl font-normal uppercase tracking-[0.08em] transition-opacity duration-500 ${
            hideBrand ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          MOLCA
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {desktopLinks.map((link) => {
            const active = pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={`${linkBase} ${active ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            )
          })}
          <Link
            to="/contacto"
            aria-current={pathname === '/contacto' ? 'page' : undefined}
            className={`rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 ${pill}`}
          >
            Contacto
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((isOpen) => !isOpen)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-end justify-center gap-2 lg:hidden"
        >
          <span className={`h-px w-8 transition-transform duration-300 ${line} ${open ? 'translate-y-[4.5px] rotate-45' : ''}`} />
          <span className={`h-px w-8 transition-transform duration-300 ${line} ${open ? '-translate-y-[4.5px] -rotate-45' : ''}`} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menú móvil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#0d2f49] px-8 sm:px-16 lg:hidden"
          >
            <ul className="space-y-3">
              {links.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.5 }}
                >
                  <Link
                    to={link.to}
                    className="font-display block text-4xl font-extralight uppercase tracking-wide text-white/80 transition-colors hover:text-white sm:text-6xl"
                  >
                    {link.label}
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
