import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isScrolled = false;
  isMobileMenuOpen = false;

  // Dados do Menu para facilitar manutenção e o loop no template
  menuItems = [
    { label: 'Início', id: 'highlight', icon: 'home' },
    { label: 'Categorias', id: 'categories', icon: 'grid' },
    { label: 'Estoque', id: 'showroom', icon: 'car' },
    { label: 'Financiamento', id: 'financing', icon: 'dollar' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.isMobileMenuOpen = false;
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    this.isMobileMenuOpen = false;

    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }
}
