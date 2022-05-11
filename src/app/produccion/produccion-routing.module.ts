import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { EstampadoComponent } from './estampado/estampado.component';

import { PagosComponent } from './pagos/pagos.component';
import { RollosComponent } from './rollos/rollos.component';
import { DistribucionComponent } from './distribucion/distribucion.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EmpleadosComponent } from './pagos/empleados/empleados.component';





const routes: Routes = [
  { 
    path: '',
    children:[
      {path:'agregar', component: AgregarComponent},
      {path:'producto', component: ProductosComponent},
      {path:'estampados', component: EstampadoComponent},
      {path:'distribucion', component: DistribucionComponent},
      {path:'pago', component: PagosComponent},
      {path:'rollos', component: RollosComponent},
      {path:'empleados', component: EmpleadosComponent},
      {path:'**', redirectTo: 'producto'}
    ]
  },
  
]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
