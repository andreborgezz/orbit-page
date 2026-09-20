import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { spotlight, trackPointer } from '../lib/effects'
import { Reveal } from './Reveal'

// celular com tela curta (a maioria, com a barra do navegador aparecendo)
const short = '@media (max-width: 600px) and (max-height: 760px)'

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

  // celular: seção compacta pra caber inteira na tela
  @media (max-width: 600px) {
    padding-block: 1.5rem;
  }

  ${short} {
    padding-block: 1.1rem;
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

  @media (max-width: 600px) {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  ${short} {
    margin-bottom: 0.75rem;
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

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }

  ${short} {
    font-size: 1.45rem;
  }
`

const Sub = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #c8d1d9;
  opacity: 0.8;
  margin: 0;
  max-width: 440px;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    line-height: 1.55;
  }

  // em tela curta o subtítulo sai pra caber o card inteiro (o CTA de cada card continua)
  ${short} {
    display: none;
  }
`

const Carousel = styled.div`
  @media (max-width: 960px) {
    max-width: 560px;
    margin: 0 auto;
  }
`

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 1.25rem;

  // celular e tablet: carrossel, um card por vez
  @media (max-width: 960px) {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    // folga pro card não ser cortado quando sobe
    padding: 12px 0 16px;
    margin: -12px 0 -16px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

// desktop: cada card ocupa 6 linhas (ícone, título, "ideal", texto, lista, rodapé)
// e as linhas são compartilhadas: tudo alinha mesmo com textos de tamanhos diferentes
const Cell = styled(Reveal)`
  @supports (grid-template-rows: subgrid) {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 6;
  }

  @media (max-width: 960px) {
    && {
      display: flex;
      flex-direction: column;
      grid-row: auto;
      grid-template-rows: none;
      flex: 0 0 100%;
      min-width: 0;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      // no carrossel os cards de fora não passam pela animação de entrada
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
    }
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

  // celular: ícone pequeno ao lado do título
  @media (max-width: 600px) {
    grid-column: 1;
    grid-row: 1 / span 2;
    align-self: center;
    width: 44px;
    height: 44px;
    margin: 0;
    border-radius: 13px;
  }
`

const Card = styled.article`
  ${spotlight}
  --spot: rgba(200, 209, 217, 0.13);
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 2rem 1.75rem 1.75rem;
  border-radius: 22px;
  background: linear-gradient(160deg, rgba(200, 209, 217, 0.09), rgba(200, 209, 217, 0.03));
  border: 1px solid rgba(200, 209, 217, 0.14);
  transition: transform 0.35s cubic-bezier(0.22, 0.7, 0.2, 1), border-color 0.35s ease;

  @supports (grid-template-rows: subgrid) {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 6;
  }

  // carrossel: volta pra coluna simples e preenche a altura do slide
  @media (max-width: 960px) {
    display: flex;
    grid-template-rows: none;
    grid-row: auto;
    height: auto;
    flex: 1;
  }

  // celular: ícone | título e "ideal" na primeira linha; a lista ocupa a folga
  // e empurra o rodapé pra baixo, então o rodapé fica alinhado nos 3 slides
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 44px 1fr;
    grid-template-rows: auto auto auto 1fr auto;
    column-gap: 0.85rem;
    padding: 1.15rem 1.1rem 1rem;
    border-radius: 18px;
  }

  ${short} {
    padding: 1rem 1rem 0.9rem;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-6px);
      border-color: rgba(200, 209, 217, 0.34);
    }

    &:hover ${IconBox} {
      background: #c8d1d9;
      color: #233047;
      transform: rotate(-6deg) scale(1.05);
    }
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

  @media (max-width: 600px) {
    grid-column: 2;
    grid-row: 1;
    align-self: end;
    font-size: 1.12rem;
    line-height: 1.2;
    margin: 0;
  }

  ${short} {
    font-size: 1.05rem;
  }
`

const Ideal = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8aa2c9;
  margin: 0 0 1.1rem;

  @media (max-width: 600px) {
    grid-column: 2;
    grid-row: 2;
    align-self: start;
    font-size: 0.76rem;
    line-height: 1.35;
    margin: 0.15rem 0 0;
  }

  ${short} {
    font-size: 0.72rem;
  }
`

const Desc = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #c8d1d9;
  opacity: 0.82;
  margin: 0;

  @media (max-width: 600px) {
    grid-column: 1 / -1;
    grid-row: 3;
    font-size: 0.88rem;
    line-height: 1.55;
    margin-top: 0.95rem;
  }

  ${short} {
    font-size: 0.84rem;
    line-height: 1.5;
    margin-top: 0.8rem;
  }
`

const List = styled.ul`
  list-style: none;
  display: grid;
  // sem isso a linha esticada distribui a sobra entre os itens
  align-content: start;
  gap: 0.8rem;
  margin: 1.6rem 0 2rem;
  padding: 0;

  @media (max-width: 600px) {
    grid-column: 1 / -1;
    grid-row: 4;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  ${short} {
    gap: 0.4rem;
    margin: 0.8rem 0;
  }
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

  @media (max-width: 600px) {
    font-size: 0.84rem;
    line-height: 1.4;
    gap: 0.6rem;

    svg {
      margin-top: 0.12rem;
    }
  }

  ${short} {
    font-size: 0.8rem;
    line-height: 1.38;
  }
`

const Foot = styled.div`
  margin-top: auto;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(200, 209, 217, 0.12);

  @media (max-width: 600px) {
    grid-column: 1 / -1;
    grid-row: 5;
    margin-top: 0;
    padding-top: 0.85rem;
  }

  ${short} {
    padding-top: 0.7rem;
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

  @media (max-width: 600px) {
    font-size: 0.88rem;
  }

  &:focus-visible {
    outline: 2px solid #c8d1d9;
    outline-offset: 4px;
    border-radius: 4px;
  }
`

// ficam em cima dos cards: o card é alto, então com as setas embaixo
// o título do próximo card ficaria escondido atrás da barra depois do clique
const Controls = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 600px) {
    margin-bottom: 0.75rem;
  }

  ${short} {
    margin-bottom: 0.6rem;
  }
`

const Arrows = styled.div`
  display: flex;
  gap: 0.6rem;
`

const NavBtn = styled.button`
  width: 46px;
  height: 46px;
  padding: 0;

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: #e6ebf0;
  background: rgba(200, 209, 217, 0.06);
  border: 1px solid rgba(200, 209, 217, 0.3);
  transition: background 0.25s ease, color 0.25s ease, opacity 0.25s ease, transform 0.2s ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: #c8d1d9;
      color: #233047;
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.93);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }

  &:focus-visible {
    outline: 2px solid #c8d1d9;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Dots = styled.div`
  display: flex;
  align-items: center;
`

const Dot = styled.button<{ $active: boolean }>`
  padding: 14px 5px;
  margin-left: -1px;
  border: none;
  background: none;
  cursor: pointer;

  // o pontinho visível é o ::before, o botão em volta só aumenta a área de toque
  &::before {
    content: '';
    display: block;
    height: 8px;
    width: ${({ $active }) => ($active ? '28px' : '8px')};
    border-radius: 99px;
    background: #c8d1d9;
    opacity: ${({ $active }) => ($active ? 1 : 0.3)};
    transition: width 0.3s ease, opacity 0.3s ease;
  }

  &:focus-visible {
    outline: 2px solid #c8d1d9;
    outline-offset: 2px;
    border-radius: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
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
  const scroller = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const last = services.length - 1

  // descobre qual card está na tela (vale pro arrasto com o dedo também)
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const max = el.scrollWidth - el.clientWidth
      if (max <= 0) return // desktop: nada rola
      const step = max / last
      setIndex(Math.min(last, Math.max(0, Math.round(el.scrollLeft / step))))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [last])

  const goTo = (i: number) => {
    const el = scroller.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: card.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }

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

        <Carousel>
          <Controls>
            <Dots>
              {services.map((s, i) => (
                <Dot
                  key={s.title}
                  type="button"
                  $active={i === index}
                  aria-label={`Ir para ${s.title}`}
                  aria-current={i === index}
                  onClick={() => goTo(i)}
                />
              ))}
            </Dots>

            <Arrows>
              <NavBtn type="button" aria-label="Serviço anterior" disabled={index === 0} onClick={() => goTo(index - 1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </NavBtn>
              <NavBtn type="button" aria-label="Próximo serviço" disabled={index === last} onClick={() => goTo(index + 1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </NavBtn>
            </Arrows>
          </Controls>

          <Grid ref={scroller}>
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
                    <CardLink href="#cta" data-umami-event={`Click Saber Mais | Service - ${s.title}`}>
                      Quero saber mais
                    </CardLink>
                  </Foot>
                </Card>
              </Cell>
            ))}
          </Grid>
        </Carousel>
      </Inner>
    </Section>
  )
}