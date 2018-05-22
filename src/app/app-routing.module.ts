import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component'
import { InventarioComponent } from './inventario/inventario.component'
export const routes: Routes = [
  {
    path: '',
    component: MyDashboardComponent,
  },
  {
    path: 'inventario',
    component: InventarioComponent,
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
