import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AppCommonModule } from '../common/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [UsersListComponent, NewUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
