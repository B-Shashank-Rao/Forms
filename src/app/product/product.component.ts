import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  ProductForm: FormGroup | any ;
  submitted=false;
  public user: any;
  public img:any;
  constructor(private formbuilder:FormBuilder,public httpclient: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.ProductForm = this.formbuilder.group({

      name: [''],
      modelNo: [''],
      unitPrice: [''],
      quantity: [''],
      description:['']
   
   
    });
    if(sessionStorage.getItem('Email') == null){
      this.router.navigate(['/login']);
   
    }
    else{
      this.user=sessionStorage.getItem('Email');
    }
    this.httpclient.get('http://localhost:1337/api/upload/files').subscribe((res:any)=>{
      console.log(res)
      this.img=res;
    })
  }
  get f(){
    return this.ProductForm.controls;
  }
  onSubmit(){
    this.submitted=true;
  }
create(){ 
  this.httpclient.post('http://localhost:1337/api/products',{"data" : {
     "name":this.ProductForm.get('name').value,
     "modelNo":this.ProductForm.get('modelNo').value,
     "unit_price":this.ProductForm.get('unitPrice').value,
     "quantity":this.ProductForm.get('quantity').value,
     "description":this.ProductForm.get('description').value,

 
}})
.subscribe(
  (data)=>{
    console.log(data)
    alert('Table Created Successfully');
    this.router.navigate(['/table']);
  },
  ((error)=>{
    alert('Product name already exists')
  }));

}
//navigate(){
  
//}
logout(){
  sessionStorage.removeItem('Email');
  alert('Logout Successfull')
  this.router.navigate(['/login']);
  console.clear();
}
}
