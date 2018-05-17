import { Routes, RouterModule } from "@angular/router";
import { MyDashboardComponent } from "./my-dashboard/my-dashboard.component";
import { ModuleWithProviders } from "@angular/core";
export const routes: Routes = [
  {
    path: "",
    component: MyDashboardComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
