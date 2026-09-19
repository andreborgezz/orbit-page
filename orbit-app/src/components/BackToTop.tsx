import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const R = 21
const C = 2 * Math.PI * R

const Btn = styled.button<{ $visible: boolean }>`
  position: fixed;
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  z-index: 90;
  width: 52px;
  height: 52px;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #c8d1d9;
  background: rgba(35, 48, 71, 0.94);
  box-shadow: 0 10px 28px rgba(35, 48, 71, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: ${(p) => (p.$visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)')};
  visibility: ${(p) => (p.$visible ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s;

  &:hover {
    transform: translateY(-3px) scale(1.04);
  }

  &:focus-visible {
    outline: 2px solid #c8d1d9;
    outline-offset: 3px;
  }

  svg.ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const ring = useRef<SVGCircleElement>(null)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p))
      setVisible(window.scrollY > 600)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Btn $visible={visible} onClick={goTop} aria-label="Voltar ao topo" tabIndex={visible ? 0 : -1}>
      <svg className="ring" viewBox="0 0 52 52" aria-hidden>
        <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(200,209,217,0.2)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="26"
          cy="26"
          r={R}
          fill="none"
          stroke="#c8d1d9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
      </svg>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </Btn>
  )
}
