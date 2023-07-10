import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { NgModel } from '@angular/forms';
import { Applications } from '../Model/client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  title ='post api';
  formValue !: FormGroup
  allApplications:any;
  application : Applications =new Applications;

addApp:Applications={
   
  C_Id:0,
  C_Name: '',
  Application_Name: '',
  ServerInfo: '',
  PortInfo: ''
}

  constructor(private http:AppService, private router:Router){ }

  ngOnInit(): void {



    // console.log(this.applicationForm);
    //get application method for table
    this.http.getApplications().subscribe(x=>{
      this.allApplications=x;
    })

    


  }
//old add application code
//   applicationForm = new FormGroup({
//     c_Id:new FormControl(""),
//     c_Name:new FormControl(""),
//     application_Name:new FormControl(""),
//     serverinfo:new FormControl(""),
//     portinfo:new FormControl(""),
//    });
//     AddApplications(){
//    this.http.AddApplications().subscribe({
//     next:(application)=>{
//       console.log(application);
//     }
//    });


// }



//    getAllData(){
//     this.http.getApplications().subscribe(res=>{
//       this.allApplications=res;
//     })
//   }



addApplicationData(){
  this.http.AddApplications(this.addApp)
  .subscribe({
    next:(app:any)=>{
      console.log(app);
      alert("Application Details Added !!");
       let ref =document.getElementById('clear');
       ref?.click();
       this.formValue.reset();
       this.getAllData();//quick refresh the data
    }

  }

  )
}
getAllData(){
  this.http.getApplications().subscribe(res=>{
    this.allApplications=res;
  })
}

deleteApplication(id:number){
  this.http.deleteApplications(id).subscribe(res=>{
    alert("Application Record Deleted ")
    this.getAllData();//quick regresh the data
  })
}
// onEdit(id: number) {
//   this.http.updateApp(id, this.application).subscribe(
//     () => {
//       alert("Successfully edited!");
//       this.getAllData();
//     },
//     error => {
//       console.error("Error editing applications:", error);
//     }
  //);

update(id:number){
  this.router.navigate(['appEdit',id])
  
}

  
}




