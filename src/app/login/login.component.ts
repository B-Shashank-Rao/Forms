import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup | any ;
  submitted= false;
  constructor(private formbuilder: FormBuilder, private router: Router,public httpclient: HttpClient) {
    }
ngOnInit() : void {
this.registerForm = this.formbuilder.group({
email: ['',[Validators.requiredTrue,Validators.email,Validators.pattern('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')]],
password: ['',[Validators.requiredTrue,Validators.minLength(6)]]
 });
}
  get f(){
    return this.registerForm.controls;
  }
  onSubmit(){
    this.submitted=true;
  }
  gototable(){
    var obj={
      "identifier":this.registerForm.get('email').value,
      "password":this.registerForm.get('password').value,
    } 
    //Identifier = 'Email authentication'
     this.httpclient.post('http://localhost:1337/api/auth/local',obj).subscribe((res:any)=>{
      
      console.log(res);
      sessionStorage.setItem('Email',res.user.email);
      this.router.navigate(['/table']);
     },
    ((error)=>{
      alert('Invalid Credentials')
      
     })) 
}
}




