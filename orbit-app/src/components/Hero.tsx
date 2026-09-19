import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import styled, { css, keyframes } from 'styled-components'
import ilustracao from '../assets/ilustracao-vetorial.png'
import { reduceMotion } from '../lib/effects'

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(22px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: none; }
`

const drift = keyframes`
  from { transform: translate3d(0, 0, 0) scale(1); }
  to   { transform: translate3d(60px, 40px, 0) scale(1.15); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
`

const ping = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(35, 48, 71, 0.45); }
  70%  { box-shadow: 0 0 0 8px rgba(35, 48, 71, 0); }
  100% { box-shadow: 0 0 0 0 rgba(35, 48, 71, 0); }
`

const sheen = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
`

const underlineIn = keyframes`
  from { text-decoration-color: transparent; }
  to   { text-decoration-color: rgba(35, 48, 71, 0.55); }
`

const wheel = keyframes`
  0%   { opacity: 0; transform: translateY(0); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(12px); }
`

// entrada em cascata: $i define a ordem
const rise = css<{ $i?: number }>`
  animation: ${riseIn} 0.9s cubic-bezier(0.22, 0.7, 0.2, 1) backwards;
  animation-delay: ${(p) => 120 + (p.$i ?? 0) * 110}ms;
  ${reduceMotion}
`

const Section = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 80px clamp(1.5rem, 5vw, 4rem) 3rem;
  background: #c8d1d9;
`

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const BlobLight = styled.span`
  position: absolute;
  top: -12%;
  left: -10%;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent 65%);
  animation: ${drift} 16s ease-in-out infinite alternate;
  ${reduceMotion}
`

const BlobDark = styled.span`
  position: absolute;
  bottom: -18%;
  right: -12%;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(35, 48, 71, 0.18), transparent 65%);
  animation: ${drift} 20s ease-in-out infinite alternate-reverse;
  ${reduceMotion}
`

const DotGrid = styled.span`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(35, 48, 71, 0.2) 1px, transparent 1.2px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(ellipse 60% 55% at 72% 45%, #000 0%, transparent 100%);
  mask-image: radial-gradient(ellipse 60% 55% at 72% 45%, #000 0%, transparent 100%);
`

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
`

const Copy = styled.div``

const Eyebrow = styled.p<{ $i?: number }>`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 1.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.75);
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(35, 48, 71, 0.8);
  ${rise}

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #233047;
    animation: ${ping} 2s ease-out infinite;
    ${reduceMotion}
  }
`

const Headline = styled.h1<{ $i?: number }>`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #233047;
  margin: 0 0 1.25rem;
  ${rise}
`

// inline (não inline-block) pro sublinhado acompanhar a quebra de linha
const Accent = styled.span`
  background: linear-gradient(100deg, #233047 10%, #56729f 55%, #233047 95%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-decoration: underline;
  text-decoration-thickness: 0.07em;
  text-underline-offset: 0.14em;
  text-decoration-color: rgba(35, 48, 71, 0.55);
  animation: ${sheen} 7s ease-in-out infinite, ${underlineIn} 1s 1s ease backwards;
  ${reduceMotion}
`

const Sub = styled.p<{ $i?: number }>`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 400;
  line-height: 1.7;
  color: #233047;
  opacity: 0.72;
  margin: 0 0 2.25rem;
  max-width: 460px;
  ${rise}

  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Buttons = styled.div<{ $i?: number }>`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  ${rise}

  @media (max-width: 900px) {
    justify-content: center;
  }
`

const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.25s ease;
`

const PrimaryBtn = styled.a`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #c8d1d9;
  background: #233047;
  padding: 0.875rem 1.75rem;
  border-radius: 10px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 20px rgba(35, 48, 71, 0.2);

  // brilho que atravessa o botão
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: skewX(-20deg);
    transition: left 0.7s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(35, 48, 71, 0.3);
  }

  &:hover::after {
    left: 130%;
  }

  &:hover ${Arrow} {
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: 2px solid #233047;
    outline-offset: 3px;
  }
`

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #233047;
  background: rgba(255, 255, 255, 0.25);
  border: 1.5px solid rgba(35, 48, 71, 0.3);
  padding: 0.875rem 1.75rem;
  border-radius: 10px;
  text-decoration: none;
  transition: border-color 0.25s, background 0.25s, transform 0.25s;

  &:hover {
    border-color: #233047;
    background: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #233047;
    outline-offset: 3px;
  }
`

const TrustBar = styled.div<{ $i?: number }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  ${rise}

  @media (max-width: 900px) {
    justify-content: center;
  }
`

const TrustItem = styled.span`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #233047;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #233047;
    color: #c8d1d9;
    font-size: 0.6rem;
    font-weight: 700;
  }
`

const IllustrationWrap = styled.div<{ $i?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${rise}

  @media (max-width: 900px) {
    max-width: 380px;
    margin: 0 auto;
  }
`

const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Glow = styled.span`
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.7), transparent 70%);
`

