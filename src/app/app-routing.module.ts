import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SandboxComponent } from './sandbox/sandbox.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sandbox', loadChildren: () => import('./sandbox/sandbox.module').then(m => m.SandboxModule) },
  { path: 'rxjs', loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxJSModule) },
  { path: 'material', loadChildren: () => import('./material/material.module').then(m => m.MaterialModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
