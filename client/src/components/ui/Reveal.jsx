import { motion, useReducedMotion } from 'framer-motion'

const easeOutBezier = [0.22, 1, 0.36, 1]
const easeInOutBezier = [0.76, 0, 0.24, 1]
const viewportOptions = { once: true, margin: '-80px' }

export const Reveal = ({ children, delay = 0, className }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOptions}
      transition={{ duration: 0.9, delay, ease: easeOutBezier }}
    >
      {children}
    </motion.div>
  )
}

export const RevealLine = ({ delay = 0, className = 'bg-molca-dark/20', thickness = 'h-px' }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={`${thickness} w-full origin-left ${className}`}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOptions}
      transition={{ duration: 1.3, delay, ease: easeInOutBezier }}
    />
  )
}

export default Reveal
