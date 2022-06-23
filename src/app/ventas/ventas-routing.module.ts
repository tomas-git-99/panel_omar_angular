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
import { AuthGuard } from '../seguridad/auth.guard';


const routes: Routes = [
  { 
    path: '',
    children:[
      {path:'inicio', component: HomeComponent, canActivate: [ AuthGuard  ]},
      {path:'generar', component: GenerateVoucherComponent, canActivate: [ AuthGuard  ]},
      {path:'historial', component: HistoryComponent,  canActivate: [ AuthGuard  ]},
      {path:'distribucion', component: DistributionComponent,  canActivate: [ AuthGuard  ]},
      {path:'opciones', component: OpcionesComponent,  canActivate: [ AuthGuard  ]},
    
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
