import type { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'
import { useInView } from '../lib/useInView'

// lado de onde o elemento vem
type Direction = 'bottom' | 'top' | 'left' | 'right' | 'none'

const offsets: Record<Direction, [number, number]> = {
  bottom: [0, 28],
  top: [0, -28],
  left: [-28, 0],
  right: [28, 0],
  none: [0, 0],
}

type WrapProps = {
  $visible: boolean
  $delay: number
  $x: number
  $y: number
  $scale: number
  $blur: boolean
}

const ease = 'cubic-bezier(0.22, 0.7, 0.2, 1)'

const Wrap = styled.div<WrapProps>`
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: ${(p) =>
    p.$visible ? 'none' : `translate3d(${p.$x}px, ${p.$y}px, 0) scale(${p.$scale})`};
  filter: ${(p) => (p.$blur && !p.$visible ? 'blur(6px)' : 'none')};
  transition:
    opacity 0.9s ${ease} ${(p) => p.$delay}ms,
    transform 0.9s ${ease} ${(p) => p.$delay}ms,
    filter 0.9s ease ${(p) => p.$delay}ms;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
`

type Props = {
  children: ReactNode | ((visible: boolean) => ReactNode)
  delay?: number
  from?: Direction
  scale?: number
  blur?: boolean
  className?: string
  style?: CSSProperties
}

// fade + subida quando entra na tela. children pode ser função pra reagir ao "visible"
export function Reveal({
  children,
  delay = 0,
  from = 'bottom',
  scale = 1,
  blur = false,
  className,
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [x, y] = offsets[from]

  return (
    <Wrap
      ref={ref}
      className={className}
      style={style}
      $visible={inView}
      $delay={delay}
      $x={x}
      $y={y}
      $scale={scale}
      $blur={blur}
    >
      {typeof children === 'function' ? children(inView) : children}
    </Wrap>
  )
}
