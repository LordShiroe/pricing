import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component'
import {
  MatGridListModule, MatStepperModule, MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatCheckboxModule, MatInputModule
} from '@angular/material'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MyNavComponent } from './my-nav/my-nav.component'
import { LayoutModule } from '@angular/cdk/layout'
import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { MyTableComponent } from './my-table/my-table.component'
import { InventarioComponent } from './inventario/inventario.component'
import { AppFormTableComponent } from './app-form-table/app-form-table.component';
import { HeaderFormComponent } from './header-form/header-form.component'

@NgModule({
  declarations: [
    AppComponent,
    MyDashboardComponent,
    MyNavComponent,
    MyTableComponent,
    InventarioComponent,
    AppFormTableComponent,
    HeaderFormComponent
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
    MatFormFieldModule,
    MatInputModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
