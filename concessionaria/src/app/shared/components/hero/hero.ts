import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
} from '@angular/core';

declare var lucide: any;

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  carModels = ['3d/GolfGTIMk7.glb', '3d/RAM.glb', '3d/ToyotaCorolla.glb'];

  currentCarIndex = 0;
  currentModelSrc = this.carModels[0];
  isTransitioning = false;
  private carouselInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 100);
      this.startCarousel();
    }
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  startCarousel() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    this.carouselInterval = setInterval(() => {
      this.nextCar();
    }, 10000); // 8 segundos de intervalo
  }

  nextCar() {
    // 1. Inicia o Fade Out (esconde o carro atual)
    this.isTransitioning = true;
    this.cdr.detectChanges();

    // 2. Aguarda a animação de opacidade terminar (500ms) antes de trocar o modelo
    // Isso previne o congelamento visual do modelo antigo
    setTimeout(() => {
      this.currentCarIndex = (this.currentCarIndex + 1) % this.carModels.length;
      this.currentModelSrc = this.carModels[this.currentCarIndex];
      this.cdr.detectChanges();

      // OBS: Não definimos isTransitioning = false aqui.
      // O método onModelLoaded() será chamado automaticamente pelo <model-viewer>
      // quando o novo modelo terminar de carregar.
    }, 500);
  }

  // Novo método chamado pelo evento (load) do model-viewer
  onModelLoaded() {
    // 3. Modelo carregado na memória, inicia Fade In
    this.isTransitioning = false;
    this.cdr.detectChanges();
  }

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
