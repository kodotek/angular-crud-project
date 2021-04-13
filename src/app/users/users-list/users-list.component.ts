import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  public users: Array<any>;
  public allUsers: Array<any>;
  public searchForm: FormGroup;

  constructor(public userService: UserService, private router: Router) {
    this.users = [];
    this.allUsers = [];
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });

    this.searchForm.controls['search'].valueChanges.subscribe((value) => {
      if (this.searchForm.controls['search'].valid) {
        this.users = this.allUsers.filter((user) => {
          return (
            user.name.indexOf(value) !== -1 || user.email.indexOf(value) !== -1
          );
        });
      } else {
        this.users = this.allUsers;
      }
    });

    this.loadUsers();
  }

  loadUsers() {
    this.userService.employeeList().subscribe(
      // Success
      (result) => {
        console.log('Result', result);
        this.users = result;
        this.allUsers = result;
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
