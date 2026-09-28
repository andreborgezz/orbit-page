import { LegalPage, Block, Heading, Text, List, Item, contactEmail } from './LegalLayout'

const updatedAt = '20 de setembro de 2026'

export function PoliticaCookies() {
    return (
        <LegalPage title="Política de Cookies" updatedAt={updatedAt}>
            <Block>
                <Heading>O que são cookies</Heading>
                <Text>
                    Cookies são pequenos arquivos que um site pode salvar no seu navegador. Eles servem para lembrar informações, como um login ou uma preferência, mas também podem ser usados para acompanhar a sua navegação e mostrar anúncios.
                </Text>
            </Block>

            <Block>
                <Heading>O que este site faz</Heading>
                <Text>
                    O site da Orbit não usa cookies de rastreamento, de publicidade ou de perfil de navegação. Também não usamos ferramentas como Google Analytics ou Pixel do Meta. Por isso, você não vê um aviso de cookies quando entra.
                </Text>
                <Text>
                    O site guarda no seu navegador apenas uma informação técnica, para não repetir a animação de abertura na mesma visita. Ela some quando você fecha a aba.
                </Text>
                <Text>
                    A empresa que hospeda o site pode usar recursos estritamente necessários ao funcionamento e à segurança da página. Eles não servem para acompanhar você.
                </Text>
            </Block>

            <Block>
                <Heading>Como medimos as visitas</Heading>
                <Text>
                    Para saber quantas pessoas visitam o site e quais botões de contato são mais usados, utilizamos o{' '}
                    <a href="https://umami.is" target="_blank" rel="noopener noreferrer">
                        Umami
                    </a>
                    , uma ferramenta de estatísticas que funciona sem cookies.
                </Text>
                <Text>Quando você abre uma página, a ferramenta recebe:</Text>
                <List>
                    <Item>o endereço e o título da página;</Item>
                    <Item>o site de onde você veio;</Item>
                    <Item>o tamanho da tela e o idioma do navegador;</Item>
                    <Item>o nome do domínio acessado.</Item>
                </List>
                <Text>Quando você clica em um botão de contato, ela registra que o clique aconteceu.</Text>
                <Text>
                    Usamos essas informações apenas para gerar números gerais, como quantas visitas o site recebe por semana. Segundo o fornecedor, a ferramenta não guarda dados que identifiquem você e não acompanha a sua navegação em outros sites. Os servidores do Umami ficam nos Estados Unidos e na Europa, então esses dados podem ser processados fora do Brasil.
                </Text>
                <Text>
                    Extensões de privacidade e bloqueadores de anúncios costumam impedir essa medição, e o site continua funcionando normalmente.
                </Text>
            </Block>

            <Block>
                <Heading>Links para outros sites</Heading>
                <Text>
                    O site tem links para o WhatsApp e para redes sociais da Orbit. Ao clicar, você sai do nosso site e passa a seguir as regras de cookies e de privacidade de cada um deles, que a Orbit não controla.
                </Text>
            </Block>

            <Block>
                <Heading>Como controlar cookies no seu navegador</Heading>
                <Text>
                    Você pode ver, bloquear ou apagar cookies de qualquer site pelas configurações do seu navegador. O caminho muda em cada um (Chrome, Safari, Firefox, Edge), e a página de ajuda de cada navegador explica o passo a passo.
                </Text>
            </Block>

            <Block>
                <Heading>Mudanças nesta política</Heading>
                <Text>
                    Se a Orbit passar a usar cookies ou outras ferramentas de medição, esta política será atualizada e, quando a lei exigir, pediremos o seu consentimento antes. A data da última atualização fica no topo desta página.
                </Text>
            </Block>

            <Block>
                <Heading>Fale com a gente</Heading>
                <Text>
                    Tem alguma dúvida sobre esta política? Escreva para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. O responsável por este site é André Borges, que atua sob o nome Orbit.
                </Text>
                <Text>
                    Para saber como tratamos dados pessoais, leia a <a href="/privacidade">Política de Privacidade</a>.
                </Text>
            </Block>
        </LegalPage>
    )
}