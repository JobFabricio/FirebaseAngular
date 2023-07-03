import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.formReg.valid) {
      const { email, password } = this.formReg.value;
      this.userService.register({ email, password })
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch(error => {
          this.errorMessage = error.message;
        });
    }
  }
}
