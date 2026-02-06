import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef;

  scrollGallery(direction: 'left' | 'right') {
    if (this.galleryContainer) {
      const scrollAmount = 400;
      if (direction === 'left') {
        this.galleryContainer.nativeElement.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        this.galleryContainer.nativeElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }
}
