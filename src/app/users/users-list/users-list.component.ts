import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: Array<any>;

  constructor(public userService: UserService, private router: Router) {
    this.users = [];
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.employeeList().subscribe(
      // Success
      (result) => {
        console.log('Result', result);
        this.users = result;
      },

      (error) => {
        console.log('Error', error);
      }
    );
  }

  edit(user: Employee) {
    this.router.navigate(['users', 'edit-user', user.id]);
  }

  remove(user: Employee) {
    this.userService.removeEmployee(user.id).subscribe(
      // Success
      (result) => {
        this.loadUsers();
      },

      (error) => {
        console.log('Error', error);
      }
    );
  }
}
