import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQsRoutingModule } from './faqs-routing.module';
import { FaqsListComponent } from './faqs-list/faqs-list.component';


@NgModule({
  declarations: [
    FaqsListComponent
  ],
  imports: [
    CommonModule,
    FAQsRoutingModule
  ]
})
export class FAQsModule { }
