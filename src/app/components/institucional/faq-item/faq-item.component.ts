import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
})
export class FaqItemComponent {
  @Input() pergunta: string = '';
  @Input() aberto: boolean = false;
}
