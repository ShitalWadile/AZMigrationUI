import { Injectable } from '@angular/core';
import { Applications } from './Model/client';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AdminUsers } from './Model/admin-users';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  id:number=0;

allApplicationData:any;
allApplications:any;
 constructor(private http:HttpClient) {
   this.id=0;
  }


 baseServerUrl="https://localhost:5001/api/Application" ;
 appServerUrl="http://localhost:5078/AdminApp";
 AdminUrl ="http://localhost:5078/api/Admin"
 // clientUrl="http://localhost:5078/api/Client";

 
 //GET APPLICATION for Admin
 getApplications(){
   return this.http.get("http://localhost:5078/AdminApp");
 }

 //get specific application for edit

 getApp(id:number):Observable<Applications>{
   return this.http.get<Applications>(`http://localhost:5078/api/Client/${id}`);
 }

 //update app for client

 updateApp(id: number, updateAppReq: Applications):Observable<Applications>{
   return this.http.put<Applications>("http://localhost:5078/api/Client/" + id, updateAppReq);
 }
 //getting all users data
 
 getAll():Observable<AdminUsers[]>
 {
   return this.http.get<AdminUsers[]>(this.AdminUrl);
 }

 //GET APPLICATION DETAILS
 getApplicationData(){
   return this.http.get("https://localhost:5001/api/Application");
 }

 //GET APPLICATION for Client Controller
getApplicationC(){
 return this.http.get("http://localhost:5078/api/Client");
}

  //post data for client
AddApplications(addApp:Applications):Observable<Applications>
{
 addApp.C_Id=0;
 return this.http.post<Applications>("http://localhost:5078/api/Client",addApp);
}

//delete applications for client
deleteApplications(id: number): Observable<Applications> {
 return this.http.delete<Applications>(`http://localhost:5078/api/Client/${id}`);
}
//delete for admin
deleteAdminApp(id: number): Observable<Applications> {
 return this.http.delete<Applications>(`http://localhost:5078/AdminApp/${id}`);
}

//edit application
editApplications(id: number, updatedData: Applications): Observable<Applications> {
 return this.http.put<Applications>(`http://localhost:5078/api/Client/${id}`, updatedData);
}

//delete User

Delete(id: number): Observable<AdminUsers> {
  return this.http.delete<AdminUsers>(`http://localhost:5078/api/Admin/${id}`);
 }

 

}
