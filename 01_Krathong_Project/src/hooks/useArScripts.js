import { useEffect, useState } from 'react'

const SCRIPTS = ['/vendor/aframe.min.js', '/vendor/aframe-ar-nft.js']

let loadPromise = null

function loadScriptsSequentially() {
  if (loadPromise) return loadPromise

  loadPromise = SCRIPTS.reduce(
    (chain, src) =>
      chain.then(
        () =>
          new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src="${src}"]`)
            if (existing) {
              resolve()
              return
            }
            const script = document.createElement('script')
            script.src = src
            script.async = false
            script.onload = () => resolve()
            script.onerror = () => reject(new Error(`Failed to load ${src}`))
            document.body.appendChild(script)
          }),
      ),
    Promise.resolve(),
  )

  return loadPromise
}

export function useArScripts() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    loadScriptsSequentially()
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return status
}
