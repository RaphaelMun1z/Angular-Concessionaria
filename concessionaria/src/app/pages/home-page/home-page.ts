import { Component, AfterViewInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';

import { Header } from '../../shared/components/header/header';
import { Hero } from '../../shared/components/hero/hero';
import { Showroom3d } from '../../shared/components/showroom3d/showroom3d';
import { Features } from '../../shared/components/features/features';
import { Categories } from '../../shared/components/categories/categories';
import { Gallery } from '../../shared/components/gallery/gallery';
import { Services } from '../../shared/components/services/services';
import { Financing } from '../../shared/components/financing/financing';
import { Testimonials } from '../../shared/components/testimonials/testimonials';
import { Contact } from '../../shared/components/contact/contact';
import { Map } from '../../shared/components/map/map';
import { Footer } from '../../shared/components/footer/footer';
import { WhatsappButton } from '../../shared/components/whatsapp-button/whatsapp-button';

declare var lucide: any;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Hero,
    Showroom3d,
    Features,
    Categories,
    Gallery,
    Services,
    Financing,
    Testimonials,
    Contact,
    Map,
    Footer,
    WhatsappButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements AfterViewInit, OnDestroy {
  isScrolled = false;
  private scrollListener: any;

  constructor() {}

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
      });

      this.scrollListener = () => {
        const scrolled = window.scrollY > 50;
        if (this.isScrolled !== scrolled) {
          this.isScrolled = scrolled;
        }
      };
      window.addEventListener('scroll', this.scrollListener);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined' && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
