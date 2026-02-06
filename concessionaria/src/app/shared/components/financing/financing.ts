import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-financing',
  imports: [CommonModule],
  templateUrl: './financing.html',
  styleUrl: './financing.css',
})
export class Financing {
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
