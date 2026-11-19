import { motion } from 'framer-motion'

const letters = 'MOLCA'.split('')
const bandCount = 6
const easeInOutBezier = [0.76, 0, 0.24, 1]

export const wordmarkLoaderSize = 'text-[22vw] md:text-[19vw]'
export const wordmarkFinalSize = 'text-[16.5vw] md:text-[9.5vw]'

const BuiltLetter = ({ char, index }) => (
  <span className="relative inline-block">
    <span aria-hidden className="invisible">
      {char}
    </span>
    {[...Array(bandCount).keys()].map((bandIndex) => {
      const top = (bandIndex * 100) / bandCount - 0.4
      const bottom = 100 - ((bandIndex + 1) * 100) / bandCount - 0.4
      return (
        <motion.span
          key={bandIndex}
          aria-hidden
          className="absolute inset-0"
          style={{
            clipPath: `inset(${bandIndex === 0 ? -15 : top}% -5% ${bandIndex === bandCount - 1 ? -15 : bottom}% -5%)`,
          }}
          initial={{ x: bandIndex % 2 ? '-80%' : '80%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          transition={{
            x: { duration: 0.75, delay: 0.3 + index * 0.14 + bandIndex * 0.08, ease: easeInOutBezier },
            opacity: { duration: 0.2, delay: 0.3 + index * 0.14 + bandIndex * 0.08 },
          }}
        >
          {char}
        </motion.span>
      )
    })}
  </span>
)

export const Wordmark = ({ build = false, className = '' }) => (
  <div
    aria-label="MOLCA"
    role="img"
    className={`flex font-display font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-white ${className}`}
  >
    {letters.map((letter, letterIndex) =>
      build ? (
        <BuiltLetter key={letterIndex} char={letter} index={letterIndex} />
      ) : (
        <span key={letterIndex} aria-hidden className="inline-block">
          {letter}
        </span>
      ),
    )}
  </div>
)

export default Wordmark
