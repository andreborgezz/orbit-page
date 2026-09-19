import { useState } from 'react'
import styled from 'styled-components'
import { spotlight, trackPointer } from '../lib/effects'
import { Reveal } from './Reveal'

const Section = styled.section`
  scroll-margin-top: 64px;
  position: relative;
  overflow: hidden;
  background: #fafaf9;
  padding: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);

  // brilho suave no canto, mesma linguagem da seção "Para quem"
  &::before {
    content: '';
    position: absolute;
    bottom: -25%;
    left: -10%;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(35, 48, 71, 0.06), transparent 70%);
    pointer-events: none;
  }
`

const Inner = styled.div`
  position: relative;
  max-width: 760px;
  margin: 0 auto;
`

const SectionLabel = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #233047;
  opacity: 0.55;
  margin: 0 0 0.75rem;
  text-align: center;
`

const Title = styled.h2`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #233047;
  text-align: center;
  margin: 0 0 1rem;
  line-height: 1.15;
`

const Subtitle = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #233047;
  opacity: 0.7;
  text-align: center;
  max-width: 500px;
  margin: 0 auto 3rem;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ChevronIcon = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $open }) => ($open ? '#233047' : 'rgba(35, 48, 71, 0.08)')};
  color: ${({ $open }) => ($open ? '#c8d1d9' : '#233047')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: background 0.25s, color 0.25s, transform 0.3s;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
`

const Item = styled.div<{ $open: boolean }>`
  ${spotlight}
  --spot: rgba(35, 48, 71, 0.06);
  background: ${({ $open }) => ($open ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};
  border: 1px solid ${({ $open }) => ($open ? 'rgba(35, 48, 71, 0.15)' : 'rgba(35, 48, 71, 0.08)')};
  border-radius: 16px;
  box-shadow: ${({ $open }) => ($open ? '0 10px 30px rgba(35, 48, 71, 0.08)' : 'none')};
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: rgba(35, 48, 71, 0.2);
  }
`

const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 1.25rem 1.5rem;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #233047;
  text-align: left;
  line-height: 1.4;

  &:focus-visible {
    outline: 2px solid #233047;
    outline-offset: 2px;
    border-radius: 16px;
  }
`

// abre/fecha animando a altura real (sem limite de max-height)
const Answer = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.4s cubic-bezier(0.22, 0.7, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const AnswerClip = styled.div`
  overflow: hidden;
  min-height: 0;
`

const AnswerInner = styled.p<{ $open: boolean }>`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.95rem;
  line-height: 1.75;
  color: rgba(35, 48, 71, 0.8);
  margin: 0;
  padding: 0 1.5rem 1.5rem;
  max-width: 620px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? '0' : '-6px')});
  transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const faqs = [
  {
    q: 'Em quanto tempo o meu projeto começa?',
    a: 'Depois que você aprova a proposta, a gente começa em até 5 dias úteis. Se o seu caso for urgente, conversamos e vemos como acelerar.',
  },
  {
    q: 'Preciso entender de tecnologia para contratar?',
    a: 'De jeito nenhum. Explicamos tudo em linguagem simples, e você só precisa contar o que o seu negócio precisa. A parte técnica fica com a gente, e usamos ferramentas modernas e confiáveis, escolhidas de acordo com o que faz mais sentido pra você.',
  },
  {
    q: 'Consigo acompanhar o andamento do meu projeto?',
    a: 'Sim! Você acompanha tudo de perto, com conversas semanais para mostrar o que já foi feito, o que vem a seguir e se precisamos de alguma coisa sua. Nada de ficar no escuro.',
  },
  {
    q: 'E depois que o projeto for entregue?',
    a: 'A gente continua por perto. Oferecemos um período de suporte após o lançamento para tirar dúvidas e ajustar o que for preciso, e se você quiser seguir evoluindo o projeto, estamos juntos nessa.',
  },
  {
    q: 'Vocês fazem projetos pequenos também?',
    a: 'Fazemos, sim. Atendemos desde ajustes rápidos, que levam poucas semanas, até projetos maiores que duram alguns meses. O que importa é a gente estar alinhado sobre o que você precisa, seja grande ou pequeno.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section id="faq">
      <Inner>
        <Reveal>
        <SectionLabel>Dúvidas frequentes</SectionLabel>
        <Title>Tem alguma dúvida? A gente responde.</Title>
        <Subtitle>
          Reunimos as perguntas mais comuns de quem está começando. Se a sua não estiver aqui, é só chamar.
        </Subtitle>
        </Reveal>
        <List>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 90}>
            <Item $open={open === i} onMouseMove={trackPointer}>
              <Question
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {f.q}
                <ChevronIcon $open={open === i} aria-hidden>▾</ChevronIcon>
              </Question>
              <Answer $open={open === i} aria-hidden={open !== i}>
                <AnswerClip>
                  <AnswerInner $open={open === i}>{f.a}</AnswerInner>
                </AnswerClip>
              </Answer>
            </Item>
            </Reveal>
          ))}
        </List>
      </Inner>
    </Section>
  )
}