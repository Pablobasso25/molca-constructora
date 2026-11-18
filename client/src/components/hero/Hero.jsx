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
import { Wordmark, WORDMARK_BIG, WORDMARK_SIZE } from './Wordmark'

const useMap = (mv, input, output) => useTransform(mv, (v) => transform(v, input, output))
const useEvents = (mv) => useTransform(mv, (o) => (o > 0.5 ? 'auto' : 'none'))

const EASE = [0.76, 0, 0.24, 1]
const EASE_OUT = [0.22, 1, 0.36, 1]

let introPlayed = false

const unlockScroll = () => {
  document.documentElement.style.overflow = ''
  document.documentElement.dataset.intro = 'done'
  window.__lenis?.start()
}

const sections = {
  left: {
    num: '01',
    label: 'Constructora',
    kicker: 'Obra civil y ejecución técnica',
    to: '/constructora',
    title: ['OBRA', 'CIVIL', 'EJECUCIÓN', 'TÉCNICA'],
    text: 'Construimos con rigor técnico, plazos claros y control en cada etapa de la obra.',
    cta: 'Ver obras',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=70',
  },
  right: {
    num: '02',
    label: 'Desarrolladora',
    kicker: 'Emprendimientos para inversores',
    to: '/desarrollos',
    title: ['EMPRENDIMIENTOS', 'PARA', 'INVERSORES'],
    text: 'Desarrollos inmobiliarios en preventa y venta, pensados para crecer en el tiempo.',
    cta: 'Ver desarrollos',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=70',
  },
}

const headline = ['CONSTRUIMOS', 'LO QUE VA', 'A QUEDAR']

const LoaderUI = () => {
  const n = useMotionValue(0)
  const label = useTransform(n, (v) => String(Math.round(v)).padStart(3, '0'))
  const bar = useTransform(n, (v) => v / 100)
  useEffect(() => {
    const c = animate(n, 100, { duration: 3, ease: [0.65, 0, 0.35, 1] })
    return () => c.stop()
  }, [n])

  return (
    <>
      <motion.img
        src={sections.left.img}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.13] grayscale"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.13 }}
        transition={{ duration: 3, ease: EASE_OUT }}
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
        transition={{ duration: 0.95, delay, times: [0, 0.5, 1], ease: EASE }}
      />
    )}
  </span>
)

