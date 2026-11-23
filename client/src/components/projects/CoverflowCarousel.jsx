import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const maxVisibleOffset = 3
const swipeThreshold = 60
const entranceStagger = 0.09
const entranceSettleMs = 1600
const springTransition = { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }

const getCircularOffset = (index, activeIndex, total) => {
  let offset = index - activeIndex
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

const CoverflowItem = ({ project, offset, onSelect, reduceMotion, hasEntered, isSettled }) => {
  const absoluteOffset = Math.abs(offset)
  const isActive = offset === 0
  const isVisible = absoluteOffset <= maxVisibleOffset

  return (
    <motion.li
      className="absolute left-1/2 top-1/2 -ml-[140px] -mt-[190px] h-[380px] w-[280px] list-none sm:-ml-[170px] sm:-mt-[230px] sm:h-[460px] sm:w-[340px]"
      style={{ transformPerspective: 900, pointerEvents: isVisible ? 'auto' : 'none' }}
      initial={false}
      animate={
        hasEntered
          ? {
              x: `${offset * 62}%`,
              z: -absoluteOffset * 120,
              rotateY: Math.max(-1, Math.min(1, -offset)) * (isActive ? 0 : 42),
              scale: 1 - Math.min(absoluteOffset, 3) * 0.1,
              opacity: isVisible ? 1 - absoluteOffset * 0.18 : 0,
              zIndex: 100 - absoluteOffset,
            }
          : { x: '0%', z: -400, rotateY: 0, scale: 0.5, opacity: 0, zIndex: 100 - absoluteOffset }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { ...springTransition, delay: isSettled ? 0 : absoluteOffset * entranceStagger }
      }
    >
      <button
        type="button"
        onClick={() => onSelect()}
        aria-label={`Ver ${project.titulo}`}
        aria-current={isActive}
        className="group relative block h-full w-full overflow-hidden rounded-xl bg-molca-dark shadow-[0_20px_50px_rgba(13,47,73,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-molca-secondary"
      >
        <img
          src={project.imagen}
          alt={project.titulo}
          draggable={false}
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-molca-dark/90 via-molca-dark/10 to-transparent" />
        <div
          className={`absolute inset-x-0 bottom-0 p-5 text-left text-white transition-opacity duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="mb-2 inline-block rounded-full bg-molca-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-molca-dark">
            Entregado {project.anio}
          </span>
          <h3 className="font-display text-xl font-bold leading-tight">{project.titulo}</h3>
          <p className="mt-1 text-sm text-white/80">{project.ciudad}</p>
        </div>
      </button>
    </motion.li>
  )
}

export const CoverflowCarousel = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-120px' })
  const [isSettled, setIsSettled] = useState(false)
  const total = projects.length

  useEffect(() => {
    if (!isInView) return undefined
    const timeoutId = setTimeout(() => setIsSettled(true), entranceSettleMs)
    return () => clearTimeout(timeoutId)
  }, [isInView])

  const goTo = (index) => setActiveIndex(((index % total) + total) % total)
  const goNext = () => goTo(activeIndex + 1)
  const goPrev = () => goTo(activeIndex - 1)

  const handleDragEnd = (_event, info) => {
    if (info.offset.x < -swipeThreshold) goNext()
    else if (info.offset.x > swipeThreshold) goPrev()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') goNext()
    if (event.key === 'ArrowLeft') goPrev()
  }

  if (total === 0) return null

  return (
    <div
      ref={containerRef}
      className="relative"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos terminados"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <motion.ul
        className="relative m-0 h-[440px] cursor-grab touch-pan-y overflow-hidden p-0 active:cursor-grabbing sm:h-[540px] [mask-image:linear-gradient(to_right,transparent_2%,black_22%,black_78%,transparent_98%)]"
        style={{ perspective: 1200 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project, index) => (
          <CoverflowItem
            key={project.id}
            project={project}
            offset={getCircularOffset(index, activeIndex, total)}
            onSelect={() => goTo(index)}
            reduceMotion={reduceMotion}
            hasEntered={isInView}
            isSettled={isSettled}
          />
        ))}
      </motion.ul>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Proyecto anterior"
          className="rounded-full border border-molca-dark/20 p-3 text-molca-dark transition hover:bg-molca-dark hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir a ${project.titulo}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-molca-dark' : 'w-2 bg-molca-dark/25'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          aria-label="Proyecto siguiente"
          className="rounded-full border border-molca-dark/20 p-3 text-molca-dark transition hover:bg-molca-dark hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default CoverflowCarousel
