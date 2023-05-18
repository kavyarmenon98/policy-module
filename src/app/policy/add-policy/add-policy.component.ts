import { Component } from '@angular/core';
import { FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent {
  policyForm:FormGroup;
  submitted = false;
  policyId=""
  policyDetails=localStorage.getItem("policy-details")

  constructor(private formBuilder:FormBuilder,private serverService :ServerService,private router: Router,private route : ActivatedRoute){
    this.policyForm=this.formBuilder.group({
      id:[""],
      title: ['', Validators.required],
      description:[""],
      organization_id :[1]

    })
   }
  ngOnInit(){
    if(this.policyDetails){
      let data=JSON.parse(this.policyDetails)
      this.policyId=data.id
      console.log(data,"cfdhgbjhb");

      this.policyForm.controls['title'].setValue(data['title'])
      this.policyForm.controls['id'].setValue(data['id'])
      this.policyForm.controls['description'].setValue(data['description'])

    }
  }
   // convenience getter for easy access to form fields
   get f() { return this.policyForm.controls; }

   onSubmit(){
    this.submitted = true;

    if (this.policyForm.invalid) {
        return;
    }
    if(this.policyDetails){
      this.serverService.putData(this.policyForm.value,this.policyId).subscribe((response:any) =>{
        if(response?.id){
          Swal.fire(
            'Successfully Updated !',
            '',
            'success'
          )
          this.router.navigate(['']);
        }
      });
    }else{
      this.serverService.postData(this.policyForm.value).subscribe((response:any) =>{
        if(response?.id){
          Swal.fire(
            'Successfully Created !',
            '',
            'success'
          )
          this.router.navigate(['']);
        }
      });
    }
   
   }
   onReset(){
    this.submitted = false;
    this.policyForm.reset();
   }
   ngOnDestroy(){
    localStorage.clear();

   }
}
