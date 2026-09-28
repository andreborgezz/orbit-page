import { useEffect, useLayoutEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import orbitIcon from '../assets/icon-png.jpg'
import { cameFromNavigation } from './PageLoader'

const SHOW_MS = 1700 // tempo com a logo na tela
const EXIT_MS = 800 // tempo da cortina subindo
const KEY = 'orbit-intro'

type Phase = 'show' | 'exit' | 'done'

// roda uma vez por visita, e não roda com "reduzir animações" nem em link com âncora
// `always` (páginas internas) ignora o "uma vez por visita" e o hash
function shouldRun(always: boolean) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (always) return true
    if (window.location.hash) return false
    // veio de uma página interna: quem cuida é o PageLoader
    if (cameFromNavigation()) return false
    try {
        return sessionStorage.getItem(KEY) !== '1'
    } catch {
        return true
    }
}

function release() {
    delete document.documentElement.dataset.intro
    document.body.style.overflow = ''
}

// enquanto a intro está na tela, o resto do site fica com as animações pausadas
// e começa a animar quando a cortina sobe
const Pause = createGlobalStyle`
  html[data-intro='on'] *,
  html[data-intro='on'] *::before,
  html[data-intro='on'] *::after {
    animation-play-state: paused !important;
  }

  html[data-intro='on'] [data-intro-root],
  html[data-intro='on'] [data-intro-root] *,
  html[data-intro='on'] [data-intro-root] *::before,
  html[data-intro='on'] [data-intro-root] *::after {
    animation-play-state: running !important;
  }
`

const planetIn = keyframes`
  from { opacity: 0; transform: scale(0.55) rotate(-120deg); }
  to   { opacity: 1; transform: none; }
`

const draw = keyframes`
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const letterUp = keyframes`
  from { opacity: 0; transform: translateY(105%); }
  to   { opacity: 1; transform: none; }
`

// mais alta que a tela: as pontas arredondadas ficam escondidas até ela subir
const Curtain = styled.div<{ $exit: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  height: calc(100% + 72px);
  padding-bottom: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c8d1d9;
  border-radius: 0 0 clamp(28px, 6vw, 72px) clamp(28px, 6vw, 72px);
  // a sombra só aparece quando a tela sobe (parada, ela fica fora da janela)
  box-shadow: 0 20px 40px -8px rgba(35, 48, 71, 0.22);
  transform: translateY(${({ $exit }) => ($exit ? '-100%' : '0')});
  transition: transform ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1);
  cursor: pointer;
`

const Lockup = styled.div<{ $exit: boolean }>`
  display: flex;
  align-items: center;
  gap: clamp(1.4rem, 3.5vw, 2.2rem);
  opacity: ${({ $exit }) => ($exit ? 0 : 1)};
  transform: translateY(${({ $exit }) => ($exit ? '-16px' : '0')});
  transition: opacity 0.35s ease, transform 0.5s ease;
`

const Mark = styled.div`
  position: relative;
  width: clamp(52px, 9vw, 72px);
  height: clamp(52px, 9vw, 72px);
  margin-left: 0.5rem;
`

const Planet = styled.img`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  animation: ${planetIn} 0.85s cubic-bezier(0.22, 0.7, 0.2, 1) both;
`

const Ring = styled.svg`
  position: absolute;
  inset: -22%;
  width: 144%;
  height: 144%;
  overflow: visible;

  circle {
    fill: none;
    stroke: #233047;
    stroke-opacity: 0.32;
    stroke-width: 1;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: ${draw} 1s 0.15s cubic-bezier(0.5, 0, 0.2, 1) forwards;
  }
`

// bolinha que dá uma volta na órbita enquanto o anel se desenha
const Orbiter = styled.span`
  position: absolute;
  inset: -22%;
  animation: ${spin} 1.1s 0.15s cubic-bezier(0.5, 0, 0.2, 1) both;

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    border-radius: 50%;
    background: #233047;
  }
`

const Word = styled.div`
  display: flex;
  overflow: hidden;
  padding-bottom: 0.08em;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(2.6rem, 8vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #233047;
`

const Letter = styled.span<{ $i: number }>`
  display: inline-block;
  opacity: 0;
  animation: ${letterUp} 0.55s cubic-bezier(0.22, 0.7, 0.2, 1) forwards;
  animation-delay: ${({ $i }) => 0.4 + $i * 0.06}s;
`

// faz a home tocar a intro de novo (usado ao voltar das páginas internas)
export function replayIntro() {
    try {
        sessionStorage.removeItem(KEY)
    } catch {
        // sem storage: a intro já roda sempre
    }
}

export function Intro({ always = false }: { always?: boolean }) {
    const [runs] = useState(() => shouldRun(always))
    const [phase, setPhase] = useState<Phase>(runs ? 'show' : 'done')

    // trava a página e pausa as animações do site antes do primeiro desenho
    useLayoutEffect(() => {
        if (!runs) return
        document.documentElement.dataset.intro = 'on'
        document.body.style.overflow = 'hidden'
        if (!always) {
            try {
                sessionStorage.setItem(KEY, '1')
            } catch {
                // sem storage: roda de novo na próxima visita
            }
        }
        return release
    }, [runs, always])

    // hora de sair: tempo, clique ou Esc
    useEffect(() => {
        if (phase !== 'show') return
        const leave = () => setPhase('exit')
        const timer = window.setTimeout(leave, SHOW_MS)
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') leave()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            window.clearTimeout(timer)
            window.removeEventListener('keydown', onKey)
        }
    }, [phase])

    // cortina subindo: libera a página e as animações do site
    useEffect(() => {
        if (phase !== 'exit') return
        release()
        const timer = window.setTimeout(() => setPhase('done'), EXIT_MS + 60)
        return () => window.clearTimeout(timer)
    }, [phase])

    if (phase === 'done') return null

    return (
        <>
            <Pause />
            <Curtain
                data-intro-root
                aria-hidden="true"
                $exit={phase === 'exit'}
                onClick={() => setPhase('exit')}
            >
                <Lockup $exit={phase === 'exit'}>
                    <Mark>
                        <Ring viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="48" pathLength="1" />
                        </Ring>
                        <Orbiter />
                        <Planet src={orbitIcon} alt="" />
                    </Mark>
                    <Word>
                        {'Orbit'.split('').map((letter, i) => (
                            <Letter key={i} $i={i}>
                                {letter}
                            </Letter>
                        ))}
                    </Word>
                </Lockup>
            </Curtain>
        </>
    )
}