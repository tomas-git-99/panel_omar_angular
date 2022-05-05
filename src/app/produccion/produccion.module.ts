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
import { SubTableDisProduccionComponent } from './distribucion/sub-table-dis-produccion/sub-table-dis-produccion.component';
import { AgregarComponent } from './agregar/agregar.component';
import { ProductoNuevoComponent } from './agregar/producto-nuevo/producto-nuevo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EliminarOfallasComponent } from './distribucion/view-center/eliminar-ofallas/eliminar-ofallas.component';
import { AgregarTallerComponent } from './agregar/agregar-taller/agregar-taller.component';
import { AgregarEstampadorComponent } from './agregar/agregar-estampador/agregar-estampador.component';

import { TablasComponent } from './cargas/tablas/tablas.component';
import { PaginacionProduccionComponent } from './paginacion-produccion/paginacion-produccion.component';




@NgModule({
  declarations: [
    ProductosComponent,
    EstampadoComponent,
    DistribucionComponent,
    PagosComponent,
    RollosComponent,
    ViewEditToolsComponent,
    AddProductosProduccionComponent,
    AddLocalComponent,
    SubTableDisProduccionComponent,
    AgregarComponent,
    ProductoNuevoComponent,
    EliminarOfallasComponent,
    AgregarTallerComponent,
    AgregarEstampadorComponent,
    TablasComponent,
    PaginacionProduccionComponent,
  

    
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    


  ]
})
export class ProduccionModule { }
