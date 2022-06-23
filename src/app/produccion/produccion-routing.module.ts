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
import { AuthGuard } from '../seguridad/auth.guard';





const routes: Routes = [
  { 
    path: '',
    children:[
      {path:'agregar', component: AgregarComponent, canActivate: [ AuthGuard  ]},
      {path:'producto', component: ProductosComponent, canActivate: [ AuthGuard  ]},
      {path:'estampados', component: EstampadoComponent, canActivate: [ AuthGuard  ]},
      {path:'distribucion', component: DistribucionComponent, canActivate: [ AuthGuard  ]},
      {path:'pago', component: PagosComponent, canActivate: [ AuthGuard  ]},
      {path:'rollos', component: RollosComponent, canActivate: [ AuthGuard  ]},
      {path:'empleados', component: EmpleadosComponent, canActivate: [ AuthGuard  ]},
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
