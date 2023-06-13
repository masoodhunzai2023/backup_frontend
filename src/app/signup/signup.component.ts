import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { passwordMatchValidator } from './matcPassword';

@Component({
  selector: 'app-signup',
  templateUrl:'./signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService,
    private toaster: ToastrService
  )
  {}

  signup_Form = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Password: new FormControl('',[Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl(null),
   
  },{
      validators:passwordMatchValidator
  });

  // passwordMatchValidator(){
  //   return (form: AbstractControl)=>{
  //    return form.get('Password')?.value === form.get('confirmPassword')?.value ? null : {notmatched: true}
  //   }
  
  signup() {
    this.http.post<any>('http://localhost:3000/signup', this.signup_Form.value).subscribe(
      (response) => {
        console.log(response);
        this.toaster.success('Signup successful');
        this.signup_Form.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.toaster.error('Signup failed');
      }
    );
  

 
  }
  get userId() {
    return this.signup_Form.get('userId');
  }

  get password() {
    return this.signup_Form.get('password');
  }

  get confirmPassword() {
    return this.signup_Form.get('confirmPassword');
  }
}
