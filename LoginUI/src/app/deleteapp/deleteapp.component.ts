import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Application } from '../Model/application';
import { Applications } from '../Model/client';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deleteapp',
  templateUrl: './deleteapp.component.html',
  styleUrls: ['./deleteapp.component.css']
})
export class DeleteappComponent {

  C_Id: number | undefined;
  applications:any
 
  applicationDetails$:Observable<Applications | undefined> | undefined ;

  addApp:Applications={
   
    C_Id:0,
    C_Name: '',
    Application_Name: '',
    ServerInfo: '',
    PortInfo: ''
  }

  constructor(private appService: AppService) { }

  getApplicationById(): void {
    if (this.C_Id) {
      this.applications = this.appService.getApp(this.C_Id);
    }
  }

  
  
  deleteApplication(C_Id:number){
    this.appService.deleteApplications(C_Id).subscribe(res=>{
      alert("Application Record Deleted ")
      
      
    })
  }
  
  }


