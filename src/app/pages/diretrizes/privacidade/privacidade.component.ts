import { Component, EventEmitter, Output } from '@angular/core';
import {
  DiretrizesModalComponent,
  DiretrizSecao,
} from '../../../components/diretrizes-modal/diretrizes-modal.component';

@Component({
  selector: 'app-privacidade',
  standalone: true,
  imports: [DiretrizesModalComponent],
  templateUrl: './privacidade.component.html',
  styleUrl: './privacidade.component.scss',
})
export class PrivacidadeComponent {
  @Output() fechou = new EventEmitter<void>();

  titulo = 'Política de privacidade';
  subtitulo = 'Saiba como coletamos, usamos e protegemos seus dados pessoais';
  ultimaAtualizacao = '10 de Janeiro de 2026';

  secoes: DiretrizSecao[] = [
    {
      titulo: '1. Introdução',
      conteudo: [
        'A VooCursos está comprometida em proteger sua privacidade. Esta Política de privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais.',
        'Ao utilizar nossa plataforma, você concorda com as práticas descritas nesta política.',
      ],
    },
    {
      titulo: '2. Dados coletados',
      conteudo: [
        'Coletamos informações que você nos fornece diretamente, como: nome completo, endereço de e-mail, número de telefone, dados de pagamento e informações de perfil.',
        'Também coletamos dados automaticamente, incluindo: endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e dados de cookies.',
      ],
    },
    {
      titulo: '3. Uso das informações',
      conteudo: [
        'Utilizamos seus dados para: fornecer e melhorar nossos serviços; processar transações e enviar confirmações; enviar comunicações sobre cursos, promoções e atualizações; personalizar sua experiência na plataforma.',
        'Também utilizamos dados para análises internas, segurança da plataforma e cumprimento de obrigações legais.',
      ],
    },
    {
      titulo: '4. Compartilhamento de dados',
      conteudo: [
        'Não vendemos suas informações pessoais a terceiros.',
        'Podemos compartilhar dados com: prestadores de serviços que nos auxiliam nas operações (processamento de pagamentos, hospedagem, etc.); autoridades governamentais quando exigido por lei; parceiros comerciais, mediante seu consentimento.',
      ],
    },
    {
      titulo: '5. Segurança dos dados',
      conteudo: [
        'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.',
        'Utilizamos criptografia SSL/TLS para transmissão de dados sensíveis e armazenamos informações em servidores seguros.',
      ],
    },
    {
      titulo: '6. Cookies e tecnologias similares',
      conteudo: [
        'Utilizamos cookies para melhorar sua experiência, lembrar suas preferências e coletar dados analíticos.',
        'Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.',
      ],
    },
    {
      titulo: '7. Seus direitos',
      conteudo: [
        'De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem direito a: acessar seus dados pessoais; corrigir dados incompletos ou incorretos; solicitar a exclusão de seus dados; revogar consentimentos; solicitar portabilidade dos dados.',
        'Para exercer esses direitos, entre em contato conosco através do e-mail: privacidade@voocursos.com.br',
      ],
    },
    {
      titulo: '8. Retenção de dados',
      conteudo: [
        'Mantemos suas informações pelo tempo necessário para cumprir as finalidades descritas nesta política, a menos que um período de retenção mais longo seja exigido por lei.',
        'Após o encerramento da conta, manteremos alguns dados por até 5 anos para fins legais e fiscais.',
      ],
    },
    {
      titulo: '9. Alterações na política',
      conteudo: [
        'Podemos atualizar esta Política de privacidade periodicamente. Notificaremos sobre mudanças significativas por e-mail ou através de aviso na plataforma.',
        'Recomendamos revisar esta política regularmente.',
      ],
    },
    {
      titulo: '10. Contato',
      conteudo: [
        'Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato: E-mail: privacidade@voocursos.com.br | Telefone: (11) 99999-9999',
      ],
    },
  ];

  fechar(): void {
    this.fechou.emit();
  }
}
