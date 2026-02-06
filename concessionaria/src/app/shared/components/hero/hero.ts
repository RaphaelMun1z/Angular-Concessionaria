import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';

declare var lucide: any;

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements AfterViewInit, OnDestroy {
  carModels = ['GolfGTIMk7.glb', 'RAM.glb', 'ToyotaCorolla.glb'];

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
    }, 8000);
  }

  nextCar() {
    this.isTransitioning = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.currentCarIndex = (this.currentCarIndex + 1) % this.carModels.length;
      this.currentModelSrc = this.carModels[this.currentCarIndex];
      this.cdr.detectChanges();

      setTimeout(() => {
        this.isTransitioning = false;
        this.cdr.detectChanges();
      }, 100);
    }, 500);
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
