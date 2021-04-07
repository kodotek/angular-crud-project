import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './common/init/init.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users-routing.module').then((m) => m.UsersRoutingModule),
  },
  {
    path: 'faqs',
    loadChildren: () =>
      import('./faqs/faqs-routing.module').then((m) => m.FAQsRoutingModule),
  },
  {
    path: '',
    pathMatch: 'full',
    component: InitComponent,
    data: { preload: true },
  },
  { path: '**', component: PageNotFoundComponent, data: { preload: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
