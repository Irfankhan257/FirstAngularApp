import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient, private router: Router ) { }
//to creat the post method
postStudent(data:any){
  return this._http.post<any>('http://localhost:3000/posts', data).pipe(
    map((res: any) => {
      return res;
    })
  );
}

  getStudent(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
}

updateStudent(data:any,id:number){
  return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
    return res;
  }))
}

deleteStudent(id:number){
  return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
    return res;
  }))
}

getToken(){
  return localStorage.getItem('token')
}
setToken(){
  localStorage.setItem('token','abc')
}
isLoggedIn(){
  if(this.getToken() !=null)
  return true;
  else{
    this.router.navigate(['login']);
    return false;
  }
}
removeToken(){
  localStorage.removeItem('token')
}

}