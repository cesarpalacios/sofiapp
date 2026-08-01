import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from './context/ConfigContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { PointsProvider } from './context/PointsContext.jsx'
import { CatalogoProvider } from './context/CatalogoContext.jsx'
import { ComportamientosProvider } from './context/ComportamientosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <AuthProvider>
        <PointsProvider>
          <CatalogoProvider>
            <ComportamientosProvider>
              <App />
            </ComportamientosProvider>
          </CatalogoProvider>
        </PointsProvider>
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
)
