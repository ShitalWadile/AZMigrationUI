import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { loginService } from 'src/app/service/login.service';
import { AppService } from '../app.service';
import { AdminUsers } from '../Model/admin-users';


@Component({
  selector: 'app-alluserdetails',
  templateUrl: './alluserdetails.component.html',
  styleUrls: ['./alluserdetails.component.css']
})
export class AlluserdetailsComponent {

  
 
  alluser: AdminUsers[] =[];
  constructor(private router:Router, private api: AppService,private http:HttpClient) {}


  


  ngOnInit(): void {
    this.refreshList();
  }
  Delete(id:number){
  
      this.api.Delete(id).subscribe(data=>{
       alert("User Deleted Successfully")
        this.refreshList();
      });
      location.reload();
    
  
} 
refreshList(){
      this.api.getAll().subscribe(data=>{
        this.alluser=data;
        console.log(this.alluser)
      });
}


// deleteUser(loginId:number){
//   if(confirm('Are you sure?')){
//     this.api.DeleteUser(loginId).subscribe(data=>{
//       this.application=data;
//       console.log(data)
//       this.refreshList();
//     });
//     location.reload();
//   }
// }
// deleteUser(id:number){
//   this.http.delete(id).subscribe(res=>{
//     alert("Application Record Deleted ")
//     this.getAll();//quick regresh the data
//   })
// } 

}







