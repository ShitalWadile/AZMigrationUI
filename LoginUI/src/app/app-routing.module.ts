import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppComponent } from './add-app/add-app.component';
import { AdminComponent } from './admin/admin.component';
import { AlluserdetailsComponent } from './alluserdetails/alluserdetails.component';
import { AuthGuardService } from './auth.guard';


import { ClientComponent } from './client/client.component';
import { D3AppComponent } from './d3app/d3app.component';
import { DeleteappComponent } from './deleteapp/deleteapp.component';
import { EditappComponent } from './editapp/editapp.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermissionGuard } from './permission.guard';
import { ProjectteamComponent } from './projectteam/projectteam.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'addapp',component:AddAppComponent},
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent, canActivate:[PermissionGuard],
  data:{
    Role: 'User'
  }
     },

  {path:'homeAdmin',component:HomeComponent, canActivate:[PermissionGuard],
  data:{
    Role: 'Admin'
  }
    },


  {
    path: 'forgotpassword',component:ForgotpasswordComponent

  },
  {
    path: 'admin',
    component:AdminComponent, canActivate:[PermissionGuard],
    data:{
      Role:'Admin'
    }
  },
  {
    path: 'AllUser',
    component:AlluserdetailsComponent, canActivate:[PermissionGuard],
    data:{
      Role:'Admin'
    }
  },

  {
    path: 'client',
    component:ClientComponent, canActivate:[PermissionGuard],
    data:{
      Role:'Client'
    }
  },

  {
    path:'d3app',
    component:D3AppComponent,canActivate:[PermissionGuard],
    data:{
      Role:'Admin'
    }
  },
  {
    path:'appEdit/:id',
    component:EditappComponent,
    data:{
      Role:'Admin, Client,User,ProjectTeam'
    }
  },
  {
    path:'projectTeam',
    component:ProjectteamComponent,
    data:{
      Role:'ProjectTeam'
    }
  },
  {
    path:'delete',
    component:DeleteappComponent,
    data:{
       Role:'ProjectTeam'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
