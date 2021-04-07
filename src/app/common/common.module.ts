import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InitComponent } from './init/init.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    InitComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    InitComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class AppCommonModule {}
