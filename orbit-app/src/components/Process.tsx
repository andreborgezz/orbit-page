import styled, { css, keyframes } from 'styled-components'
import { spotlight, trackPointer } from '../lib/effects'
import { useInView } from '../lib/useInView'
import { Reveal } from './Reveal'

const pop = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
`

const Section = styled.section`
  scroll-margin-top: 64px;
  position: relative;
  overflow: hidden;
  background: #f2f5f8;
  padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);

  // brilho suave no topo pra dar profundidade
  &::before {
    content: '';
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(255, 255, 255, 0.55), transparent 70%);
    pointer-events: none;
  }
`

const Inner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`

const SectionLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #50617a;
  margin: 0 0 0.75rem;
  text-align: center;
`

const Title = styled.h2`
  font-size: clamp(1.85rem, 3.2vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #233047;
  text-align: center;
  margin: 0 0 1rem;
  line-height: 1.15;
`

const Subtitle = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  color: #50617a;
  text-align: center;
  max-width: 560px;
  margin: 0 auto 4rem;
`

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const ConnectorLine = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 27px;
  left: calc(12.5% + 27px);
  right: calc(12.5% + 27px);
  height: 0;
  border-top: 1px dashed rgba(35, 48, 71, 0.25);
  pointer-events: none;
  // revela da esquerda pra direita
  clip-path: inset(0 ${({ $visible }) => ($visible ? '0%' : '100%')} 0 0);
  transition: clip-path 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.35s;

  @media (max-width: 900px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    clip-path: none;
    transition: none;
  }
`

const StepNum = styled.div<{ $visible: boolean; $delay: number }>`
  width: 54px;
  height: 54px;
  min-width: 54px;
  border-radius: 50%;
  background: #233047;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  // anel externo que "destaca" o número do fundo
  box-shadow: 0 0 0 6px #f2f5f8, 0 10px 24px rgba(35, 48, 71, 0.2);
  transition: transform 0.3s ease;

  // antes de aparecer: escondido. depois: pulo com leve exagero
  ${({ $visible, $delay }) =>
    $visible
      ? css`
          animation: ${pop} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${$delay}ms backwards;
        `
      : css`
          opacity: 0;
          transform: scale(0.5);
        `}

  span {
    font-size: 1.05rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: #e6ebf0;
  }

  @media (max-width: 900px) {
    margin-bottom: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`

const Step = styled.div`
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0.5rem;

  &:hover ${StepNum} {
    transform: translateY(-3px) scale(1.05);
  }

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding: 0;
    gap: 1.25rem;
  }
`

const Card = styled.div`
  ${spotlight}
  --spot: rgba(35, 48, 71, 0.05);
  box-sizing: border-box;
  flex: 1;
  background: #ffffff;
  border: 1px solid #e5ebf2;
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  width: 100%;
  box-shadow: 0 2px 10px rgba(35, 48, 71, 0.04);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  ${Step}:hover & {
    border-color: rgba(35, 48, 71, 0.2);
    box-shadow: 0 14px 34px rgba(35, 48, 71, 0.1);
    transform: translateY(-3px);
  }

  @media (max-width: 900px) {
    flex: 1;
  }
`

const StepTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #233047;
  margin: 0 0 0.6rem;
`

const StepDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  color: #50617a;
  margin: 0;
`

const steps = [
  {
    n: '1',
    title: 'Conversa inicial',
    desc: 'Você conta sobre o seu negócio e o que precisa resolver. Sem formulário complicado e sem compromisso, é só um papo pra entender você.',
  },
  {
    n: '2',
    title: 'Proposta clara',
    desc: 'Mostramos exatamente o que será feito, em quanto tempo e quanto custa. Tudo combinado antes de começar, sem letra miúda.',
  },
  {
    n: '3',
    title: 'Construção',
    desc: 'Acompanhe o projeto ganhando forma e peça ajustes pelo caminho. Você aprova cada etapa antes do projeto ir pro ar.',
  },
  {
    n: '4',
    title: 'Entrega e suporte',
    desc: 'Entregamos tudo funcionando, te ensinamos a usar e continuamos por perto caso surja qualquer dúvida depois.',
  },
]

export function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <Section id="process">
      <Inner>
        <Reveal>
          <SectionLabel>Como funciona</SectionLabel>
          <Title>Da primeira conversa ao projeto no ar,<br />você sabe cada passo</Title>
          <Subtitle>
            Um processo simples e transparente, pensado pra você não precisar entender de tecnologia.
          </Subtitle>
        </Reveal>
        <Steps ref={ref}>
          <ConnectorLine $visible={inView} />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={200 + i * 160} scale={0.96}>
              {(visible) => (
                <Step data-testid={`process-step-${i + 1}`}>
                  <StepNum $visible={visible} $delay={350 + i * 160}>
                    <span>{s.n}</span>
                  </StepNum>
                  <Card onMouseMove={trackPointer}>
                    <StepTitle>{s.title}</StepTitle>
                    <StepDesc>{s.desc}</StepDesc>
                  </Card>
                </Step>
              )}
            </Reveal>
          ))}
        </Steps>
      </Inner>
    </Section>
  )
}