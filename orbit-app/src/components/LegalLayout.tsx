import { useEffect } from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import orbitIcon from '../assets/icon-png.jpg'
import { PageLoader, markNavigation } from './PageLoader'

// troque pelo seu e-mail de contato (vale para as duas políticas)
export const contactEmail = 'orbit.websolve@gmail.com'

const Page = styled.main`
  min-height: 100vh;
  background: #fafaf9;
  padding: 0 clamp(1.5rem, 5vw, 4rem) 5rem;
`

const Top = styled.header`
  max-width: 720px;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`

const LogoText = styled.span`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #233047;
`

const Back = styled.a`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #233047;
  text-decoration: none;
  opacity: 0.75;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid #233047;
    outline-offset: 3px;
    border-radius: 4px;
  }
`

const Article = styled.article`
  max-width: 720px;
  margin: 2.5rem auto 0;
`

const Title = styled.h1`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #233047;
  margin: 0 0 0.75rem;
`

const Updated = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 0.9rem;
  color: #233047;
  opacity: 0.6;
  margin: 0 0 2.5rem;
`

export const Block = styled.section`
  margin-top: 2.25rem;
`

export const Heading = styled.h2`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #233047;
  margin: 0 0 0.75rem;
`

export const Text = styled.p`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  color: #233047;
  opacity: 0.85;
  margin: 0 0 1rem;

  a {
    color: #233047;
    font-weight: 600;
    text-underline-offset: 3px;
  }
`

export const List = styled.ul`
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.5rem;
`

export const Item = styled.li`
  font-family: 'Open Sans', system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #233047;
  opacity: 0.85;

  strong {
    font-weight: 700;
  }

  a {
    color: #233047;
    font-weight: 600;
    text-underline-offset: 3px;
  }
`

type Props = {
    title: string
    updatedAt: string
    children: ReactNode
}

export function LegalPage({ title, updatedAt, children }: Props) {
    useEffect(() => {
        document.title = `${title} | Orbit`
        window.scrollTo(0, 0)
    }, [title])

    return (
        <Page>
            <PageLoader always />
            <Top>
                <Logo href="/" onClick={markNavigation}>
                    <LogoImg src={orbitIcon} alt="" />
                    <LogoText>Orbit</LogoText>
                </Logo>
                <Back href="/" onClick={markNavigation}>← Voltar ao site</Back>
            </Top>

            <Article>
                <Title>{title}</Title>
                <Updated>Última atualização: {updatedAt}</Updated>
                {children}
            </Article>
        </Page>
    )
}