import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentasModule } from './ventas/ventas.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProduccionModule } from './produccion/produccion.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VentasModule,
    ProduccionModule,
    FontAwesomeModule,

    
    
  ],
  exports: [
    SidebarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
