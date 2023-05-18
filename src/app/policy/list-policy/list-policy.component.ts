import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server.service';
import Swal from 'sweetalert2';  
@Component({
  selector: 'app-list-policy',
  templateUrl: './list-policy.component.html',
  styleUrls: ['./list-policy.component.scss']
})
export class ListPolicyComponent {

  displayedColumns = ['id', 'title', 'description', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Element>();
  policyList=[]
  @ViewChild(MatPaginator) paginator :any = MatPaginator;


  constructor(private serverService :ServerService,private router: Router){
    // this.dataSource.paginator = this.paginator;
  }



  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  ngOnInit(){
    localStorage.clear();

    this.getList()
  }
  getList(){

    this.serverService.getData().subscribe((response:any) =>{
      if(response['data']){
        this.dataSource=  new MatTableDataSource(response['data']);
        console.log(this.dataSource,response,this.paginator,"errrrrrrrrrrr");
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  addPolicy(){
    this.router.navigate(['add-policy']);

  }
  editPolicy(data:any){
    console.log(data,"data");
    let policy ={id:data.id,title:data.title,description:data.description}
    localStorage.setItem("policy-details",JSON.stringify(policy))
    this.router.navigate(['add-policy']);
  }
  deletepolicy(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serverService.deleteData(id).subscribe((response:any) =>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getList()
        });
        
      }
    })

  }
}
