import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/employee';

import { FormControl } from '@angular/forms';

const API_END_POINT: string = 'https://curso-1af2a.firebaseio.com/Employee';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Crea un usuario
  createEmployee(employee: Employee): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body = JSON.stringify(employee);

    return this.http.post(API_END_POINT + '.json', body, options);
  }

  // Actualiza un usuario
  updateEmployee(employee: Employee): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const body = JSON.stringify(employee);

    return this.http.put(
      API_END_POINT + '/' + employee.id + '.json',
      body,
      options
    );
  }

  // Listado de usuarios
  employeeList(): Observable<any> {
    return this.http.get(API_END_POINT + '.json').pipe(
      map((response: any) => {
        console.log('Datos en bruto', response);

        if (response == undefined) {
          return [];
        }

        const employees = [];
        // Recorremos el objeto devuelto para darle el formato adecuado
        Object.keys(response).forEach((key: string) => {
          employees.push(
            new Employee(
              response[key].name,
              response[key].email,
              response[key].job,
              response[key].age,
              response[key].isActive,
              response[key].valoration,
              key
            )
          );
        });

        return employees;
      })
    );
  }

  // Información del usuario
  getEmployee(id: string): Observable<any> {
    console.log('El id del usuario', id);

    return this.http.get(API_END_POINT + '/' + id + '.json').pipe(
      map((response: any | undefined) => {
        console.log('La respuesta de la API', response);

        if (response == undefined) {
          return null;
        }

        return new Employee(
          response.name,
          response.email,
          response.job,
          response.age,
          response.isActive,
          response.valoration,
          id
        );
      })
    );
  }

  // Elimina un usuario
  removeEmployee(id: string): Observable<any> {
    return this.http.delete(API_END_POINT + '/' + id + '.json');
  }

  // Validación personalizada para el email
  forbiddenEmailValidator(email: FormControl) {
    // el tipo devuelto podría ser : {[s:string]: boolean} | null

    // Email prohibidos
    let forbiddenEmails: Array<string> = ['dev1@gmail.com', 'dev2@gmail.com'];

    // Si se ha introducido un email prohibido
    if (forbiddenEmails.indexOf(email.value) != -1) {
      return {
        invalid: true,
      };
    }

    // En caso contrario
    return null;
  }
}
