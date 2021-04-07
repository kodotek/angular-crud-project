import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'new-user', component: NewUserComponent },
  { path: 'list', component: UsersListComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
