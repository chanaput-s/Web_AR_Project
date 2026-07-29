import { useEffect, useRef, useState } from 'react'
import { useArScripts } from '../hooks/useArScripts.js'
import ArOverlay from '../components/ArOverlay.jsx'

const SCENE_MARKUP = `
  <a-scene
    vr-mode-ui="enabled: false"
    embedded
    arjs="sourceType: webcam; debugUIEnabled: false;"
    renderer="antialias: true; alpha: true; precision: mediump;"
    loading-screen="enabled: false"
  >
    <a-assets>
      <a-asset-item id="krathong-model" src="/models/Krathong.gltf"></a-asset-item>
    </a-assets>

    <a-nft
      id="krathong-target"
      type="nft"
      url="/markers/Krathong_image"
      smooth="true"
      smoothCount="10"
      smoothTolerance="0.01"
      smoothThreshold="5"
    >
      <a-entity
        gltf-model="#krathong-model"
        scale="0.08 0.08 0.08"
        position="0 0.05 0"
        animation="property: rotation; to: 0 360 0; loop: true; dur: 14000; easing: linear"
      ></a-entity>
    </a-nft>

    <a-entity camera></a-entity>
  </a-scene>
`

function ArExperience() {
  const scriptStatus = useArScripts()
  const containerRef = useRef(null)
  const [arStatus, setArStatus] = useState('loading')

  useEffect(() => {
    if (scriptStatus === 'error') {
      setArStatus('scriptError')
      return
    }
    if (scriptStatus !== 'ready' || !containerRef.current) return

    const container = containerRef.current
    container.innerHTML = SCENE_MARKUP

    const sceneEl = container.querySelector('a-scene')
    const targetEl = container.querySelector('#krathong-target')

    const handleSceneLoaded = () => setArStatus('scanning')
    const handleCameraError = () => setArStatus('cameraError')
    const handleMarkerFound = () => setArStatus('found')
    const handleMarkerLost = () => setArStatus('scanning')

    sceneEl.addEventListener('loaded', handleSceneLoaded)
    sceneEl.addEventListener('camera-error', handleCameraError)
    targetEl.addEventListener('markerFound', handleMarkerFound)
    targetEl.addEventListener('markerLost', handleMarkerLost)

    return () => {
      sceneEl.removeEventListener('loaded', handleSceneLoaded)
      sceneEl.removeEventListener('camera-error', handleCameraError)
      targetEl.removeEventListener('markerFound', handleMarkerFound)
      targetEl.removeEventListener('markerLost', handleMarkerLost)

      const video = document.querySelector('#arjs-video')
      if (video?.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop())
      }
      container.innerHTML = ''
    }
  }, [scriptStatus])

  return (
    <div
      className={`relative h-svh w-full overflow-hidden ${
        arStatus === 'loading' ? 'bg-krathong-night' : 'bg-transparent'
      }`}
    >
      <div ref={containerRef} className="absolute inset-0" />
      <ArOverlay status={arStatus} />
    </div>
  )
}

export default ArExperience
