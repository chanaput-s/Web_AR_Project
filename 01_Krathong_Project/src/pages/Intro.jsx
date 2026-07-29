import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Starfield from '../components/Starfield.jsx'
import FloatingLanterns from '../components/FloatingLanterns.jsx'
import RiverKrathongs from '../components/RiverKrathongs.jsx'
import KrathongIcon from '../components/KrathongIcon.jsx'

function Intro() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-krathong-night">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(11,31,51,0.9),rgba(6,17,31,1)_70%)]" />

      <motion.div
        className="absolute right-[10%] top-[8%] h-24 w-24 rounded-full bg-krathong-mist/90 shadow-[0_0_60px_20px_rgba(207,230,255,0.25)] sm:h-32 sm:w-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 2 }}
      />

      <Starfield />
      <FloatingLanterns />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-3 text-xs uppercase tracking-[0.4em] text-krathong-gold/80"
        >
          Full Moon &middot; Twelfth Lunar Month
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-display text-glow text-5xl font-bold tracking-wide text-krathong-gold sm:text-7xl"
        >
          ลอยกระทง
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-2 font-display text-lg font-medium tracking-[0.3em] text-krathong-mist/90 sm:text-2xl"
        >
          LOY KRATHONG
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-krathong-mist/70 sm:text-base"
        >
          On the night of the full moon, we set our krathongs adrift to carry
          away misfortune and honour the goddess of water. Point your camera
          at the krathong image and watch it rise into augmented reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10"
        >
          <Link
            to="/ar"
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-krathong-gold to-krathong-amber px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-krathong-night shadow-[0_0_35px_rgba(242,193,78,0.45)] transition-transform hover:scale-105 active:scale-95"
          >
            <KrathongIcon className="h-8 w-8" />
            Enter AR Experience
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-4 text-xs text-krathong-mist/50"
        >
          Camera access required &middot; Best viewed in good lighting
        </motion.p>
      </div>

      <RiverKrathongs />

      <footer className="absolute bottom-1 z-10 w-full px-4 text-center text-[10px] text-krathong-mist/30">
        3D "krathong" model by Ziro.com, licensed CC BY 4.0 via Sketchfab
      </footer>
    </main>
  )
}

export default Intro
