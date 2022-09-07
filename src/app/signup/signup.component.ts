import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private FormBuilder: FormBuilder, private _http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.signupForm = this.FormBuilder.group({
      name: [''],
      mobile: [''],
      email: [''],
      password: [''],
    });
  }
  singUp(){
    this._http.post<any>('http://localhost:3000/signup',this.signupForm.value).subscribe(res=>{
      alert('Account Created, Welcome to the group')
      this.signupForm.reset();
      this.router.navigate(['login'])
    }, err=>{
      alert('Error Occured in signup')
    }
    );
  }
}
