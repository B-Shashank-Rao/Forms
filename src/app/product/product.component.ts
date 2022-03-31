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
  file : File | any;
  fileName : any;
  formData = new FormData();
  ProductForm : FormGroup | any ;
  submitted = false;
  public user : any;

  constructor(private formbuilder:FormBuilder,public httpclient: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.ProductForm = this.formbuilder.group({
      name: [''],
      modelNo: [''],
      unitPrice: [''],
      quantity: [''],
      description:[''],
      productImage:['']
    });

    if(sessionStorage.getItem('Email') == null) {
      this.router.navigate(['/login']);
    } else {
      this.user=sessionStorage.getItem('Email');
    }
  }
  get f() {
    return this.ProductForm.controls;
  }

  onFileChange(event:any) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      console.log(this.file)
      console.log(this.fileName);
      this.formData.append('files.productImage', this.file, this.fileName);
    }
  }

  onSubmit() {
    this.submitted=true;
  }

create() { 
  //const formData = new FormData();
  var obj1 = {
    "data": {
      "name":this.ProductForm.get('name').value,
      "modelNo":this.ProductForm.get('modelNo').value,
      "unit_price":this.ProductForm.get('unitPrice').value,
      "quantity":this.ProductForm.get('quantity').value,
      "description":this.ProductForm.get('description').value
    }
  }

  var data = {
    name:this.ProductForm.get('name').value,
    modelNo:this.ProductForm.get('modelNo').value,
    unit_price:this.ProductForm.get('unitPrice').value,
    quantity:this.ProductForm.get('quantity').value,
    description:this.ProductForm.get('description').value
  };

  // formData.append('name', this.ProductForm.get('name').value);
  // formData.append('modelNo', this.ProductForm.get('modelNo').value);
  // formData.append('unit_price', this.ProductForm.get('modelNo').value);
  // formData.append('quantity', this.ProductForm.get('quantity').value);
  // formData.append('description', this.ProductForm.get('description').value);

  //formData.append('files.productImage', this.file, this.fileName);
  this.formData.append('data', JSON.stringify(data));

  //formData.append('productImage', this.img);

  console.log(this.formData.get('data'));
  console.log(this.formData.get('files.productImage'))

  /*
  this.httpclient.post('http://localhost:1337/api/products', obj1).subscribe(
    (res:any)=> {
      console.log(res.data)
      alert('Table Created Successfully');
      this.router.navigate(['/table']);
    },
    ((error)=> {
      alert('Product name already exists')
  }));
  */

  
  this.httpclient.post('http://localhost:1337/api/products', this.formData).subscribe(
    (res:any)=> {
      console.log(res);
    },
    ((error) => {
      console.log(error)
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
