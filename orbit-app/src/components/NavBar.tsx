import { useEffect, useState } from 'react'
import styled from 'styled-components'
import orbitIcon from '../assets/icon-png.jpg'

const links = [
  { id: 'audience', label: 'Para quem' },
  { id: 'services', label: 'Serviços' },
  { id: 'process', label: 'Como funciona' },
  { id: 'faq', label: 'FAQ' },
  { id: 'about', label: 'Sobre' },
]

// $solid: fundo cheio (rolou a página ou menu aberto)
const Nav = styled.nav<{ $solid: boolean; $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  height: 64px;
  border-radius: ${({ $open }) => ($open ? '0' : '0 0 20px 20px')};
  transition:
    border-radius 0.25s ease,
    background 0.35s ease,
    backdrop-filter 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;

  // topo: quase invisível
  background: ${({ $solid, $open }) => ($open ? '#c8d1d9' : $solid ? 'rgba(200, 209, 217, 0.9)' : 'rgba(200, 209, 217, 0)')};
  backdrop-filter: ${({ $solid }) => ($solid ? 'blur(14px)' : 'blur(0px)')};
  -webkit-backdrop-filter: ${({ $solid }) => ($solid ? 'blur(14px)' : 'blur(0px)')};
  border-bottom: 1px solid ${({ $solid, $open }) => ($solid && !$open ? 'rgba(35, 48, 71, 0.1)' : 'transparent')};
  box-shadow: ${({ $solid, $open }) => ($solid && !$open ? '0 8px 24px rgba(35, 48, 71, 0.08)' : 'none')};
`

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
`

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.22, 0.7, 0.2, 1);

  ${Logo}:hover & {
    transform: rotate(360deg);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const LogoText = styled.span`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #233047;
  letter-spacing: -0.02em;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.25rem, 2.4vw, 2rem);

  @media (max-width: 900px) {
    display: none;
  }
`

const NavLink = styled.a<{ $active?: boolean }>`
  position: relative;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #233047;
  text-decoration: none;
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  transition: opacity 0.2s;

  // sublinhado que cresce da esquerda
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    border-radius: 2px;
    background: #233047;
    transform-origin: left;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    opacity: 1;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`

const NavCta = styled.a`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  color: #c8d1d9;
  background: #233047;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(35, 48, 71, 0.28);
  }
`

const MenuBtn = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  position: relative;

  @media (max-width: 900px) {
    display: block;
  }

  &:focus-visible {
    outline: 2px solid #233047;
    outline-offset: 2px;
  }
`

const Bar = styled.span<{ $open: boolean; $pos: 'top' | 'mid' | 'bot' }>`
  position: absolute;
  left: 11px;
  right: 11px;
  height: 2px;
  border-radius: 2px;
  background: #233047;
  transition: transform 0.3s ease, opacity 0.2s ease, top 0.3s ease;

  top: ${({ $pos, $open }) => ($pos === 'top' ? ($open ? '20px' : '14px') : $pos === 'mid' ? '20px' : $open ? '20px' : '26px')};
  opacity: ${({ $pos, $open }) => ($pos === 'mid' && $open ? 0 : 1)};
  transform: ${({ $pos, $open }) => ($open ? ($pos === 'top' ? 'rotate(45deg)' : $pos === 'bot' ? 'rotate(-45deg)' : 'none') : 'none')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Panel = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0.75rem clamp(1.5rem, 5vw, 4rem) 1.5rem;
    background: #c8d1d9;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 20px 40px rgba(35, 48, 71, 0.15);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-10px)')};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const PanelLink = styled.a<{ $active?: boolean }>`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #233047;
  text-decoration: none;
  padding: 0.85rem 0.25rem;
  border-bottom: 1px solid rgba(35, 48, 71, 0.1);
  opacity: ${({ $active }) => ($active ? 1 : 0.75)};
`

const PanelCta = styled(NavCta)`
  margin-top: 1rem;
  text-align: center;
  padding: 0.85rem 1.25rem;
  font-size: 1rem;
`

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (window.scrollY < 200) setActive('')
    }
    onScroll() // já checa no mount (caso recarregue no meio da página)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // marca o link da seção que está no meio da tela
  useEffect(() => {
    const els = [...links.map((l) => l.id), 'cta']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <Nav $solid={scrolled || open} $open={open}>
      <Logo href="#" onClick={close}>
        <LogoImg src={orbitIcon} alt="Orbit" />
        <LogoText>Orbit</LogoText>
      </Logo>

      <NavLinks>
        {links.map((l) => (
          <NavLink key={l.id} href={`#${l.id}`} $active={active === l.id}>
            {l.label}
          </NavLink>
        ))}
        <NavCta href="#cta" data-umami-event="Click botão do NavBar">Entrar em contato</NavCta>
      </NavLinks>

      <MenuBtn
        type="button"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
      >
        <Bar $pos="top" $open={open} />
        <Bar $pos="mid" $open={open} />
        <Bar $pos="bot" $open={open} />
      </MenuBtn>

      <Panel id="menu-mobile" $open={open}>
        {links.map((l) => (
          <PanelLink key={l.id} href={`#${l.id}`} $active={active === l.id} onClick={close}>
            {l.label}
          </PanelLink>
        ))}
        <PanelCta href="#cta" onClick={close} data-umami-event="Click botão do NavBar">
          Entrar em contato
        </PanelCta>
      </Panel>
    </Nav>
  )
}
