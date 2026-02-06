import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Car {
  id: number;
  model: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  color: string;
  images: string[];
  currentImageIndex: number;
  imageLoadError?: boolean;
  badge?: string;
  model3d?: string; // Caminho para o arquivo .glb (Opcional)
  is3DActive?: boolean; // Estado para controlar se o 3D está visível
}

declare var lucide: any;

@Component({
  selector: 'app-stock-page',
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stock-page.html',
  styleUrl: './stock-page.css',
})
export class StockPage implements AfterViewInit, AfterViewChecked {
  // Estado da Paginação
  currentPage = 1;
  itemsPerPage = 6;

  // Estado dos Filtros
  filters = {
    brands: {} as Record<string, boolean>,
    bodyTypes: {} as Record<string, boolean>,
    colors: {} as Record<string, boolean>,
    price: { min: null as number | null, max: null as number | null },
    year: { min: null as number | null, max: null as number | null },
    mileage: { min: null as number | null, max: null as number | null },
  };

  cars: Car[] = [
    // Mock Data com Modelos 3D
    {
      id: 1,
      brand: 'BMW',
      model: 'X1 sDrive20i GP',
      year: 2024,
      price: 289900,
      mileage: 12500,
      fuel: 'Flex',
      transmission: 'Aut.',
      bodyType: 'SUV',
      color: 'Branco',
      images: [
        'https://images.unsplash.com/photo-1556189250-72ba954522bb?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
      badge: 'Novidade',
      model3d: '3d/GolfGTIMk7.glb', // Usando um dos modelos disponíveis para teste
      is3DActive: false,
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla Cross XRX',
      year: 2023,
      price: 195000,
      mileage: 28000,
      fuel: 'Híbrido',
      transmission: 'CVT',
      bodyType: 'SUV',
      color: 'Prata',
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
      badge: 'Oferta',
      model3d: '3d/ToyotaCorolla.glb',
      is3DActive: false,
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Compass Longitude',
      year: 2022,
      price: 148900,
      mileage: 45000,
      fuel: 'Flex',
      transmission: 'Aut.',
      bodyType: 'SUV',
      color: 'Preto',
      images: [
        'https://images.unsplash.com/photo-1622557850710-10493894458f?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
    },
    {
      id: 4,
      brand: 'Porsche',
      model: 'Macan 2.0 Turbo',
      year: 2021,
      price: 459000,
      mileage: 32000,
      fuel: 'Gasolina',
      transmission: 'PDK',
      bodyType: 'SUV',
      color: 'Cinza',
      images: [
        'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
      badge: 'Blindado',
    },
    {
      id: 5,
      brand: 'Honda',
      model: 'Civic Touring',
      year: 2021,
      price: 165000,
      mileage: 38000,
      fuel: 'Gasolina',
      transmission: 'CVT',
      bodyType: 'Sedan',
      color: 'Branco',
      images: [
        'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
    },
    {
      id: 6,
      brand: 'Ram',
      model: '1500 Rebel V8',
      year: 2023,
      price: 429900,
      mileage: 15000,
      fuel: 'Gasolina',
      transmission: 'Aut.',
      bodyType: 'Picape',
      color: 'Vermelho',
      images: [
        'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
      badge: 'Impecável',
      model3d: '3d/RAM.glb',
      is3DActive: false,
    },
    {
      id: 7,
      brand: 'Audi',
      model: 'Q3 Black',
      year: 2023,
      price: 265000,
      mileage: 18000,
      fuel: 'Gasolina',
      transmission: 'S-tronic',
      bodyType: 'SUV',
      color: 'Cinza',
      images: [
        'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
    },
    {
      id: 8,
      brand: 'Mercedes',
      model: 'C180 AMG Line',
      year: 2022,
      price: 295000,
      mileage: 22000,
      fuel: 'Gasolina',
      transmission: 'Aut.',
      bodyType: 'Sedan',
      color: 'Preto',
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600',
      ],
      currentImageIndex: 0,
    },
  ];

  ngAfterViewInit() {
    this.refreshIcons();
  }
  ngAfterViewChecked() {
    this.refreshIcons();
  }

  refreshIcons() {
    if (typeof window !== 'undefined' && typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  toggle3D(car: Car) {
    // Alterna o estado de visualização 3D apenas para o carro clicado
    car.is3DActive = !car.is3DActive;
  }

  onMouseMove(event: MouseEvent, car: Car) {
    if (!car.images || car.images.length <= 1) return;
    const container = event.target as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const index = Math.floor(percentage * car.images.length);
    const prevIndex = car.currentImageIndex;
    car.currentImageIndex = Math.min(index, car.images.length - 1);
    if (prevIndex !== car.currentImageIndex) car.imageLoadError = false;
  }

  resetImage(car: Car) {
    car.currentImageIndex = 0;
    car.imageLoadError = false;
  }

  // Acionado quando checkboxes mudam
  toggleFilter(category: 'brands' | 'bodyTypes' | 'colors', value: string) {
    if (this.filters[category][value] === undefined) {
      this.filters[category][value] = false;
    }
    this.filters[category][value] = !this.filters[category][value];
    this.onFilterChange(); // Reseta página
  }

  // Acionado quando inputs de range mudam
  onFilterChange() {
    this.currentPage = 1;
  }

  // Getters para extrair opções únicas
  get uniqueBrands(): string[] {
    return [...new Set(this.cars.map((car) => car.brand))].sort();
  }
  get uniqueBodyTypes(): string[] {
    return [...new Set(this.cars.map((car) => car.bodyType))].sort();
  }
  get uniqueColors(): string[] {
    return [...new Set(this.cars.map((car) => car.color))].sort();
  }

  // 1. Filtra todos os carros
  get filteredCars(): Car[] {
    return this.cars.filter((car) => {
      const selectedBrands = Object.keys(this.filters.brands).filter(
        (key) => this.filters.brands[key],
      );
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);

      const selectedBodyTypes = Object.keys(this.filters.bodyTypes).filter(
        (key) => this.filters.bodyTypes[key],
      );
      const matchBody = selectedBodyTypes.length === 0 || selectedBodyTypes.includes(car.bodyType);

      const selectedColors = Object.keys(this.filters.colors).filter(
        (key) => this.filters.colors[key],
      );
      const matchColor = selectedColors.length === 0 || selectedColors.includes(car.color);

      const minPrice = this.filters.price.min ?? 0;
      const maxPrice = this.filters.price.max ?? Infinity;
      const matchPrice = car.price >= minPrice && car.price <= maxPrice;

      const minYear = this.filters.year.min ?? 0;
      const maxYear = this.filters.year.max ?? Infinity;
      const matchYear = car.year >= minYear && car.year <= maxYear;

      const minMileage = this.filters.mileage.min ?? 0;
      const maxMileage = this.filters.mileage.max ?? Infinity;
      const matchMileage = car.mileage >= minMileage && car.mileage <= maxMileage;

      return matchBrand && matchBody && matchColor && matchPrice && matchMileage && matchYear;
    });
  }

  // 2. Pagina os carros filtrados
  get paginatedCars(): Car[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCars.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // 3. Calcula total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredCars.length / this.itemsPerPage);
  }

  // 4. Gera array de números de página para o template
  getPageNumbers(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Scroll suave para o topo da grade
      if (typeof document !== 'undefined') {
        const gridElement = document.getElementById('grid-top');
        if (gridElement) {
          const headerOffset = 100;
          const elementPosition = gridElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }
  }

  resetFilters() {
    this.filters = {
      brands: {},
      bodyTypes: {},
      colors: {},
      price: { min: null, max: null },
      year: { min: null, max: null },
      mileage: { min: null, max: null },
    };
    this.currentPage = 1;
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
