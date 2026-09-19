import type { ReactNode } from 'react'
import styled from 'styled-components'
import { spotlight, trackPointer } from '../lib/effects'
import { Reveal } from './Reveal'

const Section = styled.section`
  position: relative;
  overflow: hidden;
  scroll-margin-top: 64px;
  background: #233047;
  padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem);

  // luzes suaves nos cantos
  &::before {
    content: '';
    position: absolute;
    top: -180px;
    left: -140px;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 209, 217, 0.12), transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -220px;
    right: -160px;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 209, 217, 0.08), transparent 70%);
    pointer-events: none;
  }
`

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem 4rem;
  align-items: end;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const Title = styled.h2`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #e6ebf0;
  margin: 0;
`

const Sub = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #c8d1d9;
  opacity: 0.8;
  margin: 0;
  max-width: 440px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 1.25rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin: 0 auto;
  }
`

// cada card ocupa 6 linhas (ícone, título, "ideal", texto, lista, rodapé)
// e as linhas são compartilhadas: tudo alinha mesmo com textos de tamanhos diferentes
const Cell = styled(Reveal)`
  @supports (grid-template-rows: subgrid) {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 6;
  }

  @media (max-width: 960px) {
    margin-bottom: 1.25rem;
  }
`

const IconBox = styled.div`
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border-radius: 16px;
  color: #c8d1d9;
  background: rgba(200, 209, 217, 0.08);
  border: 1px solid rgba(200, 209, 217, 0.18);
  transition: background 0.35s ease, color 0.35s ease, transform 0.35s ease;
`

const Card = styled.article`
  ${spotlight}
  --spot: rgba(200, 209, 217, 0.13);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem 1.75rem 1.75rem;

  @supports (grid-template-rows: subgrid) {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 6;
  }

  border-radius: 22px;
  background: linear-gradient(160deg, rgba(200, 209, 217, 0.09), rgba(200, 209, 217, 0.03));
  border: 1px solid rgba(200, 209, 217, 0.14);
  transition: transform 0.35s cubic-bezier(0.22, 0.7, 0.2, 1), border-color 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(200, 209, 217, 0.34);
  }

  &:hover ${IconBox} {
    background: #c8d1d9;
    color: #233047;
    transform: rotate(-6deg) scale(1.05);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover ${IconBox} {
      transform: none;
    }
  }
`

const CardTitle = styled.h3`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #e6ebf0;
  margin: 0 0 0.4rem;
`

const Ideal = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8aa2c9;
  margin: 0 0 1.1rem;
`

const Desc = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #c8d1d9;
  opacity: 0.82;
  margin: 0;
`

const List = styled.ul`
  list-style: none;
  display: grid;
  // sem isso a linha esticada distribui a sobra entre os itens
  align-content: start;
  gap: 0.8rem;
  margin: 1.6rem 0 2rem;
  padding: 0;
`

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
  color: #c8d1d9;
  opacity: 0.92;

  svg {
    flex-shrink: 0;
    margin-top: 0.2rem;
    color: #8aa2c9;
  }
`

const Foot = styled.div`
  margin-top: auto;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(200, 209, 217, 0.12);
`

const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.25s ease;

  ${Card}:hover & {
    transform: translateX(5px);
  }
`

const CardLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: #e6ebf0;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid #c8d1d9;
    outline-offset: 4px;
    border-radius: 4px;
  }
`

const icon = (children: ReactNode) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
    >
        {children}
    </svg>
)

const Check = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const services = [
    {
        title: 'Landing Pages',
        ideal: 'Ideal para autônomos e lançamentos',
        desc: 'Uma página única, direta e pensada para transformar visitante em cliente. Perfeita para divulgar um serviço, um produto ou uma promoção.',
        items: [
            'Visual sob medida, com a cara da sua marca',
            'Botão de WhatsApp e formulário de contato',
            'Funciona bem no celular e carrega rápido',
            'Endereço próprio, como seunegocio.com.br',
        ],
        svg: icon(
            <>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </>,
        ),
    },
    {
        title: 'Sistemas personalizados',
        ideal: 'Ideal para lojistas e empresas',
        desc: 'Ferramentas feitas do jeito que o seu negócio funciona, para trocar planilhas e anotações soltas por algo organizado e fácil de usar.',
        items: [
            'Agendamentos, pedidos, estoque e clientes',
            'Loja virtual com Pix, cartão e boleto',
            'Acesso pelo computador e pelo celular',
            'Cresce junto com o seu negócio',
        ],
        svg: icon(
            <>
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
            </>,
        ),
    },
    {
        title: 'Sites institucionais',
        ideal: 'Ideal para empresas e estabelecimentos',
        desc: 'O cartão de visitas da sua empresa na internet: mostra quem você é, o que faz e como as pessoas chegam até você.',
        items: [
            'Várias páginas: início, serviços, sobre e contato',
            'Preparado para aparecer no Google',
            'Mapa, horários e WhatsApp em destaque',
            'Passa a credibilidade que o seu negócio merece',
        ],
        svg: icon(
            <>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </>,
        ),
    },
]

export function Services() {
    return (
        <Section id="services">
            <Inner>
                <Reveal>
                    <Header>
                        <Title>
                            O que a gente faz<br />pelo seu negócio
                        </Title>
                        <Sub>
                            Cada projeto é feito do jeito que o seu negócio precisa. Não sabe qual escolher? A gente conversa e indica o melhor caminho.
                        </Sub>
                    </Header>
                </Reveal>

                <Grid>
                    {services.map((s, i) => (
                        <Cell key={s.title} delay={i * 130} scale={0.97}>
                            <Card onMouseMove={trackPointer}>
                                <IconBox>{s.svg}</IconBox>
                                <CardTitle>{s.title}</CardTitle>
                                <Ideal>{s.ideal}</Ideal>
                                <Desc>{s.desc}</Desc>
                                <List>
                                    {s.items.map((item) => (
                                        <Item key={item}>
                                            <Check />
                                            {item}
                                        </Item>
                                    ))}
                                </List>
                                <Foot>
                                    <CardLink href="#cta">
                                        Quero saber mais <Arrow>→</Arrow>
                                    </CardLink>
                                </Foot>
                            </Card>
                        </Cell>
                    ))}
                </Grid>
            </Inner>
        </Section>
    )
}