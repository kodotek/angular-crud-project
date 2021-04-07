import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Employee } from '../../models/employee';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public employeeId: string;
  public employee: Employee;
  public employeeForm: FormGroup;
  public jobs: Array<string>;
  public messageError: string;
  public updateSubscription?: Subscription;

  constructor(
    public userService: UserService,
    private activedRoute: ActivatedRoute
  ) {
    this.employee = new Employee();
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
    this.messageError = '';
    this.updateSubscription = null;
  }

  ngOnInit() {
    // Obtenemos el id del usuario
    this.activedRoute.params.subscribe((params) => {
      console.log('Los parametros que llegan', params);

      this.employeeId = params['id'];
      this.userService.getEmployee(this.employeeId).subscribe(
        // Succcess
        (employee) => {
          console.log('Success', employee);

          if (employee == null || undefined) {
            this.messageError = 'El usuario no existe';
            return;
          }

          console.log('El empleado que obtenemos', employee);

          // Rellenamos el formulario con los datos del usuario
          this.employeeForm.controls['name'].setValue(employee.name);
          this.employeeForm.controls['email'].setValue(employee.email);
          this.employeeForm.controls['age'].setValue(employee.age);
          this.employeeForm.controls['job'].setValue(employee.job);
          this.employeeForm.controls['isActive'].setValue(employee.isActive);
        },

        // Error
        (error) => {
          console.log('Error', error);
        }
      );
    });

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
      if (this.employeeForm.valid) {
        // console.log(value);
        // Se podría hacer un "casting" del value para pasárselo a this.employee:
        // this.employee = value as Employee;
        this.employee = new Employee(
          value.name,
          value.email,
          value.job,
          value.age,
          value.isActive,
          value.valoration,
          this.employeeId
        );
        console.log(this.employee);

        // Actualiza los datos remotamente
        this.update();
      }
    });
  }

  // Actualiza un usuario
  update(): void {
    // Si hay una suscripción previa y no está cerrada, la cancelamos antes de volver a suscribirnos
    if (this.updateSubscription !== null && !this.updateSubscription.closed) {
      this.updateSubscription.unsubscribe();
    }

    this.updateSubscription = this.userService
      .updateEmployee(this.employee)
      .subscribe(
        (response) => {
          console.log('Success', response);
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }
}
