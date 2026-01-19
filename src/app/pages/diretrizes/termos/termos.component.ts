import { Component, EventEmitter, Output } from '@angular/core';
import {
  DiretrizesModalComponent,
  DiretrizSecao,
} from '../../../components/diretrizes-modal/diretrizes-modal.component';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [DiretrizesModalComponent],
  templateUrl: './termos.component.html',
  styleUrl: './termos.component.scss',
})
export class TermosComponent {
  @Output() fechou = new EventEmitter<void>();

  titulo = 'Termos de uso';
  subtitulo = 'Leia com atenção os termos e condições de uso da plataforma VooCursos';
  ultimaAtualizacao = '10 de Janeiro de 2026';

  secoes: DiretrizSecao[] = [
    {
      titulo: '1. Aceitação dos termos',
      conteudo: [
        'Ao acessar e utilizar a plataforma VooCursos, você concorda em cumprir e estar vinculado a estes Termos de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.',
        'Estes termos aplicam-se a todos os visitantes, usuários e outras pessoas que acessam ou utilizam o serviço.',
      ],
    },
    {
      titulo: '2. Descrição do serviço',
      conteudo: [
        'A VooCursos é uma plataforma de ensino online que oferece cursos em diversas áreas do conhecimento. Nosso objetivo é proporcionar educação de qualidade, acessível e flexível para todos.',
        'Os cursos incluem videoaulas, materiais de apoio, exercícios práticos e certificados de conclusão.',
      ],
    },
    {
      titulo: '3. Conta do usuário',
      conteudo: [
        'Para acessar determinados recursos da plataforma, você precisará criar uma conta. Você é responsável por manter a confidencialidade de sua senha e conta.',
        'Você concorda em notificar imediatamente a VooCursos sobre qualquer uso não autorizado de sua conta.',
        'Não é permitido compartilhar credenciais de acesso ou permitir que terceiros acessam sua conta.',
      ],
    },
    {
      titulo: '4. Uso aceitável',
      conteudo: [
        'Você concorda em usar a plataforma apenas para fins legais e de acordo com estes Termos de uso.',
        'É proibido: reproduzir, distribuir ou comercializar o conteúdo dos cursos sem autorização; utilizar a plataforma para qualquer finalidade ilegal; interferir ou tentar interferir na segurança da plataforma.',
      ],
    },
    {
      titulo: '5. Propriedade intelectual',
      conteudo: [
        'Todo o conteúdo disponível na VooCursos, incluindo textos, vídeos, imagens, logos e marcas, é protegido por direitos autorais e propriedade intelectual.',
        'O acesso aos cursos não transfere nenhum direito de propriedade sobre o conteúdo.',
      ],
    },
    {
      titulo: '6. Pagamentos e reembolsos',
      conteudo: [
        'Os preços dos cursos e planos são apresentados na plataforma e podem ser alterados a qualquer momento.',
        'Oferecemos garantia de satisfação de 7 dias. Se você não estiver satisfeito, pode solicitar reembolso integral dentro deste prazo.',
      ],
    },
    {
      titulo: '7. Limitação de responsabilidade',
      conteudo: [
        'A VooCursos não se responsabiliza por danos indiretos, incidentais ou consequentes resultantes do uso ou impossibilidade de uso da plataforma.',
        'Não garantimos que o serviço estará disponível ininterruptamente ou livre de erros.',
      ],
    },
    {
      titulo: '8. Modificações dos termos',
      conteudo: [
        'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor assim que publicadas na plataforma.',
        'O uso continuado após alterações constitui aceitação dos novos termos.',
      ],
    },
    {
      titulo: '9. Contato',
      conteudo: [
        'Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do e-mail: contato@voocursos.com.br',
      ],
    },
  ];

  fechar(): void {
    this.fechou.emit();
  }
}
