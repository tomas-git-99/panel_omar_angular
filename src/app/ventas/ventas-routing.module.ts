import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GenerateVoucherComponent } from './generate-voucher/generate-voucher.component';
import { HistoryComponent } from './history/history.component';
import { DistributionComponent } from './distribution/distribution.component';


const routes: Routes = [
  { 
    path: '',
    children:[
      {path:'inicio', component: HomeComponent},
      {path:'generar', component: GenerateVoucherComponent},
      {path:'historial', component: HistoryComponent},
      {path:'distribucion', component: DistributionComponent},
      {path:'**', redirectTo: 'inicio'}
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class VentasRoutingModule { }
