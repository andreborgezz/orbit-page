import { useRef } from 'react'
import type { PointerEvent } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { reduceMotion } from '../lib/effects'
import { HeroRidges } from './HeroRidges'

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
  50%      { transform: translateY(-10px); }
`

const sheen = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
`

const underlineIn = keyframes`
  from { text-decoration-color: transparent; }
  to   { text-decoration-color: rgba(35, 48, 71, 0.5); }
`

const wheel = keyframes`
  0%   { opacity: 0; transform: translateY(0); }
  30%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(12px); }
`

const livePulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(46, 158, 91, 0.35); }
  60%      { box-shadow: 0 0 0 6px rgba(46, 158, 91, 0); }
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
  padding: 110px clamp(1.5rem, 5vw, 4rem) 4rem;
  background: #f8f9fb;
`

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const GlowLight = styled.span`
  position: absolute;
  top: -18%;
  right: -8%;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 62%);
  animation: ${drift} 18s ease-in-out infinite alternate;
  ${reduceMotion}
`

const GlowNavy = styled.span`
  position: absolute;
  bottom: -22%;
  left: -14%;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(35, 48, 71, 0.07), transparent 65%);
  animation: ${drift} 22s ease-in-out infinite alternate-reverse;
  ${reduceMotion}
`

const DotGrid = styled.span`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(35, 48, 71, 0.14) 1px, transparent 1.2px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(ellipse 55% 50% at 74% 38%, #000 0%, transparent 100%);
  mask-image: radial-gradient(ellipse 55% 50% at 74% 38%, #000 0%, transparent 100%);
  opacity: 0.7;
`

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
  width: 100%;
  max-width: clamp(1000px, 85vw, 1360px);
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3.5rem;
  }
`

const Copy = styled.div``

const Eyebrow = styled.p<{ $i?: number }>`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #50617a;
  ${rise}

  // traço fino antes do texto
  &::before {
    content: '';
    width: 30px;
    height: 1px;
    background: currentColor;
    opacity: 0.7;
  }

  @media (max-width: 960px) {
    justify-content: center;
  }
`

const Headline = styled.h1<{ $i?: number }>`
  font-size: clamp(2.35rem, 4.4vw, 3.9rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: #233047;
  margin: 0 0 1.4rem;
  ${rise}
`

// inline (não inline-block) pro sublinhado acompanhar a quebra de linha
const Accent = styled.span`
  background: linear-gradient(100deg, #233047 15%, #56729f 55%, #233047 95%);
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-decoration: underline;
  text-decoration-thickness: 0.055em;
  text-underline-offset: 0.13em;
  text-decoration-color: rgba(35, 48, 71, 0.5);
  animation: ${sheen} 9s ease-in-out infinite, ${underlineIn} 1s 1.1s ease backwards;
  ${reduceMotion}
`

const Sub = styled.p<{ $i?: number }>`
  font-size: clamp(0.98rem, 1.1vw, 1.15rem);
  font-weight: 400;
  line-height: 1.75;
  color: #50617a;
  opacity: 0.85;
  margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
  max-width: 540px;
  ${rise}

  @media (max-width: 960px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Buttons = styled.div<{ $i?: number }>`
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
  ${rise}

  @media (max-width: 960px) {
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
  font-size: 0.95rem;
  font-weight: 700;
  color: #f1f5f9;
  background: #233047;
  padding: 0.95rem 1.9rem;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 2px 10px rgba(35, 48, 71, 0.18);

  // brilho que atravessa o botão
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.22), transparent);
    transform: skewX(-20deg);
    transition: left 0.7s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(35, 48, 71, 0.28);
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
  font-size: 0.95rem;
  font-weight: 600;
  color: #233047;
  background: #ffffff;
  border: 1px solid rgba(35, 48, 71, 0.16);
  padding: 0.95rem 1.9rem;
  border-radius: 12px;
  text-decoration: none;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;

  &:hover {
    border-color: rgba(35, 48, 71, 0.45);
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(35, 48, 71, 0.1);
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
  margin-top: 2.25rem;
  flex-wrap: wrap;
  ${rise}

  @media (max-width: 960px) {
    justify-content: center;
  }
`

const TrustItem = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: #3d4f6b;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem 0.45rem 0.5rem;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #e2e8f0;

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #233047;
    color: #f1f5f9;
    font-size: 0.58rem;
    font-weight: 700;
  }
`

const Visual = styled.div<{ $i?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${rise}

  @media (max-width: 960px) {
    max-width: 480px;
    margin: 0 auto;
  }
`

const Stage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Ring = styled.span<{ $inset: string; $dur: number; $reverse?: boolean }>`
  position: absolute;
  inset: ${(p) => p.$inset};
  border-radius: 50%;
  border: 1px dashed rgba(35, 48, 71, 0.16);
  animation: ${spin} ${(p) => p.$dur}s linear infinite ${(p) => (p.$reverse ? 'reverse' : 'normal')};
  ${reduceMotion}

  // planeta que percorre a órbita
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
    box-shadow: 0 0 0 4px rgba(35, 48, 71, 0.1);
  }
`

// camada com parallax: --px/--py vêm do movimento do mouse
const Layer = styled.div<{ $depth: number }>`
  position: relative;
  z-index: 1;
  transform: translate3d(
    calc(var(--px, 0) * ${(p) => p.$depth}px),
    calc(var(--py, 0) * ${(p) => p.$depth * 0.7}px),
    0
  );
  transition: transform 0.3s ease-out;
  ${reduceMotion}
`

const Float = styled.div<{ $delay?: number }>`
  animation: ${float} 6.5s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay ?? 0}s;
  ${reduceMotion}
`

// -------- janela do estúdio: editor + preview construídos em CSS --------

const Window = styled.div`
  position: relative;
  width: min(100%, 560px);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 30px 80px rgba(35, 48, 71, 0.13),
    0 2px 8px rgba(35, 48, 71, 0.05);
`

const Titlebar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #edf2f7;
`

const WinDots = styled.span`
  display: flex;
  gap: 6px;
  flex-shrink: 0;

  i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #dce4ec;
  }
`

const UrlPill = styled.span`
  margin: 0 auto;
  font-size: 0.68rem;
  font-weight: 500;
  color: #50617a;
  background: #f2f5f8;
  border: 1px solid #e8edf3;
  border-radius: 8px;
  padding: 0.28rem 1rem;
  letter-spacing: 0.01em;
  font-variant-numeric: tabular-nums;
`

const WinState = styled.span`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  font-size: 0.62rem;
  font-weight: 600;
  color: #7a8ba3;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2e9e5b;
  }
`

const Editor = styled.div`
  background: #1c273a;
  padding: 1.1rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
`

const CodeRow = styled.div`
  display: flex;
  gap: 1rem;
  font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
  font-size: 0.72rem;
  line-height: 1.6;
  white-space: pre;
`

const LineNum = styled.span`
  width: 0.9rem;
  text-align: right;
  color: rgba(200, 209, 217, 0.28);
  font-variant-numeric: tabular-nums;
  user-select: none;
`

// tokens do editor — paleta aço sobre navy, na linguagem da marca
const tokenColor: Record<string, string> = {
  com: 'rgba(200, 209, 217, 0.4)',
  kw: '#8aa2c9',
  fn: '#e6ebf0',
  tag: '#e6ebf0',
  attr: '#c8d1d9',
  pl: 'rgba(230, 235, 240, 0.85)',
}

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #182234;
  border-top: 1px solid rgba(200, 209, 217, 0.08);
  padding: 0.5rem 1.25rem;
  font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
  font-size: 0.62rem;
  color: rgba(200, 209, 217, 0.6);

  b {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: rgba(200, 209, 217, 0.85);

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #2e9e5b;
    }
  }
