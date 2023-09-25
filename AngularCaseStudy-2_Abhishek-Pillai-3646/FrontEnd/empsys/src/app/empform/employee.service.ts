import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/submit-employee'; 
  private apiURL1 = 'http://localhost:3000/get-all-employees';
  private updateUrl = 'http://localhost:3000/update-employee/:id';
  private deleteUrl = 'http://localhost:3000/delete-employee/:id';
  constructor(private http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL1);
  }
  updateEmployee(updatedEmployeeData: any, id: string): Observable<any> {
    
    const url = this.updateUrl.replace(':id', id);
  
  
    return this.http.put(url, updatedEmployeeData);
  }
  deleteEmployee(id: string): Observable<any> {
    const url = this.deleteUrl.replace(':id', id);
    return this.http.delete(url);
  }
}
