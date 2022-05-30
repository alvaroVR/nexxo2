import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../_models/User";
import {AuthenticationService} from "../../../_services/authentication/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  public user: User | any;

  loading = false;
  submitted = false;
  returnUrl: string | any;
  error = '';

  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      company: ['', Validators.required],
    });
    console.log('asd')

  }

  get f() {
    return this.loginForm.controls;
  }


  public onSubmit() {
    const username = this.f.username.value;
    const password = this.f.password.value;
    const company = this.f.company.value;

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(username, password, company)
      .subscribe(
        (data: any) => {
          this.user = data;
          console.log(this.user)
          this.loading = false;
          if (data) {
            this.router.navigate([this.returnUrl]);
          }
        },
        (error: any) => {

          this.loading = false;
        });
  }

}
