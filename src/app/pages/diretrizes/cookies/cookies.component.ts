import { Component, EventEmitter, Output } from '@angular/core';
import {
  DiretrizesModalComponent,
  DiretrizSecao,
} from '../../../components/diretrizes-modal/diretrizes-modal.component';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [DiretrizesModalComponent],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.scss',
})
export class CookiesComponent {
  @Output() fechou = new EventEmitter<void>();

  titulo = 'Política de cookies';
  subtitulo = 'Entenda como utilizamos cookies para melhorar sua experiência';
  ultimaAtualizacao = '10 de Janeiro de 2026';

  secoes: DiretrizSecao[] = [
    {
      titulo: '1. O que são cookies?',
      conteudo: [
        'Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou smartphone) quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de forma mais eficiente e fornecer informações aos proprietários do site.',
        'Os cookies nos ajudam a lembrar suas preferências, entender como você usa nossa plataforma e melhorar sua experiência geral.',
      ],
    },
    {
      titulo: '2. Tipos de cookies que utilizamos',
      conteudo: [
        'Cookies essenciais: São necessários para o funcionamento básico do site. Incluem cookies que permitem você fazer login, navegar entre páginas e acessar áreas seguras. Sem eles, os serviços que você solicitou não podem ser fornecidos.',
        'Cookies de desempenho: Coletam informações sobre como você usa nosso site, como quais páginas você visita com mais frequência. Esses dados são usados para melhorar o funcionamento do site.',
        'Cookies de funcionalidade: Permitem que o site lembre de escolhas que você faz (como seu nome de usuário, idioma ou região) e fornecem recursos aprimorados e mais personalizados.',
        'Cookies de marketing: São usados para rastrear visitantes em sites. A intenção é exibir anúncios relevantes e envolventes para o usuário individual.',
      ],
    },
    {
      titulo: '3. Cookies de terceiros',
      conteudo: [
        'Além dos cookies que definimos, também utilizamos cookies de terceiros para diversas finalidades, incluindo:',
        'Google Analytics: Para análise de tráfego e comportamento dos usuários no site.',
        'Redes Sociais: Para permitir compartilhamento de conteúdo e integração com plataformas como Facebook, Instagram e LinkedIn.',
        'Provedores de Pagamento: Para processar transações de forma segura.',
      ],
    },
    {
      titulo: '4. Duração dos cookies',
      conteudo: [
        'Cookies de sessão: São temporários e são excluídos quando você fecha o navegador.',
        'Cookies persistentes: Permanecem no seu dispositivo por um período definido (que pode variar de alguns dias a vários anos) ou até que você os exclua manualmente.',
      ],
    },
    {
      titulo: '5. Gerenciamento de cookies',
      conteudo: [
        'Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no seu computador e configurar a maioria dos navegadores para impedir que sejam colocados.',
        'Para gerenciar cookies no seu navegador, acesse as configurações de privacidade ou segurança. Cada navegador possui métodos differentes para gerenciar cookies.',
        'Observe que se você optar por desabilitar cookies, algumas funcionalidades da plataforma podem não funcionar corretamente.',
      ],
    },
    {
      titulo: '6. Cookies essenciais da plataforma',
      conteudo: [
        'auth_token: Mantém você conectado à sua conta (duração: 30 dias).',
        'session_id: Identifica sua sessão atual (duração: sessão do navegador).',
        'preferences: Armazena suas preferências de visualização (duração: 1 ano).',
        'csrf_token: Protege contra ataques de falsificação de solicitação (duração: sessão).',
      ],
    },
    {
      titulo: '7. Consentimento',
      conteudo: [
        'Ao continuar navegando em nosso site, você concorda com o uso de cookies conforme descrito nesta política.',
        'Você pode retirar seu consentimento a qualquer momento através das configurações do seu navegador ou entrando em contato conosco.',
      ],
    },
    {
      titulo: '8. Atualizações desta política',
      conteudo: [
        'Podemos atualizar esta Política de cookies periodicamente para refletir mudanças em nossas práticas ou por outras razões operacionais, legais ou regulatórias.',
        'Recomendamos que você revise esta página regularmente para se manter informado sobre como estamos usando cookies.',
      ],
    },
    {
      titulo: '9. Contato',
      conteudo: [
        'Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através do e-mail: privacidade@voocursos.com.br',
      ],
    },
  ];

  fechar(): void {
    this.fechou.emit();
  }
}
