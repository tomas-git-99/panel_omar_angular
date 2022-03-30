import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { EstampadoComponent } from './estampado/estampado.component';
import { DistribucionComponent } from './distribucion/distribucion.component';
import { PagosComponent } from './pagos/pagos.component';
import { RollosComponent } from './rollos/rollos.component';
import { ProduccionRoutingModule } from './produccion-routing.module';
import { ViewEditToolsComponent } from './productos/view-edit-tools/view-edit-tools.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ProductosComponent,
    EstampadoComponent,
    DistribucionComponent,
    PagosComponent,
    RollosComponent,
    ViewEditToolsComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    FontAwesomeModule
  ]
})
export class ProduccionModule { }
