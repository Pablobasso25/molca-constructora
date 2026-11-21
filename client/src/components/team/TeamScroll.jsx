import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const teamMembers = [
  { name: 'Martín Molina', role: 'Director General', image: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Carolina Vega', role: 'Arquitecta Jefa', image: 'https://i.pravatar.cc/300?img=47' },
  { name: 'Diego Ramos', role: 'Ingeniero Civil', image: 'https://i.pravatar.cc/300?img=33' },
  { name: 'Lucía Fernández', role: 'Jefa de Obra', image: 'https://i.pravatar.cc/300?img=45' },
  { name: 'Javier Torres', role: 'Gerente Comercial', image: 'https://i.pravatar.cc/300?img=15' },
  { name: 'Valeria Díaz', role: 'Administración', image: 'https://i.pravatar.cc/300?img=44' },
  { name: 'Sebastián Cruz', role: 'Capataz General', image: 'https://i.pravatar.cc/300?img=52' },
  { name: 'Florencia Paz', role: 'Atención al Cliente', image: 'https://i.pravatar.cc/300?img=49' },
]

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const cardBaseWidth = 520
const cardBaseHeight = 468

const splashBackground = 'linear-gradient(306deg, #1e3a8a, #fdfdfd00)'

const container = {
  display: 'flex',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  marginTop: 40,
  paddingBottom: 40,
  width: '100%',
}

const cardContainer = {
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  position: 'relative',
  paddingTop: 40,
  width: cardBaseWidth,
  height: cardBaseHeight,
  transformOrigin: 'top left',
}

const splash = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 500,
  height: 450,
  transform: 'scale(1.04)',
  transformOrigin: 'top left',
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card = {
  width: 250,
  height: 360,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 14,
  borderRadius: 20,
  background: '#fff',
  boxShadow:
    '0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)',
  transformOrigin: '10% 60%',
}

const useCardScale = () => {
  const [cardScale, setCardScale] = useState(1)

  useEffect(() => {
    const updateCardScale = () => {
      const viewportWidth = document.documentElement.clientWidth
      setCardScale(Math.min(1, (viewportWidth * 0.92) / cardBaseWidth))
    }
    updateCardScale()
    window.addEventListener('resize', updateCardScale)
    return () => window.removeEventListener('resize', updateCardScale)
  }, [])

  return cardScale
}

const TeamCard = ({ member, scrollRootRef, cardScale }) => {
  return (
    <div
      style={{
        flexShrink: 0,
        width: cardBaseWidth * cardScale,
        height: cardBaseHeight * cardScale,
        scrollSnapAlign: 'center',
      }}
    >
    <motion.div
      style={{ ...cardContainer, transform: `scale(${cardScale})` }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ root: scrollRootRef, margin: '0px -45% 0px -45%' }}
    >
      <div style={{ ...splash, background: splashBackground }} />
      <motion.div style={card} variants={cardVariants}>
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 19, fontWeight: 700, color: '#111' }}>{member.name}</p>
          <p style={{ fontSize: 13, color: '#666' }}>{member.role}</p>
        </div>
      </motion.div>
    </motion.div>
    </div>
  )
}

export const TeamScroll = () => {
  const scrollRootRef = useRef(null)
  const cardScale = useCardScale()

  const scrollByCard = (direction) => {
    scrollRootRef.current?.scrollBy({ left: direction * cardBaseWidth * cardScale, behavior: 'smooth' })
  }

  return (
    <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
      <div ref={scrollRootRef} style={{ ...container, paddingInline: `calc(50vw - ${(cardBaseWidth * cardScale) / 2}px)` }} className="hide-scrollbar">
        {teamMembers.map((member) => (
          <TeamCard key={member.name} member={member} scrollRootRef={scrollRootRef} cardScale={cardScale} />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        <button type="button" className="btn-secondary" onClick={() => scrollByCard(-1)} aria-label="Anterior">←</button>
        <button type="button" className="btn-secondary" onClick={() => scrollByCard(1)} aria-label="Siguiente">→</button>
      </div>
    </div>
  )
}

export default TeamScroll
