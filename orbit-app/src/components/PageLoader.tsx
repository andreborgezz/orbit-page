import { useEffect, useLayoutEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import orbitIcon from '../assets/icon-png.jpg'

const LOAD_MS = 1100 // tempo com o carregamento na tela
const EXIT_MS = 700 // tempo da cortina subindo
export const NAV_KEY = 'orbit-nav'

type Phase = 'show' | 'exit' | 'done'

function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// marca que a próxima página veio de uma navegação interna (a home usa isso pra
// mostrar este carregamento em vez da intro completa)
export function markNavigation() {
    try {
        sessionStorage.setItem(NAV_KEY, '1')
    } catch {
        // sem storage: a home toca a intro normal
    }
}

export function cameFromNavigation() {
    try {
        return sessionStorage.getItem(NAV_KEY) === '1'
    } catch {
        return false
    }
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const fill = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.45; }
  50%      { opacity: 0.9; }
`

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
  box-shadow: 0 20px 40px -8px rgba(35, 48, 71, 0.22);
  transform: translateY(${({ $exit }) => ($exit ? '-100%' : '0')});
  transition: transform ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1);
`

const Stack = styled.div<{ $exit: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  opacity: ${({ $exit }) => ($exit ? 0 : 1)};
  transition: opacity 0.3s ease;
`

const Mark = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
`

const Planet = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
`

const Ring = styled.span`
  position: absolute;
  inset: -26%;
  border: 1px solid rgba(35, 48, 71, 0.28);
  border-radius: 50%;
`

// bolinha girando sem parar na órbita
const Orbiter = styled.span`
  position: absolute;
  inset: -26%;
  animation: ${spin} 1.1s linear infinite;

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

const Bar = styled.div`
  width: clamp(120px, 28vw, 180px);
  height: 3px;
  border-radius: 3px;
  background: rgba(35, 48, 71, 0.14);
  overflow: hidden;
`

const BarFill = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: #233047;
  transform-origin: left;
  animation: ${fill} ${LOAD_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
`

const Label = styled.span`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #233047;
  animation: ${pulse} 1.2s ease-in-out infinite;
`

type Props = {
    // sem `always`, só aparece quando a página veio de uma navegação interna
    always?: boolean
}

export function PageLoader({ always = false }: Props) {
    const [runs] = useState(() => !reducedMotion() && (always || cameFromNavigation()))
    const [phase, setPhase] = useState<Phase>(runs ? 'show' : 'done')

    useLayoutEffect(() => {
        try {
            sessionStorage.removeItem(NAV_KEY)
        } catch {
            // ignora
        }
        if (!runs) return
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [runs])

    useEffect(() => {
        if (phase !== 'show') return
        const timer = window.setTimeout(() => setPhase('exit'), LOAD_MS)
        return () => window.clearTimeout(timer)
    }, [phase])

    useEffect(() => {
        if (phase !== 'exit') return
        document.body.style.overflow = ''
        const timer = window.setTimeout(() => setPhase('done'), EXIT_MS + 60)
        return () => window.clearTimeout(timer)
    }, [phase])

    if (phase === 'done') return null

    return (
        <Curtain role="status" aria-label="Carregando" $exit={phase === 'exit'}>
            <Stack $exit={phase === 'exit'}>
                <Mark>
                    <Ring />
                    <Orbiter />
                    <Planet src={orbitIcon} alt="" />
                </Mark>
                <Bar>
                    <BarFill />
                </Bar>
                <Label>Carregando</Label>
            </Stack>
        </Curtain>
    )
}
