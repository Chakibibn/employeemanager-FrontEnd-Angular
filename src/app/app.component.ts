import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanager';
  public employees : Employee[] =[];
  public editemployee : Employee | undefined;
  public deleteemployee! : Employee ;
 
  constructor(private employeeService : EmployeeService){}

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response : Employee[]) => {
        this.employees = response;
      },
      (error : HttpErrorResponse)=>{
      alert(error.message)
      }
    );
  }
  ngOnInit(): void {
      this.getEmployees();
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
  public onOpenModal(employee : Employee, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='add'){
      button.setAttribute('data-target','#addEmployeeModal');

    }
    if(mode ==='edit'){
      this.editemployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
      
    }
    if(mode ==='delete'){
      
      this.deleteemployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
      
    }
    container?.appendChild(button);
    button.click();
  }
  public onOpenModal2( mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode ==='add'){
      button.setAttribute('data-target','#addEmployeeModal');

    }
    
    container?.appendChild(button);
    button.click();
  }
  public onAddEmployee(addForm: NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response : Employee) =>{
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
        
      }
    );
  }
  public onUpdateEmployee(employee: Employee):void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response : Employee) =>{
        console.log(response);
        this.getEmployees();
      },
      (error : HttpErrorResponse) =>{
        alert(error.message);
        
      }
    );
  }
  public ondeleteEmployee(employeeId: number):void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