const Panel = ({ side, split, overlay, splitOpacity, detailOpacity }) => {
  const d = sections[side]
  const isLeft = side === 'left'
  const detailY = useMap(detailOpacity, [0, 1], [40, 0])
  const splitEvents = useEvents(splitOpacity)
  const detailEvents = useEvents(detailOpacity)

  const wrapX = useTransform(split, (v) => (isLeft ? `${v - 100}%` : `${v}%`))
  const innerX = useTransform(split, (v) => (isLeft ? `${100 - v}%` : `${-v}%`))

  return (
    <motion.div
      style={{ x: wrapX }}
      className="absolute inset-0 overflow-hidden will-change-transform"
    >
      <motion.div style={{ x: innerX }} className="absolute inset-0 will-change-transform">
        <img
          src={d.img}
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
            to={d.to}
            className="group flex w-full flex-col items-center justify-center px-2 text-center"
          >
            <span className="mb-4 text-[11px] font-medium tracking-[0.3em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
              {d.num}
            </span>
            <h2 className="font-display text-[1.05rem] font-normal uppercase tracking-[0.08em] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-4xl md:text-6xl lg:text-7xl">
              {d.label}
            </h2>
            <p className="mt-4 hidden max-w-[16rem] text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:block">
              {d.kicker}
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
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-white/60">
              {d.num} <span className="mx-2">/</span> {d.label}
            </p>
            <h2 className="font-display text-4xl font-extralight uppercase leading-[1.05] tracking-wide sm:text-6xl md:text-7xl">
              {d.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/70">{d.text}</p>
            <Link
              to={d.to}
              className="mt-8 inline-flex rounded-full border border-white/40 px-7 py-3 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
            >
              {d.cta}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export const Hero = () => {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

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
    window.__lenis?.stop()


    let alive = true
    const minWait = new Promise((r) => setTimeout(r, 3200))
    const loadImg = (src) =>
      new Promise((r) => {
        const im = new Image()
        im.onload = im.onerror = r
        im.src = src
      })
    const images = Promise.race([
      Promise.all([sections.left.img, sections.right.img].map(loadImg)),
      new Promise((r) => setTimeout(r, 6000)),
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
    const t = setTimeout(finish, 2600)
    return () => clearTimeout(t)
  }, [stage])


  const split = useMap(p, [0, 0.2, 0.4, 0.6, 0.8, 1], [50, 50, 100, 100, 0, 0])
  const lineX = useTransform(split, (v) => `${v}vw`)

  const uiOpacity = useMap(p, [0, 0.04, 0.11], [1, 1, 0])
  const uiY = useMap(p, [0, 0.11], [0, -50])
  const uiEvents = useEvents(uiOpacity)

  const labels = useMap(p, [0.06, 0.12, 0.17, 0.22], [0, 1, 1, 0])
  const leftDetail = useMap(p, [0.32, 0.4, 0.52, 0.6], [0, 1, 1, 0])
  const rightDetail = useMap(p, [0.74, 0.82, 1], [0, 1, 1])
  const leftOverlay = useMap(p, [0.2, 0.4], [0, 0.35])
  const rightOverlay = useMap(p, [0.6, 0.82], [0, 0.35])

  const barOpacity = useMap(p, [0.14, 0.24], [0, 1])
  const fill1 = useMap(p, [0.2, 0.6], [0, 1])
  const fill2 = useMap(p, [0.6, 1], [0, 1])

  const rise = (delay) => ({
    initial: skip ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  })

  return (
    <section ref={ref} className="relative h-[500vh] bg-molca-dark text-white">
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
          className="absolute inset-0 z-10 flex flex-col px-6 py-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative self-start">
              <div style={{ opacity: done ? 1 : 0 }}>
                <Wordmark className={WORDMARK_SIZE} />
              </div>
            </div>

            <h1 className="font-display text-[8.2vw] font-normal uppercase leading-[1.04] tracking-[-0.02em] [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] md:text-[4.4vw]">
              {headline.map((l, i) => (
                <div key={l}>
                  <BlockReveal ready={ready} skip={skip} delay={0.75 + i * 0.14}>
                    {l}
                  </BlockReveal>
                </div>
              ))}
            </h1>
          </div>

          <div className="flex-1" />

          <motion.div
            className="h-px w-full origin-left bg-white"
            initial={skip ? false : { scaleX: 0 }}
            animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ duration: 1.3, delay: 0.95, ease: EASE }}
          />

          <div className="grid grid-cols-12 gap-x-6 gap-y-4 pt-4 md:pt-5">
            <motion.div {...rise(1.4)} className="col-span-6 hidden items-start gap-5 md:flex">
              <Link to="/proyecto/3" className="group block w-[42%] shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=70"
                  alt="Dúplex Ventus"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="text-[13px] font-semibold leading-tight">
                <p className="mb-3">Proyecto destacado</p>
                <Link to="/proyecto/3" className="text-lg">
                  Dúplex Ventus →
                </Link>
              </div>
            </motion.div>

          </div>
        </motion.div>

        <motion.div
          style={{ opacity: barOpacity }}
          className="pointer-events-none absolute inset-x-5 bottom-6 z-20 grid grid-cols-2 gap-5 sm:inset-x-8"
        >
          {[
            { l: 'Constructora', fill: fill1 },
            { l: 'Desarrollos', fill: fill2 },
          ].map((b) => (
            <div key={b.l}>
              <p className="mb-2 text-[10px] uppercase tracking-widest text-white/60">{b.l}</p>
              <div className="h-px w-full bg-white/20">
                <motion.div style={{ scaleX: b.fill }} className="h-px origin-left bg-white" />
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
                stage === 'loading' ? 'items-center justify-center' : 'items-start justify-start px-6 py-6'
              }`}
            >
              <motion.div
                layout
                transition={{ duration: 1.1, ease: EASE }}
                onLayoutAnimationComplete={() => stage === 'moving' && finish()}
              >
                <Wordmark build className={stage === 'loading' ? WORDMARK_BIG : WORDMARK_SIZE} />
              </motion.div>
            </div>
          </>,
          document.body,
        )}
    </section>
  )
}

export default Hero
