import styled from 'styled-components'
import orbitIcon from '../assets/icon-png.jpg'
import { Reveal } from './Reveal'

const FooterEl = styled.footer`
  position: relative;
  overflow: hidden;
  background: #233047;
  padding: clamp(3.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 2rem;

  // brilho suave no canto, mesma linguagem das outras seções
  &::before {
    content: '';
    position: absolute;
    top: -160px;
    right: -120px;
    width: 460px;
    height: 460px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200, 209, 217, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`

const Inner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding-bottom: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const Brand = styled.div`
  @media (max-width: 900px) {
    grid-column: 1 / -1;
  }
`

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  margin-bottom: 1.25rem;
`

const LogoImg = styled.img`
  width: 34px;
  height: 34px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;
`

const LogoText = styled.span`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #e6ebf0;
`

const Description = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #c8d1d9;
  opacity: 0.75;
  margin: 0 0 1.25rem;
  max-width: 340px;
`

const Tagline = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c8d1d9;
  opacity: 0.5;
  margin: 0;
`

const Column = styled.div``

const ColumnTitle = styled.h4`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #e6ebf0;
  margin: 0 0 1.25rem;
`

const FooterLink = styled.a`
  display: block;
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.9rem;
  color: #c8d1d9;
  opacity: 0.65;
  text-decoration: none;
  margin-bottom: 0.85rem;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 1;
    transform: translateX(3px);
  }
`

const Socials = styled.div`
  display: flex;
  gap: 0.6rem;
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(200, 209, 217, 0.2);
  color: #c8d1d9;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: rgba(200, 209, 217, 0.1);
    border-color: rgba(200, 209, 217, 0.45);
    transform: translateY(-2px);
  }
`

const Bottom = styled.div`
  border-top: 1px solid rgba(200, 209, 217, 0.15);
  padding-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

const Copy = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.8rem;
  color: #c8d1d9;
  opacity: 0.55;
  margin: 0;
`

const Made = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.8rem;
  color: #c8d1d9;
  opacity: 0.55;
  margin: 0;
`

// ícones em svg pra não precisar instalar lib
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-10 6L2 7" />
  </svg>
)

// troca pelos seus links reais
const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andre-borgess/', icon: <LinkedinIcon /> },
  { label: 'GitHub', href: 'https://github.com/andreborgezz', icon: <GithubIcon /> },
  { label: 'Instagram', href: 'https://instagram.com/orbitdev.io', icon: <InstagramIcon /> },
  { label: 'E-mail', href: 'mailto:orbit.websolve@gmail.com', icon: <MailIcon /> },
]

export function Footer() {
  return (
    <FooterEl>
      <Inner>
        <Reveal>
          <Top>
            <Brand>
              <Logo href="#">
                <LogoImg src={orbitIcon} alt="" />
                <LogoText>Orbit</LogoText>
              </Logo>
              <Description>
                Sites, lojas e sistemas sob medida para o seu negócio.
              </Description>
              <Tagline>Desenvolvimento de Software</Tagline>
            </Brand>

            <Column>
              <ColumnTitle>Navegação</ColumnTitle>
              <FooterLink href="#audience">Para quem</FooterLink>
              <FooterLink href="#services">Serviços</FooterLink>
              <FooterLink href="#process">Como funciona</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
              <FooterLink href="#about">Sobre</FooterLink>
            </Column>

            <Column>
              <ColumnTitle>Legal</ColumnTitle>
              <FooterLink href="/privacidade">Política de Privacidade</FooterLink>
              <FooterLink href="/cookies">Política de Cookies</FooterLink>
              <FooterLink href="/termos">Termos de Uso</FooterLink>
            </Column>

            <Column>
              <ColumnTitle>Social</ColumnTitle>
              <Socials>
                {socials.map((s) => (
                  <SocialLink
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </SocialLink>
                ))}
              </Socials>
            </Column>
          </Top>
        </Reveal>

        <Reveal delay={150}>
          <Bottom>
            <Copy>© {new Date().getFullYear()} Orbit — Todos os direitos reservados</Copy>
            <Made>Feito por André Borges</Made>
          </Bottom>
        </Reveal>
      </Inner>
    </FooterEl>
  )
}