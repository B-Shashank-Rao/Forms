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
  constructor(private formbuilder:FormBuilder,public httpclient: HttpClient,private router:Router) { 
  }
 ngOnInit(): void {
    this.ProductForm = this.formbuilder.group({
      name: [''],
      modelNo: [''],
      unitPrice: [''],
      quantity: [''],
      description:[''],
      fileSource:['']
});
    if(sessionStorage.getItem('Email') == null)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.user=sessionStorage.getItem('Email');
    }
  }
  get f()
  {
    return this.ProductForm.controls;
  }
  onFileChange(event:any)
  {
    const file = event.target.files[0];
    if(event.target.files)
    {
      var reader= new FileReader();
      reader.onload=(event:any) =>{
        this.ProductForm.get('fileSource').value=event.target.result;
      }
    };
  }
  onSubmit()
  {
    this.submitted=true;
  }
create()
{ 
  const formData=new FormData();
  formData.append('file',this.ProductForm.get('fileSource').value)
  console.log(formData)
  var obj1=
    {
      "data":
      {
        "name":this.ProductForm.get('name').value,
        "modelNo":this.ProductForm.get('modelNo').value,
        "unit_price":this.ProductForm.get('unitPrice').value,
        "quantity":this.ProductForm.get('quantity').value,
        "description":this.ProductForm.get('description').value
      }
    }
  this.httpclient.post('http://localhost:1337/api/products',obj1).subscribe((res:any)=>
{
  console.log(res)
  alert('Table Created Successfully');
  this.router.navigate(['/table']);
},
  ((error)=>
  {
    alert('Product name already exists')
  }));
}
logout()
{
  sessionStorage.removeItem('Email');
  alert('Logout Successfull')
  this.router.navigate(['/login']);
  console.clear();
}
}
