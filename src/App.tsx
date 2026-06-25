import { InteractionProvider } from './context/InteractionContext'
import { PanelProvider } from './context/PanelContext'
import { Experience } from './components/Experience'
import { Overlay } from './components/Overlay'
import { PanelModal } from './components/PanelModal'
import { InteractionLayer } from './components/InteractionLayer'
import { MobileScrollNav } from './components/MobileScrollNav'

export default function App() {
  return (
    <InteractionProvider>
      <PanelProvider>
        <Experience />
        <div className="crt-overlay" aria-hidden="true" />
        <Overlay />
        <PanelModal />
        <InteractionLayer />
        <MobileScrollNav />
      </PanelProvider>
    </InteractionProvider>
  )
}
