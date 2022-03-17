import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './ventas/generate-voucher/shopping-cart/shopping-cart.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule)
  },
/*   {
    path: 'hola',
    component: ShoppingCartComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