`

// -------- cartões flutuantes (telemetria) --------

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
// em telas pequenas os cartões de cima saem — ficariam em cima da barra da janela
const SlotTop = styled(Slot)`
  @media (max-width: 560px) {
    display: none;
  }
`

const BadgeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 0.7rem 0.95rem;
  box-shadow: 0 16px 44px rgba(35, 48, 71, 0.14);
`

const Gauge = styled.svg`
  display: block;
  transform: rotate(-90deg);
`

const BadgeValue = styled.p`
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #233047;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
`

const BadgeLabel = styled.p`
  font-size: 0.62rem;
  font-weight: 600;
  color: #7a8ba3;
  line-height: 1.3;
`

const LiveDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2e9e5b;
  animation: ${livePulse} 2.4s ease infinite;
  ${reduceMotion}
`

const DarkPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: #233047;
  color: #e6ebf0;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 999px;
  padding: 0.5rem 0.95rem;
  box-shadow: 0 14px 36px rgba(35, 48, 71, 0.28);
`

const Cue = styled.a`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 1.5rem;
  width: 24px;
  height: 38px;
  margin-left: -12px;
  border: 1.5px solid rgba(35, 48, 71, 0.35);
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

  @media (max-width: 960px), (max-height: 640px) {
    display: none;
  }
`

// linha de código: pares token/valor
type Token = 'com' | 'kw' | 'fn' | 'tag' | 'attr' | 'pl'
type Frag = { t: string; c: Token }

