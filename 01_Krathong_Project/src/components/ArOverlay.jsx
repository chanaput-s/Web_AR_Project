import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

function ArOverlay({ status }) {
  const isBusy = status === 'loading'
  const isError = status === 'scriptError' || status === 'cameraError'

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4 font-body">
      <div className="flex items-start justify-between">
        <Link
          to="/"
          className="pointer-events-auto rounded-full bg-krathong-night/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-krathong-mist backdrop-blur-sm ring-1 ring-krathong-mist/20"
        >
          &larr; Back
        </Link>

        {!isError && (
          <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-krathong-night/70 p-2 pr-3 text-krathong-mist backdrop-blur-sm ring-1 ring-krathong-mist/20">
            <img
              src="/markers/Krathong_image.png"
              alt="Krathong marker reference"
              className="h-10 w-10 rounded-lg bg-white/90 object-contain"
            />
            <span className="max-w-[9rem] text-[11px] leading-tight text-krathong-mist/80">
              Point your camera at this image
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {isBusy && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 rounded-2xl bg-krathong-night/80 px-6 py-5 text-center backdrop-blur-sm"
            >
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-krathong-gold border-t-transparent" />
              <p className="text-sm text-krathong-mist/90">
                Preparing the AR experience&hellip;
              </p>
            </motion.div>
          )}

          {isError && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-auto mx-6 flex flex-col items-center gap-3 rounded-2xl bg-krathong-night/90 px-6 py-6 text-center backdrop-blur-sm ring-1 ring-krathong-ember/40"
            >
              <p className="font-display text-lg text-krathong-ember">
                {status === 'cameraError'
                  ? 'Camera access is unavailable'
                  : "AR couldn't load"}
              </p>
              <p className="max-w-xs text-sm text-krathong-mist/70">
                {status === 'cameraError'
                  ? 'Please allow camera access in your browser settings and reload the page.'
                  : 'Something went wrong loading the AR engine. Check your connection and try again.'}
              </p>
              <Link
                to="/"
                className="mt-2 rounded-full bg-krathong-gold px-5 py-2 text-xs font-bold uppercase tracking-widest text-krathong-night"
              >
                Return home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center pb-4">
        <AnimatePresence mode="wait">
          {status === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-full bg-krathong-night/70 px-5 py-2 text-xs uppercase tracking-widest text-krathong-mist/90 backdrop-blur-sm ring-1 ring-krathong-mist/20"
            >
              Scanning for the krathong image&hellip;
            </motion.div>
          )}

          {status === 'found' && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-full bg-krathong-gold px-5 py-2 text-xs font-bold uppercase tracking-widest text-krathong-night"
            >
              ✦ Krathong found — happy Loy Krathong!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ArOverlay
