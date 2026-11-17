import { ArrowRight, Play } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-molca-dark">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-molca-dark/60" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in">
            Construimos tu futuro,<br />
            <span className="text-molca-secondary">desarrollamos tu inversión.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 animate-slide-up">
            Constructora y Desarrolladora con trayectoria en Salta, Argentina.<br />
            Obras en ejecución, desarrollos inmobiliarios y compromiso con la excelencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/constructora" className="btn-primary w-full sm:w-auto">
              Ver Obras en Construcción <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a href="/desarrollos" className="btn-secondary w-full sm:w-auto">
              Desarrollos Inmobiliarios <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
          <div className="mt-12 animate-fade-in">
            <div className="flex items-center justify-center gap-6 md:gap-12 text-sm md:text-base">
              <div className="text-center">
                <div className="text-2xl font-bold text-molca-secondary">6+</div>
                <div className="text-gray-300">Obras en desarrollo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-molca-secondary">15+</div>
                <div className="text-gray-300">Años de trayectoria</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-molca-secondary">100+</div>
                <div className="text-gray-300">Clientes satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
