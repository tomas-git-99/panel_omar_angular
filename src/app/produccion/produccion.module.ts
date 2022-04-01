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
import { AddProductosProduccionComponent } from './distribucion/view-center/add-productos-produccion/add-productos-produccion.component';
import { AddLocalComponent } from './distribucion/view-center/add-productos-produccion/add-local/add-local.component';



@NgModule({
  declarations: [
    ProductosComponent,
    EstampadoComponent,
    DistribucionComponent,
    PagosComponent,
    RollosComponent,
    ViewEditToolsComponent,
    AddProductosProduccionComponent,
    AddLocalComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    FontAwesomeModule
  ]
})
export class ProduccionModule { }
