import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

declare var lucide: any;

@Component({
  selector: 'app-vehicle-page',
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vehicle-page.html',
  styleUrl: './vehicle-page.css',
})
export class VehiclePage implements AfterViewInit {
  is3DActive = false;
  isInterestModalOpen = false;
  currentImageIndex = 0;
  activeTab = 'about';
  interestForm: FormGroup;

  // Mock Data de um Veículo Específico
  car = {
    brand: 'BMW',
    model: 'X1',
    version: 'sDrive20i GP 2.0 Turbo ActiveFlex',
    condition: 'Seminovo',
    price: 289900,
    year: '2023/2024',
    mileage: 12500,
    fuel: 'Flex',
    transmission: 'Automático',
    color: 'Branco Alpino',
    description:
      'Veículo em estado de zero km, único dono, todas as revisões feitas na concessionária. Possui teto solar panorâmico, bancos em couro com ajuste elétrico, painel digital e assistente de condução. Garantia de fábrica vigente até 2026. Aceitamos seu usado na troca com a melhor avaliação do mercado.',
    highlights: [
      'Único Dono',
      'Garantia de Fábrica',
      'IPVA 2024 Pago',
      'Pneus Novos',
      'Manual e Chave Reserva',
      'Laudo Cautelar Aprovado',
    ],
    specs: [
      { label: 'Motor', value: '2.0 Turbo' },
      { label: 'Potência', value: '192 cv' },
      { label: 'Torque', value: '28,5 kgfm' },
      { label: '0 a 100 km/h', value: '7,7 seg' },
      { label: 'Velocidade Máx.', value: '225 km/h' },
      { label: 'Consumo Urbano', value: '10,5 km/l' },
      { label: 'Porta-malas', value: '505 Litros' },
      { label: 'Tração', value: 'Dianteira' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556189250-72ba954522bb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200', // Interior mock
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=1200', // Rear mock
      'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1200', // Detail mock
    ],
    model3d: '3d/GolfGTIMk7.glb', // Usando modelo de exemplo
  };

  tabs = [
    { id: 'about', label: 'Visão Geral' },
    { id: 'specs', label: 'Ficha Técnica' },
    { id: 'features', label: 'Opcionais' },
  ];

  constructor(private fb: FormBuilder) {
    this.interestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9\\-\\(\\)\\s]*$')]],
      email: ['', [Validators.required, Validators.email]],
      message: [this.getDefaultMessage()],
    });
  }

  getDefaultMessage() {
    return `Olá, tenho interesse no ${this.car.brand} ${this.car.model} anunciado por ${this.formatPrice(this.car.price)}. Gostaria de mais informações.`;
  }

  ngAfterViewInit() {
    this.refreshIcons();
  }

  refreshIcons() {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 100);
    }
  }

  openInterestModal() {
    this.isInterestModalOpen = true;
    this.interestForm.get('message')?.setValue(this.getDefaultMessage());
    this.refreshIcons(); // Recarrega ícones para o modal
  }

  closeInterestModal() {
    this.isInterestModalOpen = false;
  }

  onSubmitInterest() {
    if (this.interestForm.valid) {
      console.log('Interesse enviado:', this.interestForm.value);
      alert('Sua proposta foi enviada com sucesso! Entraremos em contato em breve.');
      this.closeInterestModal();
      this.interestForm.reset();
    } else {
      this.interestForm.markAllAsTouched();
    }
  }

  toggle3D() {
    this.is3DActive = !this.is3DActive;
  }

  selectImage(index: number) {
    this.is3DActive = false;
    this.currentImageIndex = index;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.car.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.car.images.length) % this.car.images.length;
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
