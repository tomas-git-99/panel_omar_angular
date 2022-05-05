import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GenerateVoucherComponent } from './generate-voucher/generate-voucher.component';
import { HistoryComponent } from './history/history.component';
import { DistributionComponent } from './distribution/distribution.component';
import { CheckOutComponent } from './generate-voucher/check-out/check-out.component';
import { VentasComponent } from './ventas.component';
import { OpcionesComponent } from './opciones/opciones.component';


const routes: Routes = [
  { 
    path: '',
    children:[
      {path:'inicio', component: HomeComponent},
      {path:'generar', component: GenerateVoucherComponent},
      {path:'historial', component: HistoryComponent},
      {path:'distribucion', component: DistributionComponent},
      {path:'opciones', component: OpcionesComponent},
    
      {path:'**', redirectTo: 'inicio'}
    ]
  },
  
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class VentasRoutingModule { }
