import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPolicyComponent } from './policy/list-policy/list-policy.component';
import { AddPolicyComponent } from './policy/add-policy/add-policy.component';

const routes: Routes = [{
  path:"",
  component:ListPolicyComponent
},
{
  path:"add-policy",
  component:AddPolicyComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
