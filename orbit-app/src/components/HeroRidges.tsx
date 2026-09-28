import { useEffect, useMemo, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const W = 1440
const H = 620
const STEP = 120 // distância entre os pontos de cada serra

// do fundo (mais claro, mais longe) para a frente (mais escuro, mais perto)
// top = cor da linha da serra, bottom = neblina no pé dela. mude o seed para outro desenho
const layers = [
    { seed: 11, base: 250, amp: 44, top: '#bcc6cf', bottom: '#c3ccd5', depth: 3 },
    { seed: 27, base: 300, amp: 48, top: '#b6bfc9', bottom: '#c0c9d2', depth: 6 },
    { seed: 43, base: 350, amp: 52, top: '#aeb7c2', bottom: '#bbc4cd', depth: 10 },
    { seed: 58, base: 410, amp: 56, top: '#a4aeb9', bottom: '#b9c2cc', depth: 15 },
    { seed: 72, base: 470, amp: 60, top: '#98a2af', bottom: '#b4bec7', depth: 21 },
    { seed: 89, base: 540, amp: 44, top: '#8b95a3', bottom: '#b1bbc4', depth: 28 },
]

// gerador de números "aleatórios" que sempre dá o mesmo desenho para o mesmo seed
function random(seed: number) {
    let a = seed
    return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

// contorno suave: soma de ondas mais uma variação, ligado por curvas
function ridgePath(seed: number, base: number, amp: number) {
    const rnd = random(seed)
    const phase = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28]
    const pts: [number, number][] = []

    for (let x = -STEP; x <= W + STEP; x += STEP) {
        const t = x / W
        const wave =
            0.55 * Math.sin(t * 5.1 + phase[0]) +
            0.3 * Math.sin(t * 11.3 + phase[1]) +
            0.15 * Math.sin(t * 19 + phase[2])
        pts.push([x, base + amp * wave + (rnd() - 0.5) * amp * 0.5])
    }

    let d = `M ${pts[0][0]} ${pts[0][1].toFixed(1)}`
    for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[Math.max(i - 1, 0)]
        const b = pts[i]
        const c = pts[i + 1]
        const e = pts[Math.min(i + 2, pts.length - 1)]
        const c1 = [b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6]
        const c2 = [c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6]
        d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${c[0]} ${c[1].toFixed(1)}`
    }
    return `${d} L ${W + STEP} ${H + 20} L ${-STEP} ${H + 20} Z`
}

const rise = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
`

const Wrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: clamp(260px, 42vw, 620px);
  pointer-events: none;
  animation: ${rise} 1.6s cubic-bezier(0.22, 0.7, 0.2, 1) 0.3s backwards;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.5; /* ← aqui */
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export function HeroRidges() {
    const ref = useRef<HTMLDivElement>(null)
    const paths = useMemo(() => layers.map((l) => ridgePath(l.seed, l.base, l.amp)), [])

    // as serras da frente andam um pouco mais que as do fundo quando o mouse se mexe
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (!window.matchMedia('(hover: hover)').matches) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let raf = 0
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                el.style.setProperty('--rx', (e.clientX / window.innerWidth - 0.5).toFixed(3))
            })
        }

        window.addEventListener('pointermove', onMove, { passive: true })
        return () => {
            window.removeEventListener('pointermove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <Wrap ref={ref} aria-hidden>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
                <defs>
                    {layers.map((l, i) => (
                        <linearGradient key={i} id={`ridge-${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor={l.top} />
                            <stop offset="1" stopColor={l.bottom} />
                        </linearGradient>
                    ))}
                </defs>
                {layers.map((l, i) => (
                    <g
                        key={i}
                        style={{
                            transform: `translate3d(calc(var(--rx, 0) * ${-l.depth}px), 0, 0)`,
                            transition: 'transform 0.5s ease-out',
                        }}
                    >
                        <path d={paths[i]} fill={`url(#ridge-${i})`} />
                    </g>
                ))}
            </svg>
        </Wrap>
    )
}