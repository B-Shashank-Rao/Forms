import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit 
{
  public userdata:any;
  constructor(private router:Router,public httpclient: HttpClient) 
  {

  }
ngOnInit(): void
{
  this.userdata=[];
  this.httpclient.get('http://localhost:1337/api/products?filters[created_by_id]{$eq]=1').subscribe((res:any)=>
  {
    this.userdata=res.data;
    console.log('',this.userdata)
  });
}
logout()
{
  this.router.navigate(['/login'])
}
}

