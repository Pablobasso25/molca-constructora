import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Mouse } from 'lucide-react'
import { Wordmark, wordmarkLoaderSize, wordmarkFinalSize } from './Wordmark'
const useMap = (motionValue, input, output) =>
  useTransform(motionValue, (value) => transform(value, input, output))
const useEvents = (motionValue) => useTransform(motionValue, (opacity) => (opacity > 0.5 ? 'auto' : 'none'))

const easeInOutBezier = [0.76, 0, 0.24, 1]
const easeOutBezier = [0.22, 1, 0.36, 1]

let introPlayed = false

const unlockScroll = () => {
  document.documentElement.style.overflow = ''
  document.documentElement.dataset.intro = 'done'
  window.lenisInstance?.start()
}

const sections = {
  left: {
    label: 'Constructora',
    kicker: 'Obra civil y ejecución técnica',
    to: '/constructora',
    title: ['OBRA', 'CIVIL', 'EJECUCIÓN', 'TÉCNICA'],
    text: 'Construimos con rigor técnico, plazos claros y control en cada etapa de la obra.',
    cta: 'Ver obras',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=70',
  },
  right: {
    label: 'Desarrolladora',
    kicker: 'Emprendimientos para inversores',
    to: '/desarrollos',
    title: ['EMPRENDIMIENTOS', 'PARA', 'INVERSORES'],
    text: 'Desarrollos inmobiliarios en preventa y venta, pensados para crecer en el tiempo.',
    cta: 'Ver obras',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=70',
  },
}

// TODO: reemplazar por las cifras reales de MOLCA (valores de ejemplo).
const trayectoria = [
  { value: '+15', label: 'Años de trayectoria' },
  { value: '+120', label: 'Obras ejecutadas' },
  { value: '+50.000', label: 'm² construidos' },
]

const headline = ['CONSTRUIMOS', 'CON VISIÓN', 'Y DESARROLLAMOS', 'FUTURO']
const intro =
  'Empresa especializada en proyectos comerciales y residenciales que combinan calidad constructiva, diseño funcional y una visión integral del entorno. Cuidamos cada detalle, desde la ingeniería inicial hasta la experiencia final.'

const LoaderUI = () => {
  const counter = useMotionValue(0)
  const label = useTransform(counter, (value) => String(Math.round(value)).padStart(3, '0'))
  const bar = useTransform(counter, (value) => value / 100)
  useEffect(() => {
    const controls = animate(counter, 100, { duration: 3, ease: [0.65, 0, 0.35, 1] })
    return () => controls.stop()
  }, [counter])

  return (
    <>
      <motion.img
        src={sections.left.img}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.13] grayscale"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.13 }}
        transition={{ duration: 3, ease: easeOutBezier }}
      />

    </>
  )
}

const BlockReveal = ({ children, ready, delay, skip }) => (
  <span className="relative inline-block overflow-hidden align-top">
    <motion.span
      className="block"
      initial={skip ? false : { opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0, delay: delay + 0.45 }}
    >
      {children}
    </motion.span>
    {!skip && (
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-white"
        initial={{ x: '-101%' }}
        animate={ready ? { x: ['-101%', '0%', '101%'] } : { x: '-101%' }}
        transition={{ duration: 0.95, delay, times: [0, 0.5, 1], ease: easeInOutBezier }}
      />
    )}
  </span>
)

