import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UniqueUsername } from '../validators/unique-username';
import { MatchPassword } from '../validators/match-password';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z 0-9]+$/),
    ],
    [this.uniqueUsername.validate]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, { validators: [this.matchPassword.validate]}
  )

  constructor(
    private uniqueUsername: UniqueUsername,
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      // console.log('@invalid',this.authForm.invalid);

      return;
    }

    this.authService.signup(this.authForm.value)
    .subscribe({
      next: response => {
        // console.log('@onSubmit',this);
        this.router.navigateByUrl('/inbox');

      // navigate to some other route
      },
      error: err => {
        // console.log('@errors: ',err.status);

        if(!err.status){
          this.authForm.setErrors({ noConnection: true });
        }else{
          this.authForm.setErrors({ unknownError: true });
        }
      }
    })
  }

}
