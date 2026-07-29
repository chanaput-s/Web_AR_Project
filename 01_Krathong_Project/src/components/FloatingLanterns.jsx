import { useMemo } from 'react'
import { motion } from 'framer-motion'

function FloatingLanterns({ count = 9 }) {
  const lanterns = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 4 + ((i * 97) / count + Math.random() * 8) % 96,
        size: Math.random() * 22 + 22,
        duration: Math.random() * 8 + 14,
        delay: Math.random() * -20,
        sway: Math.random() * 40 + 20,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          className="absolute bottom-0"
          style={{ left: `${lantern.left}%` }}
          initial={{ y: 60, x: 0, opacity: 0 }}
          animate={{
            y: ['0%', '-120vh'],
            x: [0, lantern.sway, -lantern.sway, 0],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: lantern.duration,
            delay: lantern.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.15, 0.85, 1],
          }}
        >
          <div
            className="rounded-[45%] bg-gradient-to-b from-krathong-gold via-krathong-amber to-krathong-ember shadow-[0_0_25px_8px_rgba(255,154,60,0.45)]"
            style={{ width: lantern.size, height: lantern.size * 1.2 }}
          />
          <div className="mx-auto h-2 w-px bg-krathong-amber/60" />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingLanterns
