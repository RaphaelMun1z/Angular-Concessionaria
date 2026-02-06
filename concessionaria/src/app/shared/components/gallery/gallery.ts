import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';

interface Car {
  model: string;
  version: string;
  price: string;
  image: string;
  year: string;
  km: string;
  transmission: string;
  extra: string; // Tração, Cor, Motor
  extraLabel: string;
  features: string[];
}

interface GalleryItem {
  image: string;
  title: string;
  fallback: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef;

  // Dados dos Carros (Signal)
  cars = signal<Car[]>([
    {
      model: 'Jeep Compass',
      version: 'Limited 2.0 • Diesel',
      price: 'R$ 159k',
      image: 'modelos/jeep-compass.jpg',
      year: '2023/2023',
      km: '45.000 km',
      transmission: 'Automático 9M',
      extraLabel: 'Tração',
      extra: '4x4 Integral',
      features: ['Teto Solar', 'Couro', 'Park Assist'],
    },
    {
      model: 'Toyota Corolla',
      version: 'XEI 2.0 • Flex',
      price: 'R$ 135k',
      image: 'modelos/toyota-corolla.jpg',
      year: '2023/2023',
      km: '12.000 km',
      transmission: 'CVT Direct Shift',
      extraLabel: 'Cor',
      extra: 'Prata',
      features: ['Multimídia 10"', 'Paddle Shift', '7 Airbags'],
    },
    {
      model: 'VW Polo',
      version: 'Highline TSI',
      price: 'R$ 98.9k',
      image: 'modelos/vw-polo.jpg',
      year: '2024/2024',
      km: '8.500 km',
      transmission: 'Automático 6M',
      extraLabel: 'Motor',
      extra: '1.0 Turbo',
      features: ['Painel Digital', 'Carregador Indução', 'Rodas 17"'],
    },
  ]);

  // Dados da Galeria (Signal)
  galleryItems = signal<GalleryItem[]>([
    {
      title: 'Área de Atendimento',
      image: 'loja/atendimento.jpeg',
      fallback: 'loja/atendimento.jpeg',
    },
    {
      title: 'Showroom Coberto',
      image: 'loja/showroom.jpg',
      fallback: 'loja/showroom.jpg',
    },
    {
      title: 'Lounge Premium',
      image: 'loja/lounge.webp',
      fallback: 'loja/lounge.webp',
    },
    {
      title: 'Oficina Própria',
      image: 'loja/oficina.webp',
      fallback: 'loja/oficina.webp',
    },
    {
      title: 'Espaço Kids',
      image: 'loja/espaco-kids.webp',
      fallback: 'loja/espaco-kids.webp',
    },
  ]);

  // Lógica do Slider
  scrollGallery(direction: 'left' | 'right') {
    if (this.galleryContainer) {
      // Pega a largura da janela para calcular o scroll de forma responsiva
      const screenWidth = window.innerWidth;
      const scrollAmount = screenWidth < 768 ? screenWidth * 0.85 : 500;

      const currentScroll = this.galleryContainer.nativeElement.scrollLeft;

      this.galleryContainer.nativeElement.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  }
}
