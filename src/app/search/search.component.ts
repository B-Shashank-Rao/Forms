import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 // public data:any;
 // SearchForm:FormGroup | any;
 // submitted=false;

  constructor(private router:Router,public httpclient: HttpClient) { }

  ngOnInit(): void{

  }
  logout(){
  
      this.router.navigate(['/login'])
     
    
    }
  

  
}

