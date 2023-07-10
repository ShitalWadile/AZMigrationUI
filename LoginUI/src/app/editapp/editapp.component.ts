import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Applications } from '../Model/client';

@Component({
  selector: 'app-editapp',
  templateUrl: './editapp.component.html',
  styleUrls: ['./editapp.component.css']
})
export class EditappComponent implements OnInit{
  id:any;
  public appDetails:any=[];
  appDetailsForm!:FormGroup
  appDetail:any={
    
  C_Id:0,
  C_Name: '',
  Application_Name: '',
  ServerInfo: '',
  PortInfo: ''
  }

  constructor(private route:ActivatedRoute,private http:AppService,private router:Router){ }
  
  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    this.http.getApp(this.id).subscribe(data=>{
      this.appDetail=data;
    },error=>console.log(error));
    // this.route.paramMap.subscribe({
    //   next:(params)=>{
    //     const id= Number(params.get('C_Id'));
    //     if(!isNaN(id)){
    //       //call api
    //       this.http.getApp(id).subscribe({
    //         next:(res)=>{
    //          this.appDetails=res;
    //         }
    //       });
    //     }
    //   }
    // })
  }
  //for client
  onUpdate(){
    this.http.updateApp(this.id,this.appDetail).subscribe(data=>{
      this.router.navigate(['client']);
    },error=>console.log(error));
  }

  //for admin
  

}
