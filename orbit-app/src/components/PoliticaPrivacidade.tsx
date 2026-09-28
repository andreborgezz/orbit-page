import { LegalPage, Block, Heading, Text, List, Item, contactEmail } from './LegalLayout'

const updatedAt = '20 de setembro de 2026'

// ajuste por quanto tempo você guarda orçamentos que não viraram projeto
const budgetRetention = '12 meses'

export function PoliticaPrivacidade() {
    return (
        <LegalPage title="Política de Privacidade" updatedAt={updatedAt}>
            <Text>
                Esta política explica, de forma simples, quais dados pessoais a Orbit recebe, para que os usamos, com quem compartilhamos e quais são os seus direitos. Ela segue a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
            </Text>

            <Block>
                <Heading>Quem somos</Heading>
                <Text>
                    A Orbit é o nome sob o qual André Borges presta serviços de criação de sites, landing pages e sistemas. André Borges é quem decide o que fazer com os dados pessoais tratados aqui (o que a lei chama de controlador). Para qualquer assunto de privacidade, o contato é <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                </Text>
            </Block>

            <Block>
                <Heading>Quais dados recebemos</Heading>
                <Text>
                    Hoje o site não tem formulário nem cadastro. O contato acontece pelo WhatsApp, pelo e-mail ou pelas redes sociais. Por isso, os dados chegam de três formas:
                </Text>
                <List>
                    <Item>
                        <strong>Quando você fala com a gente:</strong> seu nome, seu número de telefone ou WhatsApp, seu e-mail e o que você contar sobre o seu negócio e o projeto que tem em mente.
                    </Item>
                    <Item>
                        <strong>Se você contratar um serviço:</strong> também podemos pedir CPF ou CNPJ, endereço e dados de cobrança, para fazer o contrato, o recibo e receber o pagamento.
                    </Item>
                    <Item>
                        <strong>Quando você navega no site:</strong> estatísticas de uso, como o endereço e o título da página, de onde você veio, o tamanho da tela, o idioma do navegador e os cliques nos botões de contato. Isso é feito sem cookies, como explicamos na <a href="/cookies">Política de Cookies</a>. A empresa que hospeda o site também pode registrar dados técnicos de acesso, como o endereço IP, para o funcionamento e a segurança da página.
                    </Item>
                </List>
                <Text>
                    Não pedimos dados sensíveis, como informações de saúde, religião ou opinião política. Por favor, não envie esse tipo de informação.
                </Text>
            </Block>

            <Block>
                <Heading>Para que usamos os dados</Heading>
                <List>
                    <Item>
                        <strong>Responder você e preparar orçamentos.</strong> Você pediu contato antes de contratar (base legal: procedimentos preliminares de um contrato, a pedido seu).
                    </Item>
                    <Item>
                        <strong>Prestar o serviço contratado:</strong> combinar prazos, desenvolver, entregar e dar suporte (base legal: execução de contrato).
                    </Item>
                    <Item>
                        <strong>Cobrar, emitir recibos e cumprir obrigações fiscais</strong> (base legal: cumprimento de obrigação legal).
                    </Item>
                    <Item>
                        <strong>Entender como o site é usado e melhorá-lo,</strong> com números gerais que não identificam você (base legal: legítimo interesse).
                    </Item>
                    <Item>
                        <strong>Guardar o histórico da nossa conversa</strong> para nos defendermos em caso de disputa (base legal: exercício regular de direitos).
                    </Item>
                </List>
                <Text>Não vendemos os seus dados e só os usamos para o que está listado acima.</Text>
            </Block>

            <Block>
                <Heading>Com quem compartilhamos</Heading>
                <Text>Compartilhamos apenas o necessário com empresas que ajudam a manter o serviço funcionando:</Text>
                <List>
                    <Item>o WhatsApp e as redes sociais (Meta), quando a conversa acontece por lá;</Item>
                    <Item>o provedor de e-mail que usamos;</Item>
                    <Item>a empresa que hospeda o site (Vercel);</Item>
                    <Item>a ferramenta de estatísticas do site (Umami);</Item>
                    <Item>
                        ferramentas de trabalho, como armazenamento de arquivos, reuniões online e pagamentos, quando forem necessárias para o seu projeto.
                    </Item>
                </List>
                <Text>Também podemos compartilhar dados com autoridades, quando a lei exigir.</Text>
            </Block>

            <Block>
                <Heading>Dados fora do Brasil</Heading>
                <Text>
                    Algumas dessas empresas têm servidores fora do Brasil, como nos Estados Unidos e na Europa. Quando isso acontece, escolhemos serviços que declaram adotar medidas de proteção compatíveis com a LGPD.
                </Text>
            </Block>

            <Block>
                <Heading>Por quanto tempo guardamos</Heading>
                <List>
                    <Item>
                        <strong>Conversas de orçamento que não viraram projeto:</strong> por até {budgetRetention}.
                    </Item>
                    <Item>
                        <strong>Dados de clientes:</strong> durante o contrato e pelo prazo que a lei exigir, por exemplo para fins fiscais e contábeis.
                    </Item>
                    <Item>
                        <strong>Estatísticas do site:</strong> são números gerais e não identificam você.
                    </Item>
                </List>
                <Text>Passado esse tempo, apagamos os dados ou os tornamos anônimos.</Text>
            </Block>

            <Block>
                <Heading>Segurança</Heading>
                <Text>
                    Adotamos medidas para proteger os seus dados, como restringir o acesso às contas e usar senhas fortes. Nenhum sistema é totalmente seguro. Se ocorrer um incidente que possa causar risco relevante a você, avisaremos você e a ANPD, como a lei exige.
                </Text>
            </Block>

            <Block>
                <Heading>Seus direitos</Heading>
                <Text>A LGPD garante a você, entre outros direitos:</Text>
                <List>
                    <Item>saber se tratamos os seus dados e ter acesso a eles;</Item>
                    <Item>corrigir dados incompletos ou desatualizados;</Item>
                    <Item>pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados fora da lei;</Item>
                    <Item>pedir a portabilidade dos seus dados para outro fornecedor;</Item>
                    <Item>saber com quem compartilhamos os seus dados;</Item>
                    <Item>retirar o consentimento, quando o tratamento depender dele, e se opor a um tratamento que considere irregular.</Item>
                </List>
                <Text>
                    Para exercer qualquer um deles, escreva para <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Respondemos em até 15 dias. Se achar que o seu pedido não foi atendido, você também pode reclamar à ANPD (Autoridade Nacional de Proteção de Dados), em{' '}
                    <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">
                        gov.br/anpd
                    </a>
                    .
                </Text>
            </Block>

            <Block>
                <Heading>Crianças e adolescentes</Heading>
                <Text>
                    Nossos serviços são voltados a pessoas e negócios adultos. Não coletamos dados de crianças e adolescentes de propósito. Se você acha que isso aconteceu, avise pelo e-mail de contato e apagaremos.
                </Text>
            </Block>

            <Block>
                <Heading>Cookies</Heading>
                <Text>
                    Veja como o site trata cookies e ferramentas de medição na nossa <a href="/cookies">Política de Cookies</a>.
                </Text>
            </Block>

            <Block>
                <Heading>Mudanças nesta política</Heading>
                <Text>
                    Podemos atualizar esta política, por exemplo se o site passar a ter formulário ou novas ferramentas. A data da última atualização fica no topo desta página, e mudanças importantes serão avisadas no próprio site.
                </Text>
            </Block>

            <Block>
                <Heading>Fale com a gente</Heading>
                <Text>
                    Dúvidas ou pedidos sobre os seus dados: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. O responsável é André Borges, que atua sob o nome Orbit.
                </Text>
            </Block>
        </LegalPage>
    )
}