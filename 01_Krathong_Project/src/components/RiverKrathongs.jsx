import { useMemo } from 'react'
import { motion } from 'framer-motion'
import KrathongIcon from './KrathongIcon.jsx'

function RiverKrathongs({ count = 5 }) {
  const krathongs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: 20 + Math.random() * 60,
        size: Math.random() * 30 + 40,
        duration: Math.random() * 10 + 18,
        delay: Math.random() * -15,
        reverse: i % 2 === 0,
      })),
    [count],
  )

  return (
    <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden sm:h-52">
      <div className="absolute inset-0 bg-gradient-to-b from-krathong-river/0 via-krathong-river to-krathong-deep" />
      <div
        className="animate-shimmer absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(100deg, transparent 0%, rgba(207,230,255,0.08) 2%, transparent 4%)',
          backgroundSize: '200% 100%',
        }}
      />

      {krathongs.map((k) => (
        <motion.div
          key={k.id}
          className="absolute drop-shadow-[0_0_14px_rgba(255,154,60,0.5)]"
          style={{ top: `${k.top}%`, width: k.size }}
          initial={{ x: k.reverse ? '110vw' : '-20vw' }}
          animate={{
            x: k.reverse ? '-20vw' : '110vw',
            y: [0, -6, 0, 6, 0],
          }}
          transition={{
            x: { duration: k.duration, delay: k.delay, repeat: Infinity, ease: 'linear' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <KrathongIcon className="w-full" flameClassName="animate-flicker" />
        </motion.div>
      ))}
    </div>
  )
}

export default RiverKrathongs
