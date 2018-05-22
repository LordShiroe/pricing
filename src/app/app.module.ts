import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component'
import {
  MatGridListModule, MatStepperModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule
} from '@angular/material'
import { MyNavComponent } from './my-nav/my-nav.component'
import { LayoutModule } from '@angular/cdk/layout'
import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MyTableComponent } from './my-table/my-table.component';
import { InventarioComponent } from './inventario/inventario.component'

@NgModule({
  declarations: [
    AppComponent,
    MyDashboardComponent,
    MyNavComponent,
    MyTableComponent,
    InventarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatStepperModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
