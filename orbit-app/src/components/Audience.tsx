import styled from 'styled-components'
import { spotlight, trackPointer } from '../lib/effects'
import { Reveal } from './Reveal'

const Section = styled.section`
  scroll-margin-top: 64px;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);

  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 520px;
    height: 520px;
    background: radial-gradient(circle, rgba(35, 48, 71, 0.05), transparent 70%);
    pointer-events: none;
  }
`

const Inner = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 4rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(35, 48, 71, 0.12);
`

const Eyebrow = styled.span`
  display: block;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #233047;
  opacity: 0.45;
  margin-bottom: 1.25rem;
`

const Title = styled.h2`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #233047;
  margin: 0;
  line-height: 1.1;
  max-width: 720px;
`

const Muted = styled.span`
  color: rgba(35, 48, 71, 0.35);
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Arrow = styled.span`
  grid-column: 3;
  align-self: center;
  font-size: 1.25rem;
  color: #233047;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`

const ListItem = styled.div<{ $visible: boolean; $last: boolean }>`
  ${spotlight}
  --spot: rgba(35, 48, 71, 0.05);
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  gap: 2rem;
  padding: 2.75rem 1.5rem;
  margin: 0 -1.5rem;
  border-radius: 16px;
  transition: background 0.3s ease, padding-left 0.3s ease;

  // linha que se desenha da esquerda pra direita
  &::after {
    content: '';
    position: absolute;
    left: 1.5rem;
    right: 1.5rem;
    bottom: 0;
    height: 1px;
    display: ${({ $last }) => ($last ? 'none' : 'block')};
    background: rgba(35, 48, 71, 0.12);
    transform-origin: left;
    transform: scaleX(${({ $visible }) => ($visible ? 1 : 0)});
    transition: transform 1.1s cubic-bezier(0.65, 0, 0.35, 1) 0.25s;
  }

  &:hover {
    background: rgba(200, 209, 217, 0.35);
    padding-left: 2rem;
  }

  &:hover ${Arrow} {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem 1rem;
    margin: 0 -1rem;

    &::after {
      left: 1rem;
      right: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`

const ItemHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
`

const ItemIndex = styled.span`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #233047;
  opacity: 0.35;
`

const ItemTitle = styled.h3`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #233047;
  margin: 0;
`

const ItemDesc = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #233047;
  opacity: 0.55;
  margin: 0;
  max-width: 600px;
`

const items = [
  {
    title: 'Autônomos',
    desc: 'Você já atende, já tem clientes e sabe o valor do seu trabalho. Falta uma presença própria à altura: site com domínio seu, agendamento ou venda funcionando e uma imagem profissional, sem depender só de indicação e rede social.',
  },
  {
    title: 'Empresas e estabelecimentos',
    desc: 'Seu negócio opera todo dia, mas ainda depende de planilha, WhatsApp e improviso. Criamos sites e sistemas que organizam a operação, aproximam o cliente e passam a credibilidade que o seu estabelecimento merece.',
  },
  {
    title: 'Lojistas',
    desc: 'Você já vende pelo Instagram ou marketplace e sabe que precisa de algo próprio. Uma loja com seu domínio, pagamento real integrado (Pix, cartão, boleto), catálogo organizado e checkout que não espanta cliente. Sem mensalidade de plataforma, sem ficar refém de algoritmo.',
  },
]

export function Audience() {
  return (
    <Section id="audience">
      <Inner>
        <Reveal>
        <Header>
          <Eyebrow>Para quem</Eyebrow>
          <Title>
            Feito para quem já vende <Muted>e quer crescer com o que é seu.</Muted>
          </Title>
        </Header>
        </Reveal>
        <List>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              {(visible) => (
                <ListItem
                  $visible={visible}
                  $last={i === items.length - 1}
                  onMouseMove={trackPointer}
                >
                  <ItemHead>
                    <ItemIndex>{String(i + 1).padStart(2, '0')}</ItemIndex>
                    <ItemTitle>{item.title}</ItemTitle>
                  </ItemHead>
                  <ItemDesc>{item.desc}</ItemDesc>
                  <Arrow aria-hidden>→</Arrow>
                </ListItem>
              )}
            </Reveal>
          ))}
        </List>
      </Inner>
    </Section>
  )
}
