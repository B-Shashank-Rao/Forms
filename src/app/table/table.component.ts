import { Component, OnInit,Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public httpdata: any;
  public text1:any | undefined ;
  public user: any;
  constructor(private router:Router,public httpclient:HttpClient) {
    console.log(this.httpdata);
  }

ngOnInit() : void {
     this.httpdata=[];
     this.text1=[];
  if(sessionStorage.getItem('Email') == null){
    this.router.navigate(['/login']);
}
  else{
    this.user=sessionStorage.getItem('Email');
    console.log(this.user);
  }
this.httpclient.get('http://localhost:1337/api/categories?populate=products').subscribe((res:any)=>{
console.log(res);
});
this.httpclient.get('http://localhost:1337/api/products?sort[0]=name').subscribe((res:any)=>{
 console.log(res);
 this.httpdata=res.data;
console.log(this.httpdata);
});
}
display(event:any){
// console.log(this.text1 = val.target.value);
this.text1 = event.target.value;
var text=this.text1;
for(let i in text){
this.httpclient.get('http://localhost:1337/api/products?filters[name][$eq]='+text).subscribe((res:any)=>{
//this.httpdata=res.data;
text=res.data;
console.log('',text[i])
});
}
}


createval(){
    this.router.navigate(['/product']);
 }
    deleteval(){
  this.httpclient.delete('http://localhost:1337/api/products/11')
  .subscribe((res)=>{
    console.log("Deleted",res);
});
}
insertval(){
  var obj1={
    "data":{
      "name":"HeadPhones",
    }
  }
  this.httpclient.put('http://localhost:1337/api/products/1',obj1)
  .subscribe((res:any)=>{
        console.log("Updated",res);
});
 }
logout(){
  sessionStorage.removeItem('Email');
  alert('Logout Successfull')
  this.router.navigate(['/login']);
  console.clear();
}
}
