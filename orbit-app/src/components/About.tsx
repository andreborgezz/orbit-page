import styled from 'styled-components'
import { spotlight, trackPointer } from '../lib/effects'
import { Reveal } from './Reveal'
import andrePhoto from '../assets/andre-borges.jpg'

const Section = styled.section`
  scroll-margin-top: 64px;
  position: relative;
  overflow: hidden;
  background: #f8f9fb;
  padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);

  // brilho suave no canto, mesma linguagem das outras seções
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 560px;
    height: 560px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 70%);
    pointer-events: none;
  }
`

const Inner = styled.div`
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const PhotoWrap = styled.div<{ $visible: boolean }>`
  position: relative;
  max-width: 380px;

  // moldura que desliza pra fora de trás da foto
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    transform: ${({ $visible }) => ($visible ? 'translate(14px, 14px)' : 'translate(0, 0)')};
    transition: transform 1.1s cubic-bezier(0.22, 0.7, 0.2, 1) 0.5s;
    border: 1.5px solid rgba(35, 48, 71, 0.22);
    border-radius: 24px;
  }

  @media (max-width: 800px) {
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transform: translate(14px, 14px);
      transition: none;
    }
  }
`

const Photo = styled.div<{ $visible: boolean }>`
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 24px;
  overflow: hidden;
  background: #233047;
  box-shadow: 0 24px 48px rgba(35, 48, 71, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    // foto "assenta" de um zoom leve
    transform: scale(${({ $visible }) => ($visible ? 1 : 1.14)});
    transition: transform 1.6s cubic-bezier(0.22, 0.7, 0.2, 1) 0.15s;
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transform: none;
      transition: none;
    }
  }
`

const Bio = styled.div``

const SectionLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #50617a;
  margin: 0 0 0.75rem;
`

const Title = styled.h2`
  font-size: clamp(1.85rem, 3vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #233047;
  margin: 0 0 0.35rem;
  line-height: 1.15;
`

const Role = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #50617a;
  margin: 0 0 1.75rem;
`

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.75;
  color: #3d4f6b;
  margin: 0 0 1.25rem;
`

const Highlights = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin: 2rem 0;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const Highlight = styled.div`
  ${spotlight}
  --spot: rgba(35, 48, 71, 0.05);
  height: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e5ebf2;
  border-radius: 14px;
  padding: 1rem 1.1rem;
  box-shadow: 0 2px 8px rgba(35, 48, 71, 0.04);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(35, 48, 71, 0.2);
    box-shadow: 0 12px 30px rgba(35, 48, 71, 0.09);
  }
`

const HighlightValue = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #233047;
  margin: 0 0 0.2rem;
  line-height: 1.25;
`

const HighlightLabel = styled.p`
  font-size: 0.8rem;
  line-height: 1.45;
  color: #50617a;
  margin: 0;
`

const highlights = [
  { value: '2+ anos', label: 'Programando e construindo projetos' },
  { value: 'Faculdade de Engenharia de Sorocaba', label: 'Cursando Análise e Desenvolvimento de Sistemas' },
  { value: 'SENAI Gaspar Ricardo Júnior', label: 'Técnico em Desenvolvimento de Sistemas' },
]

export function About() {
  return (
    <Section id="about">
      <Inner>
        <Reveal from="left" blur>
          {(visible) => (
            <PhotoWrap $visible={visible}>
              <Photo $visible={visible}>
                <img src={andrePhoto} alt="André Borges" />
              </Photo>
            </PhotoWrap>
          )}
        </Reveal>
        <Bio>
          <Reveal>
            <SectionLabel>Conheça o desenvolvedor por trás da Orbit</SectionLabel>
            <Title>André Borges</Title>
            <Role>Desenvolvedor e dono da Orbit</Role>
          </Reveal>
          <Reveal delay={120}>
            <Text>
              Sou apaixonado por tecnologia e por transformar ideias em sites e sistemas que funcionam de verdade. Programo desde 2023, trabalho como Desenvolvedor, estou cursando Análise e Desenvolvimento de Sistemas na Faculdade de Engenharia de Sorocaba (Facens) e sou formado em técnico em Desenvolvimento de Sistemas pelo Senai Gaspar Ricardo Júnior.
            </Text>
          </Reveal>
          <Reveal delay={200}>
            <Text>
              Criei a Orbit para que quem tem um negócio, seja autônomo, lojista ou dono de estabelecimento, consiga ter um site ou sistema profissional sem complicação. Aqui você fala direto com o desenvolvedor, sem intermediários: eu escuto o que você precisa e cuido de tudo até o projeto estar no ar. Meu objetivo é ajudar você a ter uma presença digital profissional e que funcione para o seu negócio.
            </Text>
          </Reveal>
          <Highlights>
            {highlights.map((h, i) => (
              <Reveal key={h.value} delay={i * 110}>
                <Highlight onMouseMove={trackPointer} data-testid={`about-highlight-${i + 1}`}>
                  <HighlightValue>{h.value}</HighlightValue>
                  <HighlightLabel>{h.label}</HighlightLabel>
                </Highlight>
              </Reveal>
            ))}
          </Highlights>
        </Bio>
      </Inner>
    </Section>
  )
}