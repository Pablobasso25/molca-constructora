export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="MOLCA"
              className="h-10 w-auto"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150x50?text=MOLCA'
              }}
            />
            <span className="font-bold text-xl text-molca-dark tracking-tight">MOLCA</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-molca-primary font-medium transition-colors">Inicio</a>
            <a href="/constructora" className="text-gray-600 hover:text-molca-primary font-medium transition-colors">Constructora</a>
            <a href="/desarrollos" className="text-gray-600 hover:text-molca-primary font-medium transition-colors">Desarrollos</a>
            <a href="/nosotros" className="text-gray-600 hover:text-molca-primary font-medium transition-colors">Nosotros</a>
            <a href="/contacto" className="btn-primary text-sm px-4 py-2">Contacto</a>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button className="text-gray-600 hover:text-molca-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