const code: Frag[][] = [
  [{ t: '// orbit/painel/checkout.tsx', c: 'com' }],
  [
    { t: 'export ', c: 'kw' },
    { t: 'function ', c: 'kw' },
    { t: 'Checkout', c: 'fn' },
    { t: '() {', c: 'pl' },
  ],
  [
    { t: '  ', c: 'pl' },
    { t: 'const ', c: 'kw' },
    { t: '{ pedido }', c: 'pl' },
    { t: ' = ', c: 'pl' },
    { t: 'usePedido', c: 'fn' },
    { t: '()', c: 'pl' },
  ],
  [
    { t: '  ', c: 'pl' },
    { t: 'return', c: 'kw' },
    { t: ' (', c: 'pl' },
  ],
  [
    { t: '    <', c: 'pl' },
    { t: 'Pagamento', c: 'tag' },
    { t: ' pix cartao boleto', c: 'attr' },
    { t: ' />', c: 'pl' },
  ],
  [
    { t: '  )', c: 'pl' },
  ],
  [{ t: '}', c: 'pl' }],
]

// anel de performance: trilho + arco quase completo
const R = 15.5
const C = 2 * Math.PI * R

export function Hero() {
  const stage = useRef<HTMLDivElement>(null)

  // move mockup e cartões de leve conforme o mouse
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
        <GlowLight />
        <GlowNavy />
        <DotGrid />
        <HeroRidges />
      </Backdrop>

      <Inner>
        <Copy>
          <Eyebrow $i={0}>Sites e sistemas personalizados</Eyebrow>
          <Headline $i={1}>
            Seu negócio merece<br />
            <Accent>um site à altura.</Accent>
          </Headline>
          <Sub $i={2}>
            A Orbit transforma ideias em produtos funcionais. Trabalhamos com times e fundadores que precisam de código de qualidade, sem a burocracia de grandes agências.
          </Sub>
          <Buttons $i={3}>
            <PrimaryBtn href="#cta" data-umami-event="Click Iniciar Projeto na Hero" data-testid="hero-cta-primary">
              Iniciar projeto
            </PrimaryBtn>
            <SecondaryBtn href="#process" data-umami-event="Click Ver Como Funciona na Hero" data-testid="hero-cta-secondary">
              Ver como funciona
            </SecondaryBtn>
          </Buttons>
          <TrustBar $i={4}>
            <TrustItem>Entrega ágil</TrustItem>
            <TrustItem>Código escalável</TrustItem>
            <TrustItem>Comunicação direta</TrustItem>
          </TrustBar>
        </Copy>

        <Visual $i={2}>
          <Stage ref={stage} data-testid="hero-mockup">
            <Ring $inset="1%" $dur={80} aria-hidden />
            <Ring $inset="-8%" $dur={120} $reverse aria-hidden />

            <Layer $depth={-10}>
              <Float>
                <Window>
                  <Titlebar>
                    <WinDots aria-hidden>
                      <i /><i /><i />
                    </WinDots>
                    <UrlPill>orbitdev.io/painel</UrlPill>
                    <WinState aria-hidden><i />salvo</WinState>
                  </Titlebar>

                  <Editor aria-hidden>
                    {code.map((line, i) => (
                      <CodeRow key={i}>
                        <LineNum>{i + 1}</LineNum>
                        <span>
                          {line.map((f, j) => (
                            <span key={j} style={{ color: tokenColor[f.c] }}>{f.t}</span>
                          ))}
                        </span>
                      </CodeRow>
                    ))}
                  </Editor>

                  <StatusBar aria-hidden>
                    <b><i />build sem erros</b>
                    <span>pronto pra publicar</span>
                  </StatusBar>
                </Window>
              </Float>
            </Layer>

            {/* badge de deploy */}
            <SlotTop $depth={14} style={{ top: '3%', left: '2%' }} aria-hidden>
              <Float $delay={1.2}>
                <DarkPill>deploy · 100% sob medida</DarkPill>
              </Float>
            </SlotTop>

            {/* badge de performance com anel */}
            <SlotTop $depth={-22} style={{ top: '10%', right: '0%' }} aria-hidden>
              <Float $delay={0.6}>
                <BadgeCard>
                  <Gauge width="36" height="36" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r={R} fill="none" stroke="#edf2f7" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      r={R}
                      fill="none"
                      stroke="#233047"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${C * 0.92} ${C}`}
                    />
                  </Gauge>
                  <div>
                    <BadgeValue>99/100</BadgeValue>
                    <BadgeLabel>performance</BadgeLabel>
                  </div>
                </BadgeCard>
              </Float>
            </SlotTop>

            {/* cartão de confirmação pix */}
            <Slot $depth={26} style={{ bottom: '9%', left: '0%' }} aria-hidden>
              <Float $delay={1.8}>
                <BadgeCard>
                  <LiveDot />
                  <div>
                    <BadgeValue style={{ fontSize: '0.78rem' }}>Pix confirmado</BadgeValue>
                    <BadgeLabel>pedido #1042 · agora</BadgeLabel>
                  </div>
                </BadgeCard>
              </Float>
            </Slot>
          </Stage>
        </Visual>
      </Inner>

      <Cue href="#audience" aria-label="Rolar para baixo" />
    </Section>
  )
}