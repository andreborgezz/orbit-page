import styled, { keyframes } from 'styled-components'
import orbitIcon from '../assets/icon-png.jpg'
import { trackPointer } from '../lib/effects'
import { Reveal } from './Reveal'

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(200, 209, 217, 0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(200, 209, 217, 0); }
`

// anel girando devagar atrás do card, reforça a ideia de "órbita"
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const Section = styled.section`
  scroll-margin-top: 64px;
  background: #fafaf9;
  padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);
`

const Card = styled.div`
  max-width: 860px;
  margin: 0 auto;
  background: linear-gradient(145deg, #2b3b58 0%, #233047 55%, #1a2438 100%);
  border-radius: 28px;
  padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 4.5rem);
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(35, 48, 71, 0.3);

  // brilho no canto superior
  &::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 209, 217, 0.14) 0%, transparent 70%);
    pointer-events: none;
  }

  // brilho no canto inferior
  &::after {
    content: '';
    position: absolute;
    bottom: -140px;
    left: -100px;
    width: 340px;
    height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 209, 217, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`

const Orbit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 620px;
  height: 620px;
  margin: -310px 0 0 -310px;
  border: 1px dashed rgba(200, 209, 217, 0.12);
  border-radius: 50%;
  pointer-events: none;
  animation: ${spin} 60s linear infinite;

  // "planeta" que percorre a órbita
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    border-radius: 50%;
    background: #c8d1d9;
    opacity: 0.5;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// anel maior girando ao contrário
const Orbit2 = styled(Orbit)`
  width: 920px;
  height: 920px;
  margin: -460px 0 0 -460px;
  animation-duration: 110s;
  animation-direction: reverse;
  border-color: rgba(200, 209, 217, 0.08);
`

const Spot = styled.span`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: radial-gradient(
    420px circle at var(--mx, 50%) var(--my, 50%),
    rgba(200, 209, 217, 0.14),
    transparent 60%
  );

  ${Card}:hover & {
    opacity: 1;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const LogoMark = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-bottom: 1.5rem;
  filter: brightness(0) invert(1);
  opacity: 0.8;
`

const Headline = styled.h2`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #e6ebf0;
  margin: 0 0 1.1rem;
  line-height: 1.15;
`

const Sub = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #c8d1d9;
  opacity: 0.85;
  margin: 0 auto 2.25rem;
  max-width: 500px;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
`

const BtnArrow = styled.span`
  display: inline-block;
  transition: transform 0.25s ease;
`

const Btn = styled.a`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #233047;
  background: #c8d1d9;
  padding: 1rem 2.25rem;
  border-radius: 14px;
  text-decoration: none;
  animation: ${pulse} 3s ease infinite;
  transition: background 0.2s, transform 0.2s;

  // brilho que atravessa o botão
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -60%;
    width: 40%;
    height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    transform: skewX(-20deg);
    transition: left 0.7s ease;
  }

  &:hover::after {
    left: 130%;
  }

  &:hover ${BtnArrow} {
    transform: translateX(4px);
  }

  &:hover {
    background: #e6ebf0;
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Perks = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1.5rem;
  margin: 2rem 0 0;
  padding: 0;
`

const Perk = styled.li`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.85rem;
  color: #c8d1d9;
  opacity: 0.7;

  &::before {
    content: '✓';
    margin-right: 0.45rem;
    font-weight: 700;
  }
`

// troca pelo seu número: DDI + DDD + número, sem símbolos
const whatsapp = 'https://wa.me/5515997591714?text=Olá%20André!%20Vi%20o%20seu%20site%20e%20quero%20conversar%20sobre%20meu%20projeto.'

export function FinalCTA() {
  return (
    <Section id="cta">
      <Reveal scale={0.96} blur>
        <Card onMouseMove={trackPointer}>
          <Spot aria-hidden />
          <Orbit aria-hidden />
          <Orbit2 aria-hidden />
          <Content>
            <Reveal delay={150}>
              <LogoMark src={orbitIcon} alt="" />
              <Headline>
                Vamos tirar o seu projeto<br />do papel?
              </Headline>
            </Reveal>
            <Reveal delay={260}>
              <Sub>
                Me conta o que você tem em mente. Em uma conversa rápida e sem compromisso, eu te explico como podemos fazer isso acontecer, com prazo e valor combinados antes de começar.
              </Sub>
            </Reveal>
            <Reveal delay={360}>
              <Actions>
                <Btn href={whatsapp} target="_blank" rel="noopener noreferrer">
                  Iniciar projeto <BtnArrow>→</BtnArrow>
                </Btn>
              </Actions>
            </Reveal>
            <Reveal delay={460}>
              <Perks>
                <Perk>Conversa gratuita</Perk>
                <Perk>Sem compromisso</Perk>
                <Perk>Resposta em até 24h</Perk>
              </Perks>
            </Reveal>
          </Content>
        </Card>
      </Reveal>
    </Section>
  )
}