const Ring = styled.span<{ $inset: string; $dur: number; $reverse?: boolean }>`
  position: absolute;
  inset: ${(p) => p.$inset};
  border-radius: 50%;
  border: 1px dashed rgba(35, 48, 71, 0.24);
  animation: ${spin} ${(p) => p.$dur}s linear infinite ${(p) => (p.$reverse ? 'reverse' : 'normal')};
  ${reduceMotion}

  // planeta que percorre a órbita
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    border-radius: 50%;
    background: #233047;
    box-shadow: 0 0 0 5px rgba(35, 48, 71, 0.12);
  }
`

// camada com parallax: --px/--py vêm do movimento do mouse
const Layer = styled.div<{ $depth: number }>`
  position: relative;
  z-index: 1;
  width: 100%;
  transform: translate3d(
    calc(var(--px, 0) * ${(p) => p.$depth}px),
    calc(var(--py, 0) * ${(p) => p.$depth * 0.7}px),
    0
  );
  transition: transform 0.3s ease-out;
  ${reduceMotion}
`

const Float = styled.div<{ $delay?: number }>`
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay ?? 0}s;
  ${reduceMotion}
`

const Illustration = styled.img`
  display: block;
  width: 100%;
  max-width: 500px;
  height: auto;
  margin: 0 auto;
  filter: drop-shadow(0 16px 48px rgba(35, 48, 71, 0.14));
`

const Slot = styled.div<{ $depth: number }>`
  position: absolute;
  z-index: 2;
  transform: translate3d(
    calc(var(--px, 0) * ${(p) => p.$depth}px),
    calc(var(--py, 0) * ${(p) => p.$depth * 0.7}px),
    0
  );
  transition: transform 0.3s ease-out;
  ${reduceMotion}
`

const Chip = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #233047;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(35, 48, 71, 0.16);

  @media (max-width: 520px) {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
`

const Cue = styled.a`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 1.5rem;
  width: 24px;
  height: 38px;
  margin-left: -12px;
  border: 1.5px solid rgba(35, 48, 71, 0.4);
  border-radius: 14px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 7px;
    left: 50%;
    width: 3px;
    height: 7px;
    margin-left: -1.5px;
    border-radius: 2px;
    background: #233047;
    animation: ${wheel} 1.8s ease-in-out infinite;
    ${reduceMotion}
  }

  @media (max-width: 900px), (max-height: 640px) {
    display: none;
  }
`

const icon = (children: ReactNode) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
)

const chips = [
  {
    pos: { top: '9%', left: '0%' },
    depth: 22,
    delay: 0,
    svg: icon(
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>,
    ),
  },
  {
    pos: { top: '20%', right: '-2%' },
    depth: -18,
    delay: 1.2,
    svg: icon(
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </>,
    ),
  },
  {
    pos: { bottom: '18%', left: '-3%' },
    depth: -26,
    delay: 2.1,
    svg: icon(
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </>,
    ),
  },
  {
    pos: { bottom: '6%', right: '10%' },
    depth: 16,
    delay: 0.7,
    svg: icon(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />),
  },
]

export function Hero() {
  const stage = useRef<HTMLDivElement>(null)

  // move ilustração e chips de leve conforme o mouse
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = stage.current
    if (!el || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }

  return (
    <Section onPointerMove={onMove}>
      <Backdrop aria-hidden>
        <BlobLight />
        <BlobDark />
        <DotGrid />
      </Backdrop>

      <Inner>
        <Copy>
          <Eyebrow $i={0}>Desenvolvimento sob medida</Eyebrow>
          <Headline $i={1}>
            Seu produto digital,<br />
            <Accent>do zero ao deploy.</Accent>
          </Headline>
          <Sub $i={2}>
            A Orbit transforma ideias em produtos funcionais. Trabalhamos com times e fundadores que precisam de código de qualidade, sem a burocracia de grandes agências.
          </Sub>
          <Buttons $i={3}>
            <PrimaryBtn href="#cta">
              Iniciar projeto <Arrow>→</Arrow>
            </PrimaryBtn>
            <SecondaryBtn href="#process">Ver como funciona</SecondaryBtn>
          </Buttons>
          <TrustBar $i={4}>
            <TrustItem>Entrega ágil</TrustItem>
            <TrustItem>Código escalável</TrustItem>
            <TrustItem>Comunicação direta</TrustItem>
          </TrustBar>
        </Copy>

        <IllustrationWrap $i={2}>
          <Stage ref={stage}>
            <Glow aria-hidden />
            <Ring $inset="4%" $dur={60} aria-hidden />
            <Ring $inset="-9%" $dur={95} $reverse aria-hidden />
            <Layer $depth={-14}>
              <Float>
                <Illustration src={ilustracao} alt="Desenvolvedor no workspace" />
              </Float>
            </Layer>
            {chips.map((c, i) => (
              <Slot key={i} $depth={c.depth} style={c.pos} aria-hidden>
                <Float $delay={c.delay}>
                  <Chip>{c.svg}</Chip>
                </Float>
              </Slot>
            ))}
          </Stage>
        </IllustrationWrap>
      </Inner>

      <Cue href="#audience" aria-label="Rolar para baixo" />
    </Section>
  )
}
