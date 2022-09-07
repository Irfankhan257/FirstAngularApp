import { ApiService } from './../shared/api.service';
import { Studentdata } from './student.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  formValue!: FormGroup;
  Studentdataobj: Studentdata = new Studentdata();
  allStudentdata: any;
  showadd!: boolean;
  showeditbtn!:boolean;
  public page =1;
  public pageSize=10
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Name: [''],
      Age: [''],
      Gender: [''],
      Department: [''],
    });
    this.getAlldata();
  }
    clickAddstudent(){
      this.formValue.reset();
      this.showadd=true;
      this.showeditbtn=false;
    }


  addstudent() {
    this.Studentdataobj.Name = this.formValue.value.Name;
    this.Studentdataobj.Age = this.formValue.value.Age;
    this.Studentdataobj.Gender = this.formValue.value.Gender;
    this.Studentdataobj.Department = this.formValue.value.Department;

    this.api.postStudent(this.Studentdataobj).subscribe(
      (res) => {
        console.log(res);
        alert('Student data added successfully');
        this.formValue.reset();
        this.getAlldata();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  getAlldata() {
    this.api.getStudent().subscribe((res) => {
      this.allStudentdata = res;
    });
  }

  deleteStudentdata(data: any) {
    this.api.deleteStudent(data.id).subscribe((res) => {
      alert('Record Deleted!');
      this.getAlldata();
    });
  }

  editStudentinfo(data:any){
    this.showadd=false;
    this.showeditbtn=true;
    this.Studentdataobj.id = data.id
    this.formValue.controls['Name'].setValue(data.Name)
    this.formValue.controls['Age'].setValue(data.Age)
    this.formValue.controls['Gender'].setValue(data.Gender)
    this.formValue.controls['Department'].setValue(data.Department) 
  }

  updateStudentinfo(){
    this.Studentdataobj.Name = this.formValue.value.Name;
    this.Studentdataobj.Age = this.formValue.value.Age;
    this.Studentdataobj.Gender = this.formValue.value.Gender;
    this.Studentdataobj.Department = this.formValue.value.Department;

    this.api.updateStudent(this.Studentdataobj,this.Studentdataobj.id).subscribe(res=>{
      alert("Student info updated");
      this.formValue.reset();
      this.getAlldata();
    })
  }

}
