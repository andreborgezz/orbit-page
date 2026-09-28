import { OrbitPage } from './pages/OrbitPage'
import { PoliticaCookies } from './components/PoliticaCookies'
import { PoliticaPrivacidade } from './components/PoliticaPrivacidade'
import { Intro } from './components/Intro'
import { PageLoader } from './components/PageLoader'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #f8f9fb;
    color: #233047;
    font-family: 'Onest', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background: #233047;
    color: #f8f9fb;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  if (path === '/cookies') return <PoliticaCookies />
  if (path === '/privacidade') return <PoliticaPrivacidade />

  return (
    <>
      <GlobalStyle />
      <Intro />
      <PageLoader />
      <OrbitPage />
    </>
  )
}