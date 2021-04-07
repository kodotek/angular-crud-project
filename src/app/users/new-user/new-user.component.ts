import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Employee } from '../../models/employee';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  public employee: Employee;
  public employeeForm?: FormGroup;
  public jobs: Array<string>;

  constructor(public userService: UserService, private router: Router) {
    this.employee = new Employee();
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
    this.employeeForm = null;
  }

  ngOnInit() {
    // Instancia un nuevo formulario
    this.employeeForm = new FormGroup({
      // Crea los elementos del formulario (form controls)
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        this.userService.forbiddenEmailValidator,
      ]),
      age: new FormControl('', [Validators.pattern('[0-9]+')]),
      job: new FormControl(),
      isActive: new FormControl(),
    });

    // Actualiza el modelo cuando se producen cambios en el formulario.
    // Con this.employeeForm.controls['nombre_del_form_control'] podemos
    // suscribirnos a los cambios de algún campo específico
    this.employeeForm.valueChanges.subscribe((value) => {
      // Si los datos del formulario son válidos
      console.log(value);

      if (this.employeeForm.valid) {
        console.log(value);
        // Se podría hacer un "casting" del value para pasárselo a this.employee:
        // this.employee = value as Employee;
        this.employee = new Employee(
          value.name,
          value.email,
          value.job,
          value.age,
          value.isActive,
          value.valoration,
          value.id
        );
        console.log(this.employee);
      }
    });
  }

  // Crea un usuario
  create(): void {
    this.userService.createEmployee(this.employee).subscribe(
      (response) => {
        console.log('Success', response);
        this.router.navigate(['users', 'list']);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
