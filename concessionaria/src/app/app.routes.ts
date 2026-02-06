import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { StockPage } from './pages/stock-page/stock-page';
import { VehiclePage } from './pages/vehicle-page/vehicle-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'estoque',
    component: StockPage,
  },
  {
    path: 'veiculo/:id',
    component: VehiclePage,
  },
];
