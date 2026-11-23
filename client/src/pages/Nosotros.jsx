import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Reveal, RevealLine } from '../components/ui/Reveal'
import { TeamScroll } from '../components/team/TeamScroll'

const pillars = [
  {
    number: '01',
    title: 'Compromiso',
    description:
      'Cumplimos con lo que prometemos. Plazos, calidad y transparencia en cada etapa del proceso son nuestra marca registrada. No hay obra en la que no estemos presentes de principio a fin.',
  },
  {
    number: '02',
    title: 'Calidad constructiva',
    description:
      'Materiales seleccionados, procesos auditados bajo norma ISO 9001 y entrega que supera expectativas. Carpintería DVH, porcelanato, granito, artefactos de primera linea: sin atajos.',
  },
  {
    number: '03',
    title: 'Visión de desarrollo',
    description:
      'No construimos solo metros cuadrados. Desarrollamos proyectos con propuesta de valor clara, retorno sostenible y una experiencia auténtica para quienes eligen vivir o invertir en MOLCA.',
  },
  {
    number: '04',
    title: 'Presencia nacional',
    description:
      'Nuestra huella se extiende desde el norte hasta el centro del país. En cada provincia dejamos algo más que obras: dejamos compromiso, conocimiento del territorio y una forma responsable de hacer.',
  },
]

const businessAreas = [
  {
    name: 'Constructora',
    to: '/constructora',
    description:
      'Ejecutamos obras con equipos técnicos especializados, rigor en plazos y costos, y control de calidad en cada etapa. De la excavación al detalle de terminación.',
    services: [
      {
        title: 'Movimiento de suelos',
        description: 'Excavaciones, nivelaciones, rellenos, terraplenes, defensas, gaviones, canales, hormigones civiles.',
      },
      {
        title: 'Hormigones',
        description: 'Encofrados, armaduras y hormigonado de cualquier tipo de elemento y calidad de hormigón.',
      },
      {
        title: 'Arquitectura',
        description: 'Construcción tradicional y sistema steel frame.',
      },
      {
        title: 'Obras industriales y metalúrgicas',
        description: 'Estructuras metálicas, naves industriales, documentación técnica y dirección de obras.',
      },
      {
        title: 'Obras eléctricas',
        description: 'Subestaciones, paneles solares, inversores, transformadores y sistemas de monitoreo.',
      },
    ],
  },
  {
    name: 'Desarrolladora',
    to: '/desarrollos',
    description:
      'Desarrollamos proyectos residenciales y comerciales desde la concepción hasta la entrega, con propuesta de valor definida para inversores y compradores finales.',
    services: [
      {
        title: 'Proyectos en pozo',
        description: 'Inversión accesible con alta valorización. Financiación y opciones de pago disponibles.',
      },
      {
        title: 'Residencial',
        description: 'Casas, dúplex y edificios en altura. Primera vivienda o inversión con respaldo constructivo propio.',
      },
      {
        title: 'Comercial e industrial',
        description: 'Infraestructura para empresas que buscan operar y crecer.',
      },
      {
        title: 'Gestión integral',
        description: 'Administración propia, expensas accesibles y acompañamiento en cada etapa del desarrollo.',
      },
      {
        title: 'Terminaciones de calidad',
        description: 'Carpintería de aluminio con DVH, porcelanato, mesadas de granito, artefactos de primera línea.',
      },
    ],
  },
]

const easeOutBezier = [0.22, 1, 0.36, 1]
const brandGradient = 'linear-gradient(135deg, #0d2f49 0%, #3b6db4 50%, #0d2f49 100%)'

// El degradé de marca (azul marino → azul acero) se desplaza con el scroll.
const ScrollGradientText = ({ children }) => {
  const textRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start end', 'end start'] })
  const backgroundPositionX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.span
      ref={textRef}
      className="inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage: brandGradient,
        backgroundSize: '200% 100%',
        backgroundPositionX: reduceMotion ? '0%' : backgroundPositionX,
      }}
    >
      {children}
    </motion.span>
  )
}

const Pillar = ({ pillar, pillarIndex }) => {
  const pillarRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: pillarRef, offset: ['start 0.95', 'start 0.35'] })
  const lineScale = useTransform(scrollYProgress, [pillarIndex * 0.1, 0.7 + pillarIndex * 0.1], [0, 1])
  const numberY = useTransform(scrollYProgress, [0, 1], [48, 0])

  return (
    <div ref={pillarRef}>
      <div className="h-px w-full bg-white/20">
        <motion.div
          className="h-px origin-left bg-molca-blue"
          style={{ scaleX: reduceMotion ? 1 : lineScale }}
        />
      </div>
      <motion.p
        className="mt-6 font-display text-6xl font-extralight text-molca-light"
        style={{ y: reduceMotion ? 0 : numberY }}
      >
        {pillar.number}
      </motion.p>
      <Reveal delay={pillarIndex * 0.1}>
        <h3 className="mt-5 text-[12px] font-semibold uppercase tracking-widest text-white">{pillar.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{pillar.description}</p>
      </Reveal>
    </div>
  )
}

