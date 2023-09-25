import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpForm } from './empform.model';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent {
  displayedColumns: string[] = ['emp_id', 'first_name', 'last_name', 'contact_no', 'email', 'dob', 'address', 'actions'];
  employeeObj:EmpForm=new EmpForm();
  public employeeData:any[];
  

   loginForm = new FormGroup({
    id:new FormControl(),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Z][a-zA-Z]*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[A-Z][a-zA-Z]*$/)]),
    contactNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address:new FormControl(''),
  })
constructor(private employeeService: EmployeeService) {}
ngOnInit(): void {
  this.loadEmployeeData(); // Call the loadEmployeeData method when the component initializes
  this.employeeService.getAllEmployees().subscribe((data) => {
    this.employeeData = data;
  });
}
get id(){
  return this.loginForm.get('id');
}
get firstName() {
  return this.loginForm.get('firstName');
  }
get lastName(){
  return this.loginForm.get('lastName');
}
get contactNo(){
  return this.loginForm.get('contactNo');
}
get email(){
  return this.loginForm.get('email');
}
get dob(){
  return this.loginForm.get('dob');
}
select(selectedEmployee:EmpForm){
  this.employeeObj = Object.assign({},selectedEmployee);
  console.log('Selected Employee:', selectedEmployee);
  console.log(this.employeeObj);
}
onSubmit() {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;

    this.employeeService.addEmployee(formData).subscribe(
      (response) => {
        console.log('Data inserted successfully');
        // Optionally, reset the form here
        this.loginForm.reset();
        this.loadEmployeeData();
      },
      (error) => {
        console.error('Error inserting data: ', error);
      }
    );
   
   
  }
 
}
loadEmployeeData() {
  this.employeeService.getAllEmployees().subscribe(
    (data) => {
      console.log(data);
      this.employeeData = data; // Assign fetched data to employeeData
    },
    (error) => {
      console.error('Error fetching data: ', error);
    }
  );
}
updateEmployee() {
  
  const id = this.employeeObj.emp_id.toString();


  const updatedEmployeeData = {
    id: id,
    firstName: this.employeeObj.first_name,
    lastName: this.employeeObj.last_name,
    contactNo: this.employeeObj.contact_no,
    email: this.employeeObj.email,
    dob: this.employeeObj.dob,
    address: this.employeeObj.address,
  };

  this.employeeService.updateEmployee(updatedEmployeeData, id).subscribe(
    (response) => {
      console.log('Employee updated successfully');
      
      this.loadEmployeeData();
    },
    (error) => {
      console.error('Error updating employee: ', error);
     
    }
  );
}
deleteEmployee() {
  if (!this.employeeObj.emp_id) {
    console.error('Employee ID is missing');
    return;
  }
  
  const id = this.employeeObj.emp_id.toString();

  this.employeeService.deleteEmployee(id).subscribe(
    () => {
      console.log('Employee deleted successfully');
      this.loadEmployeeData(); // Refresh the employee list
      this.resetForm(); // Optionally reset the form
    },
    (error) => {
      console.error('Error deleting employee: ', error);
    }
  );
}

resetForm() {
  // Optionally reset the form fields
  this.loginForm.reset();
}


}