const Panel = ({ side, split, overlay, splitOpacity, detailOpacity }) => {
  const section = sections[side]
  const isLeft = side === 'left'
  const detailY = useMap(detailOpacity, [0, 1], [40, 0])
  const splitEvents = useEvents(splitOpacity)
  const detailEvents = useEvents(detailOpacity)

  const wrapX = useTransform(split, (position) => (isLeft ? `${position - 100}%` : `${position}%`))
  const innerX = useTransform(split, (position) => (isLeft ? `${100 - position}%` : `${-position}%`))

  return (
    <motion.div
      style={{ x: wrapX }}
      className="absolute inset-0 overflow-hidden will-change-transform"
    >
      <motion.div style={{ x: innerX }} className="absolute inset-0 will-change-transform">
        <img
          src={section.img}
          alt=""
          decoding="async"
          className="h-full w-full object-cover grayscale brightness-90"
        />
        <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-molca-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-molca-dark/70 via-molca-dark/50 to-molca-dark/70" />

        <motion.div
          style={{ opacity: splitOpacity, pointerEvents: splitEvents }}
          className={`absolute inset-y-0 flex w-1/2 ${isLeft ? 'left-0' : 'right-0'}`}
        >
          <Link
            to={section.to}
            className="group flex w-full flex-col items-center justify-center px-2 text-center"
          >
            <h2 className="font-display text-[4.4vw] font-normal sm:text-[3.6vw] uppercase tracking-[0.08em] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              {section.label}
            </h2>
            <p className="mt-4 hidden max-w-[16rem] text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:block">
              {section.kicker}
            </p>
            <span className="mt-8 hidden border-b border-transparent pb-1 text-[11px] font-semibold uppercase tracking-widest transition-colors group-hover:border-white sm:inline-block">
              Entrar
            </span>
          </Link>
        </motion.div>

        <motion.div
          style={{ opacity: detailOpacity, y: detailY, pointerEvents: detailEvents }}
          className="absolute inset-0 flex items-center px-5 sm:px-8"
        >
          <div className="mx-auto w-full max-w-7xl">
            <p className="mb-5 text-[13px] uppercase tracking-[0.3em] text-white/60 sm:mb-8 sm:text-[16px]">
              {section.label}
            </p>
            <h2 className="font-display text-[8.6vw] font-extralight uppercase leading-[1.05] tracking-wide sm:text-6xl md:text-7xl">
              {section.title.map((titleLine) => (
                <span key={titleLine} className="block">
                  {titleLine}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70 sm:mt-8">{section.text}</p>
            <Link
              to={section.to}
              className="mt-6 inline-flex sm:mt-8 rounded-full border border-white/40 px-7 py-3 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
            >
              {section.cta}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export const Hero = () => {
  const reduce = useReducedMotion()
  const heroSectionRef = useRef(null)
  const { scrollYProgress: scrollProgress } = useScroll({ target: heroSectionRef, offset: ['start start', 'end end'] })

  // loading → moving (el logo viaja a su lugar) → done
  const [stage, setStage] = useState(() => (introPlayed || reduce ? 'done' : 'loading'))
  const skip = useRef(stage === 'done').current
  const ready = stage !== 'loading'
  const done = stage === 'done'

  useEffect(() => {
    if (skip) return
    const html = document.documentElement
    window.scrollTo(0, 0)
    html.style.overflow = 'hidden'
    html.dataset.intro = 'playing'
    window.lenisInstance?.stop()


    let alive = true
    const minWait = new Promise((resolve) => setTimeout(resolve, 3200))
    const loadImage = (imageUrl) =>
      new Promise((resolve) => {
        const image = new Image()
        image.onload = image.onerror = resolve
        image.src = imageUrl
      })
    const images = Promise.race([
      Promise.all([sections.left.img, sections.right.img].map(loadImage)),
      new Promise((resolve) => setTimeout(resolve, 6000)),
    ])
    Promise.all([minWait, images]).then(() => {
      if (alive) setStage('moving')
    })
    return () => {
      alive = false
      unlockScroll()
    }
  }, [skip])

  const finish = () => {
    introPlayed = true
    setStage('done')
    unlockScroll()
  }
  useEffect(() => {
    if (stage !== 'moving') return
    const timeoutId = setTimeout(finish, 2600)
    return () => clearTimeout(timeoutId)
  }, [stage])


  const split = useMap(scrollProgress, [0, 0.3, 0.46, 0.62, 0.78, 1], [50, 50, 100, 100, 0, 0])
  const lineX = useTransform(split, (position) => `${position}vw`)

  const uiOpacity = useMap(scrollProgress, [0, 0.03, 0.09], [1, 1, 0])
  const uiY = useMap(scrollProgress, [0, 0.09], [0, -50])
  const uiEvents = useEvents(uiOpacity)

  const labels = useMap(scrollProgress, [0.05, 0.1, 0.27, 0.32], [0, 1, 1, 0])
  const leftDetail = useMap(scrollProgress, [0.4, 0.46, 0.57, 0.62], [0, 1, 1, 0])
  const rightDetail = useMap(scrollProgress, [0.72, 0.8, 1], [0, 1, 1])
  const leftOverlay = useMap(scrollProgress, [0.3, 0.46], [0, 0.35])
  const rightOverlay = useMap(scrollProgress, [0.62, 0.8], [0, 0.35])

  const barOpacity = useMap(scrollProgress, [0.08, 0.16], [0, 1])
  const fill1 = useMap(scrollProgress, [0.3, 0.62], [0, 1])
  const fill2 = useMap(scrollProgress, [0.62, 1], [0, 1])

  const rise = (delay) => ({
    initial: skip ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: easeOutBezier },
  })

  return (
    <section ref={heroSectionRef} className="relative h-[600vh] bg-molca-dark text-white">
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden">
        <Panel
          side="left"
          split={split}
          overlay={leftOverlay}
          splitOpacity={labels}
          detailOpacity={leftDetail}
        />
        <Panel
          side="right"
          split={split}
          overlay={rightOverlay}
          splitOpacity={labels}
          detailOpacity={rightDetail}
        />

        <motion.div
          style={{ x: lineX, opacity: labels }}
          className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/30 will-change-transform"
        />

        <motion.div
          style={{ opacity: uiOpacity, y: uiY, pointerEvents: uiEvents }}
          className="absolute inset-0 z-10 flex flex-col px-5 pb-5 pt-20 sm:px-6 sm:pb-6 sm:pt-24"
        >
          <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
            <div className="relative flex items-start justify-between self-start md:block">
              <div style={{ opacity: done ? 1 : 0 }}>
                <Wordmark className={wordmarkFinalSize} />
              </div>
            </div>

            <div>
              <h1 className="font-display text-[7.4vw] font-normal uppercase leading-[1.04] tracking-[-0.02em] [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] md:text-[3.9vw]">
                {headline.map((headlineLine, lineIndex) => (
                  <div key={headlineLine}>
                    <BlockReveal ready={ready} skip={skip} delay={0.75 + lineIndex * 0.14}>
                      {headlineLine}
                    </BlockReveal>
                  </div>
                ))}
              </h1>
              <motion.div {...rise(1.3)} className="mt-4 max-w-xl md:mt-8">
                <p className="text-[13px] leading-[1.55] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-[15px] sm:leading-[1.7] md:text-[16px]">
                  {intro}
                </p>
                <p className="mt-3 flex sm:mt-6 items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/85 md:text-[14px]">
                  <span aria-hidden className="h-px w-8 bg-white/60" />
                  Salta, Argentina
                </p>
              </motion.div>
            </div>
          </div>

          <div className="flex-1" />

          <motion.div
            className="h-px w-full origin-left bg-white"
            initial={skip ? false : { scaleX: 0 }}
            animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ duration: 1.3, delay: 0.95, ease: easeInOutBezier }}
          />

          <div className="grid grid-cols-12 gap-x-6 gap-y-4 pt-4 md:pt-5">
            <motion.div {...rise(1.4)} className="col-span-12">
              <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-[11px] md:mb-5">
                Nuestra trayectoria
              </p>
              <dl className="grid grid-cols-3 divide-x divide-white/25 text-center">
                {trayectoria.map((stat) => (
                  <div key={stat.label} className="px-1 sm:px-2 md:px-6">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-[6.8vw] font-extralight leading-none tracking-wide sm:text-5xl md:text-6xl">
                      {stat.value}
                    </dd>
                    <p aria-hidden className="mt-2 text-[9px] uppercase leading-tight tracking-wider sm:text-[10px] sm:tracking-widest text-white/70 md:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: barOpacity }}
          className="pointer-events-none absolute inset-x-5 bottom-6 z-20 grid grid-cols-2 gap-5 sm:inset-x-8"
        >
          {[
            { label: 'Constructora', fill: fill1 },
            { label: 'Desarrollos', fill: fill2 },
          ].map((progressBar) => (
            <div key={progressBar.label}>
              <p className="mb-2 text-[10px] uppercase tracking-widest text-white/60">{progressBar.label}</p>
              <div className="h-px w-full bg-white/20">
                <motion.div style={{ scaleX: progressBar.fill }} className="h-px origin-left bg-white" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {!done &&
        createPortal(
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-[100] bg-molca-dark"
              initial={{ opacity: 1 }}
              animate={{ opacity: stage === 'loading' ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.1, ease: 'easeInOut' }}
              style={{ pointerEvents: stage === 'loading' ? 'auto' : 'none' }}
            >
              <LoaderUI />
            </motion.div>
            <div
              className={`pointer-events-none fixed inset-0 z-[101] flex ${
                stage === 'loading'
                  ? 'items-center justify-center'
                  : 'items-start justify-start px-5 pb-5 pt-20 sm:px-6 sm:pb-6 sm:pt-24'
              }`}
            >
              <motion.div
                layout
                transition={{ duration: 1.1, ease: easeInOutBezier }}
                onLayoutAnimationComplete={() => stage === 'moving' && finish()}
              >
                <Wordmark build className={stage === 'loading' ? wordmarkLoaderSize : wordmarkFinalSize} />
              </motion.div>
            </div>
          </>,
          document.body,
        )}
    </section>
  )
}

export default Hero