// La franja azul marino "se abre" de los costados a pantalla completa al llegar con el scroll.
const PillarsBand = () => {
  const bandRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'start 0.25'] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0% 5% round 32px)', 'inset(0% 0% round 0px)'])

  return (
    <motion.div
      ref={bandRef}
      className="bg-molca-dark py-20"
      style={{ clipPath: reduceMotion ? 'none' : clipPath }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, pillarIndex) => (
            <Pillar key={pillar.number} pillar={pillar} pillarIndex={pillarIndex} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const headerViewport = { once: true, margin: '-80px' }

// Cada línea del título sube desde una máscara, como los titulares del hero.
const MaskedLine = ({ children, delay }) => {
  const reduceMotion = useReducedMotion()

  // El que observa el scroll es el contenedor (que no se mueve); si observara al hijo desplazado,
  // el overflow-hidden lo dejaría "fuera de pantalla" y la animación nunca arrancaría.
  return (
    <motion.span
      className="block overflow-hidden pb-[0.12em] -mb-[0.12em]"
      initial={reduceMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={headerViewport}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: '110%' },
          visible: { y: '0%', transition: { duration: 1, delay, ease: easeOutBezier } },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

const SectionHeader = ({ kicker, titleLines, text }) => {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-4 text-[13px] font-semibold uppercase tracking-[0.3em] text-molca-blue">
            <motion.span
              aria-hidden
              className="h-px w-8 origin-left bg-molca-blue"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={headerViewport}
              transition={{ duration: 0.8, ease: easeOutBezier }}
            />
            <motion.span
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={headerViewport}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutBezier }}
            >
              {kicker}
            </motion.span>
          </p>
          <h2 className="mt-5 font-display text-4xl font-extralight uppercase leading-[1.05] tracking-wide text-molca-dark md:text-6xl">
            {titleLines.map((titleLine, lineIndex) => (
              <MaskedLine key={lineIndex} delay={0.3 + lineIndex * 0.14}>
                {titleLine}
              </MaskedLine>
            ))}
          </h2>
        </div>
        <Reveal delay={0.7}>
          <p className="max-w-xl text-base leading-relaxed text-gray-600 lg:ml-auto">{text}</p>
        </Reveal>
      </div>
      <div className="mt-10">
        <RevealLine delay={0.5} />
      </div>
    </>
  )
}

export const Nosotros = () => {
  return (
    <>
      <section className="bg-white pt-28">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Nuestros pilares"
            titleLines={['Lo que nos', <ScrollGradientText>define como empresa</ScrollGradientText>]}
            text="Cada proyecto que llevamos adelante está guiado por valores que no negociamos. La seriedad en el compromiso, la calidad en la ejecución y la visión de largo plazo nos permiten construir relaciones de confianza con clientes, inversores y socios en todo el país."
          />
        </div>
        <PillarsBand />
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {businessAreas.map((area, areaIndex) => (
              <Reveal key={area.name} delay={areaIndex * 0.15} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <RevealLine className="bg-molca-blue" thickness="h-1" delay={areaIndex * 0.15 + 0.2} />
                  <div className="flex flex-1 flex-col p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-molca-blue">
                    Unidad de negocio
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-extralight uppercase tracking-wide text-molca-dark md:text-4xl">
                    {area.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{area.description}</p>
                  <ul className="mt-8 divide-y divide-gray-200 border-t border-gray-200">
                    {area.services.map((service, serviceIndex) => (
                      <motion.li
                        key={service.title}
                        className="group flex gap-4 py-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.7, delay: serviceIndex * 0.08, ease: easeOutBezier }}
                      >
                        <span className="w-6 shrink-0 pt-0.5 font-display text-sm text-molca-blue">
                          {String(serviceIndex + 1).padStart(2, '0')}
                        </span>
                        <div className="transition-transform duration-300 group-hover:translate-x-1">
                          <h4 className="text-[12px] font-semibold uppercase tracking-widest text-molca-dark transition-colors duration-300 group-hover:text-molca-blue">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600">{service.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  <Link
                    to={area.to}
                    className="mt-auto pt-8 text-sm font-semibold text-molca-blue hover:underline"
                  >
                    Ver obras →
                  </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Equipo"
            titleLines={['Nuestro equipo']}
            text="Las personas que hacen posible cada obra."
          />
          <TeamScroll />
        </div>
      </section>
    </>
  )
}

export default Nosotros
