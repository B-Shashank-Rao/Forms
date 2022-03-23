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
  public httpdata: any;
  public text1:any | undefined ;
  public user: any;
  public searchFilter: any ;
  public itemss:any;
  constructor(private router:Router,public httpclient:HttpClient) 
  {
    console.log(this.httpdata);
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
  this.httpclient.get('http://localhost:1337/api/products').subscribe((res:any)=>{
  this.httpdata=res.data;
  console.log(this.httpdata);
  console.log(this.httpdata.length);
  for(var i=0;i<=res.data.length;i++)
  {
    this.itemss=res.data[i].attributes.name
    console.log(this.itemss)
  }
  });
  }
  // localStorage.setItem('Result',JSON.parse(this.httpdata))
  createval()
  {
    this.router.navigate(['/product']);
  }
  deleteval()
  {
    this.httpclient.delete('http://localhost:1337/api/products/').subscribe((res)=>
    {
      console.log("Deleted",res);
    });
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
  this.httpclient.put('http://localhost:1337/api/products/1',obj1).subscribe((res:any)=>
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
