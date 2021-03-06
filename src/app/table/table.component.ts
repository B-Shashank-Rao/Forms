import { Component, OnInit,Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit 
{
  public data:any;
  public httpdata: any;
  public user: any;
  public searchFilter: any ;
  public itemss:any;
  public productImage:any;
  constructor(private router:Router,public httpclient:HttpClient) 
  {
       this.productImage="http://localhost:1337"
  }
  ngOnInit() : void 
  {
    this.httpdata=[];
    this.itemss=[];
    if(sessionStorage.getItem('Email') == null)
    {
      this.router.navigate(['/login']);
    }
    else
    {
      this.user=sessionStorage.getItem('Email');
      console.log(this.user);
    }
  this.httpclient.get('http://localhost:1337/api/products?populate=*').subscribe((res:any)=>{
  this.httpdata=res.data;
  console.log(this.httpdata);
  });
  }
  createval()
  {
    this.router.navigate(['/product']);
  }
  deleteval(data:any)
  {
     this.httpclient.delete('http://localhost:1337/api/products/'+data.id).subscribe((res:any)=>
     {
       alert('Product Details Deleted Successfully')
       this.httpdata=res.data;
       console.log(data.id)
     });
     window.location.reload();
    
  }
  insertval()
  {
    var obj1=
    {
      "data":
      {
        "name":"HeadPhones",
      }
    }
  this.httpclient.put('http://localhost:1337/api/products/',obj1).subscribe((res:any)=>
  {
    console.log("Updated",res);
  });
  }
  logout()
  {
    sessionStorage.removeItem('Email');
    alert('Logout Successfull')
    this.router.navigate(['/login']);
    console.clear();
  }
}
