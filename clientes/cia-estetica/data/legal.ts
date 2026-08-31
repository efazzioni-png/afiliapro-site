/**
 * ============================================================================
 *  TEXTOS LEGAIS
 * ============================================================================
 *  ⚠️ IMPORTANTE: estes textos são uma base sólida e genérica, alinhada à LGPD
 *     (Lei 13.709/2018). Recomenda-se revisão jurídica antes da publicação, e o
 *     preenchimento da razão social e do CNPJ — que NÃO foram informados e por
 *     isso aparecem como marcadores explícitos abaixo.
 * ============================================================================
 */

import type { ContentBlock } from './blog';

/** ⚠️ PENDENTE — substituir pelos dados oficiais da empresa. */
export const legalEntity = {
  razaoSocial: '[RAZÃO SOCIAL A CONFIRMAR]',
  cnpj: '[CNPJ A CONFIRMAR]',
};

export const privacyPolicy: { updatedAt: string; blocks: ContentBlock[] } = {
  updatedAt: '2026-08-31',
  blocks: [
    {
      paragraphs: [
        'Esta Política de Privacidade descreve como a Cia Estética | Beleza Profissional trata os dados pessoais coletados por meio deste site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
      ],
    },
    {
      heading: '1. Quem é o controlador dos dados',
      paragraphs: [
        `O controlador dos dados é a Cia Estética | Beleza Profissional (${legalEntity.razaoSocial}, CNPJ ${legalEntity.cnpj}), com unidade na Av. das Américas, 500, Sala 304, Condomínio Downtown, Barra da Tijuca, Rio de Janeiro - RJ, CEP 22640-100.`,
      ],
    },
    {
      heading: '2. Quais dados coletamos',
      paragraphs: ['Coletamos apenas os dados necessários para atender você:'],
      list: [
        'Dados que você informa voluntariamente no formulário de contato: nome, WhatsApp, e-mail, área de interesse e mensagem.',
        'Dados de navegação coletados por ferramentas de análise, como páginas visitadas, tempo de permanência, origem do acesso e tipo de dispositivo.',
        'Identificadores de cookies utilizados para medir audiência e desempenho de campanhas.',
      ],
    },
    {
      heading: '3. Para que usamos os dados',
      list: [
        'Responder às suas solicitações sobre cursos, turmas e produtos.',
        'Enviar informações sobre formações, quando houver seu consentimento.',
        'Medir e melhorar a experiência de navegação no site.',
        'Avaliar o desempenho de campanhas de divulgação.',
        'Cumprir obrigações legais e regulatórias.',
      ],
    },
    {
      heading: '4. Compartilhamento',
      paragraphs: [
        'Não vendemos dados pessoais. O compartilhamento ocorre apenas com prestadores de serviço necessários à operação do site — como hospedagem, ferramentas de análise de audiência e plataformas de mensageria — e sempre limitado à finalidade descrita nesta política, ou quando exigido por autoridade competente.',
      ],
    },
    {
      heading: '5. Cookies',
      paragraphs: [
        'Utilizamos cookies para o funcionamento do site e, quando ativadas, para ferramentas de medição de audiência e campanhas. Você pode bloquear ou remover cookies nas configurações do seu navegador; algumas funcionalidades podem ser afetadas.',
      ],
    },
    {
      heading: '6. Por quanto tempo guardamos',
      paragraphs: [
        'Os dados são mantidos pelo tempo necessário ao atendimento da finalidade que motivou a coleta ou pelo prazo exigido por lei. Depois disso, são eliminados ou anonimizados.',
      ],
    },
    {
      heading: '7. Seus direitos',
      paragraphs: ['A LGPD garante a você, a qualquer momento, o direito de:'],
      list: [
        'Confirmar a existência de tratamento de seus dados.',
        'Acessar os dados que possuímos sobre você.',
        'Corrigir dados incompletos, inexatos ou desatualizados.',
        'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.',
        'Revogar o consentimento e solicitar a exclusão dos dados tratados com base nele.',
        'Solicitar a portabilidade dos dados a outro fornecedor.',
      ],
    },
    {
      heading: '8. Segurança',
      paragraphs: [
        'Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda, alteração ou difusão.',
      ],
    },
    {
      heading: '9. Como exercer seus direitos',
      paragraphs: [
        'Para exercer qualquer um dos direitos acima, entre em contato pelos canais oficiais informados na página de contato deste site. Responderemos dentro dos prazos previstos na legislação.',
      ],
    },
    {
      heading: '10. Alterações desta política',
      paragraphs: [
        'Esta política pode ser atualizada. A data da última atualização é sempre indicada no topo desta página.',
      ],
    },
  ],
};

export const termsOfUse: { updatedAt: string; blocks: ContentBlock[] } = {
  updatedAt: '2026-08-31',
  blocks: [
    {
      paragraphs: [
        'Ao navegar neste site, você concorda com os termos descritos abaixo. Recomendamos a leitura atenta antes de utilizar os recursos disponíveis.',
      ],
    },
    {
      heading: '1. Objeto',
      paragraphs: [
        'Este site tem finalidade informativa: apresenta as formações, as áreas de atuação e os canais de contato da Cia Estética | Beleza Profissional, além de conteúdo editorial sobre o mercado da beleza.',
      ],
    },
    {
      heading: '2. Informações sobre cursos',
      paragraphs: [
        'As descrições de cursos apresentadas neste site são informativas. Formato, carga horária, calendário de turmas, valores e condições são confirmados diretamente pela equipe no momento do atendimento e podem ser alterados sem aviso prévio.',
        'Nenhum conteúdo deste site constitui promessa de resultado, de colocação profissional ou de retorno financeiro.',
      ],
    },
    {
      heading: '3. Conteúdo editorial',
      paragraphs: [
        'Os artigos publicados no blog têm caráter informativo e educativo sobre o mercado da estética. Não substituem orientação profissional individualizada nem constituem recomendação médica.',
      ],
    },
    {
      heading: '4. Propriedade intelectual',
      paragraphs: [
        'Marca, logotipo, textos, imagens e demais elementos deste site são protegidos por direitos de propriedade intelectual. A reprodução, total ou parcial, depende de autorização prévia por escrito.',
      ],
    },
    {
      heading: '5. Links externos',
      paragraphs: [
        'Este site pode conter links para páginas de terceiros, como Google Maps e redes sociais. Não nos responsabilizamos pelo conteúdo, pelas práticas de privacidade ou pela disponibilidade desses serviços.',
      ],
    },
    {
      heading: '6. Disponibilidade',
      paragraphs: [
        'Empregamos esforços para manter o site disponível e atualizado, mas não garantimos funcionamento ininterrupto ou livre de falhas, especialmente durante manutenções.',
      ],
    },
    {
      heading: '7. Privacidade',
      paragraphs: [
        'O tratamento de dados pessoais é regido pela Política de Privacidade deste site, que integra estes Termos de Uso.',
      ],
    },
    {
      heading: '8. Foro',
      paragraphs: [
        'Estes termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca do Rio de Janeiro - RJ para dirimir eventuais controvérsias.',
      ],
    },
  ],
};
