import type { MouseEvent } from 'react'
import { css } from 'styled-components'

// guarda a posição do mouse em --mx/--my pra luz que segue o cursor
export function trackPointer(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// brilho que acompanha o cursor. cor via --spot no componente
export const spotlight = css`
  position: relative;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.35s ease;
    background: radial-gradient(
      360px circle at var(--mx, 50%) var(--my, 50%),
      var(--spot, rgba(255, 255, 255, 0.7)),
      transparent 65%
    );
  }

  &:hover::before {
    opacity: 1;
  }

  @media (hover: none) {
    &::before {
      display: none;
    }
  }
`

export const reduceMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
`
