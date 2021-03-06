import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup(
    {
      username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[0-9a-z]+$/)
      ]),
      password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]
      )
    }
  );

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }

    this.authService.signin(this.authForm.value).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/inbox');

      },
      error: ({error}) => {

         if (error.username || error.password) {
           this.authForm.setErrors({ credentials: true });
         }else{
          this.authForm.setErrors({ unknownError: true });

         }


      }
    });
  }

}
