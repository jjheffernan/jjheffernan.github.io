import { InteractionProvider } from './context/InteractionContext'
import { PanelProvider } from './context/PanelContext'
import { CameraProvider } from './context/CameraContext'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { PanelModal } from './components/PanelModal'
import { InteractionLayer } from './components/InteractionLayer'
import { MobileScrollNav } from './components/MobileScrollNav'
import { CameraPanControls } from './components/CameraPanControls'

export default function App() {
  return (
    <InteractionProvider>
      <PanelProvider>
        <CameraProvider>
          <Experience />
          <div className="crt-overlay" aria-hidden="true" />
          <Overlay />
          <PanelModal />
          <InteractionLayer />
          <CameraPanControls />
          <MobileScrollNav />
        </CameraProvider>
      </PanelProvider>
    </InteractionProvider>
  )
}
